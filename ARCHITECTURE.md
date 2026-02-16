# KiroTax AI - System Architecture

## Overview

KiroTax AI is a full-stack AI-powered GST automation platform built for Indian MSMEs, CAs, and Auditors. The system follows a modern microservices-inspired architecture with clear separation of concerns.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Web App    │  │  Mobile App  │  │   Admin UI   │      │
│  │  (Next.js)   │  │   (Future)   │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTPS/REST
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     API Gateway / LB                         │
│                    (AWS ALB / Nginx)                         │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Application Layer                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              FastAPI Backend                         │   │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐    │   │
│  │  │   Auth     │  │   Bills    │  │    GST     │    │   │
│  │  │  Service   │  │  Service   │  │  Service   │    │   │
│  │  └────────────┘  └────────────┘  └────────────┘    │   │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐    │   │
│  │  │    OCR     │  │  Template  │  │   Fraud    │    │   │
│  │  │  Service   │  │  Service   │  │  Detector  │    │   │
│  │  └────────────┘  └────────────┘  └────────────┘    │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      AI/ML Layer                             │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐           │
│  │ PaddleOCR  │  │  OpenCV    │  │  Sklearn   │           │
│  │  Engine    │  │  Vision    │  │   Models   │           │
│  └────────────┘  └────────────┘  └────────────┘           │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      Data Layer                              │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐           │
│  │  MongoDB   │  │  AWS S3    │  │   Redis    │           │
│  │ (Primary)  │  │ (Storage)  │  │  (Cache)   │           │
│  └────────────┘  └────────────┘  └────────────┘           │
└─────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod
- **Charts**: Recharts
- **HTTP Client**: Axios

### Backend
- **Framework**: FastAPI (Python)
- **Language**: Python 3.11+
- **Database**: MongoDB (Motor async driver)
- **Authentication**: JWT (python-jose)
- **Password Hashing**: Passlib with bcrypt
- **File Upload**: python-multipart

### AI/ML
- **OCR**: PaddleOCR
- **Computer Vision**: OpenCV
- **PDF Processing**: PyPDF2, pdf2image
- **Data Processing**: Pandas, NumPy
- **ML**: Scikit-learn

### Infrastructure
- **Containerization**: Docker
- **Orchestration**: Docker Compose / Kubernetes
- **Cloud**: AWS (EC2, S3, ECS, RDS)
- **CDN**: CloudFront
- **Load Balancer**: AWS ALB

## Data Flow

### Bill Upload & Processing Flow

```
1. User uploads bill (PDF/Image)
   ↓
2. Frontend sends to /bills/upload
   ↓
3. Backend saves to S3/local storage
   ↓
4. Creates bill record in MongoDB (status: uploaded)
   ↓
5. Triggers OCR processing
   ↓
6. PaddleOCR extracts text + coordinates
   ↓
7. Layout detector identifies structure
   ↓
8. Template matcher finds matching template
   ↓
9. Data extractor parses fields (invoice #, GSTIN, amounts)
   ↓
10. GST engine validates and computes tax
   ↓
11. Fraud detector checks for anomalies
   ↓
12. Updates bill record (status: processed)
   ↓
13. Frontend polls/receives update
   ↓
14. User views extracted data
```

### GST Report Generation Flow

```
1. User selects month/year and report type
   ↓
2. Frontend calls /gst/generate
   ↓
3. Backend fetches all processed bills for period
   ↓
4. GST engine aggregates data
   ↓
5. Generates GSTR-1 or GSTR-3B format
   ↓
6. Validates against GST rules
   ↓
7. Saves report to MongoDB
   ↓
8. Optionally exports to Excel
   ↓
9. Returns report data to frontend
   ↓
10. User downloads or views report
```

## Security Architecture

### Authentication Flow

```
1. User submits credentials
   ↓
2. Backend validates against MongoDB
   ↓
3. Password verified using bcrypt
   ↓
4. JWT token generated with user ID + role
   ↓
5. Token returned to client
   ↓
6. Client stores in localStorage
   ↓
7. Subsequent requests include token in Authorization header
   ↓
8. Backend validates token on each request
   ↓
9. RBAC checks user role against endpoint permissions
```

### Security Layers

