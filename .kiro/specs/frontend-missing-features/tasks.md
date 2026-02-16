# Implementation Plan: Frontend Missing Features

## Overview

This implementation plan breaks down the development of 16 major feature modules for the KiroTax AI Frontend. The implementation will be done in TypeScript using Next.js 14, React 18, and modern frontend tooling. Each task builds incrementally, with testing integrated throughout.

## Tasks

- [ ] 1. Set up project infrastructure and shared utilities
  - Create directory structure for new modules under `src/`
  - Set up TypeScript types for all new API endpoints (Backend + Admin API)
  - Configure SignalR client connection utilities
  - Set up React Query configuration for API state management
  - Create shared UI components (LoadingSkeleton, ErrorBoundary, Toast)
  - Configure testing infrastructure (Vitest, React Testing Library, fast-check)
  - _Requirements: 16.6, 17.1, 20.1, 20.2, 20.3_

- [ ] 2. Implement Organization Management Module
  - [ ] 2.1 Create organization data types and API client
    - Define Organization, OrganizationSettings, and related TypeScript interfaces
    - Implement API client functions for organization CRUD operations
    - Create Zustand store for organization state management
    - _Requirements: 1.1 (adapted for organizations)_
  
  - [ ]* 2.2 Write property test for organization API integration
    - **Property 1: API Integration Consistency**
    - **Validates: Requirements 1.1**
  
  - [ ] 2.3 Build OrganizationRegistrationForm component
    - Create multi-step registration form with validation
    - Implement form submission with error handling
    - Add success confirmation and redirect
    - _Requirements: 1.1 (adapted for organizations)_
  
  - [ ] 2.4 Build OrganizationSettingsPanel component
    - Create tabbed settings interface (General, Features, Branding, Limits)
    - Implement settings update with optimistic UI updates
    - Add settings validation and error display
    - _Requirements: 15.1, 15.2_
  
  - [ ] 2.5 Build OrganizationBrandingEditor component
    - Create logo upload with preview
    - Implement color picker for primary/secondary colors
    - Add live preview of branding changes
    - _Requirements: 15.2_
  
  - [ ]* 2.6 Write unit tests for organization components
    - Test form validation and submission
    - Test settings update flow
    - Test branding preview
    - _Requirements: 1.1, 15.1, 15.2_

- [ ] 3. Checkpoint - Verify organization management
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 4. Implement Compliance Module
  - [ ] 4.1 Create compliance data types and API client
    - Define ComplianceResult, Violation, ComplianceHistory interfaces
    - Implement API client for compliance validation endpoints
    - Create Zustand store for compliance state
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7_
  
  - [ ]* 4.2 Write property test for compliance validation
    - **Property 2: Data Categorization and Grouping**
    - **Validates: Requirements 1.2**
  
  - [ ] 4.3 Build ComplianceChecker component
    - Create bill upload interface for compliance check
    - Implement API call to validation endpoint
    - Display loading state during validation
    - _Requirements: 1.1_
  
  - [ ] 4.4 Build ComplianceResultsPanel component
    - Display violations grouped by severity (critical, warning, info)
    - Implement expandable violation cards
    - Add visual severity indicators (colors, icons)
    - _Requirements: 1.2_
  
  - [ ] 4.5 Build ComplianceViolationCard component
    - Display violation details (rule, description)
    - Show regulation text from RAG system
    - Display suggested fixes
    - Add "Request AI Explanation" button
    - _Requirements: 1.3, 1.4_
  
  - [ ] 4.6 Build ComplianceHistoryTimeline component
    - Fetch and display historical validation results
    - Implement timeline visualization
    - Add filtering by date range
    - _Requirements: 1.6_
  
  - [ ] 4.7 Build ComplianceReportExporter component
    - Implement PDF export using jsPDF
    - Format compliance report with violations and recommendations
    - Add download functionality
    - _Requirements: 1.5_
  
  - [ ]* 4.8 Write property test for export functionality
    - **Property 4: Export Functionality**
    - **Validates: Requirements 1.5**
  
  - [ ] 4.9 Implement conditional "Submit for Approval" button
    - Show button only when compliance status is "pass"
    - Disable button when status is "fail" or "warning"
    - Add tooltip explaining why button is disabled
    - _Requirements: 1.7_
  
  - [ ]* 4.10 Write property test for conditional UI state
    - **Property 6: Conditional UI State**
    - **Validates: Requirements 1.7**
  
  - [ ]* 4.11 Write unit tests for compliance components
    - Test violation grouping logic
    - Test PDF export generation
    - Test conditional button display
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7_

- [ ] 5. Checkpoint - Verify compliance module
  - Ensure all tests pass, ask the user if questions arise.


- [ ] 6. Implement Gemini AI Integration Module
  - [ ] 6.1 Create Gemini AI data types and API client
    - Define ExtractionResult, ExtractedField, ChatMessage interfaces
    - Implement API client for Gemini endpoints (extract, chat, suggest)
    - Create Zustand store for AI state and chat history
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_
  
  - [ ] 6.2 Build AIFieldExtractor component
    - Create bill upload interface with Gemini enhancement flag
    - Call OCR endpoint with AI enhancement
    - Display extracted fields with confidence scores
    - _Requirements: 2.1_
  
  - [ ]* 6.3 Write property test for confidence score visualization
    - **Property 7: Confidence Score Visualization**
    - **Validates: Requirements 2.1, 2.6**
  
  - [ ] 6.4 Build ConfidenceIndicator component
    - Display confidence percentage with color coding (green > 80%, yellow 50-80%, red < 50%)
    - Add icon indicators for confidence levels
    - Show tooltip with confidence explanation
    - _Requirements: 2.6_
  
  - [ ] 6.5 Build AIChat component
    - Create chat interface with message history
    - Implement message input with send button
    - Display user and AI messages with different styling
    - _Requirements: 2.2, 2.3, 2.4_
  
  - [ ] 6.6 Implement streaming AI responses
    - Set up Server-Sent Events (SSE) for streaming
    - Display AI responses as they stream in
    - Handle stream errors and reconnection
    - _Requirements: 2.3_
  
  - [ ]* 6.7 Write property test for real-time streaming
    - **Property 8: Real-time Streaming**
    - **Validates: Requirements 2.3**
  
  - [ ] 6.8 Build AIFieldSuggestions component
    - Display suggested field corrections with highlighting
    - Add accept/reject buttons for each suggestion
    - Update field values on acceptance
    - _Requirements: 2.5_
  
  - [ ]* 6.9 Write property test for field suggestion workflow
    - **Property 9: Field Suggestion Workflow**
    - **Validates: Requirements 2.5**
  
  - [ ] 6.10 Implement low confidence prompts
    - Check confidence threshold (< 70%)
    - Display verification prompt for low confidence fields
    - Allow manual correction with inline editing
    - _Requirements: 2.7_
  
  - [ ]* 6.11 Write unit tests for AI components
    - Test chat message display
    - Test streaming response handling
    - Test suggestion acceptance/rejection
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

