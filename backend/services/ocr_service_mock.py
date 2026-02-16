"""Mock OCR service for demo without heavy dependencies"""
from typing import Dict
import random

class OCRService:
    def __init__(self):
        """Initialize Mock OCR"""
        pass
        
    async def process_bill(self, file_path: str) -> Dict:
        """Mock process bill and return sample data"""
        # Return mock extracted data
        return {
            "invoice_number": f"INV-{random.randint(1000, 9999)}",
            "invoice_date": "2024-01-15",
            "vendor_name": "Sample Vendor Pvt Ltd",
            "vendor_gstin": "29ABCDE1234F1Z5",
            "vendor_address": "123 Business Street, Bangalore",
            "buyer_name": "Your Company",
            "buyer_gstin": "29XYZAB5678G1Z9",
            "subtotal": 10000.00,
            "cgst_total": 900.00,
            "sgst_total": 900.00,
            "igst_total": 0.00,
            "total_tax": 1800.00,
            "grand_total": 11800.00,
            "confidence_score": 0.95,
            "items": [
                {
                    "description": "Product/Service 1",
                    "quantity": 1,
                    "unit_price": 10000.00,
                    "taxable_value": 10000.00,
                    "cgst_rate": 9.0,
                    "cgst_amount": 900.00,
                    "sgst_rate": 9.0,
                    "sgst_amount": 900.00,
                    "igst_rate": 0.0,
                    "igst_amount": 0.00,
                    "total_amount": 11800.00
                }
            ]
        }