1. **Transport Security**: HTTPS/TLS 1.3
2. **Authentication**: JWT with expiration
3. **Authorization**: Role-Based Access Control (RBAC)
4. **Input Validation**: Pydantic models
5. **SQL Injection**: N/A (NoSQL with parameterized queries)
6. **XSS Protection**: React auto-escaping
7. **CSRF Protection**: SameSite cookies
8. **Rate Limiting**: API throttling
9. **File Upload**: Type and size validation
10. **Data Encryption**: At rest (S3) and in transit (HTTPS)

## Database Schema

### Users Collection
```javascript
{
  _id: "uuid",
  email: "user@example.com",
  name: "John Doe",
  role: "client|ca|auditor|admin",
  company: "ABC Pvt Ltd",
  password_hash: "bcrypt_hash",
  created_at: ISODate(),
  updated_at: ISODate(),
  is_active: true
}
```

### Bills Collection
```javascript
{
  _id: "uuid",
  user_id: "user_uuid",
  file_name: "invoice.pdf",
  file_url: "s3://bucket/path",
  file_type: "application/pdf",
  status: "uploaded|processing|processed|failed",
  extracted_data: {
    invoice_number: "INV-001",
    invoice_date: "2024-01-15",
    vendor_name: "Vendor ABC",
    vendor_gstin: "29ABCDE1234F1Z5",
    subtotal: 10000,
    cgst_total: 900,
    sgst_total: 900,
    igst_total: 0,
    total_tax: 1800,
    grand_total: 11800,
    confidence_score: 0.95,
    items: []
  },
  gst_data: {
    is_interstate: false,
    place_of_supply: "Karnataka"
  },
  template_id: "template_uuid",
  created_at: ISODate(),
  updated_at: ISODate(),
  processed_at: ISODate()
}
```

### Templates Collection
```javascript
{
  _id: "uuid",
  user_id: "user_uuid",
  name: "Vendor ABC Template",
  vendor_name: "Vendor ABC",
  fields: [
    {
      field_name: "invoice_number",
      field_type: "text",
      coordinates: { x: 100, y: 50, width: 200, height: 30 },
      keywords: ["Invoice No", "Bill No"],
      regex_pattern: "INV-\\d+"
    }
  ],
  usage_count: 25,
  accuracy_score: 0.96,
  created_at: ISODate(),
  updated_at: ISODate()
}
```

## API Design

### RESTful Principles
- Resource-based URLs
- HTTP methods (GET, POST, PUT, DELETE)
- Status codes (200, 201, 400, 401, 403, 404, 500)
- JSON request/response
- Pagination for list endpoints
- Filtering and sorting

### API Versioning
- URL-based: `/api/v1/...`
- Header-based: `Accept: application/vnd.kirotax.v1+json`

### Rate Limiting
- 100 requests/minute per user
- 1000 requests/hour per user
- Burst allowance: 20 requests

## Scalability Considerations

### Horizontal Scaling
- Stateless backend services
- Load balancer distribution
- Database read replicas
- Shared session storage (Redis)

### Vertical Scaling
- Increase instance sizes
- Optimize database queries
- Add indexes

### Caching Strategy
- Redis for session data
- CloudFront for static assets
- Application-level caching for templates

### Async Processing
- Background jobs for OCR processing
- Queue-based architecture (Celery/RQ)
- Webhook notifications

## Monitoring & Observability

### Metrics
- Request rate and latency
- Error rates
- OCR processing time
- Database query performance
- Storage usage

### Logging
- Structured JSON logs
- Log levels (DEBUG, INFO, WARNING, ERROR)
- Centralized logging (CloudWatch/ELK)

### Alerting
- High error rates
- Slow response times
- Database connection issues
- Storage capacity warnings

## Disaster Recovery

### Backup Strategy
- Daily MongoDB backups
- S3 versioning enabled
- Cross-region replication
- Point-in-time recovery

### Recovery Objectives
- RTO (Recovery Time Objective): 4 hours
- RPO (Recovery Point Objective): 1 hour

## Future Enhancements

1. **Mobile Apps**: iOS and Android native apps
2. **Real-time Collaboration**: WebSocket for live updates
3. **Advanced AI**: Custom ML models for specific vendors
4. **Blockchain**: Immutable audit trail
5. **Multi-language**: Support for regional languages
6. **Voice Interface**: Voice-based bill entry
7. **Integration**: ERP/accounting software connectors
8. **Analytics**: Advanced business intelligence
