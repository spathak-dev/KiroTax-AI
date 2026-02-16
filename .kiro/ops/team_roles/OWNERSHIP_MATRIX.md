# KiroTax AI - Ownership Matrix

## Document Information

| Property | Value |
|----------|-------|
| Version | 1.0.0 |
| Last Updated | February 15, 2026 |
| Status | Production |
| Owner | Engineering Management |

## System Component Ownership

| Area | Primary Owner | Backup Owner | Responsibilities |
|------|---------------|--------------|------------------|
| **Agent Architecture** | Tushar | Harit | Agent design, tool integration, decision flow |
| **Backend Tools (Python)** | Harit | Tushar | OCR, template engine, AI integration, RAG |
| **Backend Services (.NET)** | Tushar | Harit | Auth, admin dashboard, audit, notifications |
| **Frontend Application** | Shivansh | Bhavya | Next.js app, routing, API integration |
| **UI Components** | Bhavya | Shivansh | Component library, forms, visualizations |
| **Infrastructure** | Shivansh | Tushar | Kubernetes, deployment, monitoring |
| **Database** | Harit | Tushar | Schema design, migrations, optimization |
| **Security** | Tushar | Harit | Authentication, authorization, encryption |
| **Evaluation** | Tushar | All | Testing framework, metrics, quality assurance |
| **Documentation** | All | All | Architecture docs, API docs, user guides |

## Feature Ownership Matrix

### Core Features

| Feature | Owner | Backup | Status | Priority |
|---------|-------|--------|--------|----------|
| **RBAC System** | Tushar | Harit | In Progress | P0 |
| **Bill Processing Pipeline** | Harit | Tushar | Complete | P0 |
| **Template Engine** | Harit | Tushar | Complete | P0 |
| **Admin Dashboard** | Tushar | Shivansh | Complete | P0 |
| **Client Portal** | Shivansh | Bhavya | Planned | P0 |
| **CA Dashboard** | Shivansh | Bhavya | Planned | P1 |
| **Template Marketplace** | Bhavya | Shivansh | Planned | P1 |
| **Manual Bill Editor** | Shivansh | Bhavya | Planned | P1 |
| **RAG Compliance Engine** | Harit | Tushar | Planned | P1 |
| **Gemini Integration** | Harit | Tushar | Complete | P0 |
| **Document Generator** | Harit | Tushar | Planned | P2 |
| **CA Workflow Automation** | Harit | Shivansh | Planned | P2 |
| **Change Tracking** | Tushar | Harit | Complete | P1 |

### API Endpoints Ownership

#### Python API (Owner: Harit)

| Endpoint | Method | Owner | Status |
|----------|--------|-------|--------|
| `/api/bills/upload` | POST | Harit | ✅ Complete |
| `/api/bills/{id}` | GET | Harit | ✅ Complete |
| `/api/bills/` | GET | Harit | ✅ Complete |
| `/api/bills/{id}/reprocess` | POST | Harit | 🔄 In Progress |
| `/api/templates/detect` | POST | Harit | ✅ Complete |
| `/api/templates/` | GET | Harit | ✅ Complete |
| `/api/templates/` | POST | Harit | 📋 Planned |
| `/api/compliance/validate` | POST | Harit | 📋 Planned |
| `/api/ai/extract` | POST | Harit | ✅ Complete |
| `/api/ai/query` | POST | Harit | 📋 Planned |
| `/api/marketplace/templates` | GET | Harit | 📋 Planned |

#### .NET Auth API (Owner: Tushar)

| Endpoint | Method | Owner | Status |
|----------|--------|-------|--------|
| `/api/auth/register` | POST | Tushar | 📋 Planned |
| `/api/auth/login` | POST | Tushar | 📋 Planned |
| `/api/auth/refresh-token` | POST | Tushar | 📋 Planned |
| `/api/auth/logout` | POST | Tushar | 📋 Planned |
| `/api/auth/forgot-password` | POST | Tushar | 📋 Planned |
| `/api/auth/reset-password` | POST | Tushar | 📋 Planned |

#### .NET Admin API (Owner: Tushar)

