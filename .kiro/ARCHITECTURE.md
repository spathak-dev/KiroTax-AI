# KiroTax AI - System Architecture

## Overview

KiroTax AI is a comprehensive tax compliance and bill processing platform built with a microservices architecture. The system combines AI-powered document processing, role-based access control, and workflow automation to streamline tax operations for CAs, auditors, and clients.

## Technology Stack

### Frontend Layer
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **State Management**: React Context + Zustand
- **API Client**: Axios
- **Form Handling**: React Hook Form
- **Validation**: Zod

### Backend Layer - Python (FastAPI)
- **Framework**: FastAPI
- **Language**: Python 3.11+
- **Database**: PostgreSQL (production), SQLite (dev)
- **ORM**: SQLAlchemy
- **Authentication**: JWT + OAuth2
- **AI/ML**: Google Gemini API, OpenAI
- **OCR**: Tesseract, Google Vision API
- **Task Queue**: Celery + Redis
- **File Storage**: AWS S3 / Local

### Backend Layer - .NET (Admin Microservice)
- **Framework**: .NET 9 Blazor Server
- **Language**: C#
- **Database**: SQLite (local admin)
- **ORM**: Entity Framework Core
- **UI**: Blazor Interactive Server Components
- **Styling**: Bootstrap 5

### Infrastructure
- **Containerization**: Docker + Docker Compose
- **Reverse Proxy**: Nginx
- **Message Queue**: Redis
- **Monitoring**: Prometheus + Grafana (planned)
- **Logging**: ELK Stack (planned)

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│  Next.js Frontend (Port 3000)                                   │
│  - User Dashboard                                                │
│  - Bill Upload & Management                                      │
│  - Template Marketplace                                          │
│  - Compliance Reports                                            │
│  - CA Workflow Tools                                             │
└────────────────────┬────────────────────────────────────────────┘
                     │ HTTPS/REST API
┌────────────────────┴────────────────────────────────────────────┐
│                      API GATEWAY / NGINX                         │
└────────────────────┬────────────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
┌───────▼──────────┐    ┌────────▼─────────────┐
│  Python Backend  │    │  .NET Admin Panel    │
│  (FastAPI)       │    │  (Blazor Server)     │
│  Port 8000       │    │  Port 5001           │
├──────────────────┤    ├──────────────────────┤
│ • RBAC System    │    │ • User Management    │
│ • Bill Pipeline  │    │ • Template Approval  │
│ • OCR Engine     │    │ • System Settings    │
│ • Template Eng.  │    │ • Activity Logs      │
│ • Gemini AI      │    │ • Bill Monitoring    │
│ • RAG Compliance │    └──────────────────────┘
│ • Workflows      │
│ • Document Gen.  │
└────────┬─────────┘
         │
    ┌────┴─────┐
    │          │
┌───▼───┐  ┌──▼────┐
│ Redis │  │ Celery│
│ Queue │  │Workers│
└───────┘  └───────┘
    │
