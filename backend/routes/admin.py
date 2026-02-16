from fastapi import APIRouter, HTTPException, Depends, Query
from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel, EmailStr

router = APIRouter()

# ============ MODELS ============

class UserBase(BaseModel):
    name: str
    email: EmailStr
    role: str  # admin, ca, auditor, client
    company: Optional[str] = None
    is_active: bool = True

class UserCreate(UserBase):
    pass

class UserUpdate(UserBase):
    pass

class User(UserBase):
    id: int
    created_at: datetime
    last_login_date: Optional[datetime] = None

class BillBase(BaseModel):
    file_name: str
    file_url: Optional[str] = None
    status: str  # uploaded, processing, processed, failed
    user_id: int
    invoice_number: Optional[str] = None
    invoice_date: Optional[datetime] = None
    vendor_name: Optional[str] = None
    grand_total: Optional[float] = None

class Bill(BillBase):
    id: int
    created_at: datetime
    processed_at: Optional[datetime] = None

class TemplateBase(BaseModel):
    name: str
    description: Optional[str] = None
    category: str = "general"
    price: float = 0.0
    status: str = "pending_review"  # pending_review, published, rejected
    creator_id: int

class Template(TemplateBase):
    id: int
    download_count: int = 0
    rating: float = 0.0
    created_at: datetime

class ActivityLog(BaseModel):
    id: int
    action: str
    description: Optional[str] = None
    user_id: Optional[int] = None
    entity_type: Optional[str] = None
    entity_id: Optional[int] = None
    timestamp: datetime
    icon: str = "circle-fill"

class SystemSetting(BaseModel):
    id: int
    key: str
    value: Optional[str] = None
    description: Optional[str] = None
    updated_at: datetime

class AdminStats(BaseModel):
    total_users: int
    active_users: int
    total_bills: int
    processed_bills: int
    processing_bills: int
    failed_bills: int
    total_templates: int
    published_templates: int
    pending_templates: int
    users_today: int
    bills_today: int

# ============ ENDPOINTS ============

# These endpoints proxy to the .NET Admin API
# In production, you would implement actual database queries here
# For now, they serve as documentation and can forward to .NET

@router.get("/users", response_model=List[User])
async def get_users(
    role: Optional[str] = Query(None),
    search: Optional[str] = Query(None)
):
    """
    Get all users with optional filtering.
    
    This endpoint is implemented in the .NET Admin API.
    Python backend can call: GET http://localhost:5001/api/admin/users
    """
    raise HTTPException(
        status_code=501,
        detail="This endpoint is implemented in .NET Admin API at http://localhost:5001/api/admin/users"
    )

@router.get("/users/{user_id}", response_model=User)
async def get_user(user_id: int):
    """Get a specific user by ID."""
    raise HTTPException(
        status_code=501,
        detail=f"This endpoint is implemented in .NET Admin API at http://localhost:5001/api/admin/users/{user_id}"
    )

@router.post("/users", response_model=User, status_code=201)
async def create_user(user: UserCreate):
    """Create a new user."""
    raise HTTPException(
        status_code=501,
        detail="This endpoint is implemented in .NET Admin API at http://localhost:5001/api/admin/users"
    )

@router.put("/users/{user_id}", status_code=204)
async def update_user(user_id: int, user: UserUpdate):
    """Update an existing user."""
    raise HTTPException(
        status_code=501,
        detail=f"This endpoint is implemented in .NET Admin API at http://localhost:5001/api/admin/users/{user_id}"
    )

@router.delete("/users/{user_id}", status_code=204)
async def delete_user(user_id: int):
    """Delete a user."""
    raise HTTPException(
        status_code=501,
        detail=f"This endpoint is implemented in .NET Admin API at http://localhost:5001/api/admin/users/{user_id}"
    )

@router.get("/bills", response_model=List[Bill])
async def get_bills(
    status: Optional[str] = Query(None),
    user_id: Optional[int] = Query(None)
):
    """Get all bills with optional filtering."""
    raise HTTPException(
        status_code=501,
        detail="This endpoint is implemented in .NET Admin API at http://localhost:5001/api/admin/bills"
    )

@router.get("/bills/{bill_id}", response_model=Bill)
async def get_bill(bill_id: int):
    """Get a specific bill by ID."""
    raise HTTPException(
        status_code=501,
        detail=f"This endpoint is implemented in .NET Admin API at http://localhost:5001/api/admin/bills/{bill_id}"
    )

@router.get("/templates", response_model=List[Template])
async def get_templates(
    status: Optional[str] = Query(None),
    category: Optional[str] = Query(None)
):
    """Get all templates with optional filtering."""
    raise HTTPException(
        status_code=501,
        detail="This endpoint is implemented in .NET Admin API at http://localhost:5001/api/admin/templates"
    )

@router.put("/templates/{template_id}/approve", status_code=204)
async def approve_template(template_id: int, approved: bool):
    """Approve or reject a template."""
    raise HTTPException(
        status_code=501,
        detail=f"This endpoint is implemented in .NET Admin API at http://localhost:5001/api/admin/templates/{template_id}/approve"
    )

@router.get("/activity", response_model=List[ActivityLog])
async def get_activity(
    limit: int = Query(50, le=100),
    entity_type: Optional[str] = Query(None)
):
    """Get activity logs."""
    raise HTTPException(
        status_code=501,
        detail="This endpoint is implemented in .NET Admin API at http://localhost:5001/api/admin/activity"
    )

@router.get("/settings", response_model=List[SystemSetting])
async def get_settings():
    """Get all system settings."""
    raise HTTPException(
        status_code=501,
        detail="This endpoint is implemented in .NET Admin API at http://localhost:5001/api/admin/settings"
    )

@router.put("/settings", status_code=204)
async def update_settings(settings: List[SystemSetting]):
    """Update system settings."""
    raise HTTPException(
        status_code=501,
        detail="This endpoint is implemented in .NET Admin API at http://localhost:5001/api/admin/settings"
    )

@router.get("/stats", response_model=AdminStats)
async def get_stats():
    """Get admin dashboard statistics."""
    raise HTTPException(
        status_code=501,
        detail="This endpoint is implemented in .NET Admin API at http://localhost:5001/api/admin/stats"
    )
