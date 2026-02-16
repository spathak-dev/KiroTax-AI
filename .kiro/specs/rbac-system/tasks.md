# Implementation Plan: RBAC System

## Overview

This implementation plan breaks down the RBAC system into incremental, testable tasks. The approach follows a bottom-up strategy: core services first, then middleware, then API endpoints, and finally frontend components. Each task builds on previous work and includes testing to validate functionality early.

## Tasks

- [ ] 1. Set up MongoDB collections and indexes
  - Create migration script for all 7 collections (users, organizations, permission_matrix, custom_permissions, route_permissions, audit_logs, token_blacklist)
  - Define indexes for performance optimization
  - Initialize default permission matrix data
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 11.1, 13.2, 14.1, 15.5_

- [ ] 2. Implement JWT Service
  - [ ] 2.1 Create JWT token generation and validation functions
    - Implement create_access_token with user_id, role, organization_id claims
    - Implement create_refresh_token
    - Implement decode_access_token with signature validation
    - Add token expiration logic (24 hours for access, 30 days for refresh)
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.7_
  
  - [ ]* 2.2 Write property test for JWT token structure
    - **Property 4: JWT Token Structure**
    - **Validates: Requirements 3.1, 3.7**
  
  - [ ]* 2.3 Write property test for token expiration times
    - **Property 5: Token Expiration Times**
    - **Validates: Requirements 3.3, 3.4**
  
  - [ ] 2.4 Implement token blacklisting functionality
    - Create invalidate_token function to add tokens to blacklist
    - Create is_token_blacklisted function to check blacklist
    - Implement token cleanup for expired entries
    - _Requirements: 15.3, 15.4, 15.5_
  
  - [ ]* 2.5 Write property test for token blacklist validation
    - **Property 35: Token Blacklist Validation**
    - **Validates: Requirements 15.4, 15.6**

- [ ] 3. Implement Permission Manager
  - [ ] 3.1 Create PermissionManager class with caching
    - Implement get_user_permissions with cache lookup
    - Implement has_permission with wildcard support
    - Add cache with 5-minute TTL
    - Implement cache invalidation
    - _Requirements: 11.6, 11.7, 11.8_
  
  - [ ]* 3.2 Write property test for wildcard permission
    - **Property 1: Wildcard Permission Grants Universal Access**
    - **Validates: Requirements 1.2, 4.4, 8.4**
  
  - [ ]* 3.3 Write property test for permission matrix caching
    - **Property 23: Permission Matrix Cache Management**
    - **Validates: Requirements 11.7, 11.8**
  
  - [ ] 3.4 Implement permission matrix management
    - Create update_role_permissions function
    - Create get_route_permissions function
    - Add permission matrix initialization for new organizations
    - _Requirements: 11.2, 11.4, 14.3_
  
  - [ ]* 3.5 Write property test for permission matrix initialization
    - **Property 21: Permission Matrix Initialization**
    - **Validates: Requirements 11.2**
  
  - [ ] 3.6 Implement custom permission management
    - Create create_custom_permission function with validation
    - Create delete_custom_permission with cascading updates
    - Add unique constraint enforcement
    - _Requirements: 13.1, 13.2, 13.3, 13.5, 13.6, 13.8_
  
  - [ ]* 3.7 Write property test for custom permission uniqueness
    - **Property 28: Custom Permission Uniqueness**
    - **Validates: Requirements 13.3**
  
  - [ ]* 3.8 Write property test for custom permission cascading delete
    - **Property 29: Custom Permission Cascading Delete**
    - **Validates: Requirements 13.6**
  
  - [ ]* 3.9 Write property test for permission name validation
    - **Property 30: Permission Name Validation**
    - **Validates: Requirements 13.8**

