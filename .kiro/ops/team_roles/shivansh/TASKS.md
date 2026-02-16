# Shivansh - Current Tasks

## Sprint: Week 1-2 (Authentication & Core Layout)

### Priority 1: Authentication Pages
- [ ] Build login page
  - [ ] Design login form
  - [ ] Add email/password fields
  - [ ] Implement form validation
  - [ ] Add "Remember me" checkbox
  - [ ] Add "Forgot password" link
  - [ ] Handle login errors
- [ ] Build register page
  - [ ] Design registration form
  - [ ] Add required fields (name, email, password, company)
  - [ ] Implement password strength indicator
  - [ ] Add terms & conditions checkbox
  - [ ] Handle registration errors
- [ ] Implement JWT handling
  - [ ] Create auth context
  - [ ] Store tokens securely
  - [ ] Implement token refresh
  - [ ] Handle token expiry
- [ ] Create protected routes
  - [ ] Build auth middleware
  - [ ] Add route guards
  - [ ] Redirect to login if unauthorized
- [ ] Integrate with .NET auth API
  - [ ] Test login endpoint
  - [ ] Test register endpoint
  - [ ] Test token refresh
  - [ ] Handle API errors
- [ ] Add OAuth (Google, Microsoft)
  - [ ] Set up OAuth providers
  - [ ] Add OAuth buttons
  - [ ] Handle OAuth callbacks
  - [ ] Link OAuth accounts

### Priority 2: Main Layout
- [ ] Design main layout structure
  - [ ] Header with logo and user menu
  - [ ] Sidebar navigation
  - [ ] Main content area
  - [ ] Footer
- [ ] Build responsive navigation
  - [ ] Desktop navigation
  - [ ] Mobile hamburger menu
  - [ ] Tablet optimization
- [ ] Create user menu dropdown
  - [ ] Profile link
  - [ ] Settings link
  - [ ] Logout button
- [ ] Add breadcrumbs
  - [ ] Dynamic breadcrumb generation
  - [ ] Clickable navigation
- [ ] Implement role-based navigation
  - [ ] Show/hide menu items by role
  - [ ] Admin-only sections
  - [ ] CA-specific sections

### Priority 3: API Integration Setup
- [ ] Set up API client
  - [ ] Configure axios
  - [ ] Add base URL
  - [ ] Add timeout settings
- [ ] Create request interceptors
  - [ ] Add auth token to headers
  - [ ] Add request logging
- [ ] Create response interceptors
  - [ ] Handle 401 errors
  - [ ] Handle 403 errors
  - [ ] Handle network errors
- [ ] Build custom hooks
  - [ ] useAuth hook
  - [ ] useApi hook
  - [ ] useToast hook
- [ ] Set up React Query
  - [ ] Configure query client
  - [ ] Add default options
  - [ ] Set up dev tools

## Sprint: Week 3-4 (Client Portal Dashboard)

### Priority 1: Dashboard Layout
- [ ] Design dashboard grid
  - [ ] Stats cards section
  - [ ] Recent bills section
  - [ ] Quick actions section
  - [ ] Activity feed section
- [ ] Build stats cards
  - [ ] Total bills card
  - [ ] Processed bills card
  - [ ] Pending bills card
  - [ ] Failed bills card
- [ ] Create recent bills list
  - [ ] Bill card component
  - [ ] Status badges
  - [ ] Quick actions
- [ ] Add quick actions
  - [ ] Upload bill button
  - [ ] View all bills button
  - [ ] Download reports button

### Priority 2: Bill Upload
- [ ] Build upload component
  - [ ] Drag & drop zone
  - [ ] File picker
  - [ ] Multiple file support
- [ ] Add upload progress
  - [ ] Progress bar
  - [ ] File list
  - [ ] Cancel upload
- [ ] Implement preview
  - [ ] Image preview
  - [ ] PDF preview
  - [ ] File info display
- [ ] Add validation
  - [ ] File type check
  - [ ] File size check
  - [ ] Duplicate check
- [ ] Handle upload errors
  - [ ] Error messages
  - [ ] Retry logic
  - [ ] Error reporting

### Priority 3: Bill Management
- [ ] Build bill list page
  - [ ] Table view
  - [ ] Card view toggle
  - [ ] Pagination
- [ ] Add search functionality
  - [ ] Search by invoice number
  - [ ] Search by vendor
  - [ ] Search by date range
- [ ] Implement filters
  - [ ] Status filter
  - [ ] Date range filter
  - [ ] Amount range filter
  - [ ] Category filter
- [ ] Add sorting
  - [ ] Sort by date
  - [ ] Sort by amount
  - [ ] Sort by status
