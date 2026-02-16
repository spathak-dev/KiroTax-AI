# Shivansh - Frontend Lead (Next.js)

## Role Overview

As the Frontend Lead, you are responsible for architecting and building the user-facing Next.js application, establishing frontend patterns, and leading frontend development alongside Bhavya.

## Primary Responsibilities

### 1. Frontend Architecture & Leadership
- Design and implement Next.js application architecture
- Establish coding standards and best practices
- Create reusable component library
- Lead code reviews for frontend team
- Mentor Bhavya on Next.js patterns
- Make technical decisions for frontend

### 2. Core Feature Development
- Build authentication and user management UI
- Implement bill upload and processing interface
- Create template marketplace frontend
- Build dashboard and analytics views
- Implement responsive design
- Optimize performance and SEO

### 3. State Management & Data Flow
- Set up state management (Redux/Zustand/Context)
- Implement API integration layer
- Handle real-time updates (WebSocket)
- Manage client-side caching
- Implement error handling
- Build loading and error states

### 4. UI/UX Implementation
- Implement design system
- Build responsive layouts
- Create animations and transitions
- Ensure accessibility (WCAG)
- Optimize for mobile devices
- Implement dark mode

## Feature Ownership

### RBAC System (Role-Based Access Control)
**Your Responsibility**: User-facing role and permission UI
- User profile page with role display
- Permission-based UI rendering
- Protected routes implementation
- Role-based navigation
- Access denied pages

**Collaboration**:
- Work with Bhavya on role components
- Integrate with Harit's auth API
- Align with Tushar's admin UI

### Bill Processing Pipeline
**Your Responsibility**: Bill upload and tracking interface
- Drag-and-drop file upload
- Upload progress indicators
- Bill processing status tracker
- Bill list and filtering
- Bill detail view
- Bulk upload functionality

**Collaboration**:
- Work with Bhavya on bill display components
- Integrate with Harit's upload API
- Coordinate with Tushar on admin view

### Template Marketplace
**Your Responsibility**: Marketplace UI architecture
- Template browsing interface
- Search and filter functionality
- Template detail pages
- Template preview
- Download/purchase flow
- User template library

**Collaboration**:
- Work with Bhavya on template cards
- Integrate with Harit's marketplace API
- Align with Tushar's approval system

### Change Tracking System
**Your Responsibility**: User history and change view
- Change history timeline
- Diff visualization
- Rollback interface
- Change notifications
- Activity feed

**Collaboration**:
- Work with Bhavya on diff components
- Integrate with Harit's tracking API
- Coordinate with Tushar's admin logs

### Manual Bill Editor
**Your Responsibility**: Bill editor architecture and main UI
- Rich text editor integration
- Form field management
- Auto-save functionality
- Validation and error display
- Keyboard shortcuts
- Undo/redo functionality

**Collaboration**:
- Work with Bhavya on form components
- Integrate with Harit's data API
- Implement real-time collaboration

### RAG Compliance Engine
**Your Responsibility**: Compliance UI and reports
- Compliance dashboard
- Rule visualization
- Compliance reports
- Issue highlighting
- Recommendation display
- Export functionality

**Collaboration**:
- Work with Bhavya on report display
- Integrate with Harit's RAG API
- Coordinate with Tushar's admin reports

### Gemini Integration
**Your Responsibility**: AI chat interface
- Chat UI component
- Message threading
- Typing indicators
- File attachment in chat
- Chat history
- AI suggestions display

**Collaboration**:
- Work with Bhavya on AI components
- Integrate with Harit's Gemini API
- Implement streaming responses

### Document Generator
**Your Responsibility**: Export UI and preview
- Export options interface
- Document preview
- Format selection
- Batch export
- Download management
- Print functionality

**Collaboration**:
- Work with Bhavya on preview components
- Integrate with Harit's generator API
- Implement client-side PDF preview

### CA Workflow Automation
**Your Responsibility**: CA workflow UI
- Workflow dashboard
- Task list and management
- Workflow progress tracker
- Assignment interface
- Notification center
- Calendar integration

**Collaboration**:
- Work with Bhavya on task components
- Integrate with Harit's workflow API
- Coordinate with Tushar's admin workflow

## Technical Stack

### Core Technologies
- **Next.js 14+**: React framework with App Router
- **React 18+**: UI library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS
- **shadcn/ui**: Component library
- **Radix UI**: Headless components