- [ ] 4. Implement Audit Logger
  - [ ] 4.1 Create AuditLogger class
    - Implement log_access_attempt function
    - Implement log_permission_change function
    - Implement log_role_change function
    - Implement query_audit_logs with filtering
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.6_
  
  - [ ]* 4.2 Write property test for audit trail creation
    - **Property 13: Audit Trail Creation**
    - **Validates: Requirements 6.1, 6.2, 6.3**
  
  - [ ]* 4.3 Write property test for audit log immutability
    - **Property 14: Audit Log Immutability**
    - **Validates: Requirements 6.5**
  
  - [ ]* 4.4 Write property test for audit log query filtering
    - **Property 15: Audit Log Query Filtering**
    - **Validates: Requirements 6.6**

- [ ] 5. Checkpoint - Ensure core services pass tests
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Implement Permission Middleware
  - [ ] 6.1 Create require_permission decorator
    - Implement FastAPI dependency for permission checking
    - Extract JWT from Authorization header
    - Validate token and check permissions
    - Return 401 for invalid/missing tokens
    - Return 403 for insufficient permissions
    - _Requirements: 4.1, 4.2, 4.3, 4.5, 4.6_
  
  - [ ]* 6.2 Write property test for permission middleware authorization
    - **Property 8: Permission Middleware Authorization**
    - **Validates: Requirements 4.2, 4.3**
  
  - [ ]* 6.3 Write property test for authorization header validation
    - **Property 9: Authorization Header Validation**
    - **Validates: Requirements 4.6**
  
  - [ ]* 6.4 Write property test for expired token rejection
    - **Property 6: Expired Token Rejection**
    - **Validates: Requirements 3.5**
  
  - [ ] 6.5 Create organization isolation decorator
    - Implement require_organization_isolation decorator
    - Automatically filter MongoDB queries by organization_id
    - Deny cross-organization access attempts
    - _Requirements: 2.2, 2.3_
  
  - [ ]* 6.6 Write property test for organization isolation enforcement
    - **Property 2: Organization Isolation Enforcement**
    - **Validates: Requirements 2.2, 2.3**
  
  - [ ]* 6.7 Write property test for user-organization association
    - **Property 3: User-Organization Association**
    - **Validates: Requirements 2.1, 2.4, 2.5**

- [ ] 7. Implement Authentication API Endpoints
  - [ ] 7.1 Create POST /api/auth/register endpoint
    - Accept email, password, name, role, organization_id
    - Hash password with bcrypt
    - Create user in database
    - Return user data (without password)
    - _Requirements: 9.1, 9.5_
  
  - [ ]* 7.2 Write property test for email uniqueness constraint
    - **Property 19: Email Uniqueness Constraint**
    - **Validates: Requirements 9.5**
  
  - [ ] 7.3 Create POST /api/auth/login endpoint
    - Accept email and password
    - Verify credentials
    - Generate access and refresh tokens
    - Return tokens and user data
    - _Requirements: 3.1, 3.2_
  
  - [ ] 7.4 Create POST /api/auth/refresh endpoint
    - Accept refresh token
    - Validate refresh token
    - Generate new access token
    - Return new access token
    - _Requirements: 3.6_
  
  - [ ]* 7.5 Write property test for refresh token round trip
    - **Property 7: Refresh Token Round Trip**
    - **Validates: Requirements 3.6**
  
  - [ ] 7.6 Create POST /api/auth/logout endpoint
    - Accept access token
    - Add token to blacklist
    - Return success message
    - _Requirements: 15.3_

- [ ] 8. Implement Permission Management API Endpoints
  - [ ] 8.1 Create GET /api/permissions/matrix endpoint
    - Require wildcard permission (*)
    - Return permission matrix for user's organization
    - Include metadata (updated_by, updated_at)
    - _Requirements: 11.3, 11.5_
  
  - [ ] 8.2 Create PUT /api/permissions/matrix endpoint
    - Require wildcard permission (*)
    - Accept role and permissions array
    - Update permission matrix
    - Invalidate cache
    - Log change in audit trail
    - _Requirements: 11.4, 11.5, 11.8_
  
  - [ ]* 8.3 Write property test for permission toggle database update
    - **Property 24: Permission Toggle Database Update**
    - **Validates: Requirements 12.3**
  
  - [ ]* 8.4 Write property test for permission matrix metadata tracking
    - **Property 25: Permission Matrix Metadata Tracking**
    - **Validates: Requirements 12.6**
  
  - [ ] 8.5 Create POST /api/permissions/matrix/reset endpoint
    - Require wildcard permission (*)
    - Accept role
    - Reset permissions to defaults
    - Log change in audit trail
    - _Requirements: 12.7_
  
  - [ ]* 8.6 Write property test for reset to defaults restoration
    - **Property 26: Reset to Defaults Restoration**
    - **Validates: Requirements 12.7**

