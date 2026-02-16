from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum

class TaskPriority(str, Enum):
    URGENT = "urgent"
    HIGH = "high"
    NORMAL = "normal"
    LOW = "low"

class TaskStatus(str, Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    REJECTED = "rejected"
    ESCALATED = "escalated"

class WorkflowTrigger(str, Enum):
    BILL_UPLOAD = "bill_upload"
    MONTH_END = "month_end"
    MANUAL = "manual"
    SCHEDULED = "scheduled"

class Task(BaseModel):
    id: str
    title: str
    description: str
    bill_id: Optional[str] = None
    assignee_id: str
    assignee_name: str
    priority: TaskPriority
    status: TaskStatus
    due_date: datetime
    created_at: datetime
    completed_at: Optional[datetime] = None
    sla_hours: int = 24
    delegation_history: List[Dict[str, Any]] = []

class WorkflowTemplate(BaseModel):
    id: str
    name: str
    description: str
    trigger: WorkflowTrigger
    tasks: List[Dict[str, Any]]
    created_by: str
    created_at: datetime
    is_active: bool = True

class BulkApprovalRequest(BaseModel):
    bill_ids: List[str]
    action: str = Field(pattern="^(approve|reject)$")
    comment: Optional[str] = None

class TaskDelegation(BaseModel):
    task_id: str
    new_assignee_id: str
    reason: Optional[str] = None