- [ ] 7. Implement Mapper Module
  - [ ] 7.1 Create mapper data types and API client
    - Define MappingTemplate, MappingRule, FieldSchema interfaces
    - Implement API client for mapper endpoints
    - Create Zustand store for mapping state
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_
  
  - [ ] 7.2 Build FieldMappingCanvas component
    - Create visual interface with source and target schema panels
    - Implement drag-and-drop field connections
    - Display field types and validation rules
    - _Requirements: 3.1_
  
  - [ ]* 7.3 Write property test for visual mapping interface
    - **Property 10: Visual Mapping Interface**
    - **Validates: Requirements 3.1, 3.4**
  
  - [ ] 7.4 Build MappingRuleEditor component
    - Create form for defining transformation rules
    - Add field type validation
    - Implement default value configuration
    - _Requirements: 3.2, 3.6_
  
  - [ ]* 7.5 Write property test for mapping validation
    - **Property 11: Mapping Validation**
    - **Validates: Requirements 3.6**
  
  - [ ] 7.6 Build MappingPreview component
    - Display before/after field values side-by-side
    - Highlight changed fields
    - Show transformation applied
    - _Requirements: 3.3, 3.4_
  
  - [ ]* 7.7 Write property test for transformation preview
    - **Property 13: Transformation Preview**
    - **Validates: Requirements 3.3, 3.4**
  
  - [ ] 7.8 Build MappingTemplateLibrary component
    - Display list of saved mapping templates
    - Add search and filter functionality
    - Implement template selection and application
    - _Requirements: 3.5_
  
  - [ ] 7.9 Implement smart template suggestion
    - Analyze bill format on import
    - Match against existing templates
    - Display suggested templates with confidence scores
    - _Requirements: 3.7_
  
  - [ ]* 7.10 Write property test for smart template suggestion
    - **Property 12: Smart Template Suggestion**
    - **Validates: Requirements 3.7**
  
  - [ ]* 7.11 Write unit tests for mapper components
    - Test field connection creation
    - Test validation error display
    - Test template suggestion logic
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_

- [ ] 8. Checkpoint - Verify AI and mapper modules
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 9. Implement Tender Management Module
  - [ ] 9.1 Create tender data types and API client
    - Define Tender, TenderResponse, TenderStatus interfaces
    - Implement API client for tender endpoints
    - Create Zustand store for tender state
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_
  
  - [ ] 9.2 Build TenderUploader component
    - Create file upload interface for tender documents
    - Call tender processing endpoint
    - Display upload progress
    - _Requirements: 4.1_
  
  - [ ] 9.3 Build TenderDetailsViewer component
    - Display extracted tender information (title, deadline, requirements, financial details)
    - Format dates and currency values
    - Show extraction confidence
    - _Requirements: 4.2_
  
  - [ ] 9.4 Build TenderStatusTracker component
    - Display current tender status with visual indicator
    - Show status history timeline
    - Allow status updates for authorized users
    - _Requirements: 4.3_
  
  - [ ]* 9.5 Write property test for status tracking
    - **Property 14: Status Tracking**
    - **Validates: Requirements 4.3**
  
  - [ ] 9.6 Build TenderDeadlineAlert component
    - Calculate days until deadline
    - Display warning when deadline is within threshold (7 days)
    - Show critical alert when deadline is within 24 hours
    - Trigger SignalR notification for approaching deadlines
    - _Requirements: 4.4_
  
  - [ ]* 9.7 Write property test for deadline warning system
    - **Property 15: Deadline Warning System**
    - **Validates: Requirements 4.4**
  
  - [ ] 9.8 Build TenderResponseBuilder component
    - Create rich text editor for response content
    - Load response templates for common tender types
    - Add file attachment support
    - _Requirements: 4.5, 4.6_
  
  - [ ]* 9.9 Write property test for document attachment
    - **Property 16: Document Attachment**
    - **Validates: Requirements 4.6**
  
  - [ ] 9.10 Implement tender submission with receipt generation
    - Submit tender response to backend
    - Generate submission receipt with timestamp and reference number
    - Display receipt and provide download option
    - _Requirements: 4.7_
  
  - [ ]* 9.11 Write property test for receipt generation
    - **Property 17: Receipt Generation**
    - **Validates: Requirements 4.7**
  
  - [ ]* 9.12 Write unit tests for tender components
    - Test deadline calculation
    - Test status updates
    - Test receipt generation
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_

