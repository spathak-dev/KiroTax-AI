# Shivansh - Frontend Lead

## Role Overview
Frontend Lead responsible for Next.js application architecture, client portal, CA dashboard, and UI/UX implementation.

## Primary Technologies
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Zustand (state management)
- React Query (data fetching)
- Jest + React Testing Library

## Core Responsibilities

### 1. Next.js Application Architecture
**Status**: 🔄 In Progress
- App Router setup
- Route organization
- Layout system
- Middleware configuration
- API route handlers
- Server/Client component strategy

**Project Structure**:
```
frontend/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── bills/
│   │   ├── templates/
│   │   ├── compliance/
│   │   └── settings/
│   ├── (ca-portal)/
│   │   ├── layout.tsx
│   │   ├── workflows/
│   │   ├── clients/
│   │   └── reports/
│   └── api/
│       └── [...routes]/
├── components/
│   ├── ui/              # shadcn components
│   ├── features/        # Feature-specific
│   ├── layouts/         # Layout components
│   └── shared/          # Shared components
├── lib/
│   ├── api/             # API client
│   ├── hooks/           # Custom hooks
│   ├── utils/           # Utilities
│   └── stores/          # Zustand stores
├── styles/
│   └── globals.css
└── types/
    └── index.ts
```

### 2. Client Portal
**Status**: 📋 Planned
- Dashboard with statistics
- Bill upload interface
- Bill history & search
- Document viewer
- Profile management
- Notification center

**Pages to Build**:

#### Dashboard (`/dashboard`)
```tsx
// app/(dashboard)/page.tsx
export default function Dashboard() {
  return (
    <div className="space-y-6">
      <StatsCards />
      <RecentBills />
      <QuickActions />
      <ActivityFeed />
    </div>
  )
}
```

#### Bill Upload (`/dashboard/bills/upload`)
```tsx
// Features:
- Drag & drop file upload
- Multiple file support
- Upload progress tracking
- Preview before processing
- Batch upload
- Template selection
```

#### Bill Management (`/dashboard/bills`)
```tsx
// Features:
- List view with filters
- Search functionality
- Status indicators
- Bulk actions
- Export options
- Detail view modal
```

**Tasks**:
- [ ] Design dashboard layout
- [ ] Build upload component
- [ ] Create bill list with filters
- [ ] Implement search
- [ ] Add document viewer
- [ ] Build notification system

### 3. CA (Chartered Accountant) Portal
**Status**: 📋 Planned
- Client management
- Workflow dashboard
- Task assignment
- Approval interface
- Report generation
- Compliance tracking

**Pages to Build**:

#### CA Dashboard (`/ca/dashboard`)
```tsx
// Features:
- Pending tasks overview
- Client statistics
- Workflow status
- Deadline tracking
- Performance metrics
```

#### Workflow Management (`/ca/workflows`)
```tsx
// Features:
- Workflow list
- Task assignment
- Progress tracking
- Approval/rejection
- Comments & notes
- History timeline
```

#### Client Management (`/ca/clients`)
```tsx
// Features:
- Client list
- Client details
- Bill history per client
- Communication log
- Document sharing
```

**Tasks**:
- [ ] Design CA dashboard
- [ ] Build workflow interface
- [ ] Create task management
- [ ] Implement approval flow
- [ ] Add client management
- [ ] Build reporting tools

### 4. Manual Bill Editor
**Status**: 🔄 High Priority
- Interactive bill editor
- Field-by-field editing
- Real-time validation
- Template preview
- Save drafts
- Export options

**Editor Features**:
```tsx
// components/features/bill-editor/BillEditor.tsx
interface BillEditorProps {
  billId: string
  initialData: BillData
  template: Template
}

export function BillEditor({ billId, initialData, template }: BillEditorProps) {
  // Features:
  // - Split view (original image + form)
  // - Field highlighting on image
  // - Auto-save
  // - Validation errors
  // - Undo/redo
  // - Template switching
}
```

**Implementation**:
```tsx
// Form sections
<BillEditor>
  <ImageViewer src={billImage} highlights={fields} />
  <EditorForm>
    <VendorSection />
    <InvoiceDetailsSection />
    <ItemsTable />
    <TaxSection />
    <TotalSection />
  </EditorForm>
</BillEditor>
```

**Tasks**:
- [ ] Design editor layout
- [ ] Build form components
- [ ] Implement image viewer
- [ ] Add field validation
- [ ] Create auto-save
- [ ] Add undo/redo

### 5. Template Marketplace UI
**Status**: 🔄 Shared with Bhavya
- Template browsing
- Search & filters
- Template preview
- Rating & reviews
- Purchase/download
- Template submission

