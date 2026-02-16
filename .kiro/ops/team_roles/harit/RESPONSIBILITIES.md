# Harit - Python Backend Lead

## Role Overview
Backend Lead responsible for AI/ML processing, OCR, template engine, and core business logic APIs.

## Primary Technologies
- Python 3.11+
- FastAPI
- SQLAlchemy (ORM)
- Google Gemini AI
- Tesseract OCR / Google Vision API
- Pandas (data processing)
- pytest (testing)

## Core Responsibilities

### 1. Bill Processing Pipeline
**Status**: ✅ Core Complete, 🔄 Enhancements Ongoing
- OCR text extraction
- Layout detection
- Template matching
- Field extraction
- Data normalization
- Quality validation

**Files Owned**:
```
backend/
├── services/
│   ├── template_engine.py
│   ├── document_generator.py
│   └── gemini_service.py
├── utils/
│   └── bill_generator.py
├── models/
│   ├── document.py
│   └── template.py
└── bill_templates/
    ├── layouts/
    ├── base/
    ├── orgs/
    └── schemas/
```

**Pipeline Flow**:
```
Upload → OCR → Layout Detection → Template Match → 
Field Extract → Normalize → Validate → Store
```

### 2. Template Engine (1000+ Formats)
**Status**: ✅ Architecture Complete
- Hierarchical template system
- Layout classification (4 types)
- Base templates (5 formats)
- Org-specific overrides
- Universal normalized schema

**Template Types**:
1. **Layout Classifiers**:
   - standard_invoice
   - long_receipt
   - multi_page_invoice
   - tabular_invoice

2. **Base Templates**:
   - GST Invoice Standard
   - Restaurant Bill
   - Retail Receipt
   - E-commerce Invoice
   - Custom formats

3. **Organization Templates**:
   - Amazon custom
   - Flipkart custom
   - Swiggy/Zomato
   - Retail chains

**Implementation Tasks**:
- [ ] Add 20+ more base templates
- [ ] Implement ML-based template detection
- [ ] Build template editor API
- [ ] Add template versioning
- [ ] Create template marketplace API

### 3. AI/ML Integration (Gemini)
**Status**: ✅ Basic Integration, 🔄 Advanced Features
- Bill data extraction
- Intelligent field mapping
- Anomaly detection
- Compliance checking
- Natural language queries

**Gemini Use Cases**:
```python
# 1. Smart Field Extraction
gemini.extract_fields(ocr_text, template_hints)

# 2. Compliance Validation
gemini.check_compliance(bill_data, regulations)

# 3. Anomaly Detection
gemini.detect_anomalies(bill_data, historical_data)

# 4. Natural Language Queries
gemini.query_bills("Show all bills > ₹10,000 from last month")
```

**Tasks**:
- [ ] Implement RAG for compliance rules
- [ ] Build conversational bill query
- [ ] Add fraud detection
- [ ] Create smart categorization
- [ ] Implement auto-correction

### 4. RAG Compliance Engine
**Status**: 📋 Planned
- Vector database (Pinecone/Weaviate)
- Compliance rule embeddings
- Semantic search
- Real-time validation
- Audit trail

**Architecture**:
```
Compliance Rules → Embeddings → Vector DB
                                    ↓
Bill Data → Query → Semantic Search → Validation
```

**Implementation**:
```python
# Vector DB Setup
from pinecone import Pinecone
from langchain.embeddings import GoogleGenerativeAIEmbeddings

# Compliance Engine
class ComplianceEngine:
    def __init__(self):
        self.vector_db = Pinecone()
        self.embeddings = GoogleGenerativeAIEmbeddings()
    
    def validate_bill(self, bill_data):
        # Semantic search for relevant rules
        rules = self.vector_db.query(bill_data)
        # Validate against rules
        violations = self.check_violations(bill_data, rules)
        return violations
```

**Tasks**:
- [ ] Set up vector database
- [ ] Create compliance rule corpus
- [ ] Build embedding pipeline
- [ ] Implement validation API
- [ ] Add audit logging

### 5. FastAPI REST APIs
**Status**: 🔄 Ongoing Development