- [ ] 10. Implement CA Workflow Automation Module
  - [ ] 10.1 Create workflow data types and API client
    - Define WorkflowRule, ApprovalRequest, WorkflowCondition interfaces
    - Implement API client for workflow endpoints
    - Create Zustand store for workflow state
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7_
  
  - [ ] 10.2 Build WorkflowDashboard component
    - Display pending approvals count
    - Show rejected items count
    - Display completed tasks count
    - Add quick filters for each category
    - _Requirements: 5.1_
  
  - [ ] 10.3 Build WorkflowRuleBuilder component
    - Create form for defining workflow conditions
    - Add approval chain configuration
    - Implement rule validation
    - _Requirements: 5.3_
  
  - [ ] 10.4 Build ApprovalQueue component
    - Display list of items requiring approval
    - Show item details and approval history
    - Add approve/reject buttons
    - _Requirements: 5.1, 5.4_
  
  - [ ] 10.5 Implement real-time approval notifications
    - Listen for SignalR approval events
    - Display toast notification when approval is required
    - Update approval queue in real-time
    - _Requirements: 5.2, 5.4_
  
  - [ ]* 10.6 Write property test for real-time notification display
    - **Property 19: Real-time Notification Display**
    - **Validates: Requirements 5.2**
  
  - [ ] 10.7 Build BulkApprovalPanel component
    - Add checkboxes for selecting multiple items
    - Display bulk action toolbar
    - Implement bulk approve/reject with confirmation
    - _Requirements: 5.5_
  
  - [ ] 10.8 Build WorkflowHistoryViewer component
    - Display approval history for each bill
    - Show who approved, when, and comments
    - Add filtering by date range and user
    - _Requirements: 5.6_
  
  - [ ]* 10.9 Write property test for historical data display
    - **Property 5: Historical Data Display**
    - **Validates: Requirements 5.6**
  
  - [ ] 10.10 Implement workflow rule violation handling
    - Validate workflow rules before progression
    - Display clear error messages for violations
    - Prevent progression when rules are violated
    - _Requirements: 5.7_
  
  - [ ]* 10.11 Write unit tests for workflow components
    - Test rule validation
    - Test bulk approval processing
    - Test real-time updates
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7_

- [ ] 11. Checkpoint - Verify tender and workflow modules
  - Ensure all tests pass, ask the user if questions arise.


- [ ] 12. Implement Real-time Notifications Module
  - [ ] 12.1 Create notification data types and SignalR client
    - Define Notification, NotificationPreferences interfaces
    - Implement SignalR hub connection with reconnection logic
    - Create Zustand store for notification state
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7_
  
  - [ ] 12.2 Build NotificationProvider component
    - Establish SignalR connection on mount
    - Register event handlers for all notification types
    - Implement automatic reconnection with exponential backoff
    - Display connection status indicator
    - _Requirements: 6.1, 6.6_
  
  - [ ]* 12.3 Write property test for SignalR connection management
    - **Property 18: SignalR Connection Management**
    - **Validates: Requirements 6.1, 6.6**
  
  - [ ] 12.4 Build ToastNotification component
    - Display toast with appropriate styling based on notification type
    - Implement auto-dismiss after timeout
    - Add close button
    - Support action buttons in toast
    - _Requirements: 6.2_
  
  - [ ] 12.5 Build NotificationCenter component
    - Display list of all notifications
    - Show read/unread status with visual indicators
    - Implement mark as read functionality
    - Add mark all as read button
    - _Requirements: 6.3, 6.4_
  
  - [ ]* 12.6 Write property test for notification state management
    - **Property 20: Notification State Management**
    - **Validates: Requirements 6.3, 6.4**
  
  - [ ] 12.7 Build NotificationPreferences component
    - Create form for configuring notification preferences
    - Add toggles for each notification type
    - Implement email/push/sound preference settings
    - Save preferences to backend
    - _Requirements: 6.5_
  
  - [ ]* 12.8 Write property test for user preference persistence
    - **Property 21: User Preference Persistence**
    - **Validates: Requirements 6.5**
  
  - [ ] 12.9 Implement conditional sound alerts
    - Check user preferences for sound enabled
    - Play audio alert for critical notifications
    - Use different sounds for different notification types
    - _Requirements: 6.7_
  
  - [ ]* 12.10 Write property test for conditional sound alerts
    - **Property 22: Conditional Sound Alerts**
    - **Validates: Requirements 6.7**
  
  - [ ]* 12.11 Write unit tests for notification components
    - Test SignalR event handling
    - Test toast display and dismissal
    - Test notification center updates
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7_

- [ ] 13. Implement Advanced Reporting Module
  - [ ] 13.1 Create reporting data types and API client
    - Define ReportConfig, ChartConfig, MetricConfig interfaces
    - Implement API client for report endpoints
    - Create Zustand store for report state
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7_
  
  - [ ] 13.2 Build ReportBuilder component
    - Create form for configuring report parameters
    - Add filters for date range, client, bill type, status
    - Implement chart type selection
    - Add metric selection
    - _Requirements: 7.1_
  
  - [ ] 13.3 Build DashboardCharts component
    - Integrate Recharts library
    - Implement bar, line, pie, and area chart types
    - Add interactive tooltips and legends
    - Support chart customization (colors, labels)
    - _Requirements: 7.2, 7.3_
  
  - [ ]* 13.4 Write property test for chart rendering
    - **Property 23: Chart Rendering**
    - **Validates: Requirements 7.2, 7.3**
  
  - [ ] 13.5 Build MetricCards component
    - Display key metrics (total revenue, tax collected, pending bills, compliance rate)
    - Format values with appropriate units (currency, percentage)
    - Add trend indicators (up/down arrows)
    - _Requirements: 7.6_
  
  - [ ]* 13.6 Write property test for metric display
    - **Property 25: Metric Display**
    - **Validates: Requirements 7.6**
  
  - [ ] 13.7 Build ReportExporter component
    - Implement PDF export using jsPDF and html2canvas
    - Implement Excel export using SheetJS
    - Add export format selection
    - Display export progress
    - _Requirements: 7.4_
  
  - [ ] 13.8 Build ReportTemplateLibrary component
    - Display saved report configurations
    - Implement template selection and loading
    - Add save current configuration as template
    - _Requirements: 7.5_
  
  - [ ]* 13.9 Write property test for template persistence
    - **Property 24: Template Persistence**
    - **Validates: Requirements 7.5**
  
  - [ ] 13.10 Implement automatic chart refresh
    - Listen for SignalR data update events
    - Refresh chart data without full page reload
    - Show loading indicator during refresh
    - _Requirements: 7.7_
  
  - [ ]* 13.11 Write property test for automatic refresh
    - **Property 26: Automatic Refresh**
    - **Validates: Requirements 7.7**
  
  - [ ]* 13.12 Write unit tests for reporting components
    - Test report configuration
    - Test chart rendering with different data
    - Test export generation
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7_

