from pydantic import BaseModel, Field
from typing import Optional, Any, List
from datetime import datetime
from enum import Enum

class ChangeStatus(str, Enum):
    APPLIED = "applied"
    PENDING_APPROVAL = "pending_approval"
    APPROVED = "approved"
    REJECTED = "rejected"
    REVERTED = "reverted"

class ChangeEvent(BaseModel):
    id: str
    bill_id: str
    field_name: str
    old_value: Any
    new_value: Any
    user_id: str
    user_name: str
    timestamp: datetime
    change_note: Optional[str] = None
    status: ChangeStatus = ChangeStatus.APPLIED
    approver_id: Optional[str] = None
    approver_name: Optional[str] = None

class BillVersion(BaseModel):
    version_number: str
    bill_id: str
    data: dict
    created_by: str
    created_at: datetime
    change_note: Optional[str] = None

class ChangeLogQuery(BaseModel):
    bill_id: Optional[str] = None
    user_id: Optional[str] = None
    field_name: Optional[str] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    page: int = 1
    page_size: int = 50

class RevertRequest(BaseModel):
    bill_id: str
    target_version: str
    reason: str = Field(min_length=10, max_length=500)

class BillLockRequest(BaseModel):
    bill_id: str
    reason: str
    lock: bool = True
