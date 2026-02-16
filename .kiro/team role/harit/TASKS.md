# Harit - Current Sprint Tasks

## Sprint 1 (Weeks 1-2) - Core Backend & AI Foundation

### Priority 1: Critical Path 🔴

#### Task 1.1: Authentication System
**Status**: Not Started  
**Estimated Time**: 6 hours  
**Dependencies**: None

**Description**: Implement JWT-based authentication system for all users

**Subtasks**:
- [ ] Create `routes/auth.py` with all auth endpoints
- [ ] Implement password hashing (bcrypt)
- [ ] Create JWT token generation and validation
- [ ] Add refresh token logic
- [ ] Implement role-based middleware
- [ ] Add rate limiting for auth endpoints
- [ ] Write tests for auth flow

**Acceptance Criteria**:
- Users can register and login
- JWT tokens are generated correctly
- Tokens expire and refresh properly
- Role-based access control works
- All endpoints are protected

**API Endpoints**:
```python
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh
GET    /api/auth/verify
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
```

---

#### Task 1.2: OCR Processing Pipeline
**Status**: Not Started  
**Estimated Time**: 8 hours  
**Dependencies**: None

**Description**: Build OCR processing pipeline with Tesseract and Google Vision

**Subtasks**:
- [ ] Create `ai/ocr_engine.py`
- [ ] Integrate Tesseract OCR
- [ ] Add Google Cloud Vision API (optional)
- [ ] Implement image preprocessing
- [ ] Add text extraction logic
- [ ] Implement confidence scoring
- [ ] Handle multi-page documents
- [ ] Add error handling and retries

**Acceptance Criteria**:
- OCR extracts text from images accurately (>95%)
- Handles multiple image formats (JPG, PNG, PDF)
- Processes multi-page documents
- Returns confidence scores
- Handles errors gracefully

---

#### Task 1.3: Template Matching Algorithm
**Status**: Not Started  
**Estimated Time**: 10 hours  
**Dependencies**: Task 1.2, existing template system

**Description**: Implement intelligent template matching algorithm

**Subtasks**:
- [ ] Enhance `services/template_engine.py`
- [ ] Implement keyword matching
- [ ] Add regex pattern matching
- [ ] Create layout similarity scoring
- [ ] Implement confidence calculation
- [ ] Add fallback to generic template
- [ ] Optimize for performance
- [ ] Write comprehensive tests

**Acceptance Criteria**:
- Correctly matches bills to templates (>90% accuracy)
- Returns confidence score
- Handles unknown bill formats
- Processes in < 1 second
- Handles edge cases

---

### Priority 2: Important Features 🟡

#### Task 2.1: Bill Processing API
**Status**: Not Started  
**Estimated Time**: 6 hours  
**Dependencies**: Task 1.1, Task 1.2, Task 1.3

**Description**: Create complete bill processing API endpoints

**Subtasks**:
- [ ] Create `routes/bills.py`
- [ ] Implement file upload endpoint
- [ ] Add bill processing endpoint
- [ ] Create bill CRUD endpoints
- [ ] Implement status tracking
- [ ] Add pagination and filtering
- [ ] Implement search functionality
- [ ] Write API tests

**Acceptance Criteria**:
- All bill endpoints work correctly
- File uploads are handled securely
- Processing is async with status updates
- Pagination works for large datasets
- Search is fast and accurate

**API Endpoints**:
```python
POST   /api/bills/upload
GET    /api/bills
GET    /api/bills/{id}
PUT    /api/bills/{id}
DELETE /api/bills/{id}
POST   /api/bills/{id}/process
GET    /api/bills/{id}/status
POST   /api/bills/{id}/extract
GET    /api/bills/stats
POST   /api/bills/search
```

---

#### Task 2.2: Field Extraction Engine
**Status**: Not Started  
**Estimated Time**: 8 hours  
**Dependencies**: Task 1.2, Task 1.3

**Description**: Build intelligent field extraction from OCR text

**Subtasks**:
- [ ] Create field extraction logic in `services/template_engine.py`
- [ ] Implement regex-based extraction
- [ ] Add NLP-based extraction (spaCy)
- [ ] Create validation rules
- [ ] Implement confidence scoring
- [ ] Handle missing fields
- [ ] Add data normalization
- [ ] Write extraction tests

**Acceptance Criteria**:
- Extracts all required fields accurately
- Handles various date formats
- Normalizes currency values
- Validates extracted data
- Returns confidence scores

---

#### Task 2.3: Admin API Endpoints
**Status**: Not Started  
**Estimated Time**: 5 hours  
**Dependencies**: Task 1.1, Task 2.1

**Description**: Create admin-specific API endpoints for Tushar's dashboard

**Subtasks**:
- [ ] Create `routes/admin.py`
- [ ] Implement user management endpoints
- [ ] Add bill management endpoints
- [ ] Create template approval endpoints
- [ ] Implement activity log endpoints
- [ ] Add system settings endpoints
- [ ] Add statistics endpoints
- [ ] Write admin API tests

**Acceptance Criteria**:
- All admin endpoints work
- Only admins can access
- Returns proper error codes
- Handles edge cases
- Well documented

