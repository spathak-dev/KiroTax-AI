import cv2
import numpy as np
from paddleocr import PaddleOCR
from typing import Dict, List, Optional
import re
from config import settings

class OCRService:
    def __init__(self):
        """Initialize PaddleOCR"""
        self.ocr = PaddleOCR(use_angle_cls=True, lang='en', use_gpu=False)
        
    async def process_bill(self, file_path: str) -> Dict:
        """Process bill and extract data"""
        # Read image
        image = cv2.imread(file_path)
        if image is None:
            raise ValueError("Failed to read image")
        
        # Perform OCR
        result = self.ocr.ocr(file_path, cls=True)
        
        # Extract text and coordinates
        text_data = []
        for line in result[0]:
            bbox, (text, confidence) = line
            if confidence > settings.OCR_CONFIDENCE_THRESHOLD:
                text_data.append({
                    "text": text,
                    "confidence": confidence,
                    "bbox": bbox
                })
        
        # Extract structured data
        extracted_data = self._extract_structured_data(text_data)
        
        return extracted_data
    
    def _extract_structured_data(self, text_data: List[Dict]) -> Dict:
        """Extract structured data from OCR results"""
        all_text = " ".join([item["text"] for item in text_data])
        
        # Extract invoice number
        invoice_number = self._extract_invoice_number(all_text)
        
        # Extract dates
        invoice_date = self._extract_date(all_text)
        
        # Extract GSTIN
        vendor_gstin = self._extract_gstin(all_text)
        
        # Extract amounts
        amounts = self._extract_amounts(all_text)
        
        # Calculate confidence score
        avg_confidence = np.mean([item["confidence"] for item in text_data])
        
        return {
            "invoice_number": invoice_number,
            "invoice_date": invoice_date,
            "vendor_gstin": vendor_gstin,
            "vendor_name": self._extract_vendor_name(text_data),
            "subtotal": amounts.get("subtotal", 0),
            "cgst_total": amounts.get("cgst", 0),
            "sgst_total": amounts.get("sgst", 0),
            "igst_total": amounts.get("igst", 0),
            "total_tax": amounts.get("total_tax", 0),
            "grand_total": amounts.get("grand_total", 0),
            "confidence_score": float(avg_confidence),
            "items": []
        }
    
    def _extract_invoice_number(self, text: str) -> Optional[str]:
        """Extract invoice number"""
        patterns = [
            r'Invoice\s*(?:No|Number|#)?\s*:?\s*([A-Z0-9\-/]+)',
            r'Bill\s*(?:No|Number|#)?\s*:?\s*([A-Z0-9\-/]+)',
            r'INV[:\-\s]*([A-Z0-9\-/]+)'
        ]
        
        for pattern in patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                return match.group(1)
        return None
    
    def _extract_date(self, text: str) -> Optional[str]:
        """Extract date"""
        patterns = [
            r'(\d{1,2}[/-]\d{1,2}[/-]\d{2,4})',
            r'(\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{2,4})'
        ]
        
        for pattern in patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                return match.group(1)
        return None
    
    def _extract_gstin(self, text: str) -> Optional[str]:
        """Extract GSTIN (15 character alphanumeric)"""
        pattern = r'\b\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}\b'
        match = re.search(pattern, text)
        if match:
            return match.group(0)
        return None
    
    def _extract_vendor_name(self, text_data: List[Dict]) -> Optional[str]:
        """Extract vendor name (usually at top of invoice)"""
        if text_data:
            # Return first significant text (more than 3 chars)
            for item in text_data[:5]:
                text = item["text"].strip()
                if len(text) > 3 and not any(char.isdigit() for char in text):
                    return text
        return None
    
    def _extract_amounts(self, text: str) -> Dict[str, float]:
        """Extract monetary amounts"""
        amounts = {
            "subtotal": 0,
            "cgst": 0,
            "sgst": 0,
            "igst": 0,
            "total_tax": 0,
            "grand_total": 0
        }
        
        # Extract CGST
        cgst_match = re.search(r'CGST\s*:?\s*₹?\s*([\d,]+\.?\d*)', text, re.IGNORECASE)
        if cgst_match:
            amounts["cgst"] = float(cgst_match.group(1).replace(',', ''))
        
        # Extract SGST
        sgst_match = re.search(r'SGST\s*:?\s*₹?\s*([\d,]+\.?\d*)', text, re.IGNORECASE)
        if sgst_match:
            amounts["sgst"] = float(sgst_match.group(1).replace(',', ''))
        
        # Extract IGST
        igst_match = re.search(r'IGST\s*:?\s*₹?\s*([\d,]+\.?\d*)', text, re.IGNORECASE)
        if igst_match:
            amounts["igst"] = float(igst_match.group(1).replace(',', ''))
        
        # Extract total
        total_match = re.search(r'(?:Total|Grand\s*Total)\s*:?\s*₹?\s*([\d,]+\.?\d*)', text, re.IGNORECASE)
        if total_match:
            amounts["grand_total"] = float(total_match.group(1).replace(',', ''))
        
        amounts["total_tax"] = amounts["cgst"] + amounts["sgst"] + amounts["igst"]
        
        return amounts
