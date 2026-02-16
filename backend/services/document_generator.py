from typing import Dict, Any, List, Optional
from datetime import datetime, timedelta
import uuid
import os
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.units import inch
import io

from models.document import (
    DocumentGenerationRequest, DocumentResponse,
    DocumentFormat, DocumentType, ThemeName
)

class DocumentGeneratorService:
    """Service for generating professional documents"""
    
    def __init__(self):
        self.output_dir = os.getenv("DOCUMENT_OUTPUT_DIR", "/tmp/documents")
        os.makedirs(self.output_dir, exist_ok=True)
        
        self.themes = {
            ThemeName.PROFESSIONAL: {
                "primary_color": colors.HexColor("#1a237e"),
                "secondary_color": colors.HexColor("#283593"),
                "accent_color": colors.HexColor("#3f51b5"),
                "font_family": "Helvetica"
            },
            ThemeName.MODERN: {
                "primary_color": colors.HexColor("#00bcd4"),
                "secondary_color": colors.HexColor("#0097a7"),
                "accent_color": colors.HexColor("#00acc1"),
                "font_family": "Helvetica"
            },
            ThemeName.CLASSIC: {
                "primary_color": colors.HexColor("#5d4037"),
                "secondary_color": colors.HexColor("#6d4c41"),
                "accent_color": colors.HexColor("#795548"),
                "font_family": "Times-Roman"
            }
        }
    
    async def generate_invoice_pdf(
        self,
        bill_data: Dict[str, Any],
        theme: ThemeName = ThemeName.PROFESSIONAL,
        watermark: Optional[str] = None
    ) -> DocumentResponse:
        """Generate PDF invoice from bill data"""
        
        start_time = datetime.utcnow()
        
        # Create PDF
        doc_id = str(uuid.uuid4())
        filename = f"invoice_{bill_data.get('invoice_number', doc_id)}.pdf"
        filepath = os.path.join(self.output_dir, filename)
        
        doc = SimpleDocTemplate(filepath, pagesize=A4)
        story = []
        styles = getSampleStyleSheet()
        
        theme_config = self.themes.get(theme, self.themes[ThemeName.PROFESSIONAL])
        
        # Title
        title = Paragraph(
            f"<b>INVOICE</b>",
            styles['Title']
        )
        story.append(title)
        story.append(Spacer(1, 0.3*inch))
        
        # Invoice details
        invoice_info = [
            ["Invoice Number:", bill_data.get("invoice_number", "N/A")],
            ["Invoice Date:", bill_data.get("invoice_date", "N/A")],
            ["GSTIN:", bill_data.get("vendor_gstin", "N/A")]
        ]
        
        info_table = Table(invoice_info, colWidths=[2*inch, 3*inch])
        info_table.setStyle(TableStyle([
            ('FONTNAME', (0, 0), (-1, -1), 'Helvetica'),
            ('FONTSIZE', (0, 0), (-1, -1), 10),
            ('TEXTCOLOR', (0, 0), (0, -1), theme_config["primary_color"]),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ]))
        story.append(info_table)
        story.append(Spacer(1, 0.5*inch))
        
        # Line items
        if "line_items" in bill_data and bill_data["line_items"]:
            line_items_data = [["Description", "Quantity", "Rate", "Amount"]]
            
            for item in bill_data["line_items"]:
                line_items_data.append([
                    item.get("description", ""),
                    str(item.get("quantity", 0)),
                    f"₹{item.get('rate', 0):.2f}",
                    f"₹{item.get('amount', 0):.2f}"
                ])
            
            items_table = Table(line_items_data, colWidths=[3*inch, 1*inch, 1.5*inch, 1.5*inch])
            items_table.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (-1, 0), theme_config["primary_color"]),
                ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
                ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                ('FONTSIZE', (0, 0), (-1, 0), 12),
                ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
                ('GRID', (0, 0), (-1, -1), 1, colors.black)
            ]))
            story.append(items_table)
            story.append(Spacer(1, 0.5*inch))
        
        # Totals
        totals_data = [
            ["Subtotal:", f"₹{bill_data.get('subtotal', 0):.2f}"],
            ["CGST:", f"₹{bill_data.get('cgst_total', 0):.2f}"],
            ["SGST:", f"₹{bill_data.get('sgst_total', 0):.2f}"],
            ["IGST:", f"₹{bill_data.get('igst_total', 0):.2f}"],
            ["Grand Total:", f"₹{bill_data.get('grand_total', 0):.2f}"]
        ]
        
        totals_table = Table(totals_data, colWidths=[4*inch, 2*inch])
        totals_table.setStyle(TableStyle([
            ('ALIGN', (0, 0), (-1, -1), 'RIGHT'),
            ('FONTNAME', (0, -1), (-1, -1), 'Helvetica-Bold'),
            ('FONTSIZE', (0, -1), (-1, -1), 12),
            ('LINEABOVE', (0, -1), (-1, -1), 2, theme_config["primary_color"]),
        ]))
        story.append(totals_table)
        
        # Add watermark if specified
        if watermark:
            watermark_text = Paragraph(
                f"<font color='lightgrey' size='48'><b>{watermark}</b></font>",
                styles['Normal']
            )
            story.append(Spacer(1, 2*inch))
            story.append(watermark_text)
        
        # Build PDF
        doc.build(story)
        
        # Calculate generation time
        end_time = datetime.utcnow()
        generation_time_ms = int((end_time - start_time).total_seconds() * 1000)
        
        # Get file size
        file_size = os.path.getsize(filepath)
        
        # Create download URL (expires in 24 hours)
        download_url = f"/api/documents/download/{doc_id}"
        expires_at = datetime.utcnow() + timedelta(hours=24)
        
        return DocumentResponse(
            id=doc_id,
            document_type=DocumentType.INVOICE,
            format=DocumentFormat.PDF,
            download_url=download_url,
            file_size=file_size,
            generated_at=start_time,
            expires_at=expires_at,
            generation_time_ms=generation_time_ms
        )
    
    async def generate_gst_report_excel(
        self,
        bills: List[Dict[str, Any]],
        month: int,
        year: int
    ) -> DocumentResponse:
        """Generate GST report in Excel format"""
        
        # This would use openpyxl or xlsxwriter in production
        # For now, return placeholder
        
        doc_id = str(uuid.uuid4())
        filename = f"gst_report_{year}_{month:02d}.xlsx"
        
        return DocumentResponse(
            id=doc_id,
            document_type=DocumentType.GST_REPORT,
            format=DocumentFormat.XLSX,
            download_url=f"/api/documents/download/{doc_id}",
            file_size=0,
            generated_at=datetime.utcnow(),
            expires_at=datetime.utcnow() + timedelta(hours=24),
            generation_time_ms=0
        )
    
    async def batch_generate(
        self,
        requests: List[DocumentGenerationRequest]
    ) -> List[DocumentResponse]:
        """Generate multiple documents in batch"""
        
        results = []
        
        for request in requests:
            # Generate based on document type
            if request.document_type == DocumentType.INVOICE and request.format == DocumentFormat.PDF:
                # Get bill data
                # In production, fetch from database
                bill_data = {}
                
                result = await self.generate_invoice_pdf(
                    bill_data=bill_data,
                    theme=request.theme,
                    watermark=request.watermark_text if request.include_watermark else None
                )
                results.append(result)
        
        return results
