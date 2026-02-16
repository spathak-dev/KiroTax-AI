# Admin Panel Design Document

## Overview
This document outlines the design for the **Admin Panel Microservice**, a standalone administrative interface built with **.NET Blazor** and **SQLite**.

## Architecture

### Technology Stack
- **Framework**: .NET 9 (Blazor Web App)
- **Render Mode**: Interactive Server (Server-side rendering with SignalR connection)
- **Database**: SQLite (Local file storage)
- **ORM**: Entity Framework Core

### Key Components

1.  **Data Layer (`Data/`)**
    - `AppDbContext`: Manages the connection to the SQLite database.
    - `Entities`: Define the data models (e.g., `User`, `Settings`, `Log`).

2.  **UI Layer (`Components/`)**
    - **Layout**: Main layout with navigation sidebar.
    - **Pages**:
        - `Dashboard`: Overview of system status.
        - `Users`: User management (CRUD).
        - `Settings`: System configuration.

3.  **Services (`Services/`)**
    - `AdminService`: Business logic for administrative tasks.

### Database Design
The application will use a local SQLite database file (`admin.db`) stored in the application's root directory (or a configurable data path). This satisfies the "on-device storage" requirement.

#### Schema Snippet
```csharp
public class AdminUser
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string PasswordHash { get; set; }
    public string Role { get; set; }
}
```

## "On-Device" Storage Strategy
- The SQLite database file resides on the host machine (server or local dev machine).
- No external database server (SQL Server, Postgres) is required.
- Easy to back up (copy the `.db` file).

## Future Considerations
- **Authentication**: Integrate with existing Auth system or use simple local auth for the admin panel.
- **API Integration**: Communicate with other microservices via HTTP Client if needed.
