from fastapi import APIRouter, UploadFile, File, Depends
from security.rbac import get_current_user
from services.tender_ai import TenderAI

router = APIRouter()
tender_ai = TenderAI()

@router.post("/analyze")
async def analyze_tender(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user)
):
    """Analyze government tender document"""
    # Process tender document
    analysis = await tender_ai.analyze_tender(file)
    
    return {
        "analysis": analysis,
        "message": "Tender analyzed successfully"
    }

@router.get("/opportunities")
async def get_tender_opportunities(
    current_user: dict = Depends(get_current_user)
):
    """Get relevant tender opportunities"""
    return {
        "tenders": [
            {
                "id": "1",
                "title": "IT Services for Government Department",
                "department": "Ministry of Electronics",
                "deadline": "2024-04-15",
                "value": "₹50L"
            }
        ]
    }