- [ ] 14. Implement Role-specific Dashboards Module
  - [ ] 14.1 Create dashboard data types and API client
    - Define DashboardConfig, WidgetConfig interfaces
    - Implement API client for dashboard endpoints
    - Create Zustand store for dashboard state
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7_
  
  - [ ] 14.2 Build CADashboard component
    - Display client overview widget
    - Show pending approvals widget
    - Display revenue metrics widget
    - Show recent activity widget
    - Add quick action buttons (upload bill, create client, run report)
    - _Requirements: 8.1, 8.7_
  
  - [ ] 14.3 Build AuditorDashboard component
    - Display bills requiring audit widget
    - Show compliance issues widget
    - Display audit history widget
    - Add quick action buttons (start audit, view reports)
    - _Requirements: 8.2, 8.7_
  
  - [ ] 14.4 Build ClientDashboard component
    - Display user's bills widget
    - Show payment status widget
    - Display tax summaries widget
    - Add downloadable reports widget
    - Add quick action buttons (upload bill, download report)
    - _Requirements: 8.3, 8.7_
  
  - [ ]* 14.5 Write property test for role-based dashboard content
    - **Property 27: Role-based Dashboard Content**
    - **Validates: Requirements 8.1, 8.2, 8.3, 8.7**
  
  - [ ] 14.6 Build DashboardCustomizer component
    - Implement drag-and-drop widget rearrangement
    - Add widget library for adding new widgets
    - Implement widget removal
    - Save layout to backend
    - _Requirements: 8.4, 8.5_
  
  - [ ]* 14.7 Write property test for dashboard customization
    - **Property 28: Dashboard Customization**
    - **Validates: Requirements 8.4, 8.5**
  
  - [ ] 14.8 Implement real-time widget updates
    - Listen for SignalR dashboard update events
    - Refresh individual widgets without full reload
    - Show loading state during widget refresh
    - _Requirements: 8.6_
  
  - [ ]* 14.9 Write unit tests for dashboard components
    - Test role-specific widget display
    - Test widget customization
    - Test real-time updates
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7_

- [ ] 15. Checkpoint - Verify notifications, reporting, and dashboards
  - Ensure all tests pass, ask the user if questions arise.


- [ ] 16. Implement Template Marketplace Module
  - [ ] 16.1 Create marketplace data types and API client
    - Define MarketplaceTemplate, TemplateRating interfaces
    - Implement API client for marketplace and admin template endpoints
    - Create Zustand store for marketplace state
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7_
  
  - [ ] 16.2 Build TemplateMarketplace component
    - Display template grid with categories
    - Implement search and filter functionality
    - Add sorting options (rating, price, downloads)
    - _Requirements: 9.1_
  
  - [ ] 16.3 Build TemplateDetailView component
    - Display template preview image
    - Show description, rating, price, usage count
    - Display creator information
    - Add purchase button
    - _Requirements: 9.2_
  
  - [ ]* 16.4 Write property test for template detail display
    - **Property 29: Template Detail Display**
    - **Validates: Requirements 9.2**
  
  - [ ] 16.5 Build TemplateRatingSystem component
    - Display star rating input
    - Add review text area
    - Submit rating and review to backend
    - Update template average rating
    - _Requirements: 9.3_
  
  - [ ]* 16.6 Write property test for rating and review system
    - **Property 30: Rating and Review System**
    - **Validates: Requirements 9.3**
  
  - [ ] 16.7 Build TemplatePurchaseFlow component
    - Display purchase confirmation dialog
    - Process payment (mock for now)
    - Add template to user's library
    - Show purchase success message
    - _Requirements: 9.4, 9.5_
  
  - [ ]* 16.8 Write property test for purchase flow
    - **Property 31: Purchase Flow**
    - **Validates: Requirements 9.4, 9.5**
  
  - [ ] 16.9 Build MyTemplatesLibrary component
    - Display user's purchased templates
    - Add template preview and details
    - Implement template application to bills
    - _Requirements: 9.5_
  
  - [ ] 16.10 Build template submission interface
    - Create form for submitting new templates
    - Add template file upload
    - Implement metadata input (name, description, category, price)
    - Submit to admin API for approval
    - _Requirements: 9.6_
  
  - [ ] 16.11 Build admin template approval interface
    - Display pending templates for admin review
    - Show template preview and details
    - Add approve/reject buttons with reason input
    - Update template status
    - _Requirements: 9.7_
  
  - [ ]* 16.12 Write property test for approval workflow
    - **Property 32: Approval Workflow**
    - **Validates: Requirements 9.7**
  
  - [ ]* 16.13 Write unit tests for marketplace components
    - Test search and filtering
    - Test purchase flow
    - Test rating submission
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7_

- [ ] 17. Implement Audit Trail Viewer Module
  - [ ] 17.1 Create audit log data types and API client
    - Define ActivityLog, AuditLogFilter, ChangeRecord interfaces
    - Implement API client for activity log endpoints
    - Create Zustand store for audit log state
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7_
  
  - [ ] 17.2 Build AuditLogTable component
    - Display activity logs in paginated table
    - Show columns: timestamp, user, action, entity, severity
    - Implement row click to view details
    - _Requirements: 10.1_
  
  - [ ]* 17.3 Write property test for paginated data display
    - **Property 33: Paginated Data Display**
    - **Validates: Requirements 10.1**
  
  - [ ] 17.4 Build AuditLogFilters component
    - Add date range picker
    - Add user filter dropdown
    - Add action type multi-select
    - Add entity type multi-select
    - Add severity filter
    - Add search input for text search
    - _Requirements: 10.2_
  
  - [ ]* 17.5 Write property test for multi-criteria filtering
    - **Property 34: Multi-criteria Filtering**
    - **Validates: Requirements 10.2**
  
  - [ ] 17.6 Build AuditLogDetailModal component
    - Display full log entry details
    - Show before/after values for changes
    - Display IP address and user agent
    - Add related logs section
    - _Requirements: 10.3_
  
  - [ ]* 17.7 Write property test for detail view expansion
    - **Property 35: Detail View Expansion**
    - **Validates: Requirements 10.3**
  
  - [ ] 17.8 Build AuditLogExporter component
    - Implement CSV export
    - Implement PDF export
    - Apply current filters to export
    - Show export progress
    - _Requirements: 10.4_
  
  - [ ] 17.9 Implement anomaly highlighting
    - Detect suspicious activities (multiple failed logins, unusual access patterns)
    - Apply visual indicators (red badge, warning icon)
    - Add "Suspicious Activity" filter
    - _Requirements: 10.5_
  
  - [ ]* 17.10 Write property test for anomaly highlighting
    - **Property 36: Anomaly Highlighting**
    - **Validates: Requirements 10.5**
  
  - [ ] 17.11 Build AuditLogTimeline component
    - Display logs in chronological timeline
    - Group related activities
    - Add zoom controls for time range
    - _Requirements: 10.6_
  
  - [ ]* 17.12 Write property test for timeline visualization
    - **Property 37: Timeline Visualization**
    - **Validates: Requirements 10.6**
  
  - [ ] 17.13 Implement client-side filtering
    - Filter logs without API calls when possible
    - Update display without full page reload
    - Maintain filter state in URL query params
    - _Requirements: 10.7_
  
  - [ ]* 17.14 Write unit tests for audit log components
    - Test filtering logic
    - Test export generation
    - Test anomaly detection
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7_

