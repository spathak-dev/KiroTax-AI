from pydantic import BaseModel, Field
from typing import Optional, Dict, List
from datetime import datetime
from enum import Enum

class BillStatus(str, Enum):
    UPLOADED = "uploaded"
    PROCESSING = "processing"
    PROCESSED = "processed"
    FAILED = "failed"
    REVIEWED = "reviewed"

class BillItem(BaseModel):
    description: str
    hsn_code: Optional[str] = None
    quantity: float
    unit_price: float
    taxable_value: float
    cgst_rate: float = 0
    cgst_amount: float = 0
    sgst_rate: float = 0
    sgst_amount: float = 0
    igst_rate: float = 0
    igst_amount: float = 0
    total_amount: float

class ExtractedData(BaseModel):
    invoice_number: Optional[str] = None
    invoice_date: Optional[str] = None
    vendor_name: Optional[str] = None
    vendor_gstin: Optional[str] = None
    vendor_address: Optional[str] = None
    buyer_name: Optional[str] = None
    buyer_gstin: Optional[str] = None
    buyer_address: Optional[str] = None
    items: List[BillItem] = []
    subtotal: float = 0
    cgst_total: float = 0
    sgst_total: float = 0
    igst_total: float = 0
    total_tax: float = 0
    grand_total: float = 0
    confidence_score: float = 0

class GSTData(BaseModel):
    is_interstate: bool = False
    place_of_supply: Optional[str] = None
    reverse_charge: bool = False
    gstr1_applicable: bool = True
    gstr3b_applicable: bool = True

class BillBase(BaseModel):
    user_id: str
    file_name: str
    file_url: str
    file_type: str

class BillCreate(BillBase):
    pass

class BillInDB(BillBase):
    id: str = Field(alias="_id")
    status: BillStatus = BillStatus.UPLOADED
    extracted_data: Optional[ExtractedData] = None
    gst_data: Optional[GSTData] = None
    template_id: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    processed_at: Optional[datetime] = None
    
    class Config:
        populate_by_name = True

class BillResponse(BillBase):
    id: str
    status: BillStatus
    extracted_data: Optional[ExtractedData] = None
    gst_data: Optional[GSTData] = None
    created_at: datetime
    
    class Config:
        from_attributes = True