- [ ] Build detail view
  - [ ] Bill details modal
  - [ ] Image viewer
  - [ ] Extracted data display
  - [ ] Action buttons

## Sprint: Week 5-6 (CA Portal & Workflows)

### Priority 1: CA Dashboard
- [ ] Design CA dashboard
  - [ ] Pending tasks widget
  - [ ] Client statistics
  - [ ] Workflow status
  - [ ] Performance metrics
- [ ] Build task list
  - [ ] Task cards
  - [ ] Priority indicators
  - [ ] Deadline warnings
- [ ] Add client overview
  - [ ] Client list
  - [ ] Client stats
  - [ ] Recent activity

### Priority 2: Workflow Interface
- [ ] Build workflow list
  - [ ] Workflow cards
  - [ ] Status indicators
  - [ ] Progress bars
- [ ] Create task management
  - [ ] Task assignment
  - [ ] Task completion
  - [ ] Task comments
- [ ] Implement approval flow
  - [ ] Approval buttons
  - [ ] Rejection with reason
  - [ ] Approval history
- [ ] Add timeline view
  - [ ] Workflow timeline
  - [ ] Activity log
  - [ ] Status changes

### Priority 3: Client Management
- [ ] Build client list
  - [ ] Client table
  - [ ] Search & filter
  - [ ] Client details
- [ ] Add client details page
  - [ ] Client info
  - [ ] Bill history
  - [ ] Communication log
- [ ] Implement document sharing
  - [ ] Upload documents
  - [ ] Share with client
  - [ ] Download documents

## Backlog

### Manual Bill Editor
- [ ] Design editor layout
- [ ] Build form components
- [ ] Implement image viewer
- [ ] Add field validation
- [ ] Create auto-save
- [ ] Add undo/redo

### Template Marketplace
- [ ] Browse page
- [ ] Detail page
- [ ] Search & filters
- [ ] Download interface

### Reporting
- [ ] Report builder
- [ ] Export options
- [ ] Scheduled reports

## Blocked

- Waiting for auth API completion (Tushar)
- Need API documentation for bill endpoints (Harit)

## Completed ✅

- [x] Next.js 14 project setup
- [x] Tailwind CSS configuration
- [x] shadcn/ui integration
- [x] Project structure
- [x] TypeScript configuration
- [x] ESLint & Prettier setup

## Notes

- Coordinate with Bhavya on component library
- Sync with Harit on API response formats
- Review design mockups with team
- Set up Storybook for component documentation

## Time Tracking

| Task | Estimated | Actual | Status |
|------|-----------|--------|--------|
| Project Setup | 8h | 6h | ✅ Complete |
| Authentication | 24h | - | 🔄 In Progress |
| Client Portal | 32h | - | 📋 Planned |
| CA Portal | 32h | - | 📋 Planned |

## Component Status

| Component | Status | Priority | Owner |
|-----------|--------|----------|-------|
| Login Page | 📋 Planned | High | Shivansh |
| Register Page | 📋 Planned | High | Shivansh |
| Dashboard | 📋 Planned | High | Shivansh |
| Bill Upload | 📋 Planned | High | Shivansh + Bhavya |
| Bill List | 📋 Planned | High | Shivansh |
| Bill Editor | 📋 Planned | Medium | Shivansh |
| Template Cards | 📋 Planned | Medium | Bhavya |
| Filter Sidebar | 📋 Planned | Medium | Bhavya |
| Stats Cards | 📋 Planned | Medium | Bhavya |
| Charts | 📋 Planned | Low | Bhavya |

## Pages Status

| Page | Route | Status | Priority |
|------|-------|--------|----------|
| Login | /login | 📋 Planned | High |
| Register | /register | 📋 Planned | High |
| Dashboard | /dashboard | 📋 Planned | High |
| Bills | /dashboard/bills | 📋 Planned | High |
| Upload | /dashboard/bills/upload | 📋 Planned | High |
| Bill Detail | /dashboard/bills/[id] | 📋 Planned | High |
| Templates | /marketplace | 📋 Planned | Medium |
| CA Dashboard | /ca/dashboard | 📋 Planned | Medium |
| Workflows | /ca/workflows | 📋 Planned | Medium |
| Clients | /ca/clients | 📋 Planned | Medium |

## Performance Targets

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Page load time | < 2s | - | 📋 |
| Lighthouse score | > 90 | - | 📋 |
| First Contentful Paint | < 1.5s | - | 📋 |
| Time to Interactive | < 3s | - | 📋 |
| Bundle size | < 500KB | - | 📋 |

## Daily Updates

### 2026-02-15
- Set up Next.js project
- Configured Tailwind CSS
- Integrated shadcn/ui
- Created project structure
- Next: Start authentication pages
- Blocked: Waiting for auth API endpoints