- [ ] 18. Implement Bulk Operations Module
  - [ ] 18.1 Create bulk operation data types and API client
    - Define BulkOperation, BulkOperationResult interfaces
    - Implement API client for bulk operation endpoints
    - Create Zustand store for bulk operation state
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7_
  
  - [ ] 18.2 Build BulkSelectionToolbar component
    - Add "Select All" checkbox in table header
    - Display selected count
    - Show bulk action menu when items are selected
    - _Requirements: 11.1, 11.2_
  
  - [ ]* 18.3 Write property test for multi-select interface
    - **Property 38: Multi-select Interface**
    - **Validates: Requirements 11.1**
  
  - [ ] 18.4 Build BulkActionMenu component
    - Display available bulk operations (approve, reject, delete, export, assign)
    - Show operation confirmation dialog
    - Disable unavailable operations based on selection
    - _Requirements: 11.2, 11.3_
  
  - [ ] 18.5 Build BulkProgressTracker component
    - Display progress bar with percentage
    - Show current item being processed
    - Display estimated time remaining
    - Allow cancellation of bulk operation
    - _Requirements: 11.4_
  
  - [ ] 18.6 Build BulkResultsSummary component
    - Display success count and failure count
    - Show list of failed items with error messages
    - Add retry button for failed items
    - Provide download of results as CSV
    - _Requirements: 11.5_
  
  - [ ]* 18.7 Write property test for bulk operation processing
    - **Property 39: Bulk Operation Processing**
    - **Validates: Requirements 11.3, 11.4, 11.5**
  
  - [ ] 18.8 Build BulkUploadZone component
    - Implement drag-and-drop file upload
    - Support multiple file selection
    - Display file list with individual progress bars
    - Show upload status for each file
    - _Requirements: 11.6, 11.7_
  
  - [ ]* 18.9 Write property test for multi-file upload
    - **Property 40: Multi-file Upload**
    - **Validates: Requirements 11.6, 11.7**
  
  - [ ]* 18.10 Write unit tests for bulk operation components
    - Test selection logic
    - Test progress tracking
    - Test result summary display
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7_

- [ ] 19. Checkpoint - Verify marketplace, audit, and bulk operations
  - Ensure all tests pass, ask the user if questions arise.


- [ ] 20. Implement Document Generator Module
  - [ ] 20.1 Create document generator data types and API client
    - Define DocumentTemplate, DocumentSection, GenerateDocumentRequest interfaces
    - Implement API client for document generation endpoints
    - Create Zustand store for document generator state
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7_
  
  - [ ] 20.2 Build DocumentTemplateSelector component
    - Display available document templates (invoice, tax report, compliance certificate)
    - Show template preview thumbnails
    - Implement template selection
    - _Requirements: 12.1_
  
  - [ ] 20.3 Build DocumentPreview component
    - Render template with populated data
    - Display live preview as data changes
    - Support zoom in/out
    - _Requirements: 12.2_
  
  - [ ]* 20.4 Write property test for template population
    - **Property 41: Template Population**
    - **Validates: Requirements 12.2**
  
  - [ ] 20.5 Build DocumentCustomizer component
    - Add logo upload with preview
    - Implement color picker for branding colors
    - Add footer text input
    - Show customization preview in real-time
    - _Requirements: 12.3_
  
  - [ ]* 20.6 Write property test for template customization
    - **Property 42: Template Customization**
    - **Validates: Requirements 12.3**
  
  - [ ] 20.7 Build DocumentGenerator component
    - Generate PDF using jsPDF and html2canvas
    - Provide download button
    - Add email option with recipient input
    - Save generated document to backend
    - _Requirements: 12.4, 12.5_
  
  - [ ] 20.8 Implement batch document generation
    - Select multiple bills for generation
    - Generate documents for all selected bills
    - Show progress for batch generation
    - Provide zip download of all documents
    - _Requirements: 12.6_
  
  - [ ]* 20.9 Write property test for batch document generation
    - **Property 43: Batch Document Generation**
    - **Validates: Requirements 12.6**
  
  - [ ] 20.10 Build DocumentHistory component
    - Display list of generated documents
    - Show generation timestamp and user
    - Add download and re-generate buttons
    - _Requirements: 12.5_
  
  - [ ] 20.11 Implement audit logging for document generation
    - Log document generation action
    - Include document type, bill IDs, and user
    - Send log to backend audit trail
    - _Requirements: 12.7_
  
  - [ ]* 20.12 Write unit tests for document generator components
    - Test PDF generation
    - Test customization application
    - Test batch generation
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7_

