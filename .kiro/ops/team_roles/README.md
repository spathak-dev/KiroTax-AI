# KiroTax AI - Team Roles & Responsibilities

## Team Structure

The KiroTax AI platform is built by a 4-person team with specialized roles:

| Name | Role | Primary Technology | Focus Areas |
|------|------|-------------------|-------------|
| **Tushar** | Backend Lead (.NET) | C# / .NET 9 / Blazor | Admin Dashboard, Microservices, Authentication |
| **Harit** | Backend Lead (Python) | Python / FastAPI | AI/ML, OCR, Template Engine, APIs |
| **Shivansh** | Frontend Lead | Next.js / React | User Interface, Client Portal |
| **Bhavya** | Frontend Developer | Next.js / React | UI Components, State Management |

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    KiroTax AI Platform                       │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Frontend (Shivansh + Bhavya)                               │
│  ├── Next.js 14 App Router                                  │
│  ├── React 18 + TypeScript                                  │
│  ├── Tailwind CSS + shadcn/ui                               │
│  └── Client Portal + CA Dashboard                           │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Backend - Python (Harit)                                    │
│  ├── FastAPI REST APIs                                      │
│  ├── OCR + AI Processing (Gemini)                           │
│  ├── Template Engine (1000+ formats)                        │
│  ├── RAG Compliance Engine                                  │
│  └── Bill Processing Pipeline                               │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Backend - .NET (Tushar)                                     │
│  ├── Blazor Admin Dashboard                                 │
│  ├── RBAC System                                             │
│  ├── User Management                                         │
│  └── Microservices Architecture                             │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Shared Infrastructure (All)                                 │
│  ├── PostgreSQL Database                                    │
│  ├── Redis Cache                                             │
│  ├── S3 Storage                                              │
│  └── Docker + Kubernetes                                     │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Responsibility Distribution

### Feature Ownership Matrix

| Feature | Tushar (.NET) | Harit (Python) | Shivansh (Frontend) | Bhavya (Frontend) |
|---------|---------------|----------------|---------------------|-------------------|
| RBAC System | ✅ Lead | 🔄 API Support | 🔄 UI Integration | 🔄 Components |
| Bill Processing | 🔄 Admin UI | ✅ Lead | 🔄 Upload UI | 🔄 Status Display |
| Template Marketplace | 🔄 Approval System | ✅ Lead | 🔄 Browse UI | ✅ Lead |
| Change Tracking | 🔄 Admin Logs | ✅ Lead | 🔄 History UI | 🔄 Timeline |
| Manual Bill Editor | 🔄 Admin Tools | 🔄 API Support | ✅ Lead | 🔄 Form Components |
| RAG Compliance | 🔄 Admin Config | ✅ Lead | 🔄 Results UI | 🔄 Visualization |
| Gemini Integration | 🔄 Admin Monitor | ✅ Lead | 🔄 Chat UI | 🔄 Response Display |
| Document Generator | 🔄 Template Admin | ✅ Lead | 🔄 Preview UI | 🔄 Export Options |
| CA Workflow | 🔄 Admin Oversight | ✅ Lead | ✅ Lead | 🔄 Task Components |

Legend:
- ✅ Lead: Primary owner and implementer
- 🔄 Support: Contributing role

## Communication & Collaboration

### Daily Standup
- Time: 10:00 AM
- Duration: 15 minutes
- Format: What did you do? What will you do? Any blockers?

### Code Review Process
- All PRs require 1 approval
- Frontend PRs: Reviewed by Shivansh or Bhavya
- Python PRs: Reviewed by Harit
- .NET PRs: Reviewed by Tushar
- Cross-stack PRs: Reviewed by relevant leads

### Integration Points
- API contracts defined in OpenAPI specs
- Frontend-Backend sync: Twice weekly
- Database schema changes: Team approval required
- Breaking changes: 48-hour notice

## Development Workflow

1. **Feature Planning**: Team reviews spec together
2. **Task Assignment**: Based on responsibility matrix
3. **Development**: Individual work with daily commits
4. **Code Review**: Peer review before merge
5. **Integration Testing**: Cross-team validation
6. **Deployment**: Coordinated release

## Documentation Standards

Each team member maintains:
- Personal task list (TASKS.md)
- Responsibility document (RESPONSIBILITIES.md)
- Weekly progress checklist (checklist.md)
- Technical decisions log (DECISIONS.md)

## Links to Individual Roles

- [Tushar - .NET Backend Lead](./tushar/RESPONSIBILITIES.md)
- [Harit - Python Backend Lead](./harit/RESPONSIBILITIES.md)
- [Shivansh - Frontend Lead](./shivansh/RESPONSIBILITIES.md)
- [Bhavya - Frontend Developer](./bhavya/RESPONSIBILITIES.md)
