from typing import Dict, List
import re

class DocumentClassifier:
    """Classify document types"""
    
    def __init__(self):
        self.document_types = {
            "invoice": ["invoice", "bill", "tax invoice"],
            "receipt": ["receipt", "payment receipt"],
            "credit_note": ["credit note", "cn"],
            "debit_note": ["debit note", "dn"],
            "purchase_order": ["purchase order", "po"],
            "delivery_challan": ["delivery challan", "dc"]
        }
    
    def classify(self, text: str) -> Dict:
        """Classify document type"""
        text_lower = text.lower()
        
        # Check for document type keywords
        detected_type = "unknown"
        confidence = 0.0
        
        for doc_type, keywords in self.document_types.items():
            for keyword in keywords:
                if keyword in text_lower:
                    detected_type = doc_type
                    confidence = 0.9
                    break
            if detected_type != "unknown":
                break
        
        # Detect if it's a GST invoice
        is_gst_invoice = self._is_gst_invoice(text)
        
        # Detect invoice category
        category = self._detect_category(text)
        
        return {
            "document_type": detected_type,
            "confidence": confidence,
            "is_gst_invoice": is_gst_invoice,
            "category": category
        }
    
    def _is_gst_invoice(self, text: str) -> bool:
        """Check if document is a GST invoice"""
        gst_indicators = [
            r'\bGSTIN\b',
            r'\bCGST\b',
            r'\bSGST\b',
            r'\bIGST\b',
            r'\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}'  # GSTIN pattern
        ]
        
        for pattern in gst_indicators:
            if re.search(pattern, text, re.IGNORECASE):
                return True
        
        return False
    
    def _detect_category(self, text: str) -> str:
        """Detect invoice category"""
        text_lower = text.lower()
        
        if any(word in text_lower for word in ["export", "shipping", "freight"]):
            return "export"
        elif any(word in text_lower for word in ["import", "customs"]):
            return "import"
        elif any(word in text_lower for word in ["service", "consulting", "professional"]):
            return "service"
        else:
            return "goods"
