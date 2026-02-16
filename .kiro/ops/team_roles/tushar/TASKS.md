# Tushar - Current Tasks

## Sprint: Week 1-2 (RBAC System Foundation)

### Priority 1: Authentication System
- [ ] Set up ASP.NET Core Identity
  - [ ] Install required NuGet packages
  - [ ] Configure Identity services in Program.cs
  - [ ] Create ApplicationUser model
  - [ ] Set up database context
- [ ] Create User, Role, Permission models
  - [ ] Define User entity with custom properties
  - [ ] Create Role entity
  - [ ] Create Permission entity
  - [ ] Set up many-to-many relationships
- [ ] Implement JWT authentication
  - [ ] Install JWT packages
  - [ ] Configure JWT settings
  - [ ] Create TokenService
  - [ ] Implement token generation
  - [ ] Add token validation middleware
- [ ] Build login/register endpoints
  - [ ] POST /api/auth/register
  - [ ] POST /api/auth/login
  - [ ] POST /api/auth/refresh-token
  - [ ] POST /api/auth/logout
- [ ] Add role assignment API
  - [ ] POST /api/roles/assign
  - [ ] GET /api/roles/{userId}
  - [ ] DELETE /api/roles/revoke
- [ ] Write unit tests
  - [ ] Test user registration
  - [ ] Test login flow
  - [ ] Test token generation
  - [ ] Test role assignment

### Priority 2: Admin Dashboard Enhancement
- [ ] Add authentication to admin panel
  - [ ] Integrate with auth API
  - [ ] Add login page
  - [ ] Implement session management
- [ ] Implement role-based UI rendering
  - [ ] Create authorization policies
  - [ ] Add role checks in Razor pages
  - [ ] Hide/show features based on role
- [ ] Create user profile management
  - [ ] Profile view page
  - [ ] Profile edit page
  - [ ] Password change functionality
- [ ] Add password reset functionality
  - [ ] Forgot password page
  - [ ] Email service integration
  - [ ] Reset password page
- [ ] Build audit log viewer
  - [ ] Activity log page
  - [ ] Filter by user/action/date
  - [ ] Export audit logs
- [ ] Add real-time notifications
  - [ ] Set up SignalR
  - [ ] Create notification hub
  - [ ] Add notification UI component

### Priority 3: Database Setup
- [ ] Design complete schema
  - [ ] Users table
  - [ ] Roles table
  - [ ] Permissions table
  - [ ] UserRoles junction table
  - [ ] RolePermissions junction table
  - [ ] AuditLogs table
- [ ] Create migration scripts
  - [ ] Initial migration
  - [ ] Seed data migration
- [ ] Add indexes for performance
  - [ ] Index on email (Users)
  - [ ] Index on name (Roles)
  - [ ] Index on timestamp (AuditLogs)
- [ ] Set up backup strategy
  - [ ] Automated daily backups
  - [ ] Backup retention policy

## Backlog

### Microservices Architecture
- [ ] Create Auth microservice
- [ ] Set up API Gateway
- [ ] Implement service discovery
- [ ] Add health check endpoints
- [ ] Configure logging
- [ ] Deploy to staging

### Notification Service
- [ ] Email notifications
- [ ] SMS alerts
- [ ] In-app notifications
- [ ] Webhook triggers

### Reporting Service
- [ ] Report generation
- [ ] Data aggregation
- [ ] Export functionality
- [ ] Scheduled reports

## Blocked

- None currently

## Completed ✅

- [x] Admin dashboard UI (Home, Users, Bills, Templates, Activity, Settings)
- [x] Data models (User, Bill, Template, ActivityLog, SystemSetting)
- [x] Database context setup
- [x] Navigation menu
- [x] Basic CRUD operations
- [x] SQLite integration
- [x] Build and deployment configuration

## Notes

- Coordinate with Harit on shared database schema
- Sync with Shivansh on frontend auth integration
- Review API contracts before implementation
- Set up development environment for all team members

## Time Tracking

| Task | Estimated | Actual | Status |
|------|-----------|--------|--------|
| Admin Dashboard | 16h | 14h | ✅ Complete |
| RBAC System | 24h | - | 🔄 In Progress |
| Microservices Setup | 32h | - | 📋 Planned |

## Daily Updates

### 2026-02-15
- Completed admin dashboard
- Fixed build errors
- Started RBAC planning
- Next: Begin authentication implementation
