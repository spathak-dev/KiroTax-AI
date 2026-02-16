# Harit - Current Tasks

## Sprint: Week 1-2 (Template Engine Enhancement)

### Priority 1: Template System Expansion
- [ ] Add 10 new base templates
  - [ ] Petrol pump receipt
  - [ ] Supermarket bill
  - [ ] Medical invoice
  - [ ] Hotel bill
  - [ ] Telecom bill
  - [ ] Utility bill (electricity/water)
  - [ ] Insurance invoice
  - [ ] Professional services invoice
  - [ ] Rental receipt
  - [ ] Education fee receipt
- [ ] Implement ML template detection
  - [ ] Collect training data (100+ samples per template)
  - [ ] Train classification model
  - [ ] Integrate model with template engine
  - [ ] Add confidence scoring
  - [ ] Fallback to rule-based detection
- [ ] Build template editor API
  - [ ] POST /api/templates/create
  - [ ] PUT /api/templates/{id}
  - [ ] GET /api/templates/{id}/validate
  - [ ] POST /api/templates/{id}/test
- [ ] Add template versioning
  - [ ] Version tracking in database
  - [ ] Migration between versions
  - [ ] Rollback capability
- [ ] Write comprehensive tests
  - [ ] Unit tests for each template
  - [ ] Integration tests for pipeline
  - [ ] Performance tests

### Priority 2: OCR Enhancement
- [ ] Implement hybrid OCR approach
  - [ ] Set up Tesseract OCR
  - [ ] Integrate Google Vision API
  - [ ] Add confidence-based routing
  - [ ] Cost optimization logic
- [ ] Add image preprocessing
  - [ ] Deskew images
  - [ ] Enhance contrast
  - [ ] Remove noise
  - [ ] Binarization
- [ ] Handle multi-page PDFs
  - [ ] PDF to image conversion
  - [ ] Page detection
  - [ ] Page stitching for long receipts
  - [ ] Page number extraction
- [ ] Support multiple languages
  - [ ] Hindi
  - [ ] English
  - [ ] Regional languages (Marathi, Tamil, etc.)
- [ ] Optimize for speed
  - [ ] Parallel processing
  - [ ] Caching OCR results
  - [ ] Batch processing

### Priority 3: Bill Processing Pipeline
- [ ] Improve field extraction accuracy
  - [ ] Better regex patterns
  - [ ] Context-aware extraction
  - [ ] Validation rules
- [ ] Add quality validation
  - [ ] Completeness check
  - [ ] Format validation
  - [ ] Business rule validation
- [ ] Implement error handling
  - [ ] Retry logic
  - [ ] Fallback strategies
  - [ ] Error reporting
- [ ] Add processing metrics
  - [ ] Success rate tracking
  - [ ] Processing time monitoring
  - [ ] Error categorization

## Sprint: Week 3-4 (RAG Compliance Engine)

### Priority 1: Vector Database Setup
- [ ] Choose vector DB (Pinecone vs Weaviate)
- [ ] Set up vector database
- [ ] Configure connection
- [ ] Create indexes
- [ ] Test performance

### Priority 2: Compliance Rule Corpus
- [ ] Collect GST compliance rules
- [ ] Collect income tax rules
- [ ] Collect industry-specific rules
- [ ] Structure rules in JSON format
- [ ] Create embeddings

### Priority 3: Validation API
- [ ] Build embedding pipeline
- [ ] Implement semantic search
- [ ] Create validation logic
- [ ] Add audit logging
- [ ] Write tests

## Sprint: Week 5-6 (AI/ML Advanced Features)

### Priority 1: Fraud Detection
- [ ] Define fraud patterns
- [ ] Collect training data
- [ ] Train detection model
- [ ] Integrate with pipeline
- [ ] Add alerting

### Priority 2: Natural Language Query
- [ ] Design query interface
- [ ] Implement query parser
- [ ] Build response generator
- [ ] Add query history
- [ ] Test with sample queries

### Priority 3: Smart Categorization
- [ ] Define categories
- [ ] Train categorization model
- [ ] Auto-categorize bills
- [ ] Add manual override
- [ ] Track accuracy

## Backlog

### Template Marketplace Backend
- [ ] Template submission API
- [ ] Review & approval workflow
- [ ] Rating & review system
- [ ] Download tracking
- [ ] Revenue sharing logic

### CA Workflow Automation
- [ ] Workflow definition engine
- [ ] Task assignment
- [ ] Approval chains
- [ ] Deadline tracking
- [ ] Notification triggers

### Document Generator
- [ ] PDF generation
- [ ] Excel export
- [ ] Custom templates
- [ ] Batch generation

## Blocked

- Waiting for Gemini API key increase (current limit: 60 RPM)
- Need sample bills for new templates (coordinating with team)

## Completed ✅

- [x] Template engine architecture
- [x] 5 base templates (GST, Restaurant, Retail, E-commerce, Amazon)
- [x] 4 layout classifiers
- [x] Universal normalized schema
- [x] Basic Gemini integration
- [x] Bill generator utility
- [x] Template documentation
- [x] Sample data generation

## Notes

- Coordinate with Tushar on database schema for bills/templates
- Sync with Shivansh on API response formats
- Review Gemini API usage and costs
- Set up monitoring for OCR accuracy

## Time Tracking

| Task | Estimated | Actual | Status |
|------|-----------|--------|--------|
| Template System | 40h | 35h | ✅ Complete |
| Template Enhancement | 24h | - | 🔄 In Progress |
| RAG Engine | 32h | - | 📋 Planned |
| AI Features | 40h | - | 📋 Planned |

## API Endpoints Status

| Endpoint | Method | Status | Priority |
|----------|--------|--------|----------|
| /api/bills/upload | POST | ✅ Complete | High |
| /api/bills/{id} | GET | ✅ Complete | High |
| /api/bills/ | GET | ✅ Complete | High |
| /api/bills/{id}/reprocess | POST | 🔄 In Progress | Medium |
| /api/templates/detect | POST | ✅ Complete | High |
| /api/templates/ | GET | ✅ Complete | High |
| /api/templates/ | POST | 📋 Planned | Medium |
| /api/compliance/validate | POST | 📋 Planned | High |
| /api/ai/extract | POST | ✅ Complete | High |
| /api/ai/query | POST | 📋 Planned | Medium |
| /api/marketplace/templates | GET | 📋 Planned | Low |

## Performance Metrics

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Bill processing time | < 5s | 3.2s | ✅ |
| OCR accuracy | > 98% | 96% | 🔄 |
| Template detection accuracy | > 90% | 88% | 🔄 |
| API response time (p95) | < 200ms | 180ms | ✅ |
| System uptime | 99.9% | 99.5% | 🔄 |

## Daily Updates

### 2026-02-15
- Completed template system architecture
- Created 5 base templates
- Implemented layout detection
- Next: Start template expansion
- Blocked: Need more sample bills for testing
