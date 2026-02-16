# Bhavya - Frontend Developer

## Role Overview
Frontend Developer responsible for UI components, forms, template marketplace, and supporting Shivansh with Next.js development.

## Primary Technologies
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui components
- React Hook Form
- Zod (validation)
- Framer Motion (animations)

## Core Responsibilities

### 1. UI Component Development
**Status**: 🔄 Ongoing
- Build reusable components
- Implement shadcn/ui components
- Create custom components
- Ensure accessibility
- Add animations
- Component documentation

**Component Library**:
```
components/ui/
├── button.tsx           ✅ Complete
├── input.tsx            ✅ Complete
├── select.tsx           ✅ Complete
├── textarea.tsx         ✅ Complete
├── checkbox.tsx         ✅ Complete
├── radio-group.tsx      ✅ Complete
├── dialog.tsx           ✅ Complete
├── dropdown-menu.tsx    ✅ Complete
├── table.tsx            🔄 In Progress
├── card.tsx             ✅ Complete
├── badge.tsx            ✅ Complete
├── toast.tsx            ✅ Complete
├── tabs.tsx             🔄 In Progress
├── accordion.tsx        📋 Planned
├── calendar.tsx         📋 Planned
├── date-picker.tsx      📋 Planned
└── file-upload.tsx      📋 Planned
```

**Tasks**:
- [ ] Complete all shadcn/ui components
- [ ] Create custom components
- [ ] Add Storybook documentation
- [ ] Ensure WCAG 2.1 AA compliance
- [ ] Add keyboard navigation
- [ ] Implement dark mode support

### 2. Form Components & Validation
**Status**: 🔄 High Priority
- Build form components
- Implement validation
- Error handling
- Multi-step forms
- File upload forms
- Auto-save functionality

**Form Implementation**:
```tsx
// components/features/forms/BillUploadForm.tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const billUploadSchema = z.object({
  file: z.instanceof(File).refine(
    (file) => file.size <= 10 * 1024 * 1024,
    'File size must be less than 10MB'
  ),
  category: z.string().min(1, 'Category is required'),
  description: z.string().optional()
})

export function BillUploadForm() {
  const form = useForm({
    resolver: zodResolver(billUploadSchema)
  })
  
  return (
    <Form {...form}>
      <FileUploadField name="file" />
      <SelectField name="category" options={categories} />
      <TextareaField name="description" />
      <Button type="submit">Upload</Button>
    </Form>
  )
}
```

**Form Types to Build**:
- [ ] Bill upload form
- [ ] User registration form
- [ ] Profile edit form
- [ ] Template submission form
- [ ] Search/filter forms
- [ ] Settings forms

### 3. Template Marketplace UI
**Status**: 🔄 Shared with Shivansh
- Template cards
- Filter sidebar
- Search interface
- Template submission form
- Rating & review components
- Download interface

**Components to Build**:

#### Template Card
```tsx
// components/features/marketplace/TemplateCard.tsx
interface TemplateCardProps {
  template: Template
  onView: (id: string) => void
  onDownload: (id: string) => void
}

export function TemplateCard({ template, onView, onDownload }: TemplateCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <TemplatePreview src={template.preview} />
        <Badge>{template.category}</Badge>
      </CardHeader>
      <CardContent>
        <h3>{template.name}</h3>
        <p>{template.description}</p>
        <RatingStars rating={template.rating} />
        <div className="flex justify-between">
          <span>{template.downloads} downloads</span>
          <span>{template.price === 0 ? 'Free' : `₹${template.price}`}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => onView(template.id)}>View</Button>
        <Button onClick={() => onDownload(template.id)}>Download</Button>
      </CardFooter>
    </Card>
  )
}
```

#### Filter Sidebar
```tsx
// components/features/marketplace/FilterSidebar.tsx
export function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
  return (
    <aside className="w-64 space-y-6">
      <CategoryFilter 
        selected={filters.category}
        onChange={(cat) => onFilterChange({ ...filters, category: cat })}
      />
      <PriceFilter
        min={filters.priceMin}
        max={filters.priceMax}
        onChange={(min, max) => onFilterChange({ ...filters, priceMin: min, priceMax: max })}
      />
      <RatingFilter
        minRating={filters.minRating}
        onChange={(rating) => onFilterChange({ ...filters, minRating: rating })}
      />
      <SortOptions
        sortBy={filters.sortBy}
        onChange={(sort) => onFilterChange({ ...filters, sortBy: sort })}
      />
    </aside>
  )
}
```