| Endpoint | Method | Owner | Status |
|----------|--------|-------|--------|
| `/api/admin/users` | GET | Tushar | ✅ Complete |
| `/api/admin/users` | POST | Tushar | ✅ Complete |
| `/api/admin/users/{id}` | PUT | Tushar | ✅ Complete |
| `/api/admin/users/{id}` | DELETE | Tushar | ✅ Complete |
| `/api/admin/bills` | GET | Tushar | ✅ Complete |
| `/api/admin/templates` | GET | Tushar | ✅ Complete |
| `/api/admin/templates/{id}/approve` | PUT | Tushar | ✅ Complete |
| `/api/admin/activity` | GET | Tushar | ✅ Complete |
| `/api/admin/settings` | GET | Tushar | ✅ Complete |
| `/api/admin/settings` | PUT | Tushar | ✅ Complete |
| `/api/admin/stats` | GET | Tushar | ✅ Complete |

### Frontend Pages Ownership

| Page | Route | Owner | Status |
|------|-------|-------|--------|
| Login | `/login` | Shivansh | 📋 Planned |
| Register | `/register` | Shivansh | 📋 Planned |
| Dashboard | `/dashboard` | Shivansh | 📋 Planned |
| Bill Upload | `/dashboard/bills/upload` | Shivansh + Bhavya | 📋 Planned |
| Bill List | `/dashboard/bills` | Shivansh | 📋 Planned |
| Bill Detail | `/dashboard/bills/[id]` | Shivansh | 📋 Planned |
| Bill Editor | `/dashboard/bills/[id]/edit` | Shivansh | 📋 Planned |
| Template Marketplace | `/marketplace` | Bhavya | 📋 Planned |
| Template Detail | `/marketplace/[id]` | Bhavya | 📋 Planned |
| CA Dashboard | `/ca/dashboard` | Shivansh | 📋 Planned |
| CA Workflows | `/ca/workflows` | Shivansh | 📋 Planned |
| CA Clients | `/ca/clients` | Shivansh | 📋 Planned |

### Component Ownership

| Component | Owner | Status |
|-----------|-------|--------|
| Button, Input, Select (shadcn/ui) | Bhavya | ✅ Complete |
| Form Components | Bhavya | 🔄 In Progress |
| File Upload | Bhavya | 📋 Planned |
| Data Table | Bhavya | 📋 Planned |
| Charts | Bhavya | 📋 Planned |
| Template Card | Bhavya | 📋 Planned |
| Filter Sidebar | Bhavya | 📋 Planned |
| Bill Card | Shivansh | 📋 Planned |
| Document Viewer | Shivansh | 📋 Planned |
| Workflow Timeline | Shivansh | 📋 Planned |

## Review Obligations

### Code Review Matrix

| Reviewer | Reviews | Approval Authority |
|----------|---------|-------------------|
| **Tushar** | .NET code, Infrastructure, Security | .NET PRs, Infrastructure changes |
| **Harit** | Python code, AI/ML, Database | Python PRs, ML models, Schema changes |
| **Shivansh** | Frontend code, Architecture | Frontend PRs, Architecture decisions |
| **Bhavya** | UI components, Accessibility | Component PRs, Design system |

### Review Requirements

| Change Type | Required Reviewers | Approval Count |
|-------------|-------------------|----------------|
| Frontend PR | Shivansh OR Bhavya | 1 |
| Python PR | Harit | 1 |
| .NET PR | Tushar | 1 |
| Database Schema | Harit + Tushar | 2 |
| Infrastructure | Shivansh + Tushar | 2 |
| Security | Tushar + 1 other | 2 |
| API Contract | Owner + Consumer | 2 |

## Deployment Duties

### Deployment Ownership

| Environment | Primary | Backup | Responsibilities |
|-------------|---------|--------|------------------|
| **Development** | All | All | Local testing, debugging |
| **Staging** | Shivansh | Tushar | Deploy, smoke test, monitor |
| **Production** | Tushar | Shivansh | Deploy, validate, rollback if needed |

### Deployment Checklist Ownership

| Task | Owner | Backup |
|------|-------|--------|
| Pre-deployment testing | All | All |
| Database migrations | Harit | Tushar |
| Infrastructure updates | Shivansh | Tushar |
| Frontend deployment | Shivansh | Bhavya |
| Backend deployment | Harit + Tushar | Shivansh |
| Smoke testing | All | All |
| Monitoring setup | Shivansh | Tushar |
| Rollback execution | Tushar | Shivansh |
| Post-deployment validation | All | All |

## Testing Duties

### Test Ownership

