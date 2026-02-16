# Deployment Guide

## Deployment Strategy

### Environments

1. **Development** (Local)
   - Local development machines
   - Docker Compose for services
   - SQLite/PostgreSQL local

2. **Staging** (Auto-deploy from `develop`)
   - Kubernetes cluster
   - PostgreSQL (managed)
   - Redis (managed)
   - S3 storage
   - URL: https://staging.kirotax.ai

3. **Production** (Manual deploy from `main`)
   - Kubernetes cluster
   - PostgreSQL (managed, replicated)
   - Redis (managed, clustered)
   - S3 storage (multi-region)
   - CDN (CloudFlare)
   - URL: https://app.kirotax.ai

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                     Load Balancer                        │
│                    (Nginx/CloudFlare)                    │
└────────────────────┬────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
┌───────▼────────┐       ┌───────▼────────┐
│   Frontend     │       │   API Gateway   │
│   (Next.js)    │       │   (Kong/Nginx)  │
│   Port: 3000   │       │   Port: 8080    │
└────────────────┘       └───────┬─────────┘
                                 │
                    ┌────────────┼────────────┐
                    │            │            │
            ┌───────▼──────┐ ┌──▼──────┐ ┌──▼──────────┐
            │ Python API   │ │ .NET    │ │ .NET Admin  │
            │ (FastAPI)    │ │ Auth    │ │ (Blazor)    │
            │ Port: 8000   │ │ Port:   │ │ Port: 5000  │
            └──────┬───────┘ │ 5001    │ └──────┬──────┘
                   │         └────┬────┘        │
                   │              │             │
            ┌──────┴──────────────┴─────────────┴──────┐
            │                                           │
    ┌───────▼────────┐                      ┌──────────▼────────┐
    │   PostgreSQL   │                      │      Redis        │
    │   Port: 5432   │                      │   Port: 6379      │
    └────────────────┘                      └───────────────────┘
            │
    ┌───────▼────────┐
    │   S3 Storage   │
    │   (Bills/Docs) │
    └────────────────┘
```

## Docker Setup

### Docker Compose (Development)

```yaml
# docker-compose.yml
version: '3.8'

services:
  frontend:
    build: ./KiroTax-AI/frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:8000
    depends_on:
      - python-api

  python-api:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:pass@postgres:5432/kirotax
      - REDIS_URL=redis://redis:6379
      - GEMINI_API_KEY=${GEMINI_API_KEY}
    depends_on:
      - postgres
      - redis

  dotnet-auth:
    build: ./KiroTax-AI/backend/microservices/auth
    ports:
      - "5001:5001"
    environment:
      - ConnectionStrings__DefaultConnection=Host=postgres;Database=kirotax;Username=user;Password=pass
    depends_on:
      - postgres

  dotnet-admin:
    build: ./KiroTax-AI/backend/microservices/admin
    ports:
      - "5000:5000"
    environment:
      - ConnectionStrings__DefaultConnection=Host=postgres;Database=kirotax;Username=user;Password=pass
    depends_on:
      - postgres

  postgres:
    image: postgres:15
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=kirotax
    volumes:
      - postgres-data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data

volumes:
  postgres-data:
  redis-data:
```

### Dockerfiles

#### Frontend Dockerfile
```dockerfile
# KiroTax-AI/frontend/Dockerfile
FROM node:20-alpine AS base

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

#### Python API Dockerfile
```dockerfile
# backend/Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Expose port
EXPOSE 8000

# Run application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

#### .NET Dockerfile
```dockerfile
# KiroTax-AI/backend/microservices/admin/Dockerfile
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["admin.csproj", "./"]
RUN dotnet restore
COPY . .
RUN dotnet build -c Release -o /app/build
RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 5000
ENTRYPOINT ["dotnet", "admin.dll"]
```

## Kubernetes Deployment

### Namespace
```yaml
# k8s/namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: kirotax
```

### Frontend Deployment
```yaml
# k8s/frontend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
  namespace: kirotax
spec:
  replicas: 3
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
      - name: frontend
        image: kirotax/frontend:latest
        ports:
        - containerPort: 3000
        env:
        - name: NEXT_PUBLIC_API_URL
          value: "https://api.kirotax.ai"
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
---
apiVersion: v1
kind: Service
metadata:
  name: frontend-service
  namespace: kirotax
spec:
  selector:
    app: frontend
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer
```

### Python API Deployment
```yaml
# k8s/python-api-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: python-api
  namespace: kirotax
spec:
  replicas: 5
  selector:
    matchLabels:
      app: python-api
  template:
    metadata:
      labels:
        app: python-api
    spec:
      containers:
      - name: python-api
        image: kirotax/python-api:latest
        ports:
        - containerPort: 8000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secrets
              key: connection-string
        - name: GEMINI_API_KEY
          valueFrom:
            secretKeyRef:
              name: api-secrets
              key: gemini-key
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1000m"
---
apiVersion: v1
kind: Service
metadata:
  name: python-api-service
  namespace: kirotax
spec:
  selector:
    app: python-api
  ports:
  - port: 8000
    targetPort: 8000