┌───▼──────────────┐
│   PostgreSQL     │
│   Database       │
└──────────────────┘
```

## Core Modules

### 1. RBAC System (Role-Based Access Control)
**Owner**: Harit (Python) + Tushar (.NET Integration)

- User authentication and authorization
- Role management (Admin, CA, Auditor, Client)
- Permission-based access control
- Organization hierarchy
- Multi-tenant support

**Tech**: FastAPI + JWT + PostgreSQL

### 2. Bill Processing Pipeline
**Owner**: Harit (Python Backend) + Shivansh (Frontend UI)

- OCR document scanning
- Layout detection (4 types: standard, long receipt, multi-page, tabular)
- Template matching engine
- Field extraction with regex + AI
- Data normalization to universal schema
- Multi-page bill stitching
- Confidence scoring

**Tech**: Tesseract OCR + Google Vision + Gemini AI + Template Engine

### 3. Template System
**Owner**: Harit (Python) + Bhavya (Frontend Marketplace)

- Hierarchical template structure (base → layout → org-specific)
- 1000+ bill format support
- Template detection rules (keywords, regex, layout)
- Universal normalized invoice schema
- Template marketplace
- Version control

**Tech**: JSON-based templates + Python template engine

### 4. Template Marketplace
**Owner**: Bhavya (Frontend) + Harit (Backend API)

- Template browsing and search
- Template submission workflow
- Admin approval system
- Rating and reviews
- Download tracking
- Pricing (free/paid)

**Tech**: Next.js + FastAPI + PostgreSQL

### 5. Gemini AI Integration
**Owner**: Harit (Python) + Shivansh (Frontend Chat UI)

- Natural language bill queries
- Intelligent field extraction
- Bill anomaly detection
- Compliance suggestions
- Conversational interface

**Tech**: Google Gemini API + FastAPI

### 6. RAG Compliance Engine
**Owner**: Harit (Python) + Bhavya (Frontend Reports)

- Tax law knowledge base
- Compliance rule checking
- Automated audit reports
- Regulation updates
- Context-aware suggestions

**Tech**: LangChain + Vector DB + Gemini

### 7. CA Workflow Automation
**Owner**: Harit (Python) + Shivansh (Frontend Workflow UI)

- Workflow templates
- Task assignment
- Status tracking
- Deadline management
- Notification system
- Client communication

**Tech**: FastAPI + Celery + Redis

### 8. Document Generator
**Owner**: Harit (Python) + Bhavya (Frontend Templates)

- PDF generation from templates
- Excel export
- Custom report builder
- Bulk document generation
- Template customization

**Tech**: ReportLab + Pandas + Jinja2

### 9. Manual Bill Editor
**Owner**: Shivansh (Frontend) + Harit (Backend API)

- Visual bill editor
- Field correction interface
- Validation rules
- Undo/redo support
- Real-time preview

**Tech**: Next.js + React + FastAPI

### 10. Change Tracking System
**Owner**: Harit (Python) + Tushar (.NET Admin)

- Audit trail for all changes
- Version history
- User activity logs
- Compliance reporting
- Data integrity checks

**Tech**: PostgreSQL + Event Sourcing

### 11. Admin Dashboard (.NET)
**Owner**: Tushar (.NET Blazor)

- User management interface
- Bill processing monitoring
- Template approval workflow
- System settings
- Activity logs
- Statistics dashboard

**Tech**: .NET 9 Blazor Server + EF Core + SQLite

## Data Flow

### Bill Processing Flow
```
1. User uploads bill (Frontend)
   ↓
2. File stored in S3/Local (Backend)
   ↓
3. OCR extraction (Tesseract/Vision API)
   ↓
4. Layout detection (Template Engine)
   ↓
5. Template matching (Rule Engine)
   ↓
6. Field extraction (Regex + AI)
   ↓
7. Data normalization (Universal Schema)
   ↓
8. Validation & confidence scoring
   ↓
9. Store in database (PostgreSQL)
   ↓
10. User review & correction (Frontend)
```

### Authentication Flow
```
1. User login (Frontend)
   ↓
2. Credentials validation (FastAPI)
   ↓
3. JWT token generation
   ↓
4. Token stored in client (HttpOnly cookie)
   ↓
5. Subsequent requests include token
   ↓
6. Token validation middleware
   ↓
7. Role-based access check
   ↓
8. API response
```

## Database Schema

### Core Tables

**users**
- id, email, password_hash, name, role, org_id, is_active, created_at

**organizations**
- id, name, gstin, address, subscription_tier, created_at

**bills**
- id, user_id, org_id, file_path, status, invoice_number, vendor_name, grand_total, extracted_data (JSON), confidence_score, created_at

**templates**
- id, name, category, layout_type, detection_rules (JSON), field_mappings (JSON), status, price, downloads, rating, created_at

**workflows**
- id, name, org_id, steps (JSON), status, assigned_to, deadline, created_at

**activity_logs**
- id, user_id, action, entity_type, entity_id, changes (JSON), timestamp

**compliance_rules**
- id, rule_name, description, regulation_ref, validation_logic (JSON), severity, created_at

## API Structure

### Python FastAPI Endpoints

```
/api/v1/auth/
  POST   /register
  POST   /login
  POST   /logout
  GET    /me
  POST   /refresh