**API Endpoints**:
```
POST   /api/bills/upload           - Upload bill for processing
GET    /api/bills/{id}              - Get bill details
GET    /api/bills/                  - List bills with filters
POST   /api/bills/{id}/reprocess    - Reprocess failed bill
DELETE /api/bills/{id}              - Delete bill

POST   /api/templates/detect        - Detect template from bill
GET    /api/templates/               - List available templates
POST   /api/templates/               - Create custom template
PUT    /api/templates/{id}          - Update template
GET    /api/templates/{id}/preview  - Preview template

POST   /api/compliance/validate     - Validate bill compliance
GET    /api/compliance/rules        - Get compliance rules
POST   /api/compliance/rules        - Add compliance rule

POST   /api/ai/extract              - AI-powered extraction
POST   /api/ai/query                - Natural language query
POST   /api/ai/categorize           - Auto-categorize bills

GET    /api/marketplace/templates   - Browse marketplace
POST   /api/marketplace/publish     - Publish template
GET    /api/marketplace/download    - Download template

POST   /api/workflow/create         - Create CA workflow
GET    /api/workflow/{id}/status    - Get workflow status
POST   /api/workflow/{id}/approve   - Approve workflow step
```

### 6. Database Design & Management
**Responsibilities**:
- PostgreSQL schema design
- SQLAlchemy models
- Migration scripts (Alembic)
- Query optimization
- Data archival

**Core Models**:
```python
# models/bill.py
class Bill(Base):
    __tablename__ = "bills"
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    file_path = Column(String)
    status = Column(Enum(BillStatus))
    ocr_text = Column(Text)
    extracted_data = Column(JSON)
    template_id = Column(Integer, ForeignKey("templates.id"))
    created_at = Column(DateTime)
    processed_at = Column(DateTime)

# models/template.py
class Template(Base):
    __tablename__ = "templates"
    
    id = Column(Integer, primary_key=True)
    name = Column(String)
    category = Column(String)
    layout_type = Column(String)
    detection_rules = Column(JSON)
    field_mappings = Column(JSON)
    org_id = Column(Integer, nullable=True)
```

**Tasks**:
- [ ] Design complete schema
- [ ] Create migration scripts
- [ ] Add indexes for performance
- [ ] Implement soft deletes
- [ ] Set up backup strategy

### 7. OCR & Document Processing
**Status**: 🔄 In Progress

**OCR Options**:
1. **Tesseract** (Open source)
   - Good for printed text
   - Free
   - Requires preprocessing

2. **Google Vision API** (Paid)
   - Better accuracy
   - Handles handwriting
   - Cloud-based

3. **Hybrid Approach** (Recommended)
   - Tesseract for simple bills
   - Vision API for complex/handwritten
   - Cost optimization

**Implementation**:
```python
class OCRService:
    def __init__(self):
        self.tesseract = TesseractOCR()
        self.vision = GoogleVisionAPI()
    
    async def extract_text(self, image_path):
        # Try Tesseract first
        text = await self.tesseract.extract(image_path)
        confidence = self.calculate_confidence(text)
        
        # Fallback to Vision API if low confidence
        if confidence < 0.8:
            text = await self.vision.extract(image_path)
        
        return text
```

**Tasks**:
- [ ] Implement hybrid OCR
- [ ] Add image preprocessing
- [ ] Handle multi-page PDFs
- [ ] Support multiple languages
- [ ] Optimize for speed

### 8. Template Marketplace Backend
**Status**: 📋 Planned
- Template submission API
- Review & approval workflow
- Rating & review system
- Download tracking
- Revenue sharing logic

**Features**:
```python
# Template Marketplace API
@router.post("/marketplace/submit")
async def submit_template(template: TemplateCreate):
    # Validate template
    # Create pending review entry
    # Notify admins
    pass

@router.post("/marketplace/{id}/review")
async def review_template(id: int, decision: ReviewDecision):
    # Admin approval/rejection
    # Update status
    # Notify creator
    pass

@router.get("/marketplace/browse")
async def browse_templates(category: str, sort: str):
    # List published templates
    # Apply filters
    # Return paginated results
    pass
```

### 9. Change Tracking System
**Status**: ✅ Basic Implementation
- Audit log for all changes
- Version history
- Rollback capability
- Change notifications

**Files**:
```
backend/
├── models/change_tracking.py
└── services/change_tracking.py
```

**Tasks**:
- [ ] Add field-level tracking
- [ ] Implement diff visualization
- [ ] Build rollback API
- [ ] Add change approval workflow

### 10. CA Workflow Automation
**Status**: 📋 Planned
- Workflow definition engine
- Task assignment
- Approval chains
- Deadline tracking
- Notification triggers

**Workflow Example**:
```python
workflow = {
    "name": "Bill Approval Workflow",
    "steps": [
        {
            "id": 1,
            "name": "Upload & Extract",
            "assignee": "system",
            "auto": True
        },
        {
            "id": 2,
            "name": "Review Extraction",
            "assignee": "junior_ca",
            "deadline": "24h"
        },
        {
            "id": 3,
            "name": "Compliance Check",
            "assignee": "senior_ca",
            "deadline": "48h"
        },
        {
            "id": 4,
            "name": "Final Approval",
            "assignee": "partner",
            "deadline": "72h"
        }
    ]
}
```

