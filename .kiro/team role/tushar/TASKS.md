# Tushar - Current Sprint Tasks

## Sprint 1 (Weeks 1-2) - Foundation & Core Features

### Priority 1: Critical Path 🔴

#### Task 1.1: API Integration Setup
**Status**: Not Started  
**Estimated Time**: 4 hours  
**Dependencies**: Harit's auth API must be ready

**Description**: Set up HTTP client service to connect admin dashboard with Python backend

**Subtasks**:
- [ ] Create `Services/ApiClient.cs` with HttpClient configuration
- [ ] Implement JWT token management
- [ ] Add request/response interceptors
- [ ] Handle authentication errors
- [ ] Test API connectivity

**Acceptance Criteria**:
- Admin dashboard can make authenticated requests to Python API
- Tokens are automatically refreshed
- Errors are properly handled and logged

---

#### Task 1.2: Authentication Implementation
**Status**: Not Started  
**Estimated Time**: 6 hours  
**Dependencies**: Task 1.1, Harit's auth endpoints

**Description**: Implement JWT-based authentication for admin dashboard

**Subtasks**:
- [ ] Create `Services/AuthService.cs`
- [ ] Implement login functionality
- [ ] Add token storage (secure cookies)
- [ ] Create authentication state provider
- [ ] Add logout functionality
- [ ] Implement token refresh logic

**Acceptance Criteria**:
- Admins can log in with email/password
- Session persists across page refreshes
- Tokens are securely stored
- Logout clears all session data

---

#### Task 1.3: User Management - Add/Edit Forms
**Status**: Not Started  
**Estimated Time**: 5 hours  
**Dependencies**: Task 1.2

**Description**: Create forms for adding and editing users

**Subtasks**:
- [ ] Create `Components/Pages/Users/AddUser.razor`
- [ ] Create `Components/Pages/Users/EditUser.razor`
- [ ] Implement form validation
- [ ] Add role selection dropdown
- [ ] Implement save functionality
- [ ] Add success/error notifications

**Acceptance Criteria**:
- Admin can add new users with all required fields
- Admin can edit existing users
- Form validation works correctly
- Success/error messages are displayed

---

### Priority 2: Important Features 🟡

#### Task 2.1: Bill Detail Viewer
**Status**: Not Started  
**Estimated Time**: 4 hours  
**Dependencies**: None

**Description**: Create detailed bill viewer modal with all extracted data

**Subtasks**:
- [ ] Create `Components/Bills/BillDetailModal.razor`
- [ ] Display all bill fields (invoice number, vendor, items, etc.)
- [ ] Show OCR confidence scores
- [ ] Add image preview
- [ ] Implement edit functionality
- [ ] Add export button

**Acceptance Criteria**:
- Modal displays all bill information
- Image preview works
- Admin can edit bill data
- Export functionality works

---

#### Task 2.2: Real-time Updates with SignalR
**Status**: Not Started  
**Estimated Time**: 6 hours  
**Dependencies**: Harit's WebSocket implementation

**Description**: Implement real-time notifications for bill processing and system events

**Subtasks**:
- [ ] Add SignalR client package
- [ ] Create `Services/NotificationService.cs`
- [ ] Implement connection management
- [ ] Add notification UI component
- [ ] Handle reconnection logic
- [ ] Test real-time updates

**Acceptance Criteria**:
- Dashboard receives real-time updates
- Notifications appear without page refresh
- Connection is stable and auto-reconnects
- UI updates smoothly

---

#### Task 2.3: File Upload for Bills
**Status**: Not Started  
**Estimated Time**: 4 hours  
**Dependencies**: Task 1.1

**Description**: Add file upload functionality for manual bill uploads from admin

**Subtasks**:
- [ ] Create `Components/Bills/BillUpload.razor`
- [ ] Implement drag-and-drop
- [ ] Add file validation (size, type)
- [ ] Show upload progress
- [ ] Handle upload errors
- [ ] Trigger processing after upload

**Acceptance Criteria**:
- Admin can upload bills via drag-and-drop or file picker
- Only valid file types accepted
- Progress indicator shows upload status
- Uploaded bills appear in list

---

### Priority 3: Nice to Have 🟢

#### Task 3.1: Advanced Filtering
**Status**: Not Started  
**Estimated Time**: 3 hours  
**Dependencies**: None

**Description**: Add advanced filtering options for bills, users, and templates

**Subtasks**:
- [ ] Create filter component
- [ ] Add date range picker
- [ ] Implement multi-select filters
- [ ] Add search with debounce
- [ ] Save filter preferences
- [ ] Add clear filters button

**Acceptance Criteria**:
- Users can filter by multiple criteria
- Filters work correctly
- Filter state persists
- Performance is good with large datasets

---

#### Task 3.2: Export Functionality
**Status**: Not Started  
**Estimated Time**: 4 hours  
**Dependencies**: None

**Description**: Add export to Excel and PDF for reports

**Subtasks**:
- [ ] Install export libraries (EPPlus, iTextSharp)
- [ ] Create `Services/ExportService.cs`
- [ ] Implement Excel export
- [ ] Implement PDF export
- [ ] Add export buttons to pages
- [ ] Handle large datasets

**Acceptance Criteria**:
- Admin can export data to Excel
- Admin can export data to PDF
- Exports include all visible data
- Large exports don't crash

---

#### Task 3.3: Analytics Dashboard
**Status**: Not Started  
**Estimated Time**: 5 hours  
**Dependencies**: Task 1.1

**Description**: Enhance home dashboard with charts and analytics

**Subtasks**:
- [ ] Install charting library (Blazor.Charts)
- [ ] Create chart components
- [ ] Add bill processing trends
- [ ] Add user activity charts
- [ ] Add template usage stats
- [ ] Implement date range selector

**Acceptance Criteria**:
- Dashboard shows meaningful charts
- Charts are interactive
- Data updates in real-time
- Performance is good

---

## Sprint 2 (Weeks 3-4) - Advanced Features

### Task 4.1: Role-Based Authorization
**Status**: Not Started  
**Estimated Time**: 6 hours

**Description**: Implement role-based access control for admin features

---

### Task 4.2: Audit Trail
**Status**: Not Started  
**Estimated Time**: 5 hours

**Description**: Create comprehensive audit trail for all admin actions

---

### Task 4.3: Email Notifications
**Status**: Not Started  
**Estimated Time**: 4 hours

**Description**: Implement email notifications for important events

---

### Task 4.4: Bulk Operations
**Status**: Not Started  
**Estimated Time**: 5 hours

**Description**: Add bulk operations for users, bills, and templates

---

## Blocked Tasks ⛔

None currently

---

## Notes

### API Endpoints Needed from Harit
- POST /api/auth/login
- POST /api/auth/refresh
- GET /api/admin/users
- POST /api/admin/users
- PUT /api/admin/users/{id}
- GET /api/admin/bills
- GET /api/admin/bills/{id}
- POST /api/admin/bills/upload
- GET /api/admin/templates
- PUT /api/admin/templates/{id}/approve

### Questions for Team
- What authentication library should we use? (JWT, OAuth?)
- Should we implement 2FA for admin users?
- What's the max file size for bill uploads?
- Do we need offline support?

### Technical Decisions
- Using JWT for authentication
- SignalR for real-time updates
- SQLite for local admin data
- Bootstrap 5 for UI framework

---

**Last Updated**: February 15, 2026  
**Next Review**: February 17, 2026