**API Endpoints**:
```python
# User Management
GET    /api/admin/users
POST   /api/admin/users
PUT    /api/admin/users/{id}
DELETE /api/admin/users/{id}
GET    /api/admin/users/{id}/activity

# Bill Management
GET    /api/admin/bills
GET    /api/admin/bills/{id}
PUT    /api/admin/bills/{id}/status
POST   /api/admin/bills/{id}/reprocess
DELETE /api/admin/bills/{id}
GET    /api/admin/bills/stats

# Template Management
GET    /api/admin/templates
GET    /api/admin/templates/{id}
PUT    /api/admin/templates/{id}/approve
PUT    /api/admin/templates/{id}/reject
DELETE /api/admin/templates/{id}

# System
GET    /api/admin/activity
GET    /api/admin/settings
PUT    /api/admin/settings
GET    /api/admin/stats
```

---

### Priority 3: Nice to Have 🟢

#### Task 3.1: Celery Task Queue
**Status**: Not Started  
**Estimated Time**: 6 hours  
**Dependencies**: Task 2.1

**Description**: Set up Celery for async bill processing

**Subtasks**:
- [ ] Install and configure Celery
- [ ] Set up Redis as broker
- [ ] Create processing tasks
- [ ] Implement task monitoring
- [ ] Add retry logic
- [ ] Handle task failures
- [ ] Write task tests

**Acceptance Criteria**:
- Bills process asynchronously
- Status updates work
- Failed tasks retry automatically
- Task monitoring works
- Performance is good

---

#### Task 3.2: Caching Layer
**Status**: Not Started  
**Estimated Time**: 4 hours  
**Dependencies**: Task 2.1

**Description**: Implement Redis caching for frequently accessed data

**Subtasks**:
- [ ] Set up Redis connection
- [ ] Cache template data
- [ ] Cache user sessions
- [ ] Implement cache invalidation
- [ ] Add cache warming
- [ ] Monitor cache hit rate

**Acceptance Criteria**:
- Frequently accessed data is cached
- Cache invalidation works
- Performance improves significantly
- Cache hit rate > 80%

---

#### Task 3.3: API Documentation
**Status**: Not Started  
**Estimated Time**: 3 hours  
**Dependencies**: Task 2.1, Task 2.3

**Description**: Create comprehensive API documentation with Swagger

**Subtasks**:
- [ ] Add OpenAPI schemas to all endpoints
- [ ] Write endpoint descriptions
- [ ] Add request/response examples
- [ ] Document error codes
- [ ] Add authentication docs
- [ ] Test Swagger UI

**Acceptance Criteria**:
- All endpoints documented
- Examples are accurate
- Swagger UI works
- Easy to understand

---

## Sprint 2 (Weeks 3-4) - AI/ML & Advanced Features

### Task 4.1: Gemini API Integration
**Status**: Not Started  
**Estimated Time**: 6 hours

**Description**: Integrate Gemini API for AI-powered features

**Subtasks**:
- [ ] Set up Gemini API client
- [ ] Implement chat endpoint
- [ ] Add bill analysis endpoint
- [ ] Create data extraction endpoint
- [ ] Implement prompt engineering
- [ ] Add rate limiting
- [ ] Handle API errors

---

### Task 4.2: RAG Compliance Engine
**Status**: Not Started  
**Estimated Time**: 10 hours

**Description**: Build RAG system for compliance checking

**Subtasks**:
- [ ] Set up vector database (Pinecone/Weaviate)
- [ ] Implement document embedding
- [ ] Create semantic search
- [ ] Build compliance rule engine
- [ ] Add GST validation
- [ ] Implement report generation

---

### Task 4.3: Table Extraction
**Status**: Not Started  
**Estimated Time**: 8 hours

**Description**: Implement table detection and extraction from bills

**Subtasks**:
- [ ] Create `ai/table_extractor.py`
- [ ] Implement table detection
- [ ] Extract table data
- [ ] Parse rows and columns
- [ ] Handle merged cells
- [ ] Validate extracted data

---

### Task 4.4: WebSocket for Real-time Updates
**Status**: Not Started  
**Estimated Time**: 5 hours

**Description**: Implement WebSocket for real-time bill processing updates

**Subtasks**:
- [ ] Set up WebSocket endpoint
- [ ] Implement connection management
- [ ] Send processing updates
- [ ] Handle disconnections
- [ ] Add authentication
- [ ] Test with multiple clients

---

## Blocked Tasks ⛔

None currently

---

## Notes

### Environment Setup
```bash
# Required packages
pip install fastapi uvicorn sqlalchemy alembic
pip install python-jose passlib bcrypt
pip install python-multipart pillow
pip install pytesseract opencv-python
pip install celery redis
pip install google-cloud-vision  # optional
pip install sentence-transformers  # for RAG
```

### API Keys Needed
- Google Cloud Vision API key (optional)
- Gemini API key
- Pinecone API key (for RAG)

### Database Schema
- Users table
- Bills table
- Templates table
- ActivityLogs table
- Settings table

### Performance Targets
- API response time < 200ms (95th percentile)
- OCR processing < 5 seconds per page
- Template matching < 1 second
- Database queries < 100ms

### Questions for Team
- Which OCR engine to prioritize? (Tesseract vs Google Vision)
- Should we support PDF uploads?
- What's the max file size for uploads?
- Do we need batch processing?
- Should we implement webhooks?

### Technical Decisions
- FastAPI for web framework
- PostgreSQL for database
- Redis for caching and queues
- Celery for async tasks
- JWT for authentication
- Tesseract for OCR (primary)

---

**Last Updated**: February 15, 2026  
**Next Review**: February 17, 2026