- [ ] 21. Implement Change Tracking Module
  - [ ] 21.1 Create change tracking data types and API client
    - Define BillVersion, FieldChange, DiffResult interfaces
    - Implement API client for version history endpoints
    - Create Zustand store for change tracking state
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 13.6, 13.7_
  
  - [ ] 21.2 Build ChangeHistoryPanel component
    - Display list of all bill modifications
    - Show version number, timestamp, and user
    - Add filter by date range and user
    - _Requirements: 13.1, 13.6_
  
  - [ ]* 21.3 Write property test for change recording
    - **Property 44: Change Recording**
    - **Validates: Requirements 13.2**
  
  - [ ] 21.4 Build DiffViewer component
    - Display side-by-side comparison of versions
    - Highlight added fields in green
    - Highlight modified fields in yellow
    - Highlight deleted fields in red
    - _Requirements: 13.3_
  
  - [ ]* 21.5 Write property test for diff visualization
    - **Property 45: Diff Visualization**
    - **Validates: Requirements 13.3**
  
  - [ ] 21.6 Build VersionSelector component
    - Display dropdown of available versions
    - Show version metadata (number, date, user)
    - Load selected version for comparison
    - _Requirements: 13.3_
  
  - [ ] 21.7 Build ChangeRevertDialog component
    - Display confirmation dialog for revert action
    - Show diff of changes that will be reverted
    - Implement revert API call
    - Show success/error message
    - _Requirements: 13.4_
  
  - [ ]* 21.8 Write property test for version revert
    - **Property 46: Version Revert**
    - **Validates: Requirements 13.4**
  
  - [ ] 21.9 Build ChangeNotificationBadge component
    - Display badge on modified fields
    - Show tooltip with change details on hover
    - Include user who made the change
    - _Requirements: 13.5_
  
  - [ ]* 21.10 Write property test for user attribution
    - **Property 47: User Attribution**
    - **Validates: Requirements 13.5**
  
  - [ ] 21.11 Implement change history filtering
    - Filter by date range
    - Filter by user
    - Filter by field name
    - Update display without API call when possible
    - _Requirements: 13.6_
  
  - [ ]* 21.12 Write property test for history filtering
    - **Property 48: History Filtering**
    - **Validates: Requirements 13.6**
  
  - [ ] 21.13 Implement suspicious change detection
    - Detect unusual patterns (large value changes, off-hours modifications)
    - Flag suspicious changes with warning icon
    - Add "Review Required" status
    - _Requirements: 13.7_
  
  - [ ]* 21.14 Write unit tests for change tracking components
    - Test diff calculation
    - Test version comparison
    - Test revert functionality
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 13.6, 13.7_

- [ ] 22. Implement Search and Filters Module
  - [ ] 22.1 Create search data types and API client
    - Define SearchQuery, SearchResult, SearchFilter interfaces
    - Implement API client for search endpoints
    - Create Zustand store for search state
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 14.6, 14.7_
  
  - [ ] 22.2 Build GlobalSearchBar component
    - Create search input with icon
    - Position in header for global access
    - Implement keyboard shortcut (Cmd/Ctrl + K)
    - _Requirements: 14.1_
  
  - [ ] 22.3 Implement autocomplete suggestions
    - Fetch suggestions as user types
    - Display suggestions grouped by entity type
    - Highlight matching text in suggestions
    - Navigate suggestions with keyboard
    - _Requirements: 14.2_
  
  - [ ]* 22.4 Write property test for autocomplete suggestions
    - **Property 49: Autocomplete Suggestions**
    - **Validates: Requirements 14.2**
  
  - [ ] 22.4 Build AdvancedFilterPanel component
    - Add date range filter
    - Add amount range filter
    - Add status multi-select filter
    - Add client filter
    - Add tags filter
    - _Requirements: 14.3_
  
  - [ ] 22.5 Build SearchResultsView component
    - Display results grouped by entity type (bills, clients, templates, tenders)
    - Show result count for each type
    - Highlight search terms in results
    - Add pagination for large result sets
    - _Requirements: 14.4, 14.6_
  
  - [ ]* 22.6 Write property test for search term highlighting
    - **Property 50: Search Term Highlighting**
    - **Validates: Requirements 14.6**
  
  - [ ] 22.7 Build SavedSearches component
    - Display list of saved search queries
    - Add save current search button
    - Implement load saved search
    - Add delete saved search
    - _Requirements: 14.5_
  
  - [ ] 22.8 Build SearchSuggestions component
    - Display "Did you mean?" suggestions for no results
    - Suggest alternative filters
    - Show popular searches
    - _Requirements: 14.7_
  
  - [ ]* 22.9 Write property test for no results handling
    - **Property 51: No Results Handling**
    - **Validates: Requirements 14.7**
  
  - [ ]* 22.10 Write unit tests for search components
    - Test autocomplete logic
    - Test filter application
    - Test result grouping
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 14.6, 14.7_

- [ ] 23. Checkpoint - Verify document generator, change tracking, and search
  - Ensure all tests pass, ask the user if questions arise.


- [ ] 24. Implement Settings Management Module
  - [ ] 24.1 Create settings data types and API client
    - Define UserPreferences, SystemSettings, BrandingConfig interfaces
    - Implement API client for settings endpoints
    - Create Zustand store for settings state
    - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 15.6, 15.7_
  
  - [ ] 24.2 Build SettingsLayout component
    - Create tabbed interface (Profile, Notifications, Appearance, Security, Organization)
    - Implement tab navigation
    - Add save/cancel buttons
    - _Requirements: 15.1_
  
  - [ ] 24.3 Build ProfileSettings component
    - Display user profile form (name, email, company)
    - Add profile picture upload
    - Implement profile update
    - _Requirements: 15.2_
  
  - [ ] 24.4 Build NotificationSettings component
    - Add toggles for each notification type
    - Implement email/push/sound preferences
    - Save preferences to backend
    - _Requirements: 15.3_
  
  - [ ] 24.5 Build AppearanceSettings component
    - Add theme selector (light, dark, system)
    - Implement language selector
    - Add timezone selector
    - Add date format selector
    - Add number format selector
    - Apply changes immediately
    - _Requirements: 15.4, 15.5, 15.6_
  
  - [ ] 24.6 Build SecuritySettings component
    - Add change password form
    - Implement 2FA setup
    - Display active sessions
    - Add logout all devices button
    - _Requirements: 15.1_
  
  - [ ] 24.7 Build OrganizationSettings component (admin only)
    - Display organization branding settings
    - Add feature flags toggles
    - Implement integration configuration
    - Add billing settings
    - _Requirements: 15.1, 15.2_
  
  - [ ] 24.8 Implement settings persistence and application
    - Save settings to backend on change
    - Apply theme changes immediately
    - Update UI language without reload
    - Show confirmation toast on save
    - _Requirements: 15.2, 15.7_
  
  - [ ]* 24.9 Write property test for user preference persistence
    - **Property 21: User Preference Persistence**
    - **Validates: Requirements 15.2, 15.3, 15.4, 15.5, 15.6, 15.7**
  
  - [ ]* 24.10 Write unit tests for settings components
    - Test settings form validation
    - Test theme application
    - Test preference saving
    - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 15.6, 15.7_

