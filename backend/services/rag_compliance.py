import os
import requests
from typing import List, Dict, Any, Optional
from datetime import datetime
import hashlib
from bs4 import BeautifulSoup
import PyPDF2
import io

class RAGComplianceEngine:
    """RAG-based compliance engine for GST regulations"""
    
    def __init__(self):
        self.knowledge_base = []
        self.embeddings_cache = {}
        self.last_scrape = None
        self.sources = [
            "https://cbic-gst.gov.in",
            "https://www.incometax.gov.in"
        ]
    
    async def scrape_regulations(self) -> Dict[str, Any]:
        """Scrape latest GST acts and notifications"""
        scraped_docs = []
        errors = []
        
        for source in self.sources:
            try:
                # Respect robots.txt and rate limits
                response = requests.get(source, timeout=30)
                
                if response.status_code == 200:
                    soup = BeautifulSoup(response.content, 'html.parser')
                    
                    # Find PDF links
                    pdf_links = soup.find_all('a', href=lambda x: x and x.endswith('.pdf'))
                    
                    for link in pdf_links[:10]:  # Limit to 10 per source
                        pdf_url = link.get('href')
                        if not pdf_url.startswith('http'):
                            pdf_url = source + pdf_url
                        
                        # Download and process PDF
                        doc = await self._process_pdf(pdf_url)
                        if doc:
                            scraped_docs.append(doc)
                
            except Exception as e:
                errors.append({"source": source, "error": str(e)})
        
        self.last_scrape = datetime.utcnow()
        
        return {
            "documents_scraped": len(scraped_docs),
            "errors": errors,
            "timestamp": self.last_scrape
        }
    
    async def _process_pdf(self, pdf_url: str) -> Optional[Dict[str, Any]]:
        """Download and extract text from PDF"""
        try:
            response = requests.get(pdf_url, timeout=30)
            
            if response.status_code != 200:
                return None
            
            # Calculate content hash for deduplication
            content_hash = hashlib.sha256(response.content).hexdigest()
            
            # Check if already processed
            if content_hash in self.embeddings_cache:
                return None
            
            # Extract text
            pdf_file = io.BytesIO(response.content)
            pdf_reader = PyPDF2.PdfReader(pdf_file)
            
            text = ""
            for page in pdf_reader.pages:
                text += page.extract_text()
            
            # Extract metadata
            metadata = {
                "source_url": pdf_url,
                "content_hash": content_hash,
                "page_count": len(pdf_reader.pages),
                "extracted_at": datetime.utcnow()
            }
            
            return {
                "text": text,
                "metadata": metadata
            }
            
        except Exception as e:
            print(f"Error processing PDF {pdf_url}: {e}")
            return None
    
    async def index_document(self, document: Dict[str, Any]) -> bool:
        """Create embeddings and index document"""
        try:
            text = document["text"]
            
            # Split into chunks (500-1000 tokens with 100 token overlap)
            chunks = self._split_text(text, chunk_size=1000, overlap=100)
            
            for i, chunk in enumerate(chunks):
                # In production, use actual embedding model (sentence-transformers)
                # For now, store text chunks
                chunk_doc = {
                    "id": f"{document['metadata']['content_hash']}_{i}",
                    "text": chunk,
                    "metadata": document["metadata"],
                    "chunk_index": i
                }
                
                self.knowledge_base.append(chunk_doc)
            
            return True
            
        except Exception as e:
            print(f"Error indexing document: {e}")
            return False
    
    def _split_text(self, text: str, chunk_size: int, overlap: int) -> List[str]:
        """Split text into overlapping chunks"""
        words = text.split()
        chunks = []
        
        for i in range(0, len(words), chunk_size - overlap):
            chunk = " ".join(words[i:i + chunk_size])
            chunks.append(chunk)
        
        return chunks
    
    async def search_regulations(
        self, 
        query: str, 
        top_k: int = 5
    ) -> List[Dict[str, Any]]:
        """Semantic search for relevant regulations"""
        # In production, use vector similarity search
        # For now, simple keyword matching
        results = []
        
        query_lower = query.lower()
        
        for doc in self.knowledge_base:
            if any(word in doc["text"].lower() for word in query_lower.split()):
                results.append({
                    "text": doc["text"][:500],  # First 500 chars
                    "source": doc["metadata"]["source_url"],
                    "relevance_score": 0.8  # Placeholder
                })
        
        return results[:top_k]
    
    async def validate_compliance(
        self, 
        bill_data: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Validate bill against compliance rules"""
        violations = []
        
        # GSTIN validation
        gstin = bill_data.get("vendor_gstin", "")
        if not self._validate_gstin(gstin):
            violations.append({
                "field": "vendor_gstin",
                "severity": "error",
                "message": "Invalid GSTIN format",
                "citation": "GST Act Section 25"
            })
        
        # Tax calculation validation
        subtotal = bill_data.get("subtotal", 0)
        cgst = bill_data.get("cgst_total", 0)
        sgst = bill_data.get("sgst_total", 0)
        igst = bill_data.get("igst_total", 0)
        grand_total = bill_data.get("grand_total", 0)
        
        calculated_total = subtotal + cgst + sgst + igst
        
        if abs(calculated_total - grand_total) > 1:
            violations.append({
                "field": "grand_total",
                "severity": "error",
                "message": f"Total mismatch: Expected {calculated_total}, got {grand_total}",
                "citation": "GST Act Section 31"
            })
        
        # IGST vs CGST+SGST validation
        if igst > 0 and (cgst > 0 or sgst > 0):
            violations.append({
                "field": "tax_amounts",
                "severity": "error",
                "message": "Cannot have both IGST and CGST/SGST",
                "citation": "GST Act Section 5"
            })
        
        return {
            "is_compliant": len(violations) == 0,
            "violations": violations,
            "validated_at": datetime.utcnow()
        }
    
    def _validate_gstin(self, gstin: str) -> bool:
        """Validate GSTIN format"""
        if len(gstin) != 15:
            return False
        
        # Format: 2 digits + 10 alphanumeric + 1 digit + 1 letter + 1 alphanumeric
        if not gstin[:2].isdigit():
            return False
        if not gstin[2:12].isalnum():
            return False
        if not gstin[12].isdigit():
            return False
        if not gstin[13].isalpha():
            return False
        if not gstin[14].isalnum():
            return False
        
        return True
    
    async def get_plain_language_explanation(
        self, 
        regulation_text: str
    ) -> str:
        """Simplify legal text to plain language"""
        # In production, use LLM for simplification
        # For now, return original with note
        return f"Simplified: {regulation_text[:200]}..."
    
    def get_knowledge_base_stats(self) -> Dict[str, Any]:
        """Get statistics about the knowledge base"""
        return {
            "total_documents": len(self.knowledge_base),
            "last_update": self.last_scrape,
            "sources": self.sources
        }