#### Template Submission Form
```tsx
// components/features/marketplace/TemplateSubmissionForm.tsx
export function TemplateSubmissionForm() {
  return (
    <Form>
      <FormSection title="Basic Information">
        <InputField name="name" label="Template Name" required />
        <SelectField name="category" label="Category" options={categories} required />
        <TextareaField name="description" label="Description" required />
      </FormSection>
      
      <FormSection title="Template Files">
        <FileUploadField name="template" label="Template JSON" accept=".json" required />
        <FileUploadField name="preview" label="Preview Image" accept="image/*" required />
      </FormSection>
      
      <FormSection title="Pricing">
        <RadioGroup name="pricing">
          <Radio value="free">Free</Radio>
          <Radio value="paid">Paid</Radio>
        </RadioGroup>
        {isPaid && <InputField name="price" label="Price (₹)" type="number" />}
      </FormSection>
      
      <FormSection title="Tags">
        <TagInput name="tags" placeholder="Add tags..." />
      </FormSection>
      
      <Button type="submit">Submit for Review</Button>
    </Form>
  )
}
```

**Tasks**:
- [ ] Build template card component
- [ ] Create filter sidebar
- [ ] Implement search interface
- [ ] Build submission form
- [ ] Add rating component
- [ ] Create download modal

### 4. Data Visualization Components
**Status**: 📋 Planned
- Charts for dashboard
- Statistics cards
- Progress indicators
- Timeline components
- Activity feeds

**Visualization Libraries**:
- Recharts (charts)
- React-chartjs-2 (alternative)
- Framer Motion (animations)

**Components to Build**:
```tsx
// components/features/dashboard/StatsCard.tsx
export function StatsCard({ title, value, change, icon }: StatsCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3>{title}</h3>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <div className={cn(
          "text-sm",
          change > 0 ? "text-green-600" : "text-red-600"
        )}>
          {change > 0 ? '↑' : '↓'} {Math.abs(change)}%
        </div>
      </CardContent>
    </Card>
  )
}

// components/features/dashboard/BillChart.tsx
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'

export function BillChart({ data }: BillChartProps) {
  return (
    <Card>
      <CardHeader>
        <h3>Bills Over Time</h3>
      </CardHeader>
      <CardContent>
        <LineChart width={600} height={300} data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#3B82F6" />
        </LineChart>
      </CardContent>
    </Card>
  )
}
```

**Tasks**:
- [ ] Build stats cards
- [ ] Create line/bar charts
- [ ] Add pie charts
- [ ] Build progress bars
- [ ] Create activity timeline

### 5. File Upload Components
**Status**: 🔄 High Priority
- Drag & drop upload
- Multiple file support
- Upload progress
- File preview
- Error handling
- File type validation

**Upload Component**:
```tsx
// components/features/upload/FileUploadZone.tsx
import { useDropzone } from 'react-dropzone'
import { Upload, X } from 'lucide-react'

export function FileUploadZone({ onUpload, maxSize = 10 * 1024 * 1024 }: FileUploadZoneProps) {
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState<Record<string, number>>({})
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/pdf': ['.pdf']
    },
    maxSize,
    onDrop: (acceptedFiles) => {
      setFiles(prev => [...prev, ...acceptedFiles])
    }
  })
  
  const handleUpload = async () => {
    setUploading(true)
    for (const file of files) {
      await uploadFile(file, (progress) => {
        setProgress(prev => ({ ...prev, [file.name]: progress }))
      })
    }
    setUploading(false)
    onUpload(files)
  }
  
  return (
    <div>
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer",
          isDragActive && "border-primary bg-primary/10"
        )}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p>Drag & drop files here, or click to select</p>
        <p className="text-sm text-gray-500">
          Supports: PDF, PNG, JPG (Max {maxSize / 1024 / 1024}MB)
        </p>
      </div>
      
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file) => (
            <FilePreview
              key={file.name}
              file={file}
              progress={progress[file.name]}
              onRemove={() => setFiles(files.filter(f => f !== file))}
            />
          ))}
          <Button onClick={handleUpload} disabled={uploading}>
            {uploading ? 'Uploading...' : 'Upload All'}
          </Button>
        </div>
      )}
    </div>
  )
}
```