- [ ] 25. Implement Error Handling and Validation
  - [ ] 25.1 Create error handling utilities
    - Implement global error handler class
    - Create error boundary component
    - Add retry logic with exponential backoff
    - Implement offline queue for failed actions
    - _Requirements: 16.1, 16.2, 16.3, 16.4, 16.5, 16.6, 16.7_
  
  - [ ] 25.2 Build inline validation for forms
    - Add validation rules to form fields
    - Display inline error messages
    - Implement real-time validation on blur
    - Show field-level error icons
    - _Requirements: 16.1_
  
  - [ ]* 25.3 Write property test for inline validation
    - **Property 52: Inline Validation**
    - **Validates: Requirements 16.1**
  
  - [ ] 25.4 Implement client-side validation
    - Validate all form fields before submission
    - Display validation summary
    - Prevent submission if validation fails
    - _Requirements: 16.3_
  
  - [ ]* 25.5 Write property test for client-side validation
    - **Property 53: Client-side Validation**
    - **Validates: Requirements 16.3**
  
  - [ ] 25.6 Build error message display
    - Create user-friendly error messages for API errors
    - Add suggested corrective actions
    - Implement error toast notifications
    - _Requirements: 16.2_
  
  - [ ] 25.7 Build offline indicator
    - Detect network status changes
    - Display offline banner
    - Queue actions when offline
    - Process queue when connection restored
    - _Requirements: 16.4_
  
  - [ ]* 25.8 Write property test for offline handling
    - **Property 54: Offline Handling**
    - **Validates: Requirements 16.4**
  
  - [ ] 25.9 Implement error logging
    - Log all errors to backend
    - Include error context (component, user, action)
    - Add error tracking integration (Sentry)
    - _Requirements: 16.5_
  
  - [ ] 25.10 Implement error boundaries
    - Wrap major sections with error boundaries
    - Display fallback UI on error
    - Add "Report Error" button
    - _Requirements: 16.6_
  
  - [ ]* 25.11 Write property test for error boundary protection
    - **Property 55: Error Boundary Protection**
    - **Validates: Requirements 16.6**
  
  - [ ] 25.12 Implement focus management on validation errors
    - Focus first invalid field on validation failure
    - Scroll invalid field into view
    - Announce error to screen readers
    - _Requirements: 16.7_
  
  - [ ]* 25.13 Write unit tests for error handling
    - Test error boundary behavior
    - Test offline queue
    - Test retry logic
    - _Requirements: 16.1, 16.2, 16.3, 16.4, 16.5, 16.6, 16.7_

- [ ] 26. Implement Performance Optimizations
  - [ ] 26.1 Implement virtual scrolling
    - Add react-window for large lists
    - Configure item size and overscan
    - Implement dynamic height calculation
    - _Requirements: 17.2_
  
  - [ ]* 26.2 Write property test for virtual scrolling
    - **Property 56: Virtual Scrolling**
    - **Validates: Requirements 17.2**
  
  - [ ] 26.3 Implement response caching
    - Configure React Query cache settings
    - Set appropriate stale times for different data types
    - Implement cache invalidation on mutations
    - _Requirements: 17.3_
  
  - [ ]* 26.4 Write property test for response caching
    - **Property 57: Response Caching**
    - **Validates: Requirements 17.3**
  
  - [ ] 26.5 Implement input debouncing
    - Add debounce to search inputs (300ms)
    - Add debounce to filter inputs (500ms)
    - Implement throttle for scroll events
    - _Requirements: 17.5_
  
  - [ ]* 26.6 Write property test for input debouncing
    - **Property 58: Input Debouncing**
    - **Validates: Requirements 17.5**
  
  - [ ] 26.7 Implement loading skeletons
    - Create skeleton components for common layouts
    - Display skeletons during data fetching
    - Match skeleton to actual content layout
    - _Requirements: 17.6_
  
  - [ ]* 26.8 Write property test for loading state display
    - **Property 59: Loading State Display**
    - **Validates: Requirements 17.6**
  
  - [ ] 26.9 Implement upload progress tracking
    - Display progress bar for file uploads
    - Show percentage and estimated time
    - Implement resumable uploads for large files
    - _Requirements: 17.7_
  
  - [ ]* 26.10 Write property test for upload progress tracking
    - **Property 60: Upload Progress Tracking**
    - **Validates: Requirements 17.7**
  
  - [ ]* 26.11 Write unit tests for performance optimizations
    - Test virtual scrolling behavior
    - Test cache invalidation
    - Test debounce timing
    - _Requirements: 17.2, 17.3, 17.5, 17.6, 17.7_

- [ ] 27. Checkpoint - Verify settings, error handling, and performance
  - Ensure all tests pass, ask the user if questions arise.


