# KiroTax AI - Team Roles & Responsibilities

## Team Structure

This folder contains detailed documentation for each team member's responsibilities, tasks, and contribution areas in the KiroTax AI project.

## Team Members

### 1. Tushar - .NET Backend & Admin Dashboard Lead
**Primary Focus**: .NET Blazor Admin Dashboard, C# Microservices
- **Folder**: `.kiro/team role/tushar/`
- **Tech Stack**: .NET 9, Blazor Server, C#, Entity Framework Core, SQLite

### 2. Harit - Python Backend & AI/ML Lead
**Primary Focus**: Python FastAPI Backend, AI/ML Integration, OCR Processing
- **Folder**: `.kiro/team role/harit/`
- **Tech Stack**: Python, FastAPI, TensorFlow/PyTorch, Gemini API, OCR

### 3. Shivansh - Frontend Lead (Next.js)
**Primary Focus**: Next.js Frontend, User Interface, Client-Side Features
- **Folder**: `.kiro/team role/shivansh/`
- **Tech Stack**: Next.js, React, TypeScript, Tailwind CSS

### 4. Bhavya - Frontend Developer (Next.js)
**Primary Focus**: Next.js Frontend, UI Components, State Management
- **Folder**: `.kiro/team role/bhavya/`
- **Tech Stack**: Next.js, React, TypeScript, Tailwind CSS

## Project Architecture Overview

```
KiroTax AI Platform
├── Frontend (Next.js) - Shivansh & Bhavya
│   ├── User Dashboard
│   ├── Bill Upload Interface
│   ├── Template Marketplace
│   └── Compliance Reports
│
├── Python Backend (FastAPI) - Harit
│   ├── OCR Processing
│   ├── AI/ML Models
│   ├── Template Engine
│   ├── Gemini Integration
│   └── RAG Compliance Engine
│
└── .NET Admin Dashboard (Blazor) - Tushar
    ├── User Management
    ├── Bill Management
    ├── Template Approval
    └── System Settings
```

## Responsibility Distribution

### Feature Ownership Matrix

| Feature | Tushar (.NET) | Harit (Python) | Shivansh (Frontend) | Bhavya (Frontend) |
|---------|---------------|----------------|---------------------|-------------------|
| RBAC System | Admin UI | API & Auth | User Interface | Role Components |
| Bill Processing | Admin View | OCR & Processing | Upload UI | Bill Display |
| Template Marketplace | Approval System | Template Engine | Marketplace UI | Template Cards |
| Change Tracking | Admin Logs | Backend Logic | History View | Diff Components |
| Manual Bill Editor | - | Data Processing | Editor UI | Form Components |
| RAG Compliance | Admin Reports | RAG Engine | Compliance UI | Report Display |
| Gemini Integration | - | API Integration | Chat Interface | AI Components |
| Document Generator | - | PDF Generation | Export UI | Preview Components |
| CA Workflow | Admin Workflow | Workflow Engine | Workflow UI | Task Components |

## Communication & Coordination

### Daily Standup Topics
- Progress updates on assigned features
- Blockers and dependencies
- API contract discussions
- UI/UX alignment

### Integration Points
- **Frontend ↔ Python API**: REST API contracts, WebSocket for real-time updates
- **Admin Dashboard ↔ Python API**: Management endpoints, admin-specific APIs
- **Frontend ↔ Admin Dashboard**: Shared authentication, user session management

## Documentation Structure

Each team member's folder contains:
- `RESPONSIBILITIES.md` - Detailed task breakdown
- `TECH_STACK.md` - Technologies and tools
- `TASKS.md` - Current sprint tasks
- `CHECKLIST.md` - Implementation checklist
- `API_CONTRACTS.md` - API endpoints (for backend developers)
- `COMPONENTS.md` - Component list (for frontend developers)
- `CONTRIBUTION.md` - Contribution guidelines and progress tracking

## Getting Started

1. Read your role-specific documentation in your folder
2. Review the project architecture in `.kiro/specs/`
3. Check your assigned tasks in `TASKS.md`
4. Follow the tech stack setup guide in `TECH_STACK.md`
5. Track your progress in `CONTRIBUTION.md`

## Code Review Process

- **Tushar**: Reviews .NET/C# code, admin dashboard features
- **Harit**: Reviews Python code, AI/ML implementations, backend logic
- **Shivansh**: Reviews frontend architecture, Next.js patterns, lead frontend reviews
- **Bhavya**: Reviews UI components, frontend features, assists Shivansh

## Deployment Responsibilities

- **Tushar**: .NET admin dashboard deployment, Windows/Linux server setup
- **Harit**: Python backend deployment, Docker containers, AI model deployment
- **Shivansh & Bhavya**: Frontend deployment, Vercel/Next.js hosting, CDN setup

## Support Rotation

Each team member provides support for their domain:
- **Week 1-2**: Tushar (Admin), Harit (Backend)
- **Week 3-4**: Shivansh (Frontend), Bhavya (Frontend)

---

**Last Updated**: February 2026
**Project Status**: Active Development
**Team Size**: 4 developers
