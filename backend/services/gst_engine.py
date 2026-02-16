from typing import Dict, List
from datetime import datetime
import pandas as pd

class GSTEngine:
    """GST computation and report generation engine"""
    
    def __init__(self):
        self.cgst_rates = [0, 0.125, 1, 1.5, 2.5, 6, 9, 14]
        self.sgst_rates = [0, 0.125, 1, 1.5, 2.5, 6, 9, 14]
        self.igst_rates = [0, 0.25, 3, 5, 12, 18, 28]
    
    def compute_gst(self, taxable_value: float, gst_rate: float, is_interstate: bool = False) -> Dict:
        """Compute GST breakdown"""
        if is_interstate:
            igst = (taxable_value * gst_rate) / 100
            return {
                "taxable_value": taxable_value,
                "cgst_rate": 0,
                "cgst_amount": 0,
                "sgst_rate": 0,
                "sgst_amount": 0,
                "igst_rate": gst_rate,
                "igst_amount": round(igst, 2),
                "total_tax": round(igst, 2),
                "total_amount": round(taxable_value + igst, 2)
            }
        else:
            cgst_rate = gst_rate / 2
            sgst_rate = gst_rate / 2
            cgst = (taxable_value * cgst_rate) / 100
            sgst = (taxable_value * sgst_rate) / 100
            
            return {
                "taxable_value": taxable_value,
                "cgst_rate": cgst_rate,
                "cgst_amount": round(cgst, 2),
                "sgst_rate": sgst_rate,
                "sgst_amount": round(sgst, 2),
                "igst_rate": 0,
                "igst_amount": 0,
                "total_tax": round(cgst + sgst, 2),
                "total_amount": round(taxable_value + cgst + sgst, 2)
            }
    
    def generate_gstr1(self, bills: List[Dict], month: int, year: int) -> Dict:
        """Generate GSTR-1 report"""
        entries = []
        total_taxable = 0
        total_cgst = 0
        total_sgst = 0
        total_igst = 0
        
        for bill in bills:
            extracted = bill.get("extracted_data", {})
            if not extracted:
                continue
            
            entry = {
                "gstin": extracted.get("vendor_gstin", ""),
                "invoice_number": extracted.get("invoice_number", ""),
                "invoice_date": extracted.get("invoice_date", ""),
                "invoice_value": extracted.get("grand_total", 0),
                "place_of_supply": "Karnataka",  # Should be dynamic
                "reverse_charge": "N",
                "invoice_type": "Regular",
                "taxable_value": extracted.get("subtotal", 0),
                "cgst_amount": extracted.get("cgst_total", 0),
                "sgst_amount": extracted.get("sgst_total", 0),
                "igst_amount": extracted.get("igst_total", 0)
            }
            
            entries.append(entry)
            total_taxable += entry["taxable_value"]
            total_cgst += entry["cgst_amount"]
            total_sgst += entry["sgst_amount"]
            total_igst += entry["igst_amount"]
        
        return {
            "report_type": "GSTR-1",
            "period": f"{month:02d}/{year}",
            "entries": entries,
            "summary": {
                "total_invoices": len(entries),
                "total_taxable_value": round(total_taxable, 2),
                "total_cgst": round(total_cgst, 2),
                "total_sgst": round(total_sgst, 2),
                "total_igst": round(total_igst, 2),
                "total_tax": round(total_cgst + total_sgst + total_igst, 2)
            }
        }
    
    def generate_gstr3b(self, bills: List[Dict], month: int, year: int) -> Dict:
        """Generate GSTR-3B report"""
        outward_taxable = 0
        total_cgst = 0
        total_sgst = 0
        total_igst = 0
        
        for bill in bills:
            extracted = bill.get("extracted_data", {})
            if not extracted:
                continue
            
            outward_taxable += extracted.get("subtotal", 0)
            total_cgst += extracted.get("cgst_total", 0)
            total_sgst += extracted.get("sgst_total", 0)
            total_igst += extracted.get("igst_total", 0)
        
        return {
            "report_type": "GSTR-3B",
            "period": f"{month:02d}/{year}",
            "data": {
                "outward_taxable_supplies": round(outward_taxable, 2),
                "outward_taxable_zero_rated": 0,
                "other_outward_supplies": 0,
                "inward_supplies_liable_reverse_charge": 0,
                "non_gst_outward_supplies": 0,
                "total_cgst": round(total_cgst, 2),
                "total_sgst": round(total_sgst, 2),
                "total_igst": round(total_igst, 2),
                "total_cess": 0,
                "itc_claimed": 0
            }
        }
    
    def export_to_excel(self, report_data: Dict, filename: str) -> str:
        """Export report to Excel"""
        if report_data["report_type"] == "GSTR-1":
            df = pd.DataFrame(report_data["entries"])
        else:
            df = pd.DataFrame([report_data["data"]])
        
        output_path = f"./storage/reports/{filename}"
        df.to_excel(output_path, index=False)
        
        return output_path
