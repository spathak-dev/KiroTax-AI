from fastapi import UploadFile
from typing import Dict
import PyPDF2
import re

class TenderAI:
    """AI service for analyzing government tenders"""
    
    async def analyze_tender(self, file: UploadFile) -> Dict:
        """Analyze tender document"""
        # Extract text from PDF
        text = await self._extract_text_from_pdf(file)
        
        # Extract key information
        analysis = {
            "tender_number": self._extract_tender_number(text),
            "department": self._extract_department(text),
            "deadline": self._extract_deadline(text),
            "estimated_value": self._extract_value(text),
            "eligibility_criteria": self._extract_eligibility(text),
            "technical_requirements": self._extract_technical_requirements(text),
            "documents_required": self._extract_documents_required(text),
            "key_dates": self._extract_key_dates(text)
        }
        
        return analysis
    
    async def _extract_text_from_pdf(self, file: UploadFile) -> str:
        """Extract text from PDF file"""
        content = await file.read()
        
        try:
            pdf_reader = PyPDF2.PdfReader(content)
            text = ""
            for page in pdf_reader.pages:
                text += page.extract_text()
            return text
        except Exception as e:
            return ""
    
    def _extract_tender_number(self, text: str) -> str:
        """Extract tender number"""
        patterns = [
            r'Tender\s*(?:No|Number|ID)?\s*:?\s*([A-Z0-9\-/]+)',
            r'NIT\s*(?:No|Number)?\s*:?\s*([A-Z0-9\-/]+)'
        ]
        
        for pattern in patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                return match.group(1)
        return "Not found"
    
    def _extract_department(self, text: str) -> str:
        """Extract department name"""
        patterns = [
            r'Department\s*:?\s*([A-Za-z\s]+)',
            r'Ministry\s*of\s*([A-Za-z\s]+)'
        ]
        
        for pattern in patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                return match.group(1).strip()
        return "Not found"
    
    def _extract_deadline(self, text: str) -> str:
        """Extract submission deadline"""
        patterns = [
            r'Last\s*Date\s*:?\s*(\d{1,2}[/-]\d{1,2}[/-]\d{2,4})',
            r'Deadline\s*:?\s*(\d{1,2}[/-]\d{1,2}[/-]\d{2,4})'
        ]
        
        for pattern in patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                return match.group(1)
        return "Not found"
    
    def _extract_value(self, text: str) -> str:
        """Extract estimated value"""
        patterns = [
            r'Estimated\s*(?:Value|Cost)\s*:?\s*₹?\s*([\d,]+(?:\.\d+)?)\s*(?:Lakhs?|Crores?)?',
            r'EMD\s*:?\s*₹?\s*([\d,]+(?:\.\d+)?)'
        ]
        
        for pattern in patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                return f"₹{match.group(1)}"
        return "Not specified"
    
    def _extract_eligibility(self, text: str) -> list:
        """Extract eligibility criteria"""
        criteria = []
        
        if "turnover" in text.lower():
            criteria.append("Minimum turnover requirement")
        if "experience" in text.lower():
            criteria.append("Prior experience required")
        if "registration" in text.lower():
            criteria.append("Registration/License required")
        
        return criteria if criteria else ["Not specified"]
    
    def _extract_technical_requirements(self, text: str) -> list:
        """Extract technical requirements"""
        requirements = []
        
        keywords = ["ISO", "certification", "quality", "standard", "specification"]
        for keyword in keywords:
            if keyword.lower() in text.lower():
                requirements.append(f"{keyword.upper()} compliance")
        
        return requirements if requirements else ["Not specified"]
    
    def _extract_documents_required(self, text: str) -> list:
        """Extract required documents"""
        documents = []
        
        doc_keywords = [
            "PAN card", "GST registration", "EMD", "tender fee",
            "experience certificate", "financial statement", "balance sheet"
        ]
        
        for doc in doc_keywords:
            if doc.lower() in text.lower():
                documents.append(doc)
        
        return documents if documents else ["Not specified"]
    
    def _extract_key_dates(self, text: str) -> Dict:
        """Extract key dates"""
        return {
            "pre_bid_meeting": "To be extracted",
            "submission_deadline": "To be extracted",
            "technical_bid_opening": "To be extracted",
            "financial_bid_opening": "To be extracted"
        }
