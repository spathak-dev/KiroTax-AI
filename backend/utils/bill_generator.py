"""
Utility to generate sample bills for testing
"""

import json
import random
from datetime import datetime, timedelta
from typing import List, Dict, Any

class BillGenerator:
    """Generate realistic sample bills for testing"""
    
    def __init__(self):
        self.vendors = [
            {"name": "Tech Solutions Pvt Ltd", "gstin": "29ABCDE1234F1Z5"},
            {"name": "Office Supplies Co", "gstin": "07PQRST9012K3L4"},
            {"name": "Cloud Services India", "gstin": "19UVWXY4567M8N9"},
            {"name": "Consulting Services Pvt Ltd", "gstin": "24ABCDE5678F9G0"},
            {"name": "Hardware Suppliers", "gstin": "33OPQRS2345T6U7"},
            {"name": "Software Licensing Corp", "gstin": "29DEFGH7890I1J2"},
            {"name": "Marketing Agency", "gstin": "27KLMNO3456P7Q8"},
            {"name": "Legal Services LLP", "gstin": "06RSTUV9012W3X4"},
            {"name": "Accounting Firm", "gstin": "24YZABC5678D9E0"},
            {"name": "Training Institute", "gstin": "29FGHIJ1234K5L6"}
        ]
        
        self.customers = [
            {"name": "ABC Enterprises", "gstin": "27XYZAB5678G2H3"},
            {"name": "XYZ Corporation", "gstin": "29LMNOP3456Q7R8"},
            {"name": "Digital Marketing Ltd", "gstin": "29STUVW7890P1Q2"},
            {"name": "Manufacturing Co", "gstin": "06HIJKL1234M5N6"},
            {"name": "Tech Startup Inc", "gstin": "29VWXYZ6789A1B2"}
        ]
        
        self.services = [
            {"desc": "Software Development Services", "hsn": "998314", "rate_range": (1000, 5000)},
            {"desc": "Cloud Hosting Services", "hsn": "998314", "rate_range": (5000, 20000)},
            {"desc": "Business Consulting", "hsn": "998313", "rate_range": (3000, 10000)},
            {"desc": "Digital Marketing", "hsn": "998313", "rate_range": (2000, 8000)},
            {"desc": "Legal Advisory", "hsn": "998212", "rate_range": (5000, 15000)},
            {"desc": "Accounting Services", "hsn": "998211", "rate_range": (2000, 7000)},
            {"desc": "Training Programs", "hsn": "999293", "rate_range": (1000, 5000)}
        ]
        
        self.products = [
            {"desc": "Laptop Computers", "hsn": "847130", "rate_range": (40000, 80000)},
            {"desc": "External Monitors", "hsn": "852852", "rate_range": (10000, 30000)},
            {"desc": "Office Furniture", "hsn": "940330", "rate_range": (5000, 20000)},
            {"desc": "Networking Equipment", "hsn": "851762", "rate_range": (5000, 15000)},
            {"desc": "Printers", "hsn": "844332", "rate_range": (10000, 40000)}
        ]
    
    def generate_bill(
        self,
        invoice_number: str,
        invoice_date: datetime,
        is_service: bool = True,
        is_interstate: bool = False
    ) -> Dict[str, Any]:
        """Generate a single bill"""
        
        vendor = random.choice(self.vendors)
        customer = random.choice(self.customers)
        
        # Generate line items
        num_items = random.randint(1, 5)
        line_items = []
        subtotal = 0
        
        items_pool = self.services if is_service else self.products
        
        for _ in range(num_items):
            item = random.choice(items_pool)
            quantity = random.randint(1, 20)
            rate = random.uniform(*item["rate_range"])
            amount = quantity * rate
            
            line_items.append({
                "description": item["desc"],
                "hsn_code": item["hsn"],
                "quantity": quantity,
                "rate": round(rate, 2),
                "amount": round(amount, 2)
            })
            
            subtotal += amount
        
        subtotal = round(subtotal, 2)
        
        # Calculate taxes
        if is_interstate:
            cgst_total = 0
            sgst_total = 0
            igst_rate = 18.0
            igst_total = round(subtotal * igst_rate / 100, 2)
        else:
            cgst_rate = 9.0
            sgst_rate = 9.0
            cgst_total = round(subtotal * cgst_rate / 100, 2)
            sgst_total = round(subtotal * sgst_rate / 100, 2)
            igst_total = 0
        
        total_tax = cgst_total + sgst_total + igst_total
        grand_total = subtotal + total_tax
        
        return {
            "invoice_number": invoice_number,
            "invoice_date": invoice_date.strftime("%Y-%m-%d"),
            "vendor_name": vendor["name"],
            "vendor_gstin": vendor["gstin"],
            "customer_name": customer["name"],
            "customer_gstin": customer["gstin"],
            "subtotal": subtotal,
            "cgst_rate": cgst_rate if not is_interstate else 0,
            "cgst_total": cgst_total,
            "sgst_rate": sgst_rate if not is_interstate else 0,
            "sgst_total": sgst_total,
            "igst_rate": igst_rate if is_interstate else 0,
            "igst_total": igst_total,
            "total_tax": round(total_tax, 2),
            "grand_total": round(grand_total, 2),
            "line_items": line_items,
            "place_of_supply": "Karnataka" if not is_interstate else "Maharashtra",
            "is_interstate": is_interstate
        }
    
    def generate_bills(
        self,
        count: int = 50,
        start_date: datetime = None,
        end_date: datetime = None
    ) -> List[Dict[str, Any]]:
        """Generate multiple bills"""
        
        if not start_date:
            start_date = datetime.now() - timedelta(days=90)
        
        if not end_date:
            end_date = datetime.now()
        
        bills = []
        
        for i in range(count):
            # Random date between start and end
            days_diff = (end_date - start_date).days
            random_days = random.randint(0, days_diff)
            invoice_date = start_date + timedelta(days=random_days)
            
            # Generate invoice number
            invoice_number = f"INV-{invoice_date.year}-{i+1:03d}"
            
            # Random service vs product
            is_service = random.choice([True, False])
            
            # Random interstate (20% chance)
            is_interstate = random.random() < 0.2
            
            bill = self.generate_bill(
                invoice_number=invoice_number,
                invoice_date=invoice_date,
                is_service=is_service,
                is_interstate=is_interstate
            )
            
            bills.append(bill)
        
        return bills
    
    def save_to_file(self, bills: List[Dict[str, Any]], filename: str):
        """Save bills to JSON file"""
        with open(filename, 'w') as f:
            json.dump(bills, f, indent=2)
        
        print(f"Generated {len(bills)} bills and saved to {filename}")

# Usage example
if __name__ == "__main__":
    generator = BillGenerator()
    bills = generator.generate_bills(count=50)
    generator.save_to_file(bills, "backend/data/generated_bills.json")