/api/v1/bills/
  GET    /
  POST   /upload
  GET    /{id}
  PUT    /{id}
  DELETE /{id}
  POST   /{id}/reprocess

/api/v1/templates/
  GET    /
  POST   /
  GET    /{id}
  PUT    /{id}
  DELETE /{id}
  POST   /{id}/approve

/api/v1/workflows/
  GET    /
  POST   /
  GET    /{id}
  PUT    /{id}
  POST   /{id}/assign

/api/v1/compliance/
  POST   /check
  GET    /rules
  GET    /reports

/api/v1/gemini/
  POST   /query
  POST   /extract
  POST   /analyze

/api/v1/documents/
  POST   /generate
  GET    /{id}/download
```

### .NET Admin Endpoints

```
/users
/bills
/templates
/activity
/settings
```

## Security

### Authentication
- JWT tokens with 24h expiry
- Refresh tokens with 30d expiry
- HttpOnly cookies for token storage
- CSRF protection

### Authorization
- Role-based access control (RBAC)
- Permission-based resource access
- Organization-level data isolation
- API rate limiting

### Data Protection
- Password hashing (bcrypt)
- Encrypted file storage
- SQL injection prevention (ORM)
- XSS protection
- CORS configuration

## Deployment

### Development
```bash
# Frontend
cd KiroTax-AI-Frontend
npm run dev

# Python Backend
cd backend
uvicorn main:app --reload

# .NET Admin
cd KiroTax-AI/backend/microservices/admin
dotnet run
```

### Production (Docker)
```bash
docker-compose up -d
```

### Environment Variables
```
# Python Backend
DATABASE_URL=postgresql://user:pass@localhost/kirotax
REDIS_URL=redis://localhost:6379
GEMINI_API_KEY=xxx
AWS_ACCESS_KEY=xxx
JWT_SECRET=xxx

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000

# .NET Admin
ConnectionStrings__DefaultConnection=Data Source=admin.db
```

## Performance Considerations

### Caching Strategy
- Redis for session data
- API response caching (5min TTL)
- Template caching in memory
- Static asset CDN

### Optimization
- Database indexing on frequently queried fields
- Lazy loading for large datasets
- Image compression for uploaded bills
- Async processing for OCR tasks
- Connection pooling

### Scalability
- Horizontal scaling with load balancer
- Celery workers for background tasks
- Database read replicas
- Microservices architecture

## Monitoring & Logging

### Metrics (Planned)
- API response times
- Error rates
- Bill processing success rate
- User activity
- System resource usage

### Logging
- Application logs (INFO, ERROR, DEBUG)
- Access logs
- Audit logs
- Error tracking

## Future Enhancements

1. Mobile app (React Native)
2. Real-time collaboration
3. Advanced analytics dashboard
4. Machine learning model training
5. Blockchain for audit trail
6. Multi-language support
7. Voice commands
8. Automated tax filing

## Team Responsibilities

- **Tushar**: .NET Admin Dashboard, DevOps, Architecture
- **Harit**: Python Backend (All APIs, AI/ML, Core Logic)
- **Shivansh**: Next.js Frontend (Bill Management, Workflows, Editor)
- **Bhavya**: Next.js Frontend (Marketplace, Reports, Templates)

## Documentation

- API Documentation: `/docs` (FastAPI Swagger)
- Architecture: `.kiro/ARCHITECTURE.md`
- Deployment: `DEPLOYMENT.md`
- Team Roles: `.kiro/team role/`
- Specs: `.kiro/specs/`
