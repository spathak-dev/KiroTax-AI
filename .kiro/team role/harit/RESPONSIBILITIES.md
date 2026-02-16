# Harit - Python Backend & AI/ML Lead

## Role Overview

As the Python Backend & AI/ML Lead, you are responsible for building the core backend infrastructure, AI/ML models, OCR processing, and all Python-based services for the KiroTax AI platform.

## Primary Responsibilities

### 1. Python Backend Development (FastAPI)
- Build and maintain FastAPI backend services
- Implement RESTful APIs for all features
- Create authentication and authorization system
- Build database models and migrations
- Implement caching and optimization strategies

### 2. AI/ML & OCR Processing
- Integrate OCR engines for bill scanning
- Implement AI classification models
- Build template detection system
- Integrate Gemini API for AI features
- Optimize ML model performance

### 3. Template Engine & Processing
- Build hierarchical template system
- Implement layout detection
- Create field extraction engine
- Build normalization pipeline
- Manage template marketplace backend

### 4. RAG & Compliance Engine
- Implement RAG (Retrieval-Augmented Generation) system
- Build compliance checking engine
- Create document embedding system
- Implement semantic search
- Build audit trail system

## Feature Ownership

### RBAC System (Role-Based Access Control)
**Your Responsibility**: Authentication API and authorization logic
- JWT token generation and validation
- Role and permission management API
- User authentication endpoints
- Session management
- Password hashing and security

**Dependencies**:
- Tushar builds admin UI
- Shivansh/Bhavya build user-facing UI

### Bill Processing Pipeline
**Your Responsibility**: OCR, processing, and data extraction
- OCR integration (Tesseract, Google Vision, etc.)
- Layout detection and classification
- Template matching algorithm
- Field extraction and validation
- Data normalization
- Processing queue management
- Error handling and retry logic

**Dependencies**:
- Tushar builds admin management UI
- Shivansh/Bhavya build upload interface

### Template Marketplace
**Your Responsibility**: Template engine and marketplace backend
- Template storage and versioning
- Template matching algorithm
- Field mapping engine
- Template validation
- Marketplace API (search, filter, download)
- Template analytics
- Revenue tracking

**Dependencies**:
- Tushar builds approval system
- Shivansh/Bhavya build marketplace UI

### Change Tracking System
**Your Responsibility**: Backend change tracking logic
- Change detection algorithm
- Audit log storage
- Change history API
- Diff generation
- Rollback functionality
- Compliance reporting

**Dependencies**:
- Tushar builds admin log viewer
- Shivansh/Bhavya build user history view

### Manual Bill Editor
**Your Responsibility**: Data processing and validation
- Bill data CRUD APIs
- Field validation logic
- Auto-save functionality
- Version control
- Conflict resolution
- Export functionality

**Dependencies**:
- Shivansh/Bhavya build editor UI

### RAG Compliance Engine
**Your Responsibility**: RAG system and compliance checking
- Document embedding (OpenAI, Sentence Transformers)
- Vector database integration (Pinecone, Weaviate)
- Semantic search implementation
- Compliance rule engine
- GST/tax validation
- Regulatory checking
- Report generation

**Dependencies**:
- Tushar builds admin reports
- Shivansh/Bhavya build compliance UI

### Gemini Integration
**Your Responsibility**: Gemini API integration
- Gemini API client
- Prompt engineering
- Response parsing
- Context management
- Rate limiting
- Error handling
- Cost optimization

**Dependencies**:
- Shivansh/Bhavya build chat interface

### Document Generator
**Your Responsibility**: PDF and document generation
- PDF generation (ReportLab, WeasyPrint)
- Excel export (openpyxl, pandas)
- Template rendering
- Watermarking
- Digital signatures
- Batch processing

**Dependencies**:
- Shivansh/Bhavya build export UI

### CA Workflow Automation
**Your Responsibility**: Workflow engine
- Workflow state machine
- Task assignment logic
- Notification system
- SLA tracking
- Workflow analytics
- Integration with external systems

**Dependencies**:
- Tushar builds admin workflow UI
- Shivansh/Bhavya build CA interface

## Technical Stack

### Core Technologies
- **Python 3.11+**: Latest Python version
- **FastAPI**: Modern async web framework
- **Pydantic**: Data validation
- **SQLAlchemy**: ORM for database
- **Alembic**: Database migrations
- **PostgreSQL**: Primary database
- **Redis**: Caching and queues

### AI/ML Libraries
- **TensorFlow/PyTorch**: Deep learning
- **Transformers**: NLP models
- **OpenCV**: Image processing
- **Tesseract OCR**: Text extraction
- **Google Cloud Vision**: OCR API
- **Sentence Transformers**: Embeddings
- **LangChain**: LLM orchestration

