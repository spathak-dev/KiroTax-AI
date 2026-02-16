# KiroTax AI - Deployment Guide

## AWS Deployment Architecture

### Infrastructure Components

1. **Compute**
   - EC2 instances for backend (t3.medium or larger)
   - ECS/Fargate for containerized deployment
   - Auto Scaling Groups for high availability

2. **Database**
   - MongoDB Atlas (managed) or self-hosted on EC2
   - DocumentDB as AWS-native alternative

3. **Storage**
   - S3 for file storage (bills, reports)
   - CloudFront CDN for static assets

4. **Networking**
   - VPC with public and private subnets
   - Application Load Balancer
   - Route 53 for DNS

5. **Security**
   - AWS WAF for web application firewall
   - AWS Secrets Manager for credentials
   - IAM roles and policies

## Deployment Options

### Option 1: Docker Compose (Development/Small Scale)

```bash
# Clone repository
git clone https://github.com/your-org/kirotax-ai.git
cd kirotax-ai

# Start all services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

### Option 2: AWS ECS (Production)

1. **Build and Push Images**

```bash
# Login to ECR
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin YOUR_ECR_URL

# Build images
docker build -t kirotax-backend ./backend
docker build -t kirotax-frontend ./frontend

# Tag images
docker tag kirotax-backend:latest YOUR_ECR_URL/kirotax-backend:latest
docker tag kirotax-frontend:latest YOUR_ECR_URL/kirotax-frontend:latest

# Push images
docker push YOUR_ECR_URL/kirotax-backend:latest
docker push YOUR_ECR_URL/kirotax-frontend:latest
```

2. **Create ECS Task Definitions**

```json
{
  "family": "kirotax-backend",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "1024",
  "memory": "2048",
  "containerDefinitions": [
    {
      "name": "backend",
      "image": "YOUR_ECR_URL/kirotax-backend:latest",
      "portMappings": [
        {
          "containerPort": 8000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "MONGODB_URL",
          "value": "mongodb://..."
        }
      ]
    }
  ]
}
```

3. **Create ECS Services**

```bash
aws ecs create-service \
  --cluster kirotax-cluster \
  --service-name kirotax-backend \
  --task-definition kirotax-backend \
  --desired-count 2 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxx],securityGroups=[sg-xxx],assignPublicIp=ENABLED}"
```

### Option 3: Kubernetes (Enterprise Scale)

```yaml
# backend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: kirotax-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: kirotax-backend
  template:
    metadata:
      labels:
        app: kirotax-backend
    spec:
      containers:
      - name: backend
        image: YOUR_ECR_URL/kirotax-backend:latest
        ports:
        - containerPort: 8000
        env:
        - name: MONGODB_URL
          valueFrom:
            secretKeyRef:
              name: kirotax-secrets
              key: mongodb-url
```

## Environment Configuration

### Production Environment Variables

**Backend (.env)**
```env
APP_NAME=KiroTax AI
ENVIRONMENT=production
DEBUG=False

MONGODB_URL=mongodb+srv://user:pass@cluster.mongodb.net/kirotax_ai
SECRET_KEY=GENERATE_STRONG_SECRET_KEY

STORAGE_TYPE=s3
S3_BUCKET_NAME=kirotax-storage
AWS_REGION=ap-south-1

CORS_ORIGINS=https://kirotax.ai,https://www.kirotax.ai
```

**Frontend (.env.production)**
```env
NEXT_PUBLIC_API_URL=https://api.kirotax.ai
NEXT_PUBLIC_APP_NAME=KiroTax AI
```

## Database Setup

### MongoDB Atlas

1. Create cluster in Mumbai (ap-south-1) region
2. Configure network access (whitelist IPs)
3. Create database user
4. Get connection string

### Indexes

```javascript
// Create indexes for performance
db.bills.createIndex({ "user_id": 1, "created_at": -1 })
db.bills.createIndex({ "extracted_data.vendor_gstin": 1 })
db.users.createIndex({ "email": 1 }, { unique: true })
db.templates.createIndex({ "user_id": 1 })
```

## Monitoring & Logging

### CloudWatch

```bash
# Install CloudWatch agent
wget https://s3.amazonaws.com/amazoncloudwatch-agent/ubuntu/amd64/latest/amazon-cloudwatch-agent.deb
sudo dpkg -i amazon-cloudwatch-agent.deb
```

### Application Monitoring

- Use AWS X-Ray for distributed tracing
- Set up CloudWatch Logs for application logs
- Configure CloudWatch Alarms for critical metrics

## Security Checklist

- [ ] Enable HTTPS with SSL/TLS certificates
- [ ] Configure WAF rules
- [ ] Set up VPC security groups
- [ ] Enable encryption at rest (S3, EBS)
- [ ] Enable encryption in transit
- [ ] Configure IAM roles with least privilege
- [ ] Enable AWS GuardDuty
- [ ] Set up AWS Secrets Manager
- [ ] Enable CloudTrail for audit logs
- [ ] Configure backup and disaster recovery

## Scaling Strategy

### Horizontal Scaling
- Auto Scaling Groups for EC2
- ECS Service Auto Scaling
- Read replicas for MongoDB

### Vertical Scaling
- Upgrade instance types as needed
- Increase MongoDB cluster tier

### Caching
- Redis/ElastiCache for session management
- CloudFront for static content

## Backup & Recovery

```bash
# MongoDB backup
mongodump --uri="mongodb+srv://..." --out=/backup/$(date +%Y%m%d)

# S3 backup
aws s3 sync s3://kirotax-storage s3://kirotax-backup
```

## Cost Optimization

1. Use Reserved Instances for predictable workloads
2. Enable S3 Intelligent-Tiering
3. Use Spot Instances for non-critical tasks
4. Set up AWS Budgets and Cost Alerts
5. Review and optimize resource usage monthly

## Support & Maintenance

- Monitor application health daily
- Review logs for errors
- Update dependencies monthly
- Security patches within 48 hours
- Performance optimization quarterly