**Pages**:

#### Browse Templates (`/marketplace`)
```tsx
// Features:
- Grid/list view toggle
- Category filters
- Search bar
- Sort options (popular, recent, rating)
- Pagination
- Quick preview
```

#### Template Detail (`/marketplace/[id]`)
```tsx
// Features:
- Template preview
- Description & features
- Rating & reviews
- Download button
- Similar templates
- Usage statistics
```

**Bhavya's Part**: Template cards, filters, submission form
**Shivansh's Part**: Browse page, detail page, integration

### 6. Authentication & Authorization
**Status**: 🔄 Critical Priority
- Login/Register pages
- JWT token management
- Protected routes
- Role-based UI rendering
- Session handling
- OAuth integration

**Implementation**:
```tsx
// lib/auth/AuthProvider.tsx
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
  // Token refresh logic
  // Role checking
  // Protected route wrapper
}

// middleware.ts
export function middleware(request: NextRequest) {
  // Check authentication
  // Validate JWT
  // Role-based redirects
}
```

**Tasks**:
- [ ] Build auth pages
- [ ] Implement JWT handling
- [ ] Create protected route HOC
- [ ] Add role-based rendering
- [ ] Integrate with .NET auth API
- [ ] Add OAuth (Google, Microsoft)

### 7. State Management
**Status**: 🔄 In Progress
- Zustand stores for global state
- React Query for server state
- Form state with React Hook Form
- URL state for filters

**Store Structure**:
```tsx
// lib/stores/authStore.ts
export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  login: (user, token) => set({ user, token }),
  logout: () => set({ user: null, token: null })
}))

// lib/stores/billStore.ts
export const useBillStore = create((set) => ({
  bills: [],
  filters: {},
  setFilters: (filters) => set({ filters }),
  addBill: (bill) => set((state) => ({ 
    bills: [...state.bills, bill] 
  }))
}))
```

### 8. API Integration
**Status**: 🔄 Ongoing
- API client setup
- Request/response interceptors
- Error handling
- Loading states
- Retry logic
- Caching strategy

**API Client**:
```tsx
// lib/api/client.ts
import axios from 'axios'

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000
})

// Request interceptor (add auth token)
apiClient.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor (handle errors)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
    }
    return Promise.reject(error)
  }
)
```

**API Hooks**:
```tsx
// lib/hooks/useBills.ts
export function useBills(filters?: BillFilters) {
  return useQuery({
    queryKey: ['bills', filters],
    queryFn: () => apiClient.get('/api/bills', { params: filters }),
    staleTime: 5 * 60 * 1000 // 5 minutes
  })
}

// lib/hooks/useUploadBill.ts
export function useUploadBill() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData()
      formData.append('file', file)
      return apiClient.post('/api/bills/upload', formData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['bills'])
    }
  })
}
```

### 9. UI Component Library
**Status**: 🔄 Ongoing with Bhavya
- shadcn/ui integration
- Custom component development
- Component documentation
- Storybook setup
- Accessibility compliance

**Core Components**:
```
components/ui/
├── button.tsx
├── input.tsx
├── select.tsx
├── dialog.tsx
├── table.tsx
├── card.tsx
├── badge.tsx
├── toast.tsx
└── ...

components/features/
├── bill-card/
├── bill-table/
├── upload-zone/
├── document-viewer/
├── stats-card/
└── ...
```

**Responsibilities**:
- Shivansh: Complex components, layouts, pages
- Bhavya: UI components, forms, cards

### 10. Performance Optimization
**Status**: 🔄 Ongoing
- Code splitting
- Image optimization
- Lazy loading
- Bundle size optimization
- Caching strategies
- Lighthouse score > 90

**Optimization Techniques**:
```tsx
// Dynamic imports
const BillEditor = dynamic(() => import('@/components/features/bill-editor'))

// Image optimization
import Image from 'next/image'
<Image src={bill.image} width={800} height={600} alt="Bill" />

// Memoization
const MemoizedBillCard = memo(BillCard)

// Virtual scrolling for large lists
import { useVirtualizer } from '@tanstack/react-virtual'
```

## Current Sprint Tasks

### Week 1-2: Authentication & Core Layout
- [ ] Build login/register pages
- [ ] Implement JWT handling
- [ ] Create main layout
- [ ] Set up protected routes
- [ ] Integrate with .NET auth API
- [ ] Add role-based navigation