## Current Sprint Tasks

### Week 1-2: Template Engine Enhancement
- [ ] Add 10 new base templates
- [ ] Implement ML template detection
- [ ] Build template editor API
- [ ] Add template versioning
- [ ] Write comprehensive tests

### Week 3-4: RAG Compliance Engine
- [ ] Set up Pinecone vector DB
- [ ] Create compliance rule embeddings
- [ ] Build validation API
- [ ] Integrate with bill processing
- [ ] Add audit logging

### Week 5-6: AI/ML Advanced Features
- [ ] Implement fraud detection
- [ ] Build NL query interface
- [ ] Add smart categorization
- [ ] Create anomaly detection
- [ ] Optimize Gemini usage

## Code Quality Standards

### Python Coding Conventions
```python
# Use type hints
from typing import List, Optional, Dict

async def process_bill(
    bill_id: int,
    user_id: int,
    options: Optional[Dict] = None
) -> Dict:
    """
    Process a bill through the extraction pipeline.
    
    Args:
        bill_id: Unique bill identifier
        user_id: User who uploaded the bill
        options: Optional processing parameters
    
    Returns:
        Dict containing extracted data and metadata
    """
    # Implementation
    pass

# Use dataclasses for DTOs
from dataclasses import dataclass

@dataclass
class BillData:
    invoice_number: str
    date: str
    vendor_name: str
    total_amount: float
    items: List[Dict]
```

### Project Structure
```
backend/
├── api/              # FastAPI routers
├── services/         # Business logic
├── models/           # SQLAlchemy models
├── schemas/          # Pydantic schemas
├── utils/            # Helper functions
├── ai/               # AI/ML modules
├── tests/            # pytest tests
└── alembic/          # Database migrations
```

## Testing Strategy

### Unit Tests
```python
# tests/test_template_engine.py
import pytest
from services.template_engine import TemplateEngine

@pytest.fixture
def template_engine():
    return TemplateEngine()

def test_detect_layout(template_engine):
    ocr_text = "Invoice No: 123..."
    layout = template_engine.detect_layout(ocr_text)
    assert layout == "standard_invoice"

def test_extract_fields(template_engine):
    bill_data = {...}
    fields = template_engine.extract_fields(bill_data)
    assert "invoice_number" in fields
```

### Integration Tests
```python
# tests/test_bill_processing.py
@pytest.mark.asyncio
async def test_full_pipeline():
    # Upload bill
    response = await client.post("/api/bills/upload", files=...)
    assert response.status_code == 200
    
    # Check processing status
    bill_id = response.json()["id"]
    status = await client.get(f"/api/bills/{bill_id}")
    assert status.json()["status"] == "processed"
```

## Performance Optimization

### Caching Strategy
```python
from redis import Redis
from functools import lru_cache

# Redis for API responses
redis_client = Redis()

@lru_cache(maxsize=1000)
def get_template(template_id: int):
    # Cache template lookups
    pass

# Cache OCR results
async def cache_ocr_result(bill_id: int, text: str):
    redis_client.setex(
        f"ocr:{bill_id}",
        3600,  # 1 hour TTL
        text
    )
```

### Database Optimization
```python
# Use indexes
class Bill(Base):
    __table_args__ = (
        Index('idx_user_created', 'user_id', 'created_at'),
        Index('idx_status', 'status'),
    )

# Eager loading
bills = session.query(Bill)\
    .options(joinedload(Bill.template))\
    .filter(Bill.user_id == user_id)\
    .all()
```

## Communication

### Daily Updates
- Post progress in team chat
- Update TASKS.md
- Document API changes

### Code Reviews
- Review .NET API contracts
- Validate frontend integration
- Approve database changes

### Documentation
- Maintain API docs (FastAPI auto-docs)
- Update template documentation
- Document AI model decisions

## Learning & Development

### Current Focus
- Advanced RAG techniques
- Vector databases
- LLM optimization
- Async Python patterns

### Resources
- FastAPI documentation
- Google Gemini AI docs
- LangChain tutorials
- Python async best practices

## Success Metrics

- Bill processing accuracy: > 95%
- API response time: < 200ms (p95)
- Template detection accuracy: > 90%
- OCR accuracy: > 98%
- System uptime: 99.9%

## Contact & Collaboration

- **Primary Stack**: Python Backend + AI/ML
- **Collaborates With**:
  - Tushar (Database schema, API contracts)
  - Shivansh (API integration, data formats)
  - Bhavya (Upload UI, status updates)
- **Availability**: 9 AM - 6 PM IST
- **Preferred Communication**: Slack, GitHub Issues
