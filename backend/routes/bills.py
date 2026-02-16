from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from typing import List
from datetime import datetime
from models.bill import BillCreate, BillResponse, BillStatus
from security.rbac import get_current_user
try:
    from database import get_collection
except:
    from database_mock import get_collection
try:
    from services.ocr_service import OCRService
except:
    from services.ocr_service_mock import OCRService
from utils.storage import save_file
import uuid

router = APIRouter()
ocr_service = OCRService()

@router.post("/upload", response_model=dict)
async def upload_bill(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user)
):
    """Upload and process a bill"""
    # Validate file type
    allowed_types = ["image/jpeg", "image/png", "image/jpg", "application/pdf"]
    if file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail="Invalid file type. Only JPG, PNG, PDF allowed")
    
    # Save file
    file_url = await save_file(file)
    
    # Create bill document
    bill_dict = {
        "_id": str(uuid.uuid4()),
        "user_id": current_user["_id"],
        "file_name": file.filename,
        "file_url": file_url,
        "file_type": file.content_type,
        "status": BillStatus.UPLOADED.value,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    
    bills_collection = get_collection("bills")
    await bills_collection.insert_one(bill_dict)
    
    # Trigger OCR processing (async in production)
    try:
        bill_dict["status"] = BillStatus.PROCESSING.value
        await bills_collection.update_one(
            {"_id": bill_dict["_id"]},
            {"$set": {"status": BillStatus.PROCESSING.value}}
        )
        
        # Process with OCR
        extracted_data = await ocr_service.process_bill(file_url)
        
        bill_dict["extracted_data"] = extracted_data
        bill_dict["status"] = BillStatus.PROCESSED.value
        bill_dict["processed_at"] = datetime.utcnow()
        
        await bills_collection.update_one(
            {"_id": bill_dict["_id"]},
            {
                "$set": {
                    "extracted_data": extracted_data,
                    "status": BillStatus.PROCESSED.value,
                    "processed_at": datetime.utcnow()
                }
            }
        )
    except Exception as e:
        bill_dict["status"] = BillStatus.FAILED.value
        await bills_collection.update_one(
            {"_id": bill_dict["_id"]},
            {"$set": {"status": BillStatus.FAILED.value, "error": str(e)}}
        )
    
    return {
        "id": bill_dict["_id"],
        "status": bill_dict["status"],
        "message": "Bill uploaded and processing started"
    }

@router.get("", response_model=List[dict])
async def get_bills(
    skip: int = 0,
    limit: int = 50,
    current_user: dict = Depends(get_current_user)
):
    """Get user's bills"""
    bills_collection = get_collection("bills")
    
    query = {"user_id": current_user["_id"]}
    bills = await bills_collection.find(query).skip(skip).limit(limit).sort("created_at", -1).to_list(length=limit)
    
    return bills

@router.get("/{bill_id}", response_model=dict)
async def get_bill(
    bill_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Get a specific bill"""
    bills_collection = get_collection("bills")
    
    bill = await bills_collection.find_one({"_id": bill_id, "user_id": current_user["_id"]})
    if not bill:
        raise HTTPException(status_code=404, detail="Bill not found")
    
    return bill

@router.delete("/{bill_id}")
async def delete_bill(
    bill_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Delete a bill"""
    bills_collection = get_collection("bills")
    
    result = await bills_collection.delete_one({"_id": bill_id, "user_id": current_user["_id"]})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Bill not found")
    
    return {"message": "Bill deleted successfully"}