**Tasks**:
- [ ] Build drag & drop zone
- [ ] Add file preview
- [ ] Implement progress bars
- [ ] Add file validation
- [ ] Handle upload errors
- [ ] Support batch upload

### 6. Table Components
**Status**: 🔄 In Progress
- Data tables
- Sorting & filtering
- Pagination
- Row selection
- Bulk actions
- Export functionality

**Table Implementation**:
```tsx
// components/features/tables/BillTable.tsx
import { useReactTable, getCoreRowModel, getSortedRowModel } from '@tanstack/react-table'

export function BillTable({ data }: BillTableProps) {
  const columns = [
    { accessorKey: 'invoiceNumber', header: 'Invoice #' },
    { accessorKey: 'vendor', header: 'Vendor' },
    { accessorKey: 'amount', header: 'Amount' },
    { accessorKey: 'date', header: 'Date' },
    { accessorKey: 'status', header: 'Status', cell: StatusBadge },
    { id: 'actions', cell: ActionsCell }
  ]
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  })
  
  return (
    <div>
      <TableToolbar
        selectedRows={table.getSelectedRowModel().rows}
        onBulkAction={handleBulkAction}
      />
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id}>
                  {header.column.getCanSort() ? (
                    <Button onClick={header.column.getToggleSortingHandler()}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      <SortIcon direction={header.column.getIsSorted()} />
                    </Button>
                  ) : (
                    flexRender(header.column.columnDef.header, header.getContext())
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination table={table} />
    </div>
  )
}
```

**Tasks**:
- [ ] Build base table component
- [ ] Add sorting functionality
- [ ] Implement filtering
- [ ] Add pagination
- [ ] Support row selection
- [ ] Add bulk actions

### 7. Modal & Dialog Components
**Status**: 🔄 In Progress
- Confirmation dialogs
- Form modals
- Image viewers
- Alert dialogs
- Drawer components

**Modal Examples**:
```tsx
// components/features/modals/ConfirmDialog.tsx
export function ConfirmDialog({ 
  open, 
  onClose, 
  onConfirm, 
  title, 
  description 
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="destructive" onClick={onConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// components/features/modals/BillDetailModal.tsx
export function BillDetailModal({ bill, open, onClose }: BillDetailModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Bill Details - {bill.invoiceNumber}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <ImageViewer src={bill.image} />
          </div>
          <div>
            <BillDetails bill={bill} />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => downloadBill(bill.id)}>Download</Button>
          <Button onClick={() => editBill(bill.id)}>Edit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
```

**Tasks**:
- [ ] Build confirm dialog
- [ ] Create form modals
- [ ] Add image viewer modal
- [ ] Build drawer component
- [ ] Add alert dialogs

### 8. Animation & Transitions
**Status**: 📋 Planned
- Page transitions
- Component animations
- Loading states
- Skeleton screens
- Micro-interactions

**Animation Examples**:
```tsx
// Using Framer Motion
import { motion } from 'framer-motion'

export function AnimatedCard({ children }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

// Skeleton loader
export function BillCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-20 w-full" />
      </CardContent>
    </Card>
  )
}
```

**Tasks**:
- [ ] Add page transitions
- [ ] Create loading animations
- [ ] Build skeleton screens
- [ ] Add hover effects
- [ ] Implement micro-interactions

### 9. Responsive Design
**Status**: 🔄 Ongoing
- Mobile-first approach
- Tablet optimization
- Desktop layouts
- Touch-friendly UI
- Responsive tables

**Breakpoints**:
```tsx
// Tailwind breakpoints
sm: 640px   // Mobile landscape
md: 768px   // Tablet
lg: 1024px  // Desktop
xl: 1280px  // Large desktop
2xl: 1536px // Extra large
```

**Responsive Patterns**:
```tsx
// Mobile-first responsive component
export function ResponsiveNav() {
  return (
    <nav className="flex flex-col md:flex-row gap-4">
      {/* Mobile: vertical, Desktop: horizontal */}
    </nav>
  )
}

// Conditional rendering
export function BillList() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  
  return isMobile ? <BillCards /> : <BillTable />
}
```

### 10. Accessibility (A11y)
**Status**: 🔄 High Priority
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- ARIA labels
- Focus management
- Color contrast