- [ ] 9. Implement Custom Permission API Endpoints
  - [ ] 9.1 Create POST /api/permissions/custom endpoint
    - Require wildcard permission (*)
    - Accept permission_name and description
    - Validate permission name format
    - Create custom permission
    - Return created permission
    - _Requirements: 13.1, 13.2, 13.8_
  
  - [ ]* 9.2 Write property test for custom permission storage
    - **Property 27: Custom Permission Storage**
    - **Validates: Requirements 13.2**
  
  - [ ] 9.3 Create GET /api/permissions/custom endpoint
    - Require wildcard permission (*)
    - Return all custom permissions for user's organization
    - _Requirements: 13.4_
  
  - [ ] 9.4 Create DELETE /api/permissions/custom/:id endpoint
    - Require wildcard permission (*)
    - Delete custom permission
    - Remove from all roles in permission matrix
    - Log change in audit trail
    - _Requirements: 13.5, 13.6_

- [ ] 10. Implement Route Permission API Endpoints
  - [ ] 10.1 Create GET /api/permissions/routes endpoint
    - Require wildcard permission (*)
    - Return all route permissions
    - Include route pattern, HTTP method, required permissions
    - _Requirements: 14.2_
  
  - [ ] 10.2 Create PUT /api/permissions/routes endpoint
    - Require wildcard permission (*)
    - Accept route_pattern, http_method, required_permissions
    - Update route permissions
    - Log change in audit trail
    - _Requirements: 14.7, 14.8_
  
  - [ ]* 10.3 Write property test for route permission lookup
    - **Property 31: Route Permission Lookup**
    - **Validates: Requirements 14.3**
  
  - [ ]* 10.4 Write property test for wildcard route pattern matching
    - **Property 32: Wildcard Route Pattern Matching**
    - **Validates: Requirements 14.4**
  
  - [ ]* 10.5 Write property test for route permission update logging
    - **Property 33: Route Permission Update Logging**
    - **Validates: Requirements 14.8**

- [ ] 11. Implement User Management API Endpoints
  - [ ] 11.1 Create GET /api/users endpoint
    - Require wildcard permission (*)
    - Return all users in organization
    - Filter by organization_id
    - _Requirements: 10.6_
  
  - [ ] 11.2 Create PUT /api/users/:id/role endpoint
    - Require wildcard permission (*)
    - Accept new role
    - Update user role
    - Invalidate user's tokens
    - Log role change
    - _Requirements: 15.1_
  
  - [ ]* 11.3 Write property test for role change token invalidation
    - **Property 34: Role Change Token Invalidation**
    - **Validates: Requirements 15.1**
  
  - [ ] 11.4 Create POST /api/permissions/invalidate-tokens endpoint
    - Require wildcard permission (*)
    - Accept user_id
    - Invalidate all tokens for user
    - Return success message
    - _Requirements: 15.3_

- [ ] 12. Implement Client and Resource API Endpoints
  - [ ] 12.1 Create GET /api/clients endpoint
    - Require view_all_clients or view_assigned_clients permission
    - Filter by organization_id
    - If view_assigned_clients only, filter by assigned_to
    - Return client list
    - _Requirements: 5.2, 5.3, 5.4, 10.4_
  
  - [ ]* 12.2 Write property test for assigned client filtering
    - **Property 11: Assigned Client Filtering**
    - **Validates: Requirements 5.2**
  
  - [ ]* 12.3 Write property test for organization-wide client access
    - **Property 12: Organization-Wide Client Access**
    - **Validates: Requirements 5.3, 5.4**
  
  - [ ] 12.4 Protect existing bill endpoints with permissions
    - Add require_permission to GET /api/bills (view_all_clients or view_assigned_clients)
    - Add require_permission to POST /api/bills/approve (approve_filing)
    - Add organization isolation to all bill queries
    - _Requirements: 10.1, 10.2_
  
  - [ ] 12.5 Protect existing document endpoints with permissions
    - Add require_permission to POST /api/documents/upload (upload_documents or upload_audit_doc)
    - Add organization isolation to all document queries
    - _Requirements: 10.3_

