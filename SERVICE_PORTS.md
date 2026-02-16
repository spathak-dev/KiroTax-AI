# KiroTax AI - Service Ports Configuration

Complete reference for all service ports and endpoints in the KiroTax AI platform.

## Port Allocation

| Service | Port | Protocol | Status | Purpose |
|---------|------|----------|--------|---------|
| Python FastAPI | 8000 | HTTP | ✅ Active | Main backend API |
| .NET Admin (HTTPS) | 5001 | HTTPS | ✅ Active | Admin dashboard & API |
| .NET Admin (HTTP) | 5002 | HTTP | ✅ Active | Admin dashboard (fallback) |
| Next.js Frontend | 3000 | HTTP | 📋 Planned | Client portal |
| Next.js (Alt) | 3001 | HTTP | 📋 Planned | Alternative frontend port |
| MongoDB | 27017 | TCP | 🔧 Optional | Database (if not using mock) |
| Redis | 6379 | TCP | 🔧 Optional | Cache layer |

## Service URLs

### Development

```
Python Backend:
  - API Base:        http://localhost:8000
  - API Docs:        http://localhost:8000/docs
  - ReDoc:           http://localhost:8000/redoc
  - Health Check:    http://localhost:8000/health

.NET Admin:
  - Dashboard:       https://localhost:5001
  - Dashboard (HTTP): http://localhost:5002
  - API Base:        https://localhost:5001/api
  - Swagger UI:      https://localhost:5001/swagger
  - Health Check:    https://localhost:5001/api/admin/stats

Next.js Frontend:
  - App:             http://localhost:3000
  - API Routes:      http://localhost:3000/api
```

### Production

```
Python Backend:
  - API Base:        https://api.yourdomain.com
  - API Docs:        https://api.yourdomain.com/docs

.NET Admin:
  - Dashboard:       https://admin.yourdomain.com
  - API Base:        https://admin.yourdomain.com/api

Next.js Frontend:
  - App:             https://yourdomain.com
```

## Firewall Rules

### Development (Local)

No firewall configuration needed. All services run on localhost.

### Production

#### Inbound Rules

```
Port 80 (HTTP)    -> Redirect to 443
Port 443 (HTTPS)  -> Load Balancer
Port 22 (SSH)     -> Admin access only
```

#### Internal Network

```
Port 8000  -> Python Backend (internal only)
Port 5001  -> .NET Admin (internal only)
Port 27017 -> MongoDB (internal only)
Port 6379  -> Redis (internal only)
```

## Load Balancer Configuration

### NGINX Configuration

```nginx
# Python Backend
upstream python_backend {
    server localhost:8000;
}

# .NET Admin
upstream dotnet_admin {
    server localhost:5001;
}

# Next.js Frontend
upstream nextjs_frontend {
    server localhost:3000;
}

# Main domain -> Next.js
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /etc/ssl/certs/yourdomain.crt;
    ssl_certificate_key /etc/ssl/private/yourdomain.key;

    location / {
        proxy_pass http://nextjs_frontend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# API subdomain -> Python Backend
server {
    listen 443 ssl http2;
    server_name api.yourdomain.com;

    ssl_certificate /etc/ssl/certs/yourdomain.crt;
    ssl_certificate_key /etc/ssl/private/yourdomain.key;

    location / {
        proxy_pass http://python_backend;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# Admin subdomain -> .NET Admin
server {
    listen 443 ssl http2;
    server_name admin.yourdomain.com;

    ssl_certificate /etc/ssl/certs/yourdomain.crt;
    ssl_certificate_key /etc/ssl/private/yourdomain.key;

    location / {
        proxy_pass https://dotnet_admin;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Docker Port Mapping

### docker-compose.yml

```yaml
version: '3.8'

services:
  python-backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - PORT=8000
    networks:
      - kirotax-network

  dotnet-admin:
    build: ./backend/microservices/admin
    ports:
      - "5001:5001"
      - "5002:5002"
    environment:
      - ASPNETCORE_URLS=https://+:5001;http://+:5002
    networks:
      - kirotax-network

  nextjs-frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - PORT=3000
    networks:
      - kirotax-network

  mongodb:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    networks:
      - kirotax-network

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    networks:
      - kirotax-network

networks:
  kirotax-network:
    driver: bridge

volumes:
  mongodb_data:
