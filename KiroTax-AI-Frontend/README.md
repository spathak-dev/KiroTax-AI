# KiroTax AI Frontend

Next.js 14 frontend for AI-powered GST automation platform.

## Features

- **Modern UI**: Built with Next.js 14 App Router and Tailwind CSS
- **Authentication**: JWT-based auth with role-based access
- **Multi-role Dashboards**: Admin, CA, Client, Auditor
- **Bill Management**: Upload, view, and manage bills
- **GST Reports**: Generate GSTR-1, GSTR-3B reports
- **Real-time Updates**: Toast notifications and live status
- **Responsive Design**: Mobile-first, works on all devices

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- React Hook Form + Zod (Form Validation)
- Recharts (Data Visualization)
- Axios (API Client)

## Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.local.example .env.local

# Edit .env.local with your API URL
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build

```bash
npm run build
npm start
```

## Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx
│   │   ├── page.tsx           # Landing page
│   │   ├── login/
│   │   ├── register/
│   │   ├── dashboard/[type]/  # Dynamic dashboard
│   │   ├── upload/
│   │   ├── bills/
│   │   ├── gst/
│   │   ├── services/
│   │   └── portfolio/
│   ├── components/
│   │   ├── layout/            # Layout components
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── home/              # Landing page sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ProblemSection.tsx
│   │   │   ├── SolutionSection.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── PortfolioSection.tsx
│   │   │   ├── PricingSection.tsx
│   │   │   └── CTASection.tsx
│   │   ├── dashboard/         # Dashboard components
│   │   │   ├── DashboardLayout.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── DashboardHeader.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── CADashboard.tsx
│   │   │   ├── ClientDashboard.tsx
│   │   │   └── AuditorDashboard.tsx
│   │   └── ui/                # Reusable UI components
│   │       ├── ServiceCard.tsx
│   │       ├── PortfolioGrid.tsx
│   │       ├── PricingTable.tsx
│   │       ├── StatsCard.tsx
│   │       ├── ChartComponent.tsx
│   │       ├── RoleBadge.tsx
│   │       ├── UploadBox.tsx
│   │       ├── FileList.tsx
│   │       ├── GSTSummaryCard.tsx
│   │       ├── Loader.tsx
│   │       ├── Modal.tsx
│   │       ├── EmptyState.tsx
│   │       └── Notification.tsx
│   ├── store/
│   │   └── authStore.ts       # Zustand auth store
│   └── lib/
│       ├── api.ts             # Axios instance
│       └── utils.ts           # Utility functions
├── public/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## Key Features

### Landing Page
- Hero section with AI for Viksit Bharat branding
- Problem-solution narrative for Indian MSMEs
- Services showcase
- Portfolio/case studies
- Pricing plans
- Call-to-action sections

### Authentication
- Login and registration
- Role selection (Admin, CA, Client, Auditor)
- JWT token management
- Protected routes

### Dashboards
- **Client Dashboard**: Bill overview, GST summary, recent activity
- **CA Dashboard**: Client management, filing deadlines
- **Admin Dashboard**: Platform metrics, user analytics
- **Auditor Dashboard**: Audit queue, compliance tracking

### Bill Management
- Drag-and-drop upload
- Real-time processing status
- Extracted data preview
- Download and delete options

### GST Reports
- GSTR-1 generation
- GSTR-3B generation
- Period selection
- Excel export

## Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_NAME=KiroTax AI
NEXT_PUBLIC_APP_VERSION=1.0.0
```

## License

Proprietary - KiroTax AI Platform
