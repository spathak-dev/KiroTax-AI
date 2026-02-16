from fastapi import APIRouter, Depends, HTTPException
from typing import Optional
from datetime import datetime
from security.rbac import get_current_user
try:
    from database import get_collection
except:
    from database_mock import get_collection
from services.gst_engine import GSTEngine
import uuid

router = APIRouter()
gst_engine = GSTEngine()

@router.post("/generate")
async def generate_gst_report(
    month: int,
    year: int,
    report_type: str,  # GSTR1 or GSTR3B
    current_user: dict = Depends(get_current_user)
):
    """Generate GST report"""
    if report_type not in ["GSTR1", "GSTR3B"]:
        raise HTTPException(status_code=400, detail="Invalid report type")
    
    # Get bills for the period
    bills_collection = get_collection("bills")
    bills = await bills_collection.find({
        "user_id": current_user["_id"],
        "status": "processed"
    }).to_list(length=1000)
    
    # Generate report
    if report_type == "GSTR1":
        report_data = gst_engine.generate_gstr1(bills, month, year)
    else:
        report_data = gst_engine.generate_gstr3b(bills, month, year)
    
    # Save report
    reports_collection = get_collection("gst_reports")
    report_dict = {
        "_id": str(uuid.uuid4()),
        "user_id": current_user["_id"],
        "period_month": month,
        "period_year": year,
        "report_type": report_type,
        "report_data": report_data,
        "created_at": datetime.utcnow()
    }
    
    await reports_collection.insert_one(report_dict)
    
    return {
        "id": report_dict["_id"],
        "report": report_data,
        "message": f"{report_type} generated successfully"
    }

@router.get("/report")
async def get_gst_reports(
    month: Optional[int] = None,
    year: Optional[int] = None,
    current_user: dict = Depends(get_current_user)
):
    """Get GST reports"""
    reports_collection = get_collection("gst_reports")
    
    query = {"user_id": current_user["_id"]}
    if month:
        query["period_month"] = month
    if year:
        query["period_year"] = year
    
    reports = await reports_collection.find(query).sort("created_at", -1).to_list(length=100)
    
    return reports

@router.post("/export/{report_id}")
async def export_gst_report(
    report_id: str,
    format: str = "excel",  # excel or json
    current_user: dict = Depends(get_current_user)
):
    """Export GST report"""
    reports_collection = get_collection("gst_reports")
    
    report = await reports_collection.find_one({"_id": report_id, "user_id": current_user["_id"]})
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    
    if format == "excel":
        filename = f"{report['report_type']}_{report['period_month']}_{report['period_year']}.xlsx"
        file_path = gst_engine.export_to_excel(report["report_data"], filename)
        return {"file_url": file_path, "message": "Report exported successfully"}
    else:
        return {"data": report["report_data"]}