### APIs & Services
- **Gemini API**: Google's AI model
- **OpenAI API**: GPT models (optional)
- **Pinecone/Weaviate**: Vector database
- **Celery**: Task queue
- **RabbitMQ**: Message broker

### Development Tools
- **VS Code** or **PyCharm**
- **Poetry** or **pip**: Package management
- **pytest**: Testing framework
- **Black**: Code formatting
- **Pylint**: Linting
- **Docker**: Containerization

## Project Structure

```
backend/
├── main.py                         # FastAPI application entry
├── main_extended.py                # Extended app with all routes
├── config.py                       # Configuration management
├── database.py                     # Database connection
│
├── models/                         # SQLAlchemy models
│   ├── user.py
│   ├── bill.py
│   ├── template.py
│   ├── workflow.py
│   └── change_tracking.py
│
├── routes/                         # API endpoints
│   ├── auth.py
│   ├── bills.py
│   ├── templates.py
│   ├── compliance.py
│   ├── gemini.py
│   └── admin.py
│
├── services/                       # Business logic
│   ├── template_engine.py          # Template matching
│   ├── template_marketplace.py     # Marketplace logic
│   ├── gemini_service.py           # Gemini integration
│   ├── rag_compliance.py           # RAG engine
│   ├── change_tracking.py          # Change tracking
│   ├── workflow_automation.py      # Workflow engine
│   └── document_generator.py       # PDF/Excel generation
│
├── ai/                             # AI/ML modules
│   ├── classifier.py               # Bill classification
│   ├── layout_detector.py          # Layout detection
│   ├── table_extractor.py          # Table extraction
│   └── ocr_engine.py               # OCR processing
│
├── utils/                          # Utility functions
│   ├── bill_generator.py           # Bill generation
│   ├── validators.py               # Data validation
│   └── helpers.py                  # Helper functions
│
├── bill_templates/                 # Template system
│   ├── layouts/                    # Layout classifiers
│   ├── base/                       # Base templates
│   ├── orgs/                       # Org-specific templates
│   └── schemas/                    # Normalized schemas
│
└── tests/                          # Test suite
    ├── test_api.py
    ├── test_services.py
    └── test_ai.py
```

## Current Tasks (Sprint 1)

### Completed ✅
- [x] Set up FastAPI project structure
- [x] Create data models (User, Bill, Template, etc.)
- [x] Implement template engine with layout detection
- [x] Build hierarchical template system
- [x] Create 4 layout classifiers
- [x] Implement 5 base templates
- [x] Build normalized invoice schema
- [x] Create template marketplace service
- [x] Implement Gemini service integration
- [x] Build RAG compliance engine
- [x] Create change tracking service
- [x] Implement workflow automation
- [x] Build document generator
- [x] Create sample data files

### In Progress 🔄
- [ ] Implement JWT authentication
- [ ] Build OCR processing pipeline
- [ ] Create bill classification model
- [ ] Implement template matching algorithm
- [ ] Build field extraction engine
- [ ] Create API documentation (Swagger)
- [ ] Set up Redis caching
- [ ] Implement Celery task queue

### Upcoming 📋
- [ ] Train custom OCR model
- [ ] Optimize template matching performance
- [ ] Implement vector database for RAG
- [ ] Build compliance rule engine
- [ ] Create webhook system
- [ ] Implement rate limiting
- [ ] Add monitoring and logging
- [ ] Write comprehensive tests
- [ ] Set up CI/CD pipeline
- [ ] Deploy to production

## API Endpoints (Your Responsibility)

### Authentication APIs
```python
POST   /api/auth/register          # User registration
POST   /api/auth/login             # User login
POST   /api/auth/logout            # User logout
POST   /api/auth/refresh           # Refresh token
GET    /api/auth/verify            # Verify token
POST   /api/auth/forgot-password   # Password reset
```

### Bill Processing APIs
```python
POST   /api/bills/upload           # Upload bill
GET    /api/bills                  # List bills
GET    /api/bills/{id}             # Get bill details
PUT    /api/bills/{id}             # Update bill
DELETE /api/bills/{id}             # Delete bill
POST   /api/bills/{id}/process     # Process bill
GET    /api/bills/{id}/status      # Get processing status
POST   /api/bills/{id}/extract     # Extract fields
GET    /api/bills/stats            # Get statistics
```

### Template APIs
```python
GET    /api/templates              # List templates
GET    /api/templates/{id}         # Get template
POST   /api/templates              # Create template
PUT    /api/templates/{id}         # Update template
DELETE /api/templates/{id}         # Delete template
POST   /api/templates/match        # Match bill to template
GET    /api/templates/search       # Search templates
GET    /api/templates/categories   # Get categories
```