```

## CI/CD Pipeline

### GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to Staging/Production

on:
  push:
    branches:
      - develop  # Auto-deploy to staging
      - main     # Manual deploy to production

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Run Python Tests
        run: |
          cd backend
          pip install -r requirements.txt
          pytest
      
      - name: Run .NET Tests
        run: |
          cd KiroTax-AI/backend/microservices/admin
          dotnet test
      
      - name: Run Frontend Tests
        run: |
          cd KiroTax-AI/frontend
          npm install
          npm test

  build-and-push:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build and Push Docker Images
        run: |
          docker build -t kirotax/frontend:${{ github.sha }} ./KiroTax-AI/frontend
          docker build -t kirotax/python-api:${{ github.sha }} ./backend
          docker build -t kirotax/dotnet-admin:${{ github.sha }} ./KiroTax-AI/backend/microservices/admin
          
          docker push kirotax/frontend:${{ github.sha }}
          docker push kirotax/python-api:${{ github.sha }}
          docker push kirotax/dotnet-admin:${{ github.sha }}

  deploy-staging:
    if: github.ref == 'refs/heads/develop'
    needs: build-and-push
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Staging
        run: |
          kubectl set image deployment/frontend frontend=kirotax/frontend:${{ github.sha }} -n kirotax-staging
          kubectl set image deployment/python-api python-api=kirotax/python-api:${{ github.sha }} -n kirotax-staging
          kubectl set image deployment/dotnet-admin dotnet-admin=kirotax/dotnet-admin:${{ github.sha }} -n kirotax-staging

  deploy-production:
    if: github.ref == 'refs/heads/main'
    needs: build-and-push
    runs-on: ubuntu-latest
    environment: production
    steps:
      - name: Deploy to Production
        run: |
          kubectl set image deployment/frontend frontend=kirotax/frontend:${{ github.sha }} -n kirotax
          kubectl set image deployment/python-api python-api=kirotax/python-api:${{ github.sha }} -n kirotax
          kubectl set image deployment/dotnet-admin dotnet-admin=kirotax/dotnet-admin:${{ github.sha }} -n kirotax
```

## Database Migrations

### Python (Alembic)
```bash
# Create migration
alembic revision --autogenerate -m "Add new table"

# Apply migration
alembic upgrade head

# Rollback
alembic downgrade -1
```

### .NET (EF Core)
```bash
# Create migration
dotnet ef migrations add MigrationName

# Apply migration
dotnet ef database update

# Rollback
dotnet ef database update PreviousMigration
```

## Monitoring & Logging

### Prometheus Metrics
```yaml
# k8s/prometheus-config.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: prometheus-config
  namespace: kirotax
data:
  prometheus.yml: |
    global:
      scrape_interval: 15s
    scrape_configs:
      - job_name: 'python-api'
        static_configs:
          - targets: ['python-api-service:8000']
      - job_name: 'dotnet-admin'
        static_configs:
          - targets: ['dotnet-admin-service:5000']
```

### Logging (ELK Stack)
- Elasticsearch: Log storage
- Logstash: Log processing
- Kibana: Log visualization

## Backup Strategy

### Database Backups
```bash
# Daily automated backups
0 2 * * * pg_dump -h postgres -U user kirotax > /backups/kirotax_$(date +\%Y\%m\%d).sql

# Retention: 30 days
```

### S3 Backups
- Versioning enabled
- Lifecycle policy: Archive to Glacier after 90 days
- Cross-region replication

## Rollback Procedure

1. **Identify issue**
2. **Check logs** (Kibana)
3. **Rollback deployment**:
   ```bash
   kubectl rollout undo deployment/python-api -n kirotax
   ```
4. **Verify rollback**
5. **Post-mortem**

## Health Checks

### Liveness Probe
```yaml
livenessProbe:
  httpGet:
    path: /health
    port: 8000
  initialDelaySeconds: 30
  periodSeconds: 10
```

### Readiness Probe
```yaml
readinessProbe:
  httpGet:
    path: /ready
    port: 8000
  initialDelaySeconds: 5
  periodSeconds: 5
```

## Scaling

### Horizontal Pod Autoscaler
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: python-api-hpa
  namespace: kirotax
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: python-api
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

## Security

### Secrets Management
```bash
# Create secrets
kubectl create secret generic db-secrets \
  --from-literal=connection-string="postgresql://..." \
  -n kirotax

kubectl create secret generic api-secrets \
  --from-literal=gemini-key="..." \
  -n kirotax
```

### Network Policies
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: api-network-policy
  namespace: kirotax
spec:
  podSelector:
    matchLabels:
      app: python-api
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: frontend
    ports:
    - protocol: TCP
      port: 8000
```

## Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] Code reviewed and approved
- [ ] Database migrations prepared
- [ ] Environment variables configured
- [ ] Secrets updated
- [ ] Backup completed

### Deployment
- [ ] Deploy to staging first
- [ ] Run smoke tests
- [ ] Monitor logs
- [ ] Check metrics
- [ ] Verify functionality

### Post-Deployment
- [ ] Monitor for errors
- [ ] Check performance metrics
- [ ] Verify database migrations
- [ ] Update documentation
- [ ] Notify team

## Troubleshooting

### Common Issues

1. **Pod not starting**
   ```bash
   kubectl describe pod <pod-name> -n kirotax
   kubectl logs <pod-name> -n kirotax
   ```

2. **Database connection issues**
   - Check connection string
   - Verify network policies
   - Check database credentials

3. **High memory usage**
   - Check for memory leaks
   - Review resource limits
   - Scale horizontally

## Contact

- **DevOps Lead**: Tushar
- **On-call**: Rotation schedule
- **Emergency**: Slack #incidents channel
