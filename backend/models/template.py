from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum

class TemplateCategory(str, Enum):
    VENDOR_SPECIFIC = "vendor_specific"
    INDUSTRY = "industry"
    BILL_TYPE = "bill_type"
    GENERAL = "general"

class TemplateLicense(str, Enum):
    PERSONAL = "personal"
    COMMERCIAL = "commercial"
    UNLIMITED = "unlimited"

class TemplateStatus(str, Enum):
    DRAFT = "draft"
    PENDING_REVIEW = "pending_review"
    PUBLISHED = "published"
    REJECTED = "rejected"
    ARCHIVED = "archived"

class FieldMapping(BaseModel):
    field_name: str
    field_type: str
    coordinates: Optional[Dict[str, float]] = None
    keywords: List[str] = []
    regex_pattern: Optional[str] = None
    required: bool = True
    confidence_threshold: float = 0.7

class TemplateCreate(BaseModel):
    name: str
    description: str
    category: TemplateCategory
    vendor_name: Optional[str] = None
    price: float = 0.0  # 0 for free templates
    license: TemplateLicense = TemplateLicense.PERSONAL
    fields: List[FieldMapping]
    preview_images: List[str] = []
    sample_output: Optional[Dict[str, Any]] = None

class TemplateUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    fields: Optional[List[FieldMapping]] = None
    preview_images: Optional[List[str]] = None

class TemplateResponse(BaseModel):
    id: str
    name: str
    description: str
    category: TemplateCategory
    vendor_name: Optional[str]
    price: float
    license: TemplateLicense
    status: TemplateStatus
    creator_id: str
    creator_name: str
    fields: List[FieldMapping]
    preview_images: List[str]
    sample_output: Optional[Dict[str, Any]]
    rating: float = 0.0
    download_count: int = 0
    usage_count: int = 0
    accuracy_score: float = 0.0
    version: str = "1.0.0"
    created_at: datetime
    updated_at: datetime
    is_featured: bool = False

class TemplateRating(BaseModel):
    template_id: str
    rating: int = Field(ge=1, le=5)
    review: Optional[str] = Field(None, min_length=10, max_length=500)

class TemplatePurchase(BaseModel):
    template_id: str
    payment_method: str
    transaction_id: Optional[str] = None