- [ ] 28. Implement Accessibility Features
  - [ ] 28.1 Implement keyboard navigation
    - Add keyboard event handlers to all interactive elements
    - Implement focus management
    - Add keyboard shortcuts for common actions
    - Test tab order and focus flow
    - _Requirements: 18.1_
  
  - [ ]* 28.2 Write property test for keyboard navigation
    - **Property 61: Keyboard Navigation**
    - **Validates: Requirements 18.1**
  
  - [ ] 28.3 Add ARIA attributes
    - Add ARIA labels to all interactive elements
    - Implement ARIA roles for custom components
    - Add ARIA descriptions for complex interactions
    - Add ARIA live regions for dynamic content
    - _Requirements: 18.2, 18.6_
  
  - [ ]* 28.4 Write property test for ARIA attributes
    - **Property 62: ARIA Attributes**
    - **Validates: Requirements 18.2**
  
  - [ ]* 28.5 Write property test for live region announcements
    - **Property 66: Live Region Announcements**
    - **Validates: Requirements 18.6**
  
  - [ ] 28.6 Implement color contrast compliance
    - Audit all colors for WCAG AA compliance
    - Update colors that don't meet contrast requirements
    - Add high contrast mode option
    - _Requirements: 18.3_
  
  - [ ]* 28.7 Write property test for color contrast
    - **Property 63: Color Contrast**
    - **Validates: Requirements 18.3**
  
  - [ ] 28.8 Implement focus indicators
    - Add visible focus styles to all focusable elements
    - Use consistent focus indicator design
    - Ensure focus indicators are not hidden by other elements
    - _Requirements: 18.4_
  
  - [ ]* 28.9 Write property test for focus indicators
    - **Property 64: Focus Indicators**
    - **Validates: Requirements 18.4**
  
  - [ ] 28.10 Add alternative text
    - Add alt text to all images
    - Add aria-label to icon buttons
    - Add title attributes to complex visualizations
    - _Requirements: 18.5_
  
  - [ ]* 28.11 Write property test for alternative text
    - **Property 65: Alternative Text**
    - **Validates: Requirements 18.5**
  
  - [ ] 28.12 Implement skip links
    - Add "Skip to main content" link at top of page
    - Add "Skip to navigation" link
    - Style skip links to be visible on focus
    - _Requirements: 18.7_
  
  - [ ]* 28.13 Write property test for skip links
    - **Property 67: Skip Links**
    - **Validates: Requirements 18.7**
  
  - [ ]* 28.14 Write accessibility tests
    - Run axe-core on all major components
    - Test with screen reader (NVDA/JAWS)
    - Test keyboard-only navigation
    - _Requirements: 18.1, 18.2, 18.3, 18.4, 18.5, 18.6, 18.7_

- [ ] 29. Implement Data Export and Import
  - [ ] 29.1 Create export/import data types and API client
    - Define ExportConfig, ImportResult interfaces
    - Implement API client for export/import endpoints
    - Create Zustand store for export/import state
    - _Requirements: 19.1, 19.2, 19.3, 19.4, 19.5, 19.6, 19.7_
  
  - [ ] 29.2 Build data export functionality
    - Implement CSV export using Papa Parse
    - Implement Excel export using SheetJS
    - Implement JSON export
    - Apply current filters to export
    - _Requirements: 19.1, 19.2_
  
  - [ ]* 29.3 Write property test for export data accuracy
    - **Property 68: Export Data Accuracy**
    - **Validates: Requirements 19.2**
  
  - [ ] 29.4 Build data import functionality
    - Create file upload interface for CSV/Excel
    - Parse uploaded file
    - Display field mapping interface
    - Validate imported data
    - _Requirements: 19.3, 19.4_
  
  - [ ]* 29.5 Write property test for import validation
    - **Property 69: Import Validation**
    - **Validates: Requirements 19.3, 19.4**
  
  - [ ] 29.6 Build import validation display
    - Show validation errors for each row
    - Allow inline correction of errors
    - Highlight invalid cells
    - Provide error summary
    - _Requirements: 19.4_
  
  - [ ] 29.7 Build import template generator
    - Generate CSV/Excel templates with headers
    - Include example data rows
    - Add validation rules in comments
    - _Requirements: 19.5_
  
  - [ ] 29.8 Implement scheduled exports
    - Create scheduled export configuration form
    - Set up recurring export schedule
    - Configure email recipients
    - _Requirements: 19.6_
  
  - [ ] 29.9 Implement async export processing
    - Process large exports asynchronously
    - Display progress notification
    - Send email notification when complete
    - Provide download link in notification
    - _Requirements: 19.7_
  
  - [ ]* 29.10 Write property test for async export processing
    - **Property 70: Async Export Processing**
    - **Validates: Requirements 19.6, 19.7**
  
  - [ ]* 29.11 Write unit tests for export/import
    - Test CSV generation
    - Test Excel generation
    - Test import validation
    - _Requirements: 19.1, 19.2, 19.3, 19.4, 19.5, 19.6, 19.7_

- [ ] 30. Integration and wiring
  - [ ] 30.1 Wire all modules to main application
    - Add routes for all new pages
    - Integrate modules into navigation menu
    - Connect SignalR to all real-time features
    - Set up global state management
    - _Requirements: All requirements_
  
  - [ ] 30.2 Implement role-based access control
    - Add permission checks to routes
    - Hide/disable features based on user role
    - Implement organization-based data isolation
    - _Requirements: 8.1, 8.2, 8.3_
  
  - [ ] 30.3 Set up API error handling
    - Configure global error interceptor
    - Handle authentication errors (401)
    - Handle authorization errors (403)
    - Handle server errors (500)
    - _Requirements: 16.2_
  
  - [ ] 30.4 Configure React Query
    - Set up query client with default options
    - Configure cache times for different data types
    - Set up mutation error handling
    - Implement optimistic updates
    - _Requirements: 17.3_
  
  - [ ] 30.5 Set up SignalR connection
    - Initialize SignalR connection on app load
    - Register all event handlers
    - Implement reconnection logic
    - Add connection status indicator
    - _Requirements: 6.1, 6.6_
  
  - [ ]* 30.6 Write integration tests
    - Test complete user workflows
    - Test API integration
    - Test SignalR real-time updates
    - Test role-based access
    - _Requirements: All requirements_

- [ ] 31. Final checkpoint - Comprehensive testing
  - Run all unit tests and ensure 80%+ coverage
  - Run all property tests with 100 iterations each
  - Run integration tests for key workflows
  - Run accessibility audit with axe-core
  - Run performance audit with Lighthouse
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties (100 iterations minimum)
- Unit tests validate specific examples and edge cases
- All code should be written in TypeScript
- Use Next.js 14 App Router for routing
- Use Zustand for global state management
- Use React Query for server state management
- Use shadcn/ui components for UI
- Use Tailwind CSS for styling
- Use SignalR client for real-time communication
- Use Recharts for data visualization
- Use jsPDF and html2canvas for PDF generation
- Use SheetJS (xlsx) for Excel export
- Use Vitest and React Testing Library for unit tests
- Use fast-check for property-based tests
- Use Playwright for E2E tests
