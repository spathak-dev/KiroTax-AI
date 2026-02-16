# KiroTax AI - API Integration Guide

Complete guide for integrating Python FastAPI, .NET Admin API, and Next.js Frontend.

## Service Ports

| Service | Port | Protocol | URL |
|---------|------|----------|-----|
| Python FastAPI Backend | 8000 | HTTP | http://localhost:8000 |
| .NET Admin Dashboard | 5001 | HTTPS | https://localhost:5001 |
| .NET Admin API | 5001 | HTTPS | https://localhost:5001/api |
| Next.js Frontend | 3000 | HTTP | http://localhost:3000 |

## Architecture Overview

```
┌─────────────────┐
│   Next.js UI    │
│   Port: 3000    │
└────────┬────────┘
         │
         ├──────────────────┐
         │                  │
         ▼                  ▼
┌─────────────────┐  ┌──────────────────┐
│  Python FastAPI │  │  .NET Admin API  │
│   Port: 8000    │  │   Port: 5001     │
└─────────────────┘  └──────────────────┘
         │                  │
         └──────────┬───────┘
                    ▼
            ┌──────────────┐
            │   Database   │
            │ SQLite/Mongo │
            └──────────────┘
```

## CORS Configuration

### Python FastAPI (backend/config.py)
```python
CORS_ORIGINS: str = "http://localhost:3000,http://localhost:3001,https://localhost:5001,https://localhost:5002"
```

### .NET Admin (backend/microservices/admin/Program.cs)
```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.WithOrigins(
            "http://localhost:3000",  // Next.js frontend
            "http://localhost:3001",  // Alternative Next.js port
            "http://localhost:8000",  // Python FastAPI
            "https://localhost:5001", // Admin dashboard
            "https://localhost:5002"  // Alternative admin port
        )
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
    });
});
```

## API Endpoints

### Python FastAPI Backend (Port 8000)

#### Authentication
```
POST   /auth/register          - Register new user
POST   /auth/login             - User login
POST   /auth/refresh           - Refresh token
GET    /auth/me                - Get current user
```

#### Bills
```
GET    /bills                  - List all bills
POST   /bills                  - Upload new bill
GET    /bills/{id}             - Get bill details
PUT    /bills/{id}             - Update bill
DELETE /bills/{id}             - Delete bill
POST   /bills/{id}/process     - Process bill with OCR
```

#### OCR
```
POST   /ocr/extract            - Extract data from image
POST   /ocr/validate           - Validate extracted data
```

#### Templates
```
GET    /templates              - List templates
POST   /templates              - Create template
GET    /templates/{id}         - Get template
PUT    /templates/{id}         - Update template
DELETE /templates/{id}         - Delete template
```

#### GST
```
POST   /gst/validate           - Validate GST number
GET    /gst/details/{gstin}    - Get GST details
POST   /gst/calculate          - Calculate GST
```

#### Tax
```
POST   /tax/calculate          - Calculate tax
GET    /tax/slabs              - Get tax slabs
POST   /tax/deductions         - Calculate deductions
```

### .NET Admin API (Port 5001)

#### Users
```
GET    /api/admin/users                    - List all users
GET    /api/admin/users/{id}               - Get user by ID
POST   /api/admin/users                    - Create new user
PUT    /api/admin/users/{id}               - Update user
DELETE /api/admin/users/{id}               - Delete user
```

Query Parameters:
- `role`: Filter by role (admin, ca, auditor, client)
- `search`: Search by name or email

#### Bills
```
GET    /api/admin/bills                    - List all bills
GET    /api/admin/bills/{id}               - Get bill by ID
PUT    /api/admin/bills/{id}/status        - Update bill status
```

Query Parameters:
- `status`: Filter by status (uploaded, processing, processed, failed)
- `userId`: Filter by user ID

#### Templates
```
GET    /api/admin/templates                - List all templates
GET    /api/admin/templates/{id}           - Get template by ID
PUT    /api/admin/templates/{id}/approve   - Approve/reject template
```

Query Parameters:
- `status`: Filter by status (pending_review, published, rejected)
- `category`: Filter by category

#### Activity
```
GET    /api/admin/activity                 - Get activity logs
```

Query Parameters:
- `limit`: Number of records (default: 50, max: 100)
- `entityType`: Filter by entity type

#### Settings
```
GET    /api/admin/settings                 - Get all settings
GET    /api/admin/settings/{key}           - Get setting by key
PUT    /api/admin/settings                 - Update settings
```

#### Statistics
```
GET    /api/admin/stats                    - Get dashboard statistics
```

Returns:
```json
{
  "totalUsers": 0,
  "activeUsers": 0,
  "totalBills": 0,
  "processedBills": 0,
  "processingBills": 0,
  "failedBills": 0,
  "totalTemplates": 0,
  "publishedTemplates": 0,
  "pendingTemplates": 0,
  "usersToday": 0,
  "billsToday": 0
}
```

## Next.js Frontend Integration

### Environment Variables (.env.local)

```env
# Python Backend
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_API_TIMEOUT=30000

# .NET Admin API
NEXT_PUBLIC_ADMIN_API_URL=https://localhost:5001/api

# App Config
NEXT_PUBLIC_APP_NAME=KiroTax AI
NEXT_PUBLIC_MAX_FILE_SIZE=10485760
```

### API Client Setup

#### Python Backend Client (lib/api/backend.ts)

```typescript
import axios from 'axios';

const backendApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor for auth token
backendApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
backendApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle token refresh or redirect to login
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default backendApi;
```

#### Admin API Client (lib/api/admin.ts)

