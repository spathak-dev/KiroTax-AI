from fastapi import APIRouter, Depends, HTTPException
from security.rbac import get_current_user
from database import get_collection
from services.mapper_service import MapperService

router = APIRouter()
mapper_service = MapperService()

@router.get("/gstin/{gstin}")
async def get_gstin_info(
    gstin: str,
    current_user: dict = Depends(get_current_user)
):
    """Get information about a GSTIN"""
    info = await mapper_service.get_gstin_info(gstin)
    
    if not info:
        raise HTTPException(status_code=404, detail="GSTIN not found")
    
    return info

@router.get("/vendor/{name}")
async def search_vendor(
    name: str,
    current_user: dict = Depends(get_current_user)
):
    """Search for vendor by name"""
    vendors = await mapper_service.search_vendor(name)
    
    return {"vendors": vendors}

@router.post("/vendor/map")
async def map_vendor(
    vendor_name: str,
    gstin: str,
    current_user: dict = Depends(get_current_user)
):
    """Map vendor name to GSTIN"""
    await mapper_service.map_vendor(vendor_name, gstin, current_user["_id"])
    
    return {"message": "Vendor mapped successfully"}
