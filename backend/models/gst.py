from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class GSTR1Entry(BaseModel):
    gstin: str
    invoice_number: str
    invoice_date: str
    invoice_value: float
    place_of_supply: str
    reverse_charge: str
    invoice_type: str
    taxable_value: float
    cgst_amount: float
    sgst_amount: float
    igst_amount: float

class GSTR3BEntry(BaseModel):
    outward_taxable_supplies: float
    outward_taxable_zero_rated: float
    other_outward_supplies: float
    inward_supplies_liable_reverse_charge: float
    non_gst_outward_supplies: float
    total_cgst: float
    total_sgst: float
    total_igst: float
    total_cess: float
    itc_claimed: float

class GSTReportBase(BaseModel):
    user_id: str
    period_month: int
    period_year: int
    report_type: str  # GSTR1, GSTR3B, sales_register, purchase_register

class GSTReportCreate(GSTReportBase):
    pass

class GSTReportInDB(GSTReportBase):
    id: str = Field(alias="_id")
    gstr1_entries: List[GSTR1Entry] = []
    gstr3b_data: Optional[GSTR3BEntry] = None
    total_sales: float = 0
    total_purchases: float = 0
    total_tax: float = 0
    file_url: Optional[str] = None
    created_at: datetime
    
    class Config:
        populate_by_name = True

class GSTReportResponse(GSTReportBase):
    id: str
    total_sales: float
    total_purchases: float
    total_tax: float
    file_url: Optional[str] = None
    created_at: datetime
    
    class Config:
        from_attributes = True