### State Management
- **Zustand** or **Redux Toolkit**: Global state
- **React Query**: Server state management
- **React Hook Form**: Form management
- **Zod**: Schema validation

### UI Libraries
- **Framer Motion**: Animations
- **Recharts**: Data visualization
- **React Dropzone**: File upload
- **React Table**: Data tables
- **React PDF**: PDF preview
- **Lucide Icons**: Icon library

### Development Tools
- **VS Code**: Code editor
- **ESLint**: Linting
- **Prettier**: Code formatting
- **Husky**: Git hooks
- **Jest**: Unit testing
- **Playwright**: E2E testing

## Project Structure

```
KiroTax-AI/frontend/
├── app/                            # Next.js App Router
│   ├── (auth)/                     # Auth routes
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/                # Dashboard routes
│   │   ├── page.tsx                # Main dashboard
│   │   ├── bills/                  # Bill management
│   │   ├── templates/              # Template marketplace
│   │   ├── compliance/             # Compliance reports
│   │   ├── editor/                 # Bill editor
│   │   └── workflow/               # CA workflow
│   ├── layout.tsx                  # Root layout
│   └── page.tsx                    # Home page
│
├── components/                     # React components
│   ├── ui/                         # Base UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── bills/                      # Bill components
│   │   ├── BillUpload.tsx
│   │   ├── BillList.tsx
│   │   └── BillDetail.tsx
│   ├── templates/                  # Template components
│   │   ├── TemplateCard.tsx
│   │   ├── TemplateGrid.tsx
│   │   └── TemplateDetail.tsx
│   ├── editor/                     # Editor components
│   │   ├── BillEditor.tsx
│   │   ├── FieldEditor.tsx
│   │   └── EditorToolbar.tsx
│   ├── compliance/                 # Compliance components
│   │   ├── ComplianceReport.tsx
│   │   └── RuleDisplay.tsx
│   ├── chat/                       # AI chat components
│   │   ├── ChatInterface.tsx
│   │   └── MessageList.tsx
│   └── layout/                     # Layout components
│       ├── Header.tsx
│       ├── Sidebar.tsx
│       └── Footer.tsx
│
├── lib/                            # Utilities
│   ├── api.ts                      # API client
│   ├── auth.ts                     # Auth utilities
│   ├── utils.ts                    # Helper functions
│   └── constants.ts                # Constants
│
├── hooks/                          # Custom hooks
│   ├── useAuth.ts
│   ├── useBills.ts
│   ├── useTemplates.ts
│   └── useWebSocket.ts
│
├── store/                          # State management
│   ├── authStore.ts
│   ├── billStore.ts
│   └── uiStore.ts
│
├── types/                          # TypeScript types
│   ├── bill.ts
│   ├── template.ts
│   ├── user.ts
│   └── api.ts
│
└── styles/                         # Global styles
    └── globals.css
```

## Current Tasks (Sprint 1)

### Completed ✅
- [x] Set up Next.js 14 project with App Router
- [x] Configure TypeScript and ESLint
- [x] Set up Tailwind CSS
- [x] Install shadcn/ui components
- [x] Create project structure
- [x] Set up routing

### In Progress 🔄
- [ ] Implement authentication flow
- [ ] Build main dashboard layout
- [ ] Create bill upload component
- [ ] Implement API client with React Query
- [ ] Set up state management
- [ ] Build navigation components
- [ ] Create loading and error states
- [ ] Implement responsive design

### Upcoming 📋
- [ ] Build bill list and detail views
- [ ] Create template marketplace UI
- [ ] Implement search and filtering
- [ ] Build bill editor interface
- [ ] Create compliance dashboard
- [ ] Implement AI chat interface
- [ ] Add real-time updates
- [ ] Build workflow UI
- [ ] Implement dark mode
- [ ] Add animations
- [ ] Write component tests
- [ ] Optimize performance
- [ ] Set up CI/CD
- [ ] Deploy to Vercel

## API Integration (with Harit's Backend)

### Authentication
```typescript
// lib/api/auth.ts
export const authApi = {
  login: (credentials) => POST('/api/auth/login', credentials),
  register: (data) => POST('/api/auth/register', data),
  logout: () => POST('/api/auth/logout'),
  refresh: () => POST('/api/auth/refresh'),
  verify: () => GET('/api/auth/verify'),
}
```

