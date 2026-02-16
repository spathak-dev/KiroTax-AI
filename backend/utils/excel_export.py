import pandas as pd
from typing import List, Dict
from datetime import datetime
import os

class ExcelExporter:
    """Export data to Excel format"""
    
    def __init__(self, output_dir: str = "./storage/exports"):
        self.output_dir = output_dir
        os.makedirs(output_dir, exist_ok=True)
    
    def export_gstr1(self, data: Dict, filename: str = None) -> str:
        """Export GSTR-1 data to Excel"""
        if not filename:
            filename = f"GSTR1_{datetime.now().strftime('%Y%m%d_%H%M%S')}.xlsx"
        
        filepath = os.path.join(self.output_dir, filename)
        
        # Create DataFrame from entries
        df = pd.DataFrame(data.get("entries", []))
        
        # Create Excel writer
        with pd.ExcelWriter(filepath, engine='openpyxl') as writer:
            # Write main data
            df.to_excel(writer, sheet_name='GSTR-1', index=False)
            
            # Write summary
            summary_df = pd.DataFrame([data.get("summary", {})])
            summary_df.to_excel(writer, sheet_name='Summary', index=False)
        
        return filepath
    
    def export_gstr3b(self, data: Dict, filename: str = None) -> str:
        """Export GSTR-3B data to Excel"""
        if not filename:
            filename = f"GSTR3B_{datetime.now().strftime('%Y%m%d_%H%M%S')}.xlsx"
        
        filepath = os.path.join(self.output_dir, filename)
        
        # Create DataFrame
        df = pd.DataFrame([data.get("data", {})])
        
        # Export to Excel
        df.to_excel(filepath, sheet_name='GSTR-3B', index=False)
        
        return filepath
    
    def export_bills(self, bills: List[Dict], filename: str = None) -> str:
        """Export bills to Excel"""
        if not filename:
            filename = f"Bills_{datetime.now().strftime('%Y%m%d_%H%M%S')}.xlsx"
        
        filepath = os.path.join(self.output_dir, filename)
        
        # Flatten bill data
        flattened_bills = []
        for bill in bills:
            extracted = bill.get("extracted_data", {})
            flattened_bills.append({
                "Invoice Number": extracted.get("invoice_number", ""),
                "Invoice Date": extracted.get("invoice_date", ""),
                "Vendor Name": extracted.get("vendor_name", ""),
                "Vendor GSTIN": extracted.get("vendor_gstin", ""),
                "Subtotal": extracted.get("subtotal", 0),
                "CGST": extracted.get("cgst_total", 0),
                "SGST": extracted.get("sgst_total", 0),
                "IGST": extracted.get("igst_total", 0),
                "Total Tax": extracted.get("total_tax", 0),
                "Grand Total": extracted.get("grand_total", 0),
                "Status": bill.get("status", ""),
                "Created At": bill.get("created_at", "")
            })
        
        df = pd.DataFrame(flattened_bills)
        df.to_excel(filepath, index=False)
        
        return filepath
    
    def export_sales_register(self, bills: List[Dict], month: int, year: int) -> str:
        """Export sales register"""
        filename = f"Sales_Register_{month:02d}_{year}.xlsx"
        filepath = os.path.join(self.output_dir, filename)
        
        # Process bills for sales register
        sales_data = []
        for bill in bills:
            extracted = bill.get("extracted_data", {})
            sales_data.append({
                "Date": extracted.get("invoice_date", ""),
                "Invoice No": extracted.get("invoice_number", ""),
                "Customer Name": extracted.get("buyer_name", ""),
                "GSTIN": extracted.get("buyer_gstin", ""),
                "Taxable Value": extracted.get("subtotal", 0),
                "CGST": extracted.get("cgst_total", 0),
                "SGST": extracted.get("sgst_total", 0),
                "IGST": extracted.get("igst_total", 0),
                "Total": extracted.get("grand_total", 0)
            })
        
        df = pd.DataFrame(sales_data)
        df.to_excel(filepath, index=False)
        
        return filepath
