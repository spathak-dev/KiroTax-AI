import PyPDF2
from pdf2image import convert_from_path
from typing import List, Dict
import os

class PDFParser:
    """Parse PDF documents"""
    
    def extract_text(self, pdf_path: str) -> str:
        """Extract text from PDF"""
        try:
            with open(pdf_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                text = ""
                
                for page in pdf_reader.pages:
                    text += page.extract_text()
                
                return text
        except Exception as e:
            raise ValueError(f"Failed to extract text from PDF: {str(e)}")
    
    def convert_to_images(self, pdf_path: str, output_dir: str = "./temp") -> List[str]:
        """Convert PDF pages to images"""
        try:
            os.makedirs(output_dir, exist_ok=True)
            
            # Convert PDF to images
            images = convert_from_path(pdf_path, dpi=300)
            
            image_paths = []
            for i, image in enumerate(images):
                image_path = os.path.join(output_dir, f"page_{i+1}.jpg")
                image.save(image_path, 'JPEG')
                image_paths.append(image_path)
            
            return image_paths
        except Exception as e:
            raise ValueError(f"Failed to convert PDF to images: {str(e)}")
    
    def get_metadata(self, pdf_path: str) -> Dict:
        """Get PDF metadata"""
        try:
            with open(pdf_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                metadata = pdf_reader.metadata
                
                return {
                    "title": metadata.get("/Title", ""),
                    "author": metadata.get("/Author", ""),
                    "subject": metadata.get("/Subject", ""),
                    "creator": metadata.get("/Creator", ""),
                    "producer": metadata.get("/Producer", ""),
                    "num_pages": len(pdf_reader.pages)
                }
        except Exception as e:
            return {"error": str(e)}
