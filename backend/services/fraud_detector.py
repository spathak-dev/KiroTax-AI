from typing import Dict, List
try:
    from database import get_collection
except:
    from database_mock import get_collection
from utils.gst_validator import validate_gstin

class FraudDetector:
    """Detect fraudulent invoices and fake GSTINs"""
    
    def __init__(self):
        self.fake_gstin_patterns = []
        self.known_fake_gstins = set()
    
    async def check_invoice(self, bill_data: Dict) -> Dict:
        """Check invoice for fraud indicators"""
        issues = []
        risk_score = 0
        
        extracted = bill_data.get("extracted_data", {})
        
        # Check GSTIN validity
        vendor_gstin = extracted.get("vendor_gstin")
        if vendor_gstin:
            if not validate_gstin(vendor_gstin):
                issues.append("Invalid GSTIN format")
                risk_score += 30
            
            if vendor_gstin in self.known_fake_gstins:
                issues.append("Known fake GSTIN")
                risk_score += 50
        else:
            issues.append("Missing GSTIN")
            risk_score += 20
        
        # Check for duplicate invoices
        is_duplicate = await self._check_duplicate(
            extracted.get("invoice_number"),
            extracted.get("vendor_gstin"),
            bill_data.get("user_id")
        )
        
        if is_duplicate:
            issues.append("Duplicate invoice detected")
            risk_score += 40
        
        # Check amount anomalies
        grand_total = extracted.get("grand_total", 0)
        if grand_total > 1000000:  # > 10L
            issues.append("High value transaction - requires review")
            risk_score += 10
        
        # Check GST calculation
        calculated_tax = (
            extracted.get("cgst_total", 0) +
            extracted.get("sgst_total", 0) +
            extracted.get("igst_total", 0)
        )
        
        reported_tax = extracted.get("total_tax", 0)
        
        if abs(calculated_tax - reported_tax) > 1:
            issues.append("GST calculation mismatch")
            risk_score += 25
        
        # Determine risk level
        if risk_score >= 50:
            risk_level = "HIGH"
        elif risk_score >= 25:
            risk_level = "MEDIUM"
        else:
            risk_level = "LOW"
        
        return {
            "risk_level": risk_level,
            "risk_score": risk_score,
            "issues": issues,
            "is_fraudulent": risk_score >= 50
        }
    
    async def _check_duplicate(self, invoice_number: str, gstin: str, user_id: str) -> bool:
        """Check if invoice already exists"""
        if not invoice_number or not gstin:
            return False
        
        bills_collection = get_collection("bills")
        
        existing = await bills_collection.find_one({
            "user_id": user_id,
            "extracted_data.invoice_number": invoice_number,
            "extracted_data.vendor_gstin": gstin
        })
        
        return existing is not None
    
    async def report_fake_gstin(self, gstin: str):
        """Report a fake GSTIN"""
        self.known_fake_gstins.add(gstin)
        
        # Store in database
        fraud_collection = get_collection("fraud_reports")
        await fraud_collection.insert_one({
            "gstin": gstin,
            "reported_at": "datetime.utcnow()"
        })