### Bills
```typescript
// lib/api/bills.ts
export const billsApi = {
  upload: (file) => POST('/api/bills/upload', file),
  list: (params) => GET('/api/bills', params),
  get: (id) => GET(`/api/bills/${id}`),
  update: (id, data) => PUT(`/api/bills/${id}`, data),
  delete: (id) => DELETE(`/api/bills/${id}`),
  process: (id) => POST(`/api/bills/${id}/process`),
}
```

### Templates
```typescript
// lib/api/templates.ts
export const templatesApi = {
  list: (params) => GET('/api/templates', params),
  get: (id) => GET(`/api/templates/${id}`),
  search: (query) => GET('/api/templates/search', { q: query }),
  download: (id) => GET(`/api/templates/${id}/download`),
}
```

## Development Workflow

### Daily Routine
1. Pull latest changes from main branch
2. Review assigned tasks in TASKS.md
3. Update task status in CONTRIBUTION.md
4. Review Bhavya's pull requests
5. Write code following React best practices
6. Test locally with `npm run dev`
7. Run tests with `npm test`
8. Commit with descriptive messages
9. Create pull request
10. Update component documentation

### Code Standards
- Use TypeScript for all files
- Follow React best practices (hooks, composition)
- Use functional components only
- Implement proper error boundaries
- Write accessible HTML (ARIA labels)
- Use semantic HTML elements
- Keep components small (< 200 lines)
- Write unit tests for complex logic
- Document complex components

### Component Guidelines
```typescript
// Good component structure
interface ButtonProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  children: React.ReactNode
}

export function Button({ 
  variant = 'primary', 
  size = 'md',
  onClick,
  children 
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }))}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
```

### Testing Strategy
- Unit tests for utilities and hooks
- Component tests with React Testing Library
- Integration tests for user flows
- E2E tests with Playwright
- Visual regression tests
- Accessibility tests

## Collaboration Points

### With Bhavya (Frontend Developer)
- **Daily**: Code reviews, pair programming
- **Weekly**: Component library sync, design system updates
- **As needed**: Architecture decisions, complex features

### With Harit (Python Backend)
- **Daily**: API contract discussions
- **Weekly**: Data format alignment
- **As needed**: WebSocket events, real-time features

### With Tushar (.NET Admin)
- **Weekly**: Design consistency
- **As needed**: Shared authentication, user experience

## Leadership Responsibilities

### Code Reviews
- Review all of Bhavya's pull requests
- Provide constructive feedback
- Ensure code quality and consistency
- Share knowledge and best practices

### Architecture Decisions
- Choose state management solution
- Decide on component patterns
- Select third-party libraries
- Plan performance optimizations

### Mentoring Bhavya
- Pair programming sessions
- Code review feedback
- Share Next.js best practices
- Help with complex features

## Learning Resources

### Next.js & React
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### UI/UX
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)

### Best Practices
- [React Patterns](https://reactpatterns.com/)
- [Web Accessibility](https://www.w3.org/WAI/WCAG21/quickref/)
- [Performance Optimization](https://web.dev/performance/)

## Success Metrics

### Code Quality
- 80%+ code coverage
- Zero accessibility violations
- All components documented
- Code reviews completed within 24h

### Performance
- Lighthouse score > 90
- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- Bundle size optimized

### User Experience
- Mobile responsive
- Keyboard navigation
- Screen reader compatible
- Smooth animations (60fps)

### Delivery
- Sprint tasks completed on time
- Zero production bugs
- Positive code review feedback
- Documentation up to date

## Support & Escalation

### Technical Issues
- Check Next.js/React documentation
- Search GitHub issues
- Ask in team Slack channel
- Escalate to tech lead if blocked > 4 hours

### Blockers
- API not ready: Mock data and continue
- Design unclear: Discuss with team
- Complex feature: Pair with Bhavya

---

**Your Impact**: As Frontend Lead, you set the standard for code quality and user experience. Your architectural decisions shape how users interact with KiroTax AI.

**Next Steps**:
1. Review TASKS.md for current sprint
2. Set up development environment (TECH_STACK.md)
3. Create component library foundation
4. Start with authentication and dashboard
5. Update CONTRIBUTION.md daily
6. Review Bhavya's work regularly