| Test Type | Owner | Coverage Target |
|-----------|-------|-----------------|
| **Unit Tests (Python)** | Harit | >90% |
| **Unit Tests (.NET)** | Tushar | >90% |
| **Unit Tests (Frontend)** | Shivansh + Bhavya | >85% |
| **Integration Tests (API)** | Harit + Tushar | All endpoints |
| **E2E Tests** | Shivansh | Critical paths |
| **Performance Tests** | Harit | All APIs |
| **Security Tests** | Tushar | All auth flows |
| **Accessibility Tests** | Bhavya | All components |

### Test Execution Schedule

| Test Suite | Frequency | Owner | Trigger |
|------------|-----------|-------|---------|
| Unit Tests | Every commit | All | CI/CD |
| Integration Tests | Every PR | All | CI/CD |
| E2E Tests | Daily | Shivansh | Scheduled |
| Performance Tests | Weekly | Harit | Scheduled |
| Security Tests | Weekly | Tushar | Scheduled |
| Accessibility Tests | Per component | Bhavya | Manual |

## On-Call Rotation

### Primary On-Call Schedule

| Week | Primary | Backup | Focus |
|------|---------|--------|-------|
| Week 1 | Tushar | Harit | Infrastructure, Auth |
| Week 2 | Harit | Tushar | Backend, AI/ML |
| Week 3 | Shivansh | Bhavya | Frontend, UX |
| Week 4 | Tushar | Shivansh | Full stack |

### Escalation Path

```
Level 1: On-call engineer (15 min response)
    ↓
Level 2: Backup engineer (30 min response)
    ↓
Level 3: Technical lead (1 hour response)
    ↓
Level 4: Engineering manager (2 hour response)
```

## Communication Channels

### Primary Channels

| Channel | Purpose | Participants |
|---------|---------|--------------|
| #kirotax-dev | General development | All |
| #kirotax-backend | Backend discussions | Harit, Tushar |
| #kirotax-frontend | Frontend discussions | Shivansh, Bhavya |
| #kirotax-infra | Infrastructure | Shivansh, Tushar |
| #kirotax-incidents | Production issues | All |
| #kirotax-releases | Release coordination | All |

### Meeting Schedule

| Meeting | Frequency | Participants | Owner |
|---------|-----------|--------------|-------|
| Daily Standup | Daily, 10 AM | All | Rotating |
| Sprint Planning | Bi-weekly | All | Tushar |
| Architecture Review | Weekly | All | Shivansh |
| Code Review Session | Weekly | All | Rotating |
| Retrospective | Bi-weekly | All | Rotating |

## Decision Authority

### Technical Decisions

| Decision Type | Authority | Consultation Required |
|---------------|-----------|----------------------|
| Architecture changes | Shivansh | All team |
| Technology selection | Relevant owner | All team |
| API design | API owner | Consumers |
| Database schema | Harit | Tushar |
| Security policy | Tushar | All team |
| UI/UX changes | Shivansh | Bhavya |
| Infrastructure changes | Shivansh | Tushar |

### Approval Matrix

| Decision | Approver | Veto Power |
|----------|----------|------------|
| Major architecture | All team (consensus) | Any member |
| Breaking API changes | API owner + consumers | Consumers |
| Database migrations | Harit + Tushar | Either |
| Production deployment | Tushar | Tushar |
| Security changes | Tushar | Tushar |

## Knowledge Transfer

### Documentation Ownership

| Document Type | Owner | Update Frequency |
|---------------|-------|------------------|
| Architecture docs | Shivansh | Per major change |
| API documentation | API owner | Per API change |
| Deployment guides | Shivansh | Per infra change |
| User guides | Shivansh | Per feature release |
| Runbooks | On-call engineer | Per incident |

### Training Responsibilities

| Topic | Trainer | Trainees |
|-------|---------|----------|
| System architecture | Shivansh | All |
| Python backend | Harit | Tushar, Shivansh |
| .NET backend | Tushar | Harit, Shivansh |
| Frontend development | Shivansh | Bhavya |
| UI components | Bhavya | Shivansh |
| Infrastructure | Shivansh | Tushar |
| Security practices | Tushar | All |

---

## Document Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-02-15 | Engineering Management | Initial production release |

## Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Technical Lead | Tushar | _________ | ______ |
| Backend Lead | Harit | _________ | ______ |
| Frontend Lead | Shivansh | _________ | ______ |
| Engineering Manager | _________ | _________ | ______ |
