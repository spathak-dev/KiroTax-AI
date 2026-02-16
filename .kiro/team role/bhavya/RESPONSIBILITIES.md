# Bhavya - Frontend Developer (Next.js)

## Role Overview

As a Frontend Developer working alongside Shivansh, you are responsible for building UI components, implementing features, and contributing to the Next.js application development.

## Primary Responsibilities

### 1. Component Development
- Build reusable UI components
- Implement feature-specific components
- Create responsive layouts
- Follow design system guidelines
- Write component documentation
- Ensure accessibility compliance

### 2. Feature Implementation
- Implement assigned features
- Integrate with backend APIs
- Handle form validation
- Implement client-side logic
- Create loading and error states
- Write component tests

### 3. Code Quality & Collaboration
- Follow coding standards
- Participate in code reviews
- Learn from Shivansh's feedback
- Write clean, maintainable code
- Document complex logic
- Collaborate with team

## Feature Ownership

### RBAC System (Role-Based Access Control)
**Your Responsibility**: Role-related UI components
- Role badge components
- Permission display components
- Role selector dropdowns
- Access denied messages
- Role-based conditional rendering

**Collaboration**:
- Work with Shivansh on architecture
- Integrate with Harit's auth API
- Follow Tushar's admin patterns

### Bill Processing Pipeline
**Your Responsibility**: Bill display and list components
- Bill card component
- Bill list with pagination
- Bill status badges
- Bill filtering UI
- Bill search component
- Bill detail modal

**Collaboration**:
- Work with Shivansh on upload interface
- Integrate with Harit's bill API
- Ensure consistency with admin UI

### Template Marketplace
**Your Responsibility**: Template card and grid components
- Template card component
- Template grid layout
- Template category filters
- Template rating display
- Template preview modal
- Template download button

**Collaboration**:
- Work with Shivansh on marketplace architecture
- Integrate with Harit's template API
- Follow design system

### Change Tracking System
**Your Responsibility**: Diff and history components
- Diff viewer component
- Change timeline component
- Change notification badges
- History list component
- Rollback confirmation modal

**Collaboration**:
- Work with Shivansh on history view
- Integrate with Harit's tracking API
- Implement visual diff

### Manual Bill Editor
**Your Responsibility**: Form components and fields
- Input field components
- Form validation display
- Field error messages
- Auto-complete components
- Date picker
- Number input with formatting

**Collaboration**:
- Work with Shivansh on editor architecture
- Integrate with Harit's validation API
- Ensure accessibility

### RAG Compliance Engine
**Your Responsibility**: Report display components
- Compliance report card
- Issue list component
- Recommendation display
- Severity badges
- Report export button
- Chart components

**Collaboration**:
- Work with Shivansh on dashboard
- Integrate with Harit's compliance API
- Implement data visualization

### Gemini Integration
**Your Responsibility**: AI-related UI components
- Message bubble component
- Typing indicator
- AI suggestion cards
- File attachment preview
- Chat input component
- Emoji picker

**Collaboration**:
- Work with Shivansh on chat interface
- Integrate with Harit's Gemini API
- Implement smooth animations

### Document Generator
**Your Responsibility**: Preview and export components
- Document preview component
- Format selector
- Export progress indicator
- Download button
- Print preview
- Batch export list

**Collaboration**:
- Work with Shivansh on export UI
- Integrate with Harit's generator API
- Handle large documents

### CA Workflow Automation
**Your Responsibility**: Task and workflow components
- Task card component
- Task list with filters
- Task status badges
- Assignment dropdown
- Due date display
- Priority indicators

**Collaboration**:
- Work with Shivansh on workflow dashboard
- Integrate with Harit's workflow API
- Implement drag-and-drop

## Technical Stack

### Core Technologies
- **Next.js 14+**: React framework
- **React 18+**: UI library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Styling
- **shadcn/ui**: Component library

### UI Libraries
- **Framer Motion**: Animations
- **Recharts**: Charts
- **React Dropzone**: File upload
- **React Table**: Tables
- **Lucide Icons**: Icons

### Development Tools
- **VS Code**: Code editor
- **ESLint**: Linting
- **Prettier**: Formatting
- **Git**: Version control

## Component Examples

### Bill Card Component
```typescript
// components/bills/BillCard.tsx
interface BillCardProps {
  bill: Bill
  onView: (id: string) => void
  onDelete: (id: string) => void
}

export function BillCard({ bill, onView, onDelete }: BillCardProps) {
  return (
    <Card className="p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{bill.fileName}</h3>
          <p className="text-sm text-muted-foreground">
            {bill.invoiceNumber}
          </p>
        </div>
        <BillStatusBadge status={bill.status} />
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <span className="text-lg font-bold">
          {formatCurrency(bill.grandTotal)}
        </span>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onView(bill.id)}
          >
            View
          </Button>
          <Button 
            size="sm" 
            variant="destructive"
            onClick={() => onDelete(bill.id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </Card>
  )
}
```

### Template Card Component
```typescript
// components/templates/TemplateCard.tsx
interface TemplateCardProps {
  template: Template
  onSelect: (id: string) => void
}

export function TemplateCard({ template, onSelect }: TemplateCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all">
      <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600" />
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold">{template.name}</h3>
          <Badge variant="secondary">{template.category}</Badge>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">
          {template.description}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{template.rating}</span>
          </div>
          
          <Button onClick={() => onSelect(template.id)}>
            {template.price === 0 ? 'Free' : `₹${template.price}`}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
```

