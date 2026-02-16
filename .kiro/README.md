# KiroTax AI - Project Documentation

## Overview

KiroTax AI is an intelligent bill processing and compliance platform built for Chartered Accountants and their clients. The platform uses AI/ML to automate bill extraction, validation, and compliance checking.

## Directory Structure

```
.kiro/
├── specs/                    # Feature specifications
│   ├── rbac-system/
│   ├── bill-processing-pipeline/
│   ├── template-marketplace/
│   ├── change-tracking-system/
│   ├── manual-bill-editor/
│   ├── rag-compliance-engine/
│   ├── gemini-integration/
│   ├── document-generator/
│   └── ca-workflow-automation/
├── ops/                      # Operations & team management
│   ├── team_roles/          # Team member responsibilities
│   │   ├── tushar/          # .NET Backend Lead
│   │   ├── harit/           # Python Backend Lead
│   │   ├── shivansh/        # Frontend Lead
│   │   └── bhavya/          # Frontend Developer
│   ├── prs/                 # Pull request guidelines
│   ├── deployment/          # Deployment documentation
│   └── terraform/           # Infrastructure as Code
├── evaluation/              # Testing & quality assurance
│   ├── test_plans/
│   ├── metrics/
│   ├── benchmarks/
│   └── reports/
├── ARCHITECTURE.md          # System architecture
└── README.md               # This file
```

## Quick Links

### For Developers
- [Architecture Overview](./ARCHITECTURE.md)
- [Team Roles & Responsibilities](./ops/team_roles/README.md)
- [Pull Request Guidelines](./ops/prs/GUIDELINES.md)
- [Deployment Guide](./ops/deployment/README.md)

### For Team Members
- [Tushar - .NET Backend](./ops/team_roles/tushar/RESPONSIBILITIES.md)
- [Harit - Python Backend](./ops/team_roles/harit/RESPONSIBILITIES.md)
- [Shivansh - Frontend Lead](./ops/team_roles/shivansh/RESPONSIBILITIES.md)
- [Bhavya - Frontend Developer](./ops/team_roles/bhavya/RESPONSIBILITIES.md)

### For Project Management
- [Feature Roadmap](./specs/ROADMAP.md)
- [Implementation Summary](./specs/IMPLEMENTATION_SUMMARY.md)
- [Evaluation Metrics](./evaluation/README.md)

## Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **State**: Zustand + React Query
- **Testing**: Jest + React Testing Library

### Backend - Python
- **Framework**: FastAPI
- **Language**: Python 3.11+
- **ORM**: SQLAlchemy
- **AI/ML**: Google Gemini AI
- **OCR**: Tesseract + Google Vision API
- **Testing**: pytest

### Backend - .NET
- **Framework**: ASP.NET Core 9
- **Language**: C#
- **UI**: Blazor Server
- **ORM**: Entity Framework Core
- **Testing**: xUnit

### Infrastructure
- **Database**: PostgreSQL
- **Cache**: Redis
- **Storage**: AWS S3
- **Container**: Docker
- **Orchestration**: Kubernetes
- **IaC**: Terraform
- **CI/CD**: GitHub Actions

## Team Structure

| Name | Role | Stack | Focus |
|------|------|-------|-------|
| **Tushar** | Backend Lead | .NET / C# | Admin Dashboard, RBAC, Microservices |
| **Harit** | Backend Lead | Python / FastAPI | AI/ML, OCR, Template Engine, APIs |
| **Shivansh** | Frontend Lead | Next.js / React | Client Portal, CA Dashboard, Architecture |
| **Bhavya** | Frontend Developer | Next.js / React | UI Components, Forms, Marketplace |

## Features

### 1. RBAC System (Role-Based Access Control)
- User authentication & authorization
- Role management (Admin, CA, Auditor, Client)
- Permission system
- JWT token-based auth

### 2. Bill Processing Pipeline
- OCR text extraction
- Layout detection
- Template matching
- Field extraction
- Data normalization

### 3. Template Marketplace
- 1000+ bill format support
- Template submission & approval
- Rating & review system
- Download tracking

### 4. Change Tracking System
- Audit log for all changes
- Version history
- Rollback capability
- Change notifications

### 5. Manual Bill Editor
- Interactive bill editing
- Field-by-field correction
- Real-time validation
- Template preview

### 6. RAG Compliance Engine
- Vector database for compliance rules
- Semantic search
- Real-time validation
- Audit trail

### 7. Gemini Integration
- AI-powered extraction
- Intelligent field mapping
- Anomaly detection
- Natural language queries

### 8. Document Generator
- PDF generation
- Excel export
- Custom templates
- Batch generation

### 9. CA Workflow Automation
- Workflow definition engine
- Task assignment
- Approval chains
- Deadline tracking

## Development Workflow

1. **Feature Planning**: Review spec together
2. **Task Assignment**: Based on responsibility matrix
3. **Development**: Individual work with daily commits
4. **Code Review**: Peer review before merge
5. **Integration Testing**: Cross-team validation
6. **Deployment**: Coordinated release

## Getting Started

### Prerequisites
- Node.js 20+
- Python 3.11+
- .NET 9 SDK
- Docker
- PostgreSQL
- Redis

### Setup

#### Frontend
```bash
cd KiroTax-AI/frontend
npm install
npm run dev
```

#### Python Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

#### .NET Admin
```bash
cd KiroTax-AI/backend/microservices/admin
dotnet restore
dotnet run
```

#### Docker Compose (All Services)
```bash
docker-compose up
```

## Testing

### Run All Tests
```bash
# Frontend
npm test

# Python
pytest

# .NET
dotnet test
```

### Code Coverage
```bash
# Frontend
npm run test:coverage

# Python
pytest --cov

# .NET
dotnet test /p:CollectCoverage=true
```

## Deployment

### Staging
- Auto-deploy from `develop` branch
- URL: https://staging.kirotax.ai

### Production
- Manual deploy from `main` branch
- URL: https://app.kirotax.ai

See [Deployment Guide](./ops/deployment/README.md) for details.

## Contributing

1. Create feature branch from `develop`
2. Make changes
3. Write tests
4. Submit PR
5. Get approval
6. Merge to `develop`

See [PR Guidelines](./ops/prs/GUIDELINES.md) for details.

## Documentation

- **Architecture**: [ARCHITECTURE.md](./ARCHITECTURE.md)
- **API Docs**: Auto-generated (FastAPI Swagger, .NET Swagger)
- **Component Docs**: Storybook (Frontend)
- **Team Docs**: [ops/team_roles/](./ops/team_roles/)

## Support

- **Slack**: #kirotax-dev
- **Issues**: GitHub Issues
- **Email**: dev@kirotax.ai

## License

Proprietary - KiroTax AI Platform

---

**Last Updated**: February 15, 2026
**Version**: 1.0.0
**Status**: Active Development
