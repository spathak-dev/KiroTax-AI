from fastapi import APIRouter, HTTPException, Depends, Query
from typing import List, Optional
from models.template import (
    TemplateCreate, TemplateUpdate, TemplateResponse,
    TemplateRating, TemplatePurchase
)
from services.template_marketplace import TemplateMarketplaceService
from security.rbac import get_current_user, require_role

router = APIRouter()
marketplace_service = TemplateMarketplaceService()

@router.post("/templates", response_model=dict)
async def create_template(
    template_data: TemplateCreate,
    current_user: dict = Depends(get_current_user)
):
    """Create a new template"""
    # Only CA and Admin can create templates
    if current_user["role"] not in ["ca", "admin"]:
        raise HTTPException(status_code=403, detail="Only CA and Admin users can create templates")
    
    template_id = await marketplace_service.create_template(
        template_data,
        current_user["_id"],
        current_user["name"]
    )
    
    return {"template_id": template_id, "status": "pending_review"}

@router.get("/templates", response_model=List[TemplateResponse])
async def search_templates(
    query: Optional[str] = None,
    category: Optional[str] = None,
    price_filter: Optional[str] = Query(None, regex="^(free|premium)$"),
    min_rating: Optional[float] = Query(None, ge=0, le=5),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    current_user: dict = Depends(get_current_user)
):
    """Search and filter templates in marketplace"""
    templates = await marketplace_service.search_templates(
        query=query,
        category=category,
        price_filter=price_filter,
        min_rating=min_rating,
        page=page,
        page_size=page_size
    )
    
    return templates

@router.get("/templates/{template_id}", response_model=TemplateResponse)
async def get_template(
    template_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Get template details"""
    template = await marketplace_service.templates_collection.find_one({"_id": template_id})
    
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")
    
    return TemplateResponse(**template)

@router.post("/templates/{template_id}/approve")
async def approve_template(
    template_id: str,
    current_user: dict = Depends(require_role("admin"))
):
    """Approve template for publication (Admin only)"""
    success = await marketplace_service.approve_template(template_id, current_user["_id"])
    
    if not success:
        raise HTTPException(status_code=404, detail="Template not found")
    
    return {"message": "Template approved successfully"}

@router.post("/templates/{template_id}/purchase")
async def purchase_template(
    template_id: str,
    purchase: TemplatePurchase,
    current_user: dict = Depends(get_current_user)
):
    """Purchase or download a template"""
    result = await marketplace_service.purchase_template(purchase, current_user["_id"])
    
    return result

@router.post("/templates/{template_id}/rate")
async def rate_template(
    template_id: str,
    rating: TemplateRating,
    current_user: dict = Depends(get_current_user)
):
    """Rate and review a template"""
    success = await marketplace_service.rate_template(rating, current_user["_id"])
    
    return {"message": "Rating submitted successfully"}

@router.get("/templates/creator/earnings")
async def get_creator_earnings(
    current_user: dict = Depends(get_current_user)
):
    """Get earnings for template creator"""
    earnings = await marketplace_service.get_creator_earnings(current_user["_id"])
    
    return earnings

@router.get("/templates/featured")
async def get_featured_templates(
    current_user: dict = Depends(get_current_user)
):
    """Get featured templates"""
    templates = await marketplace_service.templates_collection.find(
        {"is_featured": True, "status": "published"}
    ).limit(10).to_list(10)
    
    return [TemplateResponse(**t) for t in templates]