### Status Badge Component
```typescript
// components/ui/StatusBadge.tsx
interface StatusBadgeProps {
  status: 'uploaded' | 'processing' | 'processed' | 'failed'
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const variants = {
    uploaded: 'bg-gray-100 text-gray-800',
    processing: 'bg-yellow-100 text-yellow-800',
    processed: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
  }
  
  return (
    <Badge className={variants[status]}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}
```

## Current Tasks (Sprint 1)

### Completed ✅
- [x] Set up development environment
- [x] Learn Next.js basics
- [x] Understand project structure
- [x] Review design system

### In Progress 🔄
- [ ] Build Bill Card component
- [ ] Create Template Card component
- [ ] Implement Status Badge component
- [ ] Build Bill List component
- [ ] Create Template Grid component
- [ ] Implement loading skeletons
- [ ] Add responsive design
- [ ] Write component tests

### Upcoming 📋
- [ ] Build form components
- [ ] Create diff viewer
- [ ] Implement chat message component
- [ ] Build task card component
- [ ] Create report display
- [ ] Implement animations
- [ ] Add accessibility features
- [ ] Write documentation
- [ ] Optimize performance
- [ ] Fix bugs

## Development Workflow

### Daily Routine
1. Pull latest changes from main branch
2. Review assigned tasks in TASKS.md
3. Update task status in CONTRIBUTION.md
4. Check Shivansh's feedback on previous PRs
5. Write code following team standards
6. Test components locally
7. Write component tests
8. Commit with descriptive messages
9. Create pull request
10. Request review from Shivansh

### Code Standards
- Use TypeScript for all files
- Follow React best practices
- Use functional components
- Implement proper prop types
- Write accessible HTML
- Keep components small
- Add comments for complex logic
- Write tests for components

### Pull Request Guidelines
- Write clear PR description
- Include screenshots for UI changes
- List all changes made
- Reference related issues
- Request review from Shivansh
- Address feedback promptly
- Update documentation

## Collaboration Points

### With Shivansh (Frontend Lead)
- **Daily**: Standup, questions, code reviews
- **Weekly**: Component library sync
- **As needed**: Pair programming, complex features

### With Harit (Python Backend)
- **As needed**: API questions, data format
- **Weekly**: Integration testing

### With Tushar (.NET Admin)
- **As needed**: Design consistency questions

## Learning Path

### Week 1-2: Foundations
- [ ] Complete Next.js tutorial
- [ ] Learn TypeScript basics
- [ ] Understand React hooks
- [ ] Study Tailwind CSS
- [ ] Review shadcn/ui components

### Week 3-4: Components
- [ ] Build basic UI components
- [ ] Learn component composition
- [ ] Understand props and state
- [ ] Practice responsive design
- [ ] Learn accessibility basics

### Week 5-6: Integration
- [ ] Learn API integration
- [ ] Understand React Query
- [ ] Practice form handling
- [ ] Learn error handling
- [ ] Study testing basics

### Week 7-8: Advanced
- [ ] Learn animations
- [ ] Understand performance optimization
- [ ] Practice complex state management
- [ ] Learn advanced TypeScript
- [ ] Study design patterns

## Learning Resources

### Next.js & React
- [Next.js Learn Course](https://nextjs.org/learn)
- [React Documentation](https://react.dev/learn)
- [TypeScript for React](https://react-typescript-cheatsheet.netlify.app/)

### UI/UX
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Web Accessibility](https://www.w3.org/WAI/fundamentals/)

### Best Practices
- [React Patterns](https://reactpatterns.com/)
- [Clean Code JavaScript](https://github.com/ryanmcdermott/clean-code-javascript)
- [Component Design](https://www.componentdriven.org/)

## Success Metrics

### Code Quality
- All PRs reviewed and approved
- Zero linting errors
- Components properly typed
- Tests written for components

### Productivity
- Complete assigned tasks on time
- Respond to feedback within 24h
- Participate in code reviews
- Ask questions when blocked

### Learning
- Complete weekly learning goals
- Apply feedback from Shivansh
- Improve code quality over time
- Share knowledge with team

### Collaboration
- Communicate blockers early
- Help teammates when possible
- Participate in discussions
- Contribute to documentation

## Support & Escalation

### When Stuck
1. Try to solve it yourself (30 min)
2. Search documentation and Stack Overflow
3. Ask Shivansh for help
4. Discuss in team Slack channel
5. Escalate if blocked > 2 hours

### Code Review Feedback
- Read feedback carefully
- Ask questions if unclear
- Make requested changes
- Learn from feedback
- Apply learnings to future code

### Blockers
- API not ready: Use mock data
- Design unclear: Ask Shivansh
- Complex feature: Pair program
- Technical issue: Ask team

## Tips for Success

### Code Quality
- Write small, focused components
- Use meaningful variable names
- Add comments for complex logic
- Follow team conventions
- Test your components

### Communication
- Ask questions early
- Share progress daily
- Communicate blockers
- Participate in discussions
- Help teammates

### Learning
- Review Shivansh's code
- Study existing components
- Practice new concepts
- Read documentation
- Experiment with code

### Time Management
- Break tasks into small steps
- Focus on one task at a time
- Take breaks when stuck
- Track your time
- Prioritize important tasks

---

**Your Impact**: Your components are the building blocks of the user interface. Quality components lead to a great user experience.

**Next Steps**:
1. Review TASKS.md for current sprint
2. Set up development environment (TECH_STACK.md)
3. Start with simple components
4. Ask Shivansh for guidance
5. Update CONTRIBUTION.md daily
6. Learn and improve continuously