### Week 3-4: Client Portal Dashboard
- [ ] Design dashboard layout
- [ ] Build stats cards
- [ ] Create bill upload component
- [ ] Implement bill list
- [ ] Add search & filters
- [ ] Build document viewer

### Week 5-6: CA Portal & Workflows
- [ ] Design CA dashboard
- [ ] Build workflow interface
- [ ] Create task management
- [ ] Implement approval flow
- [ ] Add client management
- [ ] Build reporting interface

## Code Quality Standards

### TypeScript Conventions
```tsx
// Use proper typing
interface BillCardProps {
  bill: Bill
  onView: (id: string) => void
  onDelete?: (id: string) => void
}

export function BillCard({ bill, onView, onDelete }: BillCardProps) {
  // Implementation
}

// Use enums for constants
enum BillStatus {
  UPLOADED = 'uploaded',
  PROCESSING = 'processing',
  PROCESSED = 'processed',
  FAILED = 'failed'
}

// Use type guards
function isBill(obj: unknown): obj is Bill {
  return typeof obj === 'object' && obj !== null && 'id' in obj
}
```

### Component Structure
```tsx
// 1. Imports
import { useState } from 'react'
import { Button } from '@/components/ui/button'

// 2. Types
interface Props {
  // ...
}

// 3. Component
export function MyComponent({ prop1, prop2 }: Props) {
  // 4. Hooks
  const [state, setState] = useState()
  
  // 5. Handlers
  const handleClick = () => {
    // ...
  }
  
  // 6. Effects
  useEffect(() => {
    // ...
  }, [])
  
  // 7. Render
  return (
    <div>
      {/* JSX */}
    </div>
  )
}
```

### File Naming
- Components: PascalCase (`BillCard.tsx`)
- Hooks: camelCase with 'use' prefix (`useBills.ts`)
- Utils: camelCase (`formatDate.ts`)
- Types: PascalCase (`types/Bill.ts`)

## Testing Strategy

### Unit Tests
```tsx
// __tests__/components/BillCard.test.tsx
import { render, screen } from '@testing-library/react'
import { BillCard } from '@/components/features/bill-card'

describe('BillCard', () => {
  it('renders bill information', () => {
    const bill = { id: '1', invoiceNumber: 'INV-001', ... }
    render(<BillCard bill={bill} />)
    expect(screen.getByText('INV-001')).toBeInTheDocument()
  })
  
  it('calls onView when clicked', () => {
    const onView = jest.fn()
    render(<BillCard bill={bill} onView={onView} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onView).toHaveBeenCalledWith('1')
  })
})
```

### Integration Tests
```tsx
// __tests__/pages/dashboard.test.tsx
import { render, waitFor } from '@testing-library/react'
import Dashboard from '@/app/(dashboard)/page'

describe('Dashboard Page', () => {
  it('loads and displays bills', async () => {
    render(<Dashboard />)
    await waitFor(() => {
      expect(screen.getByText('Recent Bills')).toBeInTheDocument()
    })
  })
})
```

## Design System

### Colors
```css
/* Tailwind config */
colors: {
  primary: '#3B82F6',
  secondary: '#10B981',
  danger: '#EF4444',
  warning: '#F59E0B',
  success: '#10B981'
}
```

### Typography
```css
/* Font sizes */
text-xs: 0.75rem
text-sm: 0.875rem
text-base: 1rem
text-lg: 1.125rem
text-xl: 1.25rem
text-2xl: 1.5rem
```

### Spacing
```css
/* Consistent spacing */
space-y-4: 1rem
space-y-6: 1.5rem
space-y-8: 2rem
```

## Communication

### Daily Updates
- Post progress in team chat
- Update TASKS.md
- Share design decisions

### Code Reviews
- Review Bhavya's PRs
- Validate API integration
- Check responsive design

### Documentation
- Component documentation
- API integration guide
- Setup instructions

## Learning & Development

### Current Focus
- Next.js 14 App Router
- Server Components
- React Server Actions
- Advanced TypeScript
- Performance optimization

### Resources
- Next.js documentation
- React documentation
- Tailwind CSS docs
- shadcn/ui components

## Success Metrics

- Page load time: < 2s
- Lighthouse score: > 90
- Mobile responsiveness: 100%
- Accessibility: WCAG 2.1 AA
- Code coverage: > 80%

## Contact & Collaboration

- **Primary Stack**: Next.js Frontend
- **Collaborates With**:
  - Bhavya (UI components, shared features)
  - Harit (API integration, data formats)
  - Tushar (Authentication, admin features)
- **Availability**: 9 AM - 6 PM IST
- **Preferred Communication**: Slack, GitHub Issues