### Compliance APIs
```python
POST   /api/compliance/check       # Check compliance
GET    /api/compliance/rules       # Get rules
POST   /api/compliance/validate    # Validate bill
GET    /api/compliance/report      # Generate report
POST   /api/compliance/query       # RAG query
```

### Gemini APIs
```python
POST   /api/gemini/chat            # Chat with Gemini
POST   /api/gemini/analyze         # Analyze bill
POST   /api/gemini/extract         # Extract data
GET    /api/gemini/suggestions     # Get suggestions
```

### Admin APIs (for Tushar)
```python
GET    /api/admin/users            # List users
POST   /api/admin/users            # Create user
PUT    /api/admin/users/{id}       # Update user
DELETE /api/admin/users/{id}       # Delete user
GET    /api/admin/bills            # List all bills
GET    /api/admin/templates        # List all templates
PUT    /api/admin/templates/{id}/approve  # Approve template
GET    /api/admin/activity         # Get activity logs
GET    /api/admin/settings         # Get settings
PUT    /api/admin/settings         # Update settings
GET    /api/admin/stats            # Get platform stats
```

### Workflow APIs
```python
GET    /api/workflows              # List workflows
POST   /api/workflows              # Create workflow
GET    /api/workflows/{id}         # Get workflow
PUT    /api/workflows/{id}         # Update workflow
POST   /api/workflows/{id}/execute # Execute workflow
GET    /api/workflows/{id}/status  # Get status
```

## Development Workflow

### Daily Routine
1. Pull latest changes from main branch
2. Review assigned tasks in TASKS.md
3. Update task status in CONTRIBUTION.md
4. Write code following Python best practices
5. Test locally with `uvicorn main:app --reload`
6. Run tests with `pytest`
7. Commit with descriptive messages
8. Create pull request for review
9. Update API documentation

### Code Standards
- Follow PEP 8 style guide
- Use type hints for all functions
- Write docstrings for all public functions
- Use async/await for I/O operations
- Implement proper error handling
- Log all important operations
- Write unit tests for all services
- Keep functions small and focused

### Testing Strategy
- Unit tests for all services (pytest)
- Integration tests for API endpoints
- Load testing for performance
- Security testing for vulnerabilities
- AI model accuracy testing
- End-to-end testing with frontend

## Collaboration Points

### With Tushar (.NET Admin)
- **Daily**: API contract discussions
- **Weekly**: Integration testing
- **As needed**: Database schema, authentication flow

### With Shivansh & Bhavya (Frontend)
- **Daily**: API endpoint discussions
- **Weekly**: Data format alignment
- **As needed**: WebSocket events, real-time updates

## Learning Resources

### FastAPI & Python
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Python Best Practices](https://docs.python-guide.org/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)

### AI/ML
- [TensorFlow Tutorials](https://www.tensorflow.org/tutorials)
- [Hugging Face Transformers](https://huggingface.co/docs/transformers/)
- [LangChain Documentation](https://python.langchain.com/)

### OCR & Computer Vision
- [Tesseract OCR](https://github.com/tesseract-ocr/tesseract)
- [OpenCV Tutorials](https://docs.opencv.org/master/d9/df8/tutorial_root.html)
- [Google Cloud Vision](https://cloud.google.com/vision/docs)

## Success Metrics

### Code Quality
- 85%+ code coverage with tests
- Zero critical security vulnerabilities
- All API endpoints documented
- Code reviews approved

### Performance
- API response time < 200ms (95th percentile)
- OCR processing < 5 seconds per page
- Template matching < 1 second
- Database queries optimized

### AI/ML
- OCR accuracy > 95%
- Template matching accuracy > 90%
- Classification accuracy > 92%
- RAG relevance score > 0.8

### Delivery
- Sprint tasks completed on time
- Zero production bugs
- API documentation up to date
- All tests passing

## Support & Escalation

### Technical Issues
- Check FastAPI/Python documentation
- Search Stack Overflow
- Ask in team Slack channel
- Escalate to tech lead if blocked > 4 hours

### Blockers
- Frontend needs API: Prioritize endpoint creation
- Admin needs data: Coordinate with Tushar
- AI model issues: Research and experiment

---

**Your Impact**: The Python backend is the brain of KiroTax AI. Your work powers all AI features, data processing, and business logic.

**Next Steps**:
1. Review TASKS.md for current sprint
2. Set up development environment (TECH_STACK.md)
3. Start with authentication and core APIs
4. Update CONTRIBUTION.md daily