```typescript
import axios from 'axios';

const adminApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ADMIN_API_URL || 'https://localhost:5001/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// For development, ignore SSL certificate errors
if (process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export default adminApi;
```

### Usage Examples

#### Fetch Users from Admin API

```typescript
import adminApi from '@/lib/api/admin';

export async function getUsers(role?: string, search?: string) {
  const params = new URLSearchParams();
  if (role) params.append('role', role);
  if (search) params.append('search', search);
  
  const response = await adminApi.get(`/admin/users?${params}`);
  return response.data;
}

export async function createUser(userData: UserCreate) {
  const response = await adminApi.post('/admin/users', userData);
  return response.data;
}

export async function updateUser(id: number, userData: UserUpdate) {
  await adminApi.put(`/admin/users/${id}`, userData);
}

export async function deleteUser(id: number) {
  await adminApi.delete(`/admin/users/${id}`);
}
```

#### Upload Bill to Python Backend

```typescript
import backendApi from '@/lib/api/backend';

export async function uploadBill(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await backendApi.post('/bills', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
}

export async function processBill(billId: string) {
  const response = await backendApi.post(`/bills/${billId}/process`);
  return response.data;
}
```

#### Get Dashboard Stats

```typescript
import adminApi from '@/lib/api/admin';

export async function getDashboardStats() {
  const response = await adminApi.get('/admin/stats');
  return response.data;
}
```

## Running All Services

### 1. Start Python Backend

```bash
cd backend
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Access:
- API: http://localhost:8000
- Docs: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### 2. Start .NET Admin Dashboard

```bash
cd backend/microservices/admin
dotnet run
```

Access:
- Dashboard: https://localhost:5001
- API: https://localhost:5001/api
- Swagger: https://localhost:5001/swagger

### 3. Start Next.js Frontend

```bash
cd frontend
npm run dev
```

Access:
- App: http://localhost:3000

## Testing API Integration

### Test Python Backend

```bash
# Health check
curl http://localhost:8000/health

# Get bills
curl http://localhost:8000/bills \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Test .NET Admin API

```bash
# Get stats
curl https://localhost:5001/api/admin/stats -k

# Get users
curl https://localhost:5001/api/admin/users -k

# Create user
curl -X POST https://localhost:5001/api/admin/users -k \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "role": "client",
    "isActive": true
  }'
```

### Test from Next.js

```typescript
// In your Next.js component
useEffect(() => {
  async function fetchData() {
    try {
      // Fetch from Python backend
      const bills = await backendApi.get('/bills');
      console.log('Bills:', bills.data);
      
      // Fetch from Admin API
      const stats = await adminApi.get('/admin/stats');
      console.log('Stats:', stats.data);
    } catch (error) {
      console.error('API Error:', error);
    }
  }
  
  fetchData();
}, []);
```

## Common Issues & Solutions

### CORS Errors

**Problem**: Browser blocks requests due to CORS policy

**Solution**:
1. Verify CORS origins in both Python and .NET configs
2. Ensure `withCredentials: true` in axios config
3. Check that backend is running and accessible

### SSL Certificate Errors (.NET)

**Problem**: `NET::ERR_CERT_AUTHORITY_INVALID`

**Solution** (Development only):
```typescript
// In Next.js API client
if (process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}
```

Or use HTTP in development:
```bash
dotnet run --urls "http://localhost:5002"
```

### Port Already in Use

**Problem**: Port 8000, 5001, or 3000 already in use

**Solution**:
```bash
# Find process using port
netstat -ano | findstr :8000

# Kill process (Windows)
taskkill /PID <PID> /F

# Or use different ports
# Python: uvicorn main:app --port 8001
# .NET: dotnet run --urls "https://localhost:5003"
# Next.js: npm run dev -- -p 3001
```

### Authentication Token Issues

**Problem**: 401 Unauthorized errors

**Solution**:
1. Verify token is stored in localStorage
2. Check token expiration
3. Implement token refresh logic
4. Verify Authorization header format: `Bearer <token>`

## Production Deployment

### Environment Variables

#### Python Backend (.env)
```env
APP_NAME=KiroTax AI
ENVIRONMENT=production
DEBUG=False
HOST=0.0.0.0
PORT=8000
SECRET_KEY=<generate-secure-key>
CORS_ORIGINS=https://yourdomain.com,https://admin.yourdomain.com
```

#### .NET Admin (appsettings.Production.json)
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=/var/data/admin.db"
  },
  "Cors": {
    "AllowedOrigins": [
      "https://yourdomain.com",
      "https://admin.yourdomain.com"
    ]
  }
}
```

#### Next.js (.env.production)
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_ADMIN_API_URL=https://admin.yourdomain.com/api
```

### Docker Compose

```yaml
version: '3.8'

services:
  python-backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - ENVIRONMENT=production
    networks:
      - kirotax-network

  dotnet-admin:
    build: ./backend/microservices/admin
    ports:
      - "5001:5001"
    networks:
      - kirotax-network

  nextjs-frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://python-backend:8000
      - NEXT_PUBLIC_ADMIN_API_URL=http://dotnet-admin:5001/api
    networks:
      - kirotax-network

networks:
  kirotax-network:
    driver: bridge
```

## API Documentation

- **Python FastAPI**: http://localhost:8000/docs (Swagger UI)
- **.NET Admin**: https://localhost:5001/swagger (Swagger UI)

## Support

For issues or questions:
1. Check logs in respective service directories
2. Verify all services are running
3. Test endpoints with curl or Postman
4. Review CORS and authentication configurations
