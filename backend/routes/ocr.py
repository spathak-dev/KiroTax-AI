from fastapi import APIRouter, UploadFile, File, Depends
from security.rbac import get_current_user
try:
    from services.ocr_service import OCRService
except:
    from services.ocr_service_mock import OCRService
from utils.storage import save_file

router = APIRouter()
ocr_service = OCRService()

@router.post("/scan")
async def scan_document(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user)
):
    """Scan document with OCR"""
    # Save file temporarily
    file_path = await save_file(file)
    
    # Process with OCR
    extracted_data = await ocr_service.process_bill(file_path)
    
    return {
        "extracted_data": extracted_data,
        "message": "Document scanned successfully"
    }
