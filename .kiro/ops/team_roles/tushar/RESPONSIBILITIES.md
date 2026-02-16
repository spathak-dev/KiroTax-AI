# Tushar - .NET Backend Lead

## Role Overview
Backend Lead responsible for .NET microservices, admin dashboard, and authentication systems.

## Primary Technologies
- C# / .NET 9
- Blazor Server
- Entity Framework Core
- ASP.NET Core Web API
- SignalR (real-time)
- xUnit (testing)

## Core Responsibilities

### 1. Admin Dashboard (Blazor)
**Status**: ✅ Completed
- User management interface
- Bill processing monitoring
- Template approval system
- Activity logging dashboard
- System settings configuration
- Real-time updates with SignalR

**Files Owned**:
```
KiroTax-AI/backend/microservices/admin/
├── Components/
│   ├── Pages/
│   │   ├── Home.razor
│   │   ├── Users.razor
│   │   ├── Bills.razor
│   │   ├── Templates.razor
│   │   ├── Activity.razor
│   │   └── Settings.razor
│   └── Layout/
│       └── NavMenu.razor
├── Data/
│   ├── Models.cs
│   └── AppDbContext.cs
└── Program.cs
```

### 2. RBAC System (Role-Based Access Control)
**Status**: 🔄 In Progress
- User authentication & authorization
- Role management (Admin, CA, Auditor, Client)
- Permission system
- JWT token generation
- Session management

**Implementation Tasks**:
- [ ] Implement ASP.NET Core Identity
- [ ] Create role-based authorization policies
- [ ] Build permission middleware
- [ ] Integrate with frontend auth
- [ ] Add OAuth2/OIDC support

**Files to Create**:
```
KiroTax-AI/backend/microservices/auth/
├── Controllers/
│   ├── AuthController.cs
│   ├── RoleController.cs
│   └── PermissionController.cs
├── Services/
│   ├── AuthService.cs
│   ├── TokenService.cs
│   └── PermissionService.cs
├── Models/
│   ├── User.cs
│   ├── Role.cs
│   └── Permission.cs
└── Middleware/
    └── AuthorizationMiddleware.cs
```

### 3. Microservices Architecture
**Status**: 📋 Planned
- Service discovery
- API Gateway
- Inter-service communication
- Health checks
- Logging & monitoring

**Services to Build**:
1. **Auth Service** (Priority 1)
   - User authentication
   - Token management
   - Role/permission handling

2. **Notification Service** (Priority 2)
   - Email notifications
   - SMS alerts
   - In-app notifications
   - Webhook triggers

3. **Audit Service** (Priority 3)
   - Activity logging
   - Change tracking
   - Compliance reporting
   - Data retention

4. **Reporting Service** (Priority 4)
   - Report generation
   - Data aggregation
   - Export functionality
   - Scheduled reports

### 4. Database Management
**Responsibilities**:
- Schema design & migrations
- Query optimization
- Indexing strategy
- Backup procedures
- Data seeding

**Databases**:
- SQLite (Admin dashboard - development)
- PostgreSQL (Production - shared with Python)
- Redis (Caching & sessions)

### 5. API Development
**REST APIs to Build**:
```
/api/auth/*          - Authentication endpoints
/api/users/*         - User management
/api/roles/*         - Role management
/api/permissions/*   - Permission management
/api/audit/*         - Audit log queries
/api/notifications/* - Notification management
/api/reports/*       - Report generation
```

**API Standards**:
- RESTful conventions
- OpenAPI/Swagger documentation
- Versioning (v1, v2)
- Rate limiting
- CORS configuration

### 6. Integration with Python Backend
**Coordination Points**:
- Shared PostgreSQL database
- API contract definitions
- Authentication token validation
- Webhook event handling
- Data synchronization

**Integration Tasks**:
- [ ] Define shared database schema
- [ ] Create API contracts (OpenAPI)
- [ ] Implement JWT validation
- [ ] Set up event bus (RabbitMQ/Kafka)
- [ ] Build data sync jobs

### 7. Testing & Quality Assurance
**Testing Strategy**:
- Unit tests (xUnit)
- Integration tests
- API tests (Postman/REST Client)
- Load testing (k6)
- Security testing

**Coverage Goals**:
- Unit test coverage: 80%+
- Critical path coverage: 100%
- API endpoint tests: All endpoints

### 8. DevOps & Deployment
**Responsibilities**:
- Docker containerization
- CI/CD pipeline (.NET services)
- Kubernetes deployment configs
- Environment configuration
- Monitoring setup

**Tools**:
- Docker
- GitHub Actions
- Kubernetes
- Azure/AWS
- Application Insights

## Current Sprint Tasks

### Week 1-2: RBAC System Foundation
- [ ] Set up ASP.NET Core Identity
- [ ] Create User, Role, Permission models
- [ ] Implement JWT authentication
- [ ] Build login/register endpoints
- [ ] Add role assignment API
- [ ] Write unit tests

### Week 3-4: Admin Dashboard Enhancement
- [ ] Add authentication to admin panel
- [ ] Implement role-based UI rendering
- [ ] Create user profile management
- [ ] Add password reset functionality
- [ ] Build audit log viewer
- [ ] Add real-time notifications

### Week 5-6: Microservices Setup
- [ ] Create Auth microservice
- [ ] Set up API Gateway
- [ ] Implement service discovery
- [ ] Add health check endpoints
- [ ] Configure logging
- [ ] Deploy to staging

## Code Quality Standards

### C# Coding Conventions
```csharp
// Use PascalCase for classes, methods, properties
public class UserService
{
    // Use camelCase for private fields with underscore
    private readonly IUserRepository _userRepository;
    
    // Use async/await for I/O operations
    public async Task<User> GetUserAsync(int id)
    {
        return await _userRepository.GetByIdAsync(id);
    }
    
    // Use nullable reference types
    public User? FindUser(string email)
    {
        // Implementation
    }
}
```

### Project Structure
```
Service/
├── Controllers/      # API endpoints
├── Services/         # Business logic
├── Repositories/     # Data access
├── Models/           # Domain models
├── DTOs/             # Data transfer objects
├── Middleware/       # Custom middleware
├── Extensions/       # Extension methods
└── Tests/            # Unit & integration tests
```

## Communication

### Daily Updates
- Post progress in team chat
- Update task status in TASKS.md
- Flag blockers immediately

### Code Reviews
- Review Python API contracts
- Validate frontend integration points
- Approve database schema changes

### Documentation
- Update API documentation (Swagger)
- Document architectural decisions
- Maintain deployment guides

## Learning & Development

### Current Focus
- Microservices patterns
- Kubernetes orchestration
- gRPC for inter-service communication
- Event-driven architecture

### Resources
- Microsoft Learn (.NET)
- Microservices.io
- Kubernetes documentation
- Clean Architecture patterns

## Success Metrics

- Admin dashboard uptime: 99.9%
- API response time: < 100ms (p95)
- Authentication success rate: > 99.5%
- Zero security vulnerabilities
- Code review turnaround: < 24 hours

## Contact & Collaboration

- **Primary Stack**: .NET Backend
- **Collaborates With**: 
  - Harit (API integration, database schema)
  - Shivansh (Frontend authentication)
  - Bhavya (Admin UI components)
- **Availability**: 9 AM - 6 PM IST
- **Preferred Communication**: Slack, GitHub Issues