- [ ] 13. Implement Audit Log API Endpoints
  - [ ] 13.1 Create GET /api/audit-logs endpoint
    - Require wildcard permission (*)
    - Accept query filters (user_id, resource_type, date_range, action)
    - Return filtered audit logs
    - Limit to user's organization
    - _Requirements: 6.6, 10.7_

- [ ] 14. Checkpoint - Ensure all backend tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 15. Implement Frontend Auth Context
  - [ ] 15.1 Create AuthContext with JWT token management
    - Implement login function
    - Implement logout function
    - Implement refreshToken function
    - Store tokens in localStorage
    - Provide user state to app
    - _Requirements: 3.1, 3.2, 3.6_
  
  - [ ]* 15.2 Write unit tests for AuthContext
    - Test login flow
    - Test logout flow
    - Test token refresh
    - Test token expiration handling

- [ ] 16. Implement Frontend Permission Utilities
  - [ ] 16.1 Update hasPermission function for dynamic permissions
    - Fetch permission matrix from API
    - Check user permissions against required permission
    - Handle wildcard permission (*)
    - _Requirements: 8.3, 8.4_
  
  - [ ] 16.2 Create usePermissions hook
    - Fetch user's permissions from API
    - Cache permissions in React state
    - Provide hasPermission function
    - _Requirements: 11.6_

- [ ] 17. Implement Frontend Guard Components
  - [ ] 17.1 Update RoleGuard component
    - Check user role against allowedRoles
    - Redirect if unauthorized
    - Render children if authorized
    - _Requirements: 8.1, 8.2_
  
  - [ ]* 17.2 Write property test for RoleGuard component hiding
    - **Property 17: RoleGuard Component Hiding**
    - **Validates: Requirements 8.2**
  
  - [ ] 17.3 Create PermissionGuard component
    - Check user permission against requiredPermission
    - Hide children if unauthorized
    - Render children if authorized
    - _Requirements: 8.5, 8.6_
  
  - [ ]* 17.4 Write property test for PermissionGuard component hiding
    - **Property 18: PermissionGuard Component Hiding**
    - **Validates: Requirements 8.6**

- [ ] 18. Implement Permission Matrix Dashboard UI
  - [ ] 18.1 Create /dashboard/permissions page
    - Protect with RoleGuard (OWNER only)
    - Fetch permission matrix from API
    - Fetch custom permissions from API
    - Display loading state
    - _Requirements: 12.1_
  
  - [ ] 18.2 Create PermissionMatrixTable component
    - Render matrix table (roles × permissions)
    - Display checkboxes for each role-permission combination
    - Handle checkbox toggle
    - Show updated_by and updated_at metadata
    - Disable checkboxes when wildcard (*) is granted
    - _Requirements: 12.2, 12.3, 12.6, 12.8_
  
  - [ ] 18.3 Add permission update functionality
    - Call PUT /api/permissions/matrix on toggle
    - Show success notification
    - Show error notification on failure
    - Refresh matrix after update
    - _Requirements: 12.3, 12.4, 12.5_
  
  - [ ] 18.4 Add reset to defaults button
    - Call POST /api/permissions/matrix/reset
    - Confirm before resetting
    - Refresh matrix after reset
    - _Requirements: 12.7_

