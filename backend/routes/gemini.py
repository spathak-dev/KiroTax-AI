from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from typing import Dict, Any, Optional, List
from services.gemini_service import GeminiService
from security.rbac import get_current_user

router = APIRouter()
gemini_service = GeminiService()

@router.post("/gemini/analyze-bill")
async def analyze_bill_with_gemini(
    file: UploadFile = File(...),
    bill_type: Optional[str] = None,
    current_user: dict = Depends(get_current_user)
):
    """Analyze bill image using Gemini AI"""
    
    # Read image data
    image_data = await file.read()
    
    # Analyze with Gemini
    result = await gemini_service.analyze_bill_image(
        image_data=image_data,
        bill_type=bill_type
    )
    
    return result

@router.post("/gemini/detect-anomalies")
async def detect_anomalies(
    bill_data: Dict[str, Any],
    historical_data: Optional[List[Dict[str, Any]]] = None,
    current_user: dict = Depends(get_current_user)
):
    """Detect anomalies in bill data using Gemini"""
    
    result = await gemini_service.detect_anomalies(
        bill_data=bill_data,
        historical_data=historical_data
    )
    
    return result

@router.post("/gemini/suggest-correction")
async def suggest_correction(
    field_name: str,
    ocr_value: Any,
    confidence: float,
    context: Dict[str, Any],
    current_user: dict = Depends(get_current_user)
):
    """Get Gemini suggestion for low-confidence field"""
    
    result = await gemini_service.suggest_corrections(
        field_name=field_name,
        ocr_value=ocr_value,
        confidence=confidence,
        context=context
    )
    
    return result

@router.post("/gemini/ask-question")
async def ask_question_about_bill(
    question: str,
    bill_data: Dict[str, Any],
    conversation_history: Optional[List[Dict[str, str]]] = None,
    current_user: dict = Depends(get_current_user)
):
    """Ask Gemini a question about a bill"""
    
    answer = await gemini_service.answer_question(
        question=question,
        bill_data=bill_data,
        conversation_history=conversation_history
    )
    
    return {"answer": answer}

@router.get("/gemini/usage-stats")
async def get_gemini_usage_stats(
    current_user: dict = Depends(get_current_user)
):
    """Get Gemini API usage statistics (Admin only)"""
    
    if current_user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    stats = gemini_service.get_usage_stats()
    
    return stats