```

## Kubernetes Service Configuration

### Python Backend Service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: python-backend
spec:
  selector:
    app: python-backend
  ports:
    - protocol: TCP
      port: 8000
      targetPort: 8000
  type: ClusterIP
```

### .NET Admin Service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: dotnet-admin
spec:
  selector:
    app: dotnet-admin
  ports:
    - name: https
      protocol: TCP
      port: 5001
      targetPort: 5001
    - name: http
      protocol: TCP
      port: 5002
      targetPort: 5002
  type: ClusterIP
```

### Next.js Frontend Service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nextjs-frontend
spec:
  selector:
    app: nextjs-frontend
  ports:
    - protocol: TCP
      port: 3000
      targetPort: 3000
  type: ClusterIP
```

### Ingress Configuration

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: kirotax-ingress
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
spec:
  ingressClassName: nginx
  tls:
    - hosts:
        - yourdomain.com
        - api.yourdomain.com
        - admin.yourdomain.com
      secretName: kirotax-tls
  rules:
    - host: yourdomain.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: nextjs-frontend
                port:
                  number: 3000
    - host: api.yourdomain.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: python-backend
                port:
                  number: 8000
    - host: admin.yourdomain.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: dotnet-admin
                port:
                  number: 5001
```

## Port Conflict Resolution

### Check Port Usage (Windows)

```cmd
netstat -ano | findstr :8000
netstat -ano | findstr :5001
netstat -ano | findstr :3000
```

### Check Port Usage (Linux/Mac)

```bash
lsof -i :8000
lsof -i :5001
lsof -i :3000
```

### Kill Process Using Port (Windows)

```cmd
taskkill /PID <PID> /F
```

### Kill Process Using Port (Linux/Mac)

```bash
kill -9 <PID>
```

### Use Alternative Ports

#### Python Backend

```bash
# Use port 8001 instead
uvicorn main:app --port 8001
```

#### .NET Admin

```bash
# Use ports 5003/5004 instead
dotnet run --urls "https://localhost:5003;http://localhost:5004"
```

#### Next.js

```bash
# Use port 3001 instead
npm run dev -- -p 3001
```

## Environment-Specific Ports

### Development

```env
PYTHON_PORT=8000
DOTNET_HTTPS_PORT=5001
DOTNET_HTTP_PORT=5002
NEXTJS_PORT=3000
```

### Staging

```env
PYTHON_PORT=8100
DOTNET_HTTPS_PORT=5101
DOTNET_HTTP_PORT=5102
NEXTJS_PORT=3100
```

### Production

```env
PYTHON_PORT=8000
DOTNET_HTTPS_PORT=5001
DOTNET_HTTP_PORT=5002
NEXTJS_PORT=3000
```

## Health Check Endpoints

| Service | Endpoint | Expected Response |
|---------|----------|-------------------|
| Python Backend | `GET /health` | `{"status": "healthy"}` |
| .NET Admin | `GET /api/admin/stats` | `{...stats object...}` |
| Next.js | `GET /api/health` | `{"status": "ok"}` |

## Monitoring Ports

### Prometheus

```
Port 9090 -> Prometheus server
Port 9100 -> Node exporter
Port 9187 -> PostgreSQL exporter
```

### Grafana

```
Port 3001 -> Grafana dashboard
```

## Security Considerations

1. **Never expose internal ports directly to the internet**
2. **Use reverse proxy (NGINX/Traefik) for all external access**
3. **Enable HTTPS for all production services**
4. **Use firewall rules to restrict access**
5. **Implement rate limiting on public endpoints**
6. **Use VPN for admin access in production**

## Quick Start Commands

### Start All Services

```bash
# Windows
start-all-services.bat

# Linux/Mac
chmod +x start-all-services.sh
./start-all-services.sh
```

### Start Individual Services

```bash
# Python Backend
cd backend && python -m uvicorn main:app --reload --port 8000

# .NET Admin
cd backend/microservices/admin && dotnet run

# Next.js Frontend
cd frontend && npm run dev
```

## Troubleshooting

### Service Won't Start

1. Check if port is already in use
2. Verify all dependencies are installed
3. Check logs for error messages
4. Try alternative port

### Can't Connect to Service

1. Verify service is running
2. Check firewall settings
3. Verify CORS configuration
4. Test with curl/Postman

### SSL Certificate Errors

1. Use HTTP in development
2. Trust self-signed certificate
3. Disable SSL verification (dev only)
4. Use proper SSL certificate in production