- [ ] 19. Implement Custom Permission Management UI
  - [ ] 19.1 Create CustomPermissionForm component
    - Input for permission_name
    - Input for description
    - Validate permission name format
    - Call POST /api/permissions/custom
    - Show success/error notifications
    - _Requirements: 13.1, 13.8_
  
  - [ ] 19.2 Create CustomPermissionList component
    - Display all custom permissions
    - Show delete button for each
    - Confirm before deleting
    - Call DELETE /api/permissions/custom/:id
    - Refresh list after deletion
    - _Requirements: 13.4, 13.5_
  
  - [ ] 19.3 Integrate custom permissions into PermissionMatrixTable
    - Include custom permissions as columns
    - Allow toggling custom permissions
    - _Requirements: 13.7_

- [ ] 20. Implement API Routes Dashboard UI
  - [ ] 20.1 Create /dashboard/api-routes page
    - Protect with RoleGuard (OWNER only)
    - Fetch route permissions from API
    - Display loading state
    - _Requirements: 14.5_
  
  - [ ] 20.2 Create RoutePermissionsTable component
    - Display route pattern, HTTP method, required permissions, description
    - Show edit button for each route
    - _Requirements: 14.6_
  
  - [ ] 20.3 Create RoutePermissionEditModal component
    - Allow editing required permissions
    - Call PUT /api/permissions/routes
    - Show success/error notifications
    - Refresh table after update
    - _Requirements: 14.7_

- [ ] 21. Implement Role-Based Dashboard Routing
  - [ ] 21.1 Update login redirect logic
    - Redirect OWNER to /dashboard/owner
    - Redirect PRACTICE_HEAD to /dashboard/practice-head
    - Redirect SENIOR_CA to /dashboard/senior-ca
    - Redirect ARTICLE to /dashboard/article
    - Redirect AUDIT to /dashboard/audit
    - Redirect INVESTOR to /dashboard/investor
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_
  
  - [ ] 21.2 Add cross-role dashboard protection
    - Redirect users accessing wrong dashboard to their own
    - Use RoleGuard on each dashboard page
    - _Requirements: 7.7_
  
  - [ ]* 21.3 Write property test for role-based dashboard redirection
    - **Property 16: Role-Based Dashboard Redirection**
    - **Validates: Requirements 7.7**

- [ ] 22. Implement Audit Log Viewer UI
  - [ ] 22.1 Create /dashboard/audit-logs page
    - Protect with RoleGuard (OWNER only)
    - Fetch audit logs from API
    - Display loading state
    - _Requirements: 10.7_
  
  - [ ] 22.2 Create AuditLogTable component
    - Display timestamp, user, action, resource, result
    - Support pagination
    - _Requirements: 6.6_
  
  - [ ] 22.3 Create AuditLogFilters component
    - Filter by user_id
    - Filter by resource_type
    - Filter by date_range
    - Filter by action
    - Apply filters to API query
    - _Requirements: 6.6_

- [ ] 23. Update Existing Components with Permission Guards
  - [ ] 23.1 Add PermissionGuard to bill approval buttons
    - Wrap approve button with PermissionGuard (approve_filing)
    - Hide button if user lacks permission
    - _Requirements: 10.2_
  
  - [ ] 23.2 Add PermissionGuard to document upload buttons
    - Wrap upload button with PermissionGuard (upload_documents or upload_audit_doc)
    - Hide button if user lacks permission
    - _Requirements: 10.3_
  
  - [ ] 23.3 Add PermissionGuard to client management buttons
    - Wrap client actions with appropriate PermissionGuards
    - Filter client list based on permissions
    - _Requirements: 10.4_

- [ ] 24. Integration Testing
  - [ ]* 24.1 Write integration test for complete authentication flow
    - Register user → login → access protected endpoint → token expires → refresh token
  
  - [ ]* 24.2 Write integration test for permission matrix management flow
    - Owner logs in → updates permissions → cache invalidated → other users see changes
  
  - [ ]* 24.3 Write integration test for organization isolation flow
    - Create two orgs → create users → verify isolation
  
  - [ ]* 24.4 Write integration test for custom permission flow
    - Create custom permission → assign to role → protect endpoint → verify access

- [ ] 25. Final Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- Integration tests validate end-to-end flows
- Backend tasks (1-14) should be completed before frontend tasks (15-23)
- The permission system is designed to be extensible for future requirements

