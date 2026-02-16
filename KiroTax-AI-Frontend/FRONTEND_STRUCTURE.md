# KiroTax AI Frontend - Complete Structure

## Overview
Complete Next.js frontend with 80+ files integrating Python FastAPI backend and .NET Admin API.

## Directory Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth group
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── (dashboard)/              # Dashboard group
│   │   ├── admin/                # Admin dashboard
│   │   ├── ca/                   # CA dashboard
│   │   ├── auditor/              # Auditor dashboard
│   │   └── client/               # Client dashboard
│   ├── bills/                    # Bill management
│   ├── templates/                # Template marketplace
│   ├── gst/                      # GST operations
│   ├── tax/                      # Tax calculations
│   ├── reports/                  # Reports & analytics
│   ├── settings/                 # User settings
│   └── api/                      # API routes
├── components/                   # React components
│   ├── admin/                    # Admin components
│   ├── bills/                    # Bill components
│   ├── templates/                # Template components
│   ├── gst/                      # GST components
│   ├── tax/                      # Tax components
│   ├── reports/                  # Report components
│   ├── forms/                    # Form components
│   ├── ui/                       # UI components
│   └── layout/                   # Layout components
├── lib/                          # Utilities
│   ├── api/                      # API clients
│   ├── hooks/                    # Custom hooks
│   ├── utils/                    # Utility functions
│   └── validators/               # Form validators
├── store/                        # State management
│   ├── slices/                   # Redux slices
│   └── hooks.ts                  # Store hooks
├── types/                        # TypeScript types
│   ├── api/                      # API types
│   ├── models/                   # Data models
│   └── components/               # Component types
└── styles/                       # Global styles

## Features Covered

### 1. Authentication & Authorization
- Login/Register/Forgot Password
- JWT token management
- Role-based access control
- Session management

### 2. Admin Dashboard
- User management (CRUD)
- Bill management
- Template approval
- Activity logs
- System settings
- Statistics & analytics

### 3. Bill Management
- Upload bills (PDF, images)
- OCR processing
- Bill listing & filtering
- Bill details view
- Edit extracted data
- Export bills

### 4. Template Marketplace
- Browse templates
- Template details
- Purchase/download templates
- Upload custom templates
- Template ratings & reviews

### 5. GST Operations
- GST validation
- GST calculations
- GST reports
- GSTIN lookup

### 6. Tax Calculations
- Income tax calculator
- Tax slabs
- Deductions calculator
- Tax reports

### 7. Reports & Analytics
- Dashboard analytics
- Bill reports
- Tax reports
- Export to Excel/PDF

### 8. User Settings
- Profile management
- Password change
- Notification preferences
- API keys

### 9. Workflow Automation
- Approval workflows
- Document routing
- Status tracking
- Notifications

### 10. Real-time Features
- SignalR integration
- Live notifications
- Real-time updates
- Activity feed
```

## File Count: 80+ Files

### App Routes (20 files)
- Authentication pages (3)
- Dashboard pages (8)
- Feature pages (9)

### Components (35 files)
- Admin components (8)
- Bill components (6)
- Template components (5)
- GST components (4)
- Tax components (4)
- Report components (4)
- Form components (4)

### API Integration (10 files)
- Python backend client
- .NET admin client
- API hooks
- WebSocket client

### State Management (8 files)
- Auth store
- Bill store
- Template store
- User store
- Settings store

### Utilities (7 files)
- Form validators
- Date formatters
- Currency formatters
- File helpers
- API helpers

## Integration Points

### Python Backend (Port 8000)
```typescript
/auth/*          -> Authentication
/bills/*         -> Bill operations
/ocr/*           -> OCR processing
/templates/*     -> Template operations
/gst/*           -> GST operations
/tax/*           -> Tax calculations
```

### .NET Admin API (Port 5001)
```typescript
/api/admin/users      -> User management
/api/admin/bills      -> Bill management
/api/admin/templates  -> Template approval
/api/admin/activity   -> Activity logs
/api/admin/settings   -> System settings
/api/admin/stats      -> Statistics
/api/auth/*           -> Admin authentication
/api/file/*           -> File operations
```

### SignalR Hub
```typescript
wss://localhost:5001/adminHub  -> Real-time updates
```

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: Zustand
- **Forms**: React Hook Form + Zod
- **HTTP**: Axios
- **WebSocket**: SignalR
- **Charts**: Recharts
- **Icons**: Lucide React
- **Notifications**: Sonner

## Getting Started

```bash
cd KiroTax-AI-Frontend
npm install
npm run dev
```

Access at: http://localhost:3000