**A11y Checklist**:
```tsx
// Proper semantic HTML
<button> not <div onClick>

// ARIA labels
<button aria-label="Close dialog">
  <X />
</button>

// Keyboard navigation
<div
  role="button"
  tabIndex={0}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
>

// Focus management
const dialogRef = useRef<HTMLDivElement>(null)
useEffect(() => {
  if (open) {
    dialogRef.current?.focus()
  }
}, [open])

// Color contrast
// Ensure 4.5:1 ratio for normal text
// Ensure 3:1 ratio for large text
```

**Tasks**:
- [ ] Audit all components for A11y
- [ ] Add ARIA labels
- [ ] Implement keyboard navigation
- [ ] Test with screen readers
- [ ] Fix color contrast issues
- [ ] Add focus indicators

## Current Sprint Tasks

### Week 1-2: Core UI Components
- [ ] Complete shadcn/ui integration
- [ ] Build custom components
- [ ] Create form components
- [ ] Add validation
- [ ] Implement file upload
- [ ] Write component tests

### Week 3-4: Template Marketplace
- [ ] Build template cards
- [ ] Create filter sidebar
- [ ] Implement search
- [ ] Build submission form
- [ ] Add rating component
- [ ] Create download interface

### Week 5-6: Data Visualization & Tables
- [ ] Build stats cards
- [ ] Create charts
- [ ] Implement data tables
- [ ] Add sorting/filtering
- [ ] Build pagination
- [ ] Add export functionality

## Code Quality Standards

### Component Structure
```tsx
// 1. Imports
import { useState } from 'react'
import { Button } from '@/components/ui/button'

// 2. Types
interface Props {
  title: string
  onSubmit: () => void
}

// 3. Component
export function MyComponent({ title, onSubmit }: Props) {
  // 4. State
  const [isOpen, setIsOpen] = useState(false)
  
  // 5. Handlers
  const handleClick = () => {
    setIsOpen(true)
    onSubmit()
  }
  
  // 6. Render
  return (
    <div>
      <h1>{title}</h1>
      <Button onClick={handleClick}>Submit</Button>
    </div>
  )
}
```

### Styling Conventions
```tsx
// Use Tailwind utility classes
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">

// Use cn() for conditional classes
import { cn } from '@/lib/utils'
<div className={cn(
  "base-classes",
  isActive && "active-classes",
  isDisabled && "disabled-classes"
)}>

// Extract repeated patterns
const cardStyles = "p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
```

## Testing Strategy

### Component Tests
```tsx
// __tests__/components/TemplateCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { TemplateCard } from '@/components/features/marketplace/TemplateCard'

describe('TemplateCard', () => {
  const template = {
    id: '1',
    name: 'GST Invoice',
    category: 'invoice',
    rating: 4.5,
    downloads: 100,
    price: 0
  }
  
  it('renders template information', () => {
    render(<TemplateCard template={template} />)
    expect(screen.getByText('GST Invoice')).toBeInTheDocument()
    expect(screen.getByText('100 downloads')).toBeInTheDocument()
  })
  
  it('calls onDownload when download button clicked', () => {
    const onDownload = jest.fn()
    render(<TemplateCard template={template} onDownload={onDownload} />)
    fireEvent.click(screen.getByText('Download'))
    expect(onDownload).toHaveBeenCalledWith('1')
  })
})
```

## Communication

### Daily Updates
- Post progress in team chat
- Update TASKS.md
- Share component demos

### Code Reviews
- Review Shivansh's PRs
- Validate component usage
- Check accessibility

### Documentation
- Document components in Storybook
- Write usage examples
- Maintain component library

## Learning & Development

### Current Focus
- Advanced React patterns
- Accessibility best practices
- Animation techniques
- Form handling
- Testing strategies

### Resources
- React documentation
- Tailwind CSS docs
- shadcn/ui components
- Framer Motion docs
- A11y guidelines

## Success Metrics

- Component reusability: > 80%
- Accessibility score: WCAG 2.1 AA
- Mobile responsiveness: 100%
- Component test coverage: > 85%
- Storybook documentation: All components

## Contact & Collaboration

- **Primary Stack**: React Components & UI
- **Collaborates With**:
  - Shivansh (Page integration, features)
  - Harit (Data formats, API responses)
  - Tushar (Admin UI components)
- **Availability**: 9 AM - 6 PM IST
- **Preferred Communication**: Slack, GitHub Issues
