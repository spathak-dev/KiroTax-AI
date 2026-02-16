# KiroTax AI - Admin Dashboard

A .NET 9 Blazor Server application for managing the KiroTax AI platform.

## Features

- **User Management**: Create, edit, and manage user accounts with role-based access
- **Bill Management**: View and process uploaded bills with status tracking
- **Template Management**: Approve/reject templates submitted to the marketplace
- **Activity Logging**: Track all system activities and user actions
- **System Settings**: Configure platform-wide settings

## Tech Stack

- .NET 9
- Blazor Server (Interactive Server Components)
- Entity Framework Core
- SQLite Database
- Bootstrap 5
- Bootstrap Icons

## Prerequisites

- .NET 9 SDK
- Windows/Linux/macOS

## Getting Started

### 1. Navigate to the admin directory

```bash
cd KiroTax-AI/backend/microservices/admin
```

### 2. Restore dependencies

```bash
dotnet restore
```

### 3. Run the application

```bash
dotnet run
```

The application will start on `https://localhost:5001` (or the port shown in the console).

### 4. Access the dashboard

Open your browser and navigate to `https://localhost:5001`

## Database

The application uses SQLite for local storage. The database file `admin.db` is created automatically on first run with seed data:

- **Default Admin User**:
  - Email: admin@kirotax.ai
  - Role: admin

- **Default Settings**:
  - Platform Name: KiroTax AI
  - Max File Size: 10 MB

## Project Structure

```
admin/
├── Components/
│   ├── Layout/
│   │   └── NavMenu.razor          # Navigation menu
│   ├── Pages/
│   │   ├── Home.razor             # Dashboard with statistics
│   │   ├── Users.razor            # User management
│   │   ├── Bills.razor            # Bill management
│   │   ├── Templates.razor        # Template approval
│   │   ├── Activity.razor         # Activity log
│   │   └── Settings.razor         # System settings
│   └── App.razor                  # Root component
├── Data/
│   ├── Models.cs                  # Data models
│   └── AppDbContext.cs            # EF Core context
├── wwwroot/
│   └── css/
│       └── admin.css              # Custom styles
├── Program.cs                     # Application entry point
└── admin.csproj                   # Project file
```

## Data Models

### User
- User accounts with roles (admin, ca, auditor, client)
- Company affiliation
- Active/inactive status
- Last login tracking

### Bill
- Uploaded bill files
- Processing status (uploaded, processing, processed, failed)
- Invoice details (number, vendor, amount)
- Extracted data storage

### Template
- Template marketplace submissions
- Approval workflow (pending_review, published, rejected)
- Pricing and download tracking
- Rating system

### ActivityLog
- System-wide activity tracking
- User actions
- Timestamp and description

### SystemSetting
- Key-value configuration
- Platform settings
- Feature flags

## Development

### Build the project

```bash
dotnet build
```

### Run in watch mode (auto-reload on changes)

```bash
dotnet watch run
```

### Clean build artifacts

```bash
dotnet clean
```

## Database Management

### Reset the database

Delete the `admin.db` file and restart the application. The database will be recreated with seed data.

```bash
rm admin.db
dotnet run
```

### Add migrations (if you modify models)

```bash
dotnet ef migrations add MigrationName
dotnet ef database update
```

## Customization

### Modify seed data

Edit `Data/AppDbContext.cs` in the `OnModelCreating` method to change initial data.

### Add new pages

1. Create a new `.razor` file in `Components/Pages/`
2. Add `@page "/route"` directive
3. Add navigation link in `Components/Layout/NavMenu.razor`

### Styling

Custom styles are in `wwwroot/css/admin.css`. The application uses Bootstrap 5 for base styling.

## Integration with Python Backend

The admin dashboard is designed to work alongside the Python FastAPI backend. To connect them:

1. Configure API endpoints in `appsettings.json`
2. Add HTTP client services in `Program.cs`
3. Update pages to fetch data from API instead of local database

## Security Notes

- This is a development setup with no authentication
- For production, implement authentication/authorization
- Use secure connection strings
- Enable HTTPS
- Add CORS policies for API integration

## Troubleshooting

### Port already in use

Change the port in `Properties/launchSettings.json` or use:

```bash
dotnet run --urls "https://localhost:5002"
```

### Database errors

Delete `admin.db` and restart to recreate the database.

### Missing dependencies

Run `dotnet restore` to install all required packages.

## Next Steps

- [x] Implement authentication (ASP.NET Core Identity)
- [x] Add REST API endpoints for admin operations
- [x] Add Swagger/OpenAPI documentation
- [x] Configure CORS for cross-origin requests
- [ ] Connect to Python FastAPI backend
- [ ] Add real-time updates with SignalR
- [ ] Implement file upload for bills
- [ ] Add export functionality (Excel, PDF)
- [ ] Create detailed bill viewer
- [ ] Add user profile management
- [ ] Implement audit trail
- [ ] Add email notifications

## API Integration

The admin dashboard now includes a complete REST API. See [API_INTEGRATION.md](../../../API_INTEGRATION.md) for details.

### Available Endpoints

```
GET    /api/admin/users            - List all users
POST   /api/admin/users            - Create new user
PUT    /api/admin/users/{id}       - Update user
DELETE /api/admin/users/{id}       - Delete user
GET    /api/admin/bills            - List all bills
GET    /api/admin/templates        - List all templates
PUT    /api/admin/templates/{id}/approve  - Approve template
GET    /api/admin/activity         - Get activity logs
GET    /api/admin/settings         - Get system settings
PUT    /api/admin/settings         - Update settings
GET    /api/admin/stats            - Get dashboard statistics
```

### Access Swagger Documentation

After starting the application, visit:
- Swagger UI: https://localhost:5001/swagger

## Integration with Other Services

### Python FastAPI Backend (Port 8000)

The admin dashboard can communicate with the Python backend:

```csharp
// Example: Call Python API from .NET
var httpClient = new HttpClient();
httpClient.BaseAddress = new Uri("http://localhost:8000");
var response = await httpClient.GetAsync("/bills");
```

### Next.js Frontend (Port 3000)

The Next.js frontend can call admin API endpoints:

```typescript
// Example: Call Admin API from Next.js
const response = await fetch('https://localhost:5001/api/admin/stats');
const stats = await response.json();
```

See [SERVICE_PORTS.md](../../../SERVICE_PORTS.md) for complete port configuration.

## License

Part of the KiroTax AI platform.
