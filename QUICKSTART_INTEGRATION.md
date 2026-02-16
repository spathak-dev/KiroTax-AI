# KiroTax AI - Quick Start Integration Guide

Get all services running and integrated in 5 minutes.

## Prerequisites

- ✅ Python 3.9+ installed
- ✅ .NET 9 SDK installed
- ✅ Node.js 18+ installed (for Next.js)

## Step 1: Clone and Navigate

```bash
cd KiroTax-AI
```

## Step 2: Start All Services (Automated)

### Windows

```cmd
start-all-services.bat
```

### Linux/Mac

```bash
chmod +x start-all-services.sh
./start-all-services.sh
```

This will start:
1. Python FastAPI Backend on port 8000
2. .NET Admin Dashboard on port 5001
3. Next.js Frontend on port 3000 (if available)

## Step 3: Verify Services

### Python Backend

```bash
curl http://localhost:8000/health
```

Expected response:
```json
{"status": "healthy"}
```

### .NET Admin API

```bash
curl https://localhost:5001/api/admin/stats -k
```

Expected response:
```json
{
  "totalUsers": 1,
  "activeUsers": 0,
  "totalBills": 0,
  ...
}
```

### Access Web Interfaces

- **Python API Docs**: http://localhost:8000/docs
- **Admin Dashboard**: https://localhost:5001
- **Admin API Swagger**: https://localhost:5001/swagger
- **Next.js App**: http://localhost:3000

## Step 4: Test Integration

### Test 1: Create a User via Admin API

```bash
curl -X POST https://localhost:5001/api/admin/users -k \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "role": "client",
    "company": "Test Company",
    "isActive": true
  }'
```

### Test 2: Get Dashboard Stats

```bash
curl https://localhost:5001/api/admin/stats -k
```

### Test 3: List Users

```bash
curl https://localhost:5001/api/admin/users -k
```

## Step 5: Manual Service Start (Alternative)

If you prefer to start services individually:

### Start Python Backend

```bash
cd backend
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Start .NET Admin

```bash
cd backend/microservices/admin
dotnet run
```

### Start Next.js Frontend

```bash
cd frontend
npm install  # First time only
npm run dev
```

## Common Issues

### Port Already in Use

**Error**: `Address already in use`

**Solution**:
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :8000
kill -9 <PID>
```

### SSL Certificate Warning

**Error**: `NET::ERR_CERT_AUTHORITY_INVALID`

**Solution**: This is normal in development. Either:
1. Click "Advanced" → "Proceed to localhost" in browser
2. Use HTTP instead: http://localhost:5002
3. Add `-k` flag to curl commands

### CORS Errors

**Error**: `Access-Control-Allow-Origin`

**Solution**: Verify CORS is configured in both services:
- Python: `backend/config.py` - CORS_ORIGINS includes all ports
- .NET: `backend/microservices/admin/Program.cs` - CORS policy includes all origins

## Service URLs Reference

| Service | URL | Purpose |
|---------|-----|---------|
| Python API | http://localhost:8000 | Main backend |
| Python Docs | http://localhost:8000/docs | API documentation |
| Admin Dashboard | https://localhost:5001 | Admin UI |
| Admin API | https://localhost:5001/api | Admin REST API |
| Admin Swagger | https://localhost:5001/swagger | API documentation |
| Next.js App | http://localhost:3000 | Client portal |

## Next Steps

1. **Explore Admin Dashboard**: Visit https://localhost:5001
2. **Test API Endpoints**: Use Swagger UI at https://localhost:5001/swagger
3. **Review API Integration**: See [API_INTEGRATION.md](API_INTEGRATION.md)
4. **Check Port Configuration**: See [SERVICE_PORTS.md](SERVICE_PORTS.md)

## Development Workflow

### Making Changes

1. **Python Backend**: Changes auto-reload with `--reload` flag
2. **.NET Admin**: Use `dotnet watch run` for auto-reload
3. **Next.js**: Changes auto-reload with `npm run dev`

### Testing APIs

Use the Swagger UI interfaces:
- Python: http://localhost:8000/docs
- .NET Admin: https://localhost:5001/swagger

### Debugging

#### Python Backend Logs
```bash
# Logs appear in the terminal where uvicorn is running
```

#### .NET Admin Logs
```bash
# Logs appear in the terminal where dotnet run is running
# Or check: backend/microservices/admin/logs/
```

#### Next.js Logs
```bash
# Logs appear in the terminal where npm run dev is running
```

## Production Deployment

For production deployment, see:
- [API_INTEGRATION.md](API_INTEGRATION.md) - Production configuration
- [SERVICE_PORTS.md](SERVICE_PORTS.md) - Port configuration
- `.kiro/ops/deployment/README.md` - Deployment guide

## Support

If you encounter issues:

1. Check all services are running
2. Verify ports are not in use
3. Review logs in service terminals
4. Test endpoints with curl or Postman
5. Check CORS configuration

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                     Browser/Client                       │
└───────────────┬─────────────────────┬───────────────────┘
                │                     │
                │                     │
        ┌───────▼────────┐    ┌──────▼──────────┐
        │   Next.js UI   │    │  Admin Dashboard│
        │   Port: 3000   │    │   Port: 5001    │
        └───────┬────────┘    └──────┬──────────┘
                │                     │
                │                     │
        ┌───────▼─────────────────────▼──────────┐
        │         Python FastAPI Backend         │
        │              Port: 8000                 │
        └───────────────┬────────────────────────┘
                        │
                ┌───────▼────────┐
                │   Database     │
                │ SQLite/MongoDB │
                └────────────────┘
```

## Quick Commands Cheat Sheet

```bash
# Start all services
./start-all-services.sh  # Linux/Mac
start-all-services.bat   # Windows

# Check service health
curl http://localhost:8000/health
curl https://localhost:5001/api/admin/stats -k

# View API documentation
open http://localhost:8000/docs
open https://localhost:5001/swagger

# Stop all services
# Press Ctrl+C in each terminal
# Or close the terminal windows

# Check ports
netstat -ano | findstr :8000  # Windows
lsof -i :8000                 # Linux/Mac
```

## Success Checklist

- [ ] Python backend running on port 8000
- [ ] .NET admin running on port 5001
- [ ] Can access http://localhost:8000/docs
- [ ] Can access https://localhost:5001
- [ ] Can access https://localhost:5001/swagger
- [ ] Can create user via API
- [ ] Can view dashboard stats
- [ ] No CORS errors in browser console

## Congratulations! 🎉

Your KiroTax AI platform is now running with all services integrated!

Visit the admin dashboard at https://localhost:5001 to get started.
