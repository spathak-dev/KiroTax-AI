from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum

class DocumentFormat(str, Enum):
    PDF = "pdf"
    DOCX = "docx"
    PPTX = "pptx"
    XLSX = "xlsx"

class DocumentType(str, Enum):
    INVOICE = "invoice"
    GST_REPORT = "gst_report"
    SUMMARY = "summary"
    CERTIFICATE = "certificate"
    PRESENTATION = "presentation"

class ThemeName(str, Enum):
    PROFESSIONAL = "professional"
    MODERN = "modern"
    CLASSIC = "classic"
    MINIMAL = "minimal"
    COLORFUL = "colorful"

class DocumentGenerationRequest(BaseModel):
    bill_ids: Optional[List[str]] = None
    document_type: DocumentType
    format: DocumentFormat
    theme: ThemeName = ThemeName.PROFESSIONAL
    template_id: Optional[str] = None
    include_watermark: bool = False
    watermark_text: Optional[str] = "DRAFT"
    digital_signature: bool = False
    custom_data: Optional[Dict[str, Any]] = None

class BatchGenerationRequest(BaseModel):
    requests: List[DocumentGenerationRequest]
    zip_output: bool = True

class DocumentResponse(BaseModel):
    id: str
    document_type: DocumentType
    format: DocumentFormat
    download_url: str
    file_size: int
    generated_at: datetime
    expires_at: datetime
    generation_time_ms: int

class ScheduledGeneration(BaseModel):
    id: str
    name: str
    frequency: str = Field(pattern="^(daily|weekly|monthly)$")
    document_request: DocumentGenerationRequest
    recipients: List[str]
    next_execution: datetime
    is_active: bool = True
