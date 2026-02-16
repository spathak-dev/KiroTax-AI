from fastapi import APIRouter, Depends
from security.rbac import get_current_user, require_ca
try:
    from database import get_collection
except:
    from database_mock import get_collection

router = APIRouter()

@router.post("/prepare")
async def prepare_tax_filing(
    month: int,
    year: int,
    current_user: dict = Depends(require_ca)
):
    """Prepare tax filing documents"""
    # Get GST reports
    reports_collection = get_collection("gst_reports")
    
    reports = await reports_collection.find({
        "user_id": current_user["_id"],
        "period_month": month,
        "period_year": year
    }).to_list(length=100)
    
    return {
        "reports": reports,
        "message": "Tax filing prepared",
        "status": "ready_for_filing"
    }

@router.get("/status")
async def get_tax_status(
    current_user: dict = Depends(get_current_user)
):
    """Get tax filing status"""
    return {
        "pending_filings": 2,
        "completed_filings": 10,
        "next_deadline": "2024-03-20"
    }
