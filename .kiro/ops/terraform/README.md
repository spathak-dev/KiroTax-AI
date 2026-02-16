# Terraform Infrastructure as Code

## Overview

This directory contains Terraform configurations for provisioning and managing KiroTax AI infrastructure on cloud providers.

## Directory Structure

```
terraform/
├── environments/
│   ├── dev/
│   ├── staging/
│   └── production/
├── modules/
│   ├── kubernetes/
│   ├── database/
│   ├── storage/
│   ├── networking/
│   └── monitoring/
├── main.tf
├── variables.tf
├── outputs.tf
└── terraform.tfvars.example
```

## Prerequisites

- Terraform >= 1.5.0
- Cloud provider CLI (AWS CLI / Azure CLI / GCP SDK)
- kubectl
- Valid cloud credentials

## Quick Start

```bash
# Initialize Terraform
terraform init

# Plan changes
terraform plan -var-file="environments/staging/terraform.tfvars"

# Apply changes
terraform apply -var-file="environments/staging/terraform.tfvars"

# Destroy infrastructure
terraform destroy -var-file="environments/staging/terraform.tfvars"
```

## Main Configuration

### main.tf
```hcl
terraform {
  required_version = ">= 1.5.0"
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.23"
    }
  }
  
  backend "s3" {
    bucket = "kirotax-terraform-state"
    key    = "terraform.tfstate"
    region = "ap-south-1"
  }
}

provider "aws" {
  region = var.aws_region
}

# Kubernetes Cluster
module "eks" {
  source = "./modules/kubernetes"
  
  cluster_name    = var.cluster_name
  cluster_version = "1.28"
  vpc_id          = module.vpc.vpc_id
  subnet_ids      = module.vpc.private_subnet_ids
  
  node_groups = {
    general = {
      desired_size = 3
      min_size     = 2
      max_size     = 10
      instance_types = ["t3.medium"]
    }
    compute = {
      desired_size = 2
      min_size     = 1
      max_size     = 5
      instance_types = ["t3.large"]
    }
  }
}

# Database
module "rds" {
  source = "./modules/database"
  
  identifier     = "kirotax-db"
  engine         = "postgres"
  engine_version = "15.4"
  instance_class = "db.t3.medium"
  
  allocated_storage     = 100
  max_allocated_storage = 500
  
  db_name  = "kirotax"
  username = var.db_username
  password = var.db_password
  
  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.database_subnet_ids
  
  backup_retention_period = 7
  multi_az               = true
}

# Redis Cache
resource "aws_elasticache_cluster" "redis" {
  cluster_id           = "kirotax-redis"
  engine               = "redis"
  node_type            = "cache.t3.micro"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis7"
  engine_version       = "7.0"
  port                 = 6379
  
  subnet_group_name = aws_elasticache_subnet_group.redis.name
  security_group_ids = [aws_security_group.redis.id]
}

# S3 Storage
module "s3" {
  source = "./modules/storage"
  
  bucket_name = "kirotax-bills-${var.environment}"
  
  versioning_enabled = true
  lifecycle_rules = [
    {
      id      = "archive-old-bills"
      enabled = true
      
      transition = {
        days          = 90
        storage_class = "GLACIER"
      }
    }
  ]
}

# VPC
module "vpc" {
  source = "./modules/networking"
  
  vpc_cidr = "10.0.0.0/16"
  
  availability_zones = ["ap-south-1a", "ap-south-1b", "ap-south-1c"]
  
  public_subnet_cidrs   = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  private_subnet_cidrs  = ["10.0.11.0/24", "10.0.12.0/24", "10.0.13.0/24"]
  database_subnet_cidrs = ["10.0.21.0/24", "10.0.22.0/24", "10.0.23.0/24"]
}

# Monitoring
module "monitoring" {
  source = "./modules/monitoring"
  
  cluster_name = var.cluster_name
  
  enable_prometheus = true
  enable_grafana    = true
  enable_elk        = true
}
```

### variables.tf
```hcl
variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "ap-south-1"
}

variable "environment" {
  description = "Environment name"
  type        = string
}

variable "cluster_name" {
  description = "EKS cluster name"
  type        = string
}

variable "db_username" {
  description = "Database username"
  type        = string
  sensitive   = true
}

variable "db_password" {
  description = "Database password"
  type        = string
  sensitive   = true
}

variable "gemini_api_key" {
  description = "Google Gemini API key"
  type        = string
  sensitive   = true
}
```

### outputs.tf
```hcl
output "cluster_endpoint" {
  description = "EKS cluster endpoint"
  value       = module.eks.cluster_endpoint
}

output "cluster_name" {
  description = "EKS cluster name"
  value       = module.eks.cluster_name
}

output "database_endpoint" {
  description = "RDS database endpoint"
  value       = module.rds.endpoint
  sensitive   = true
}

output "redis_endpoint" {
  description = "Redis cache endpoint"
  value       = aws_elasticache_cluster.redis.cache_nodes[0].address
}

output "s3_bucket_name" {
  description = "S3 bucket name"
  value       = module.s3.bucket_name
}
```

## Environment Configurations

### Development
```hcl
# environments/dev/terraform.tfvars
environment  = "dev"
cluster_name = "kirotax-dev"
aws_region   = "ap-south-1"

# Small instances for dev
db_instance_class = "db.t3.micro"
redis_node_type   = "cache.t3.micro"
```

### Staging
```hcl
# environments/staging/terraform.tfvars
environment  = "staging"
cluster_name = "kirotax-staging"
aws_region   = "ap-south-1"

# Medium instances for staging
db_instance_class = "db.t3.small"
redis_node_type   = "cache.t3.small"
```

### Production
```hcl
# environments/production/terraform.tfvars
environment  = "production"
cluster_name = "kirotax-prod"
aws_region   = "ap-south-1"

# Production-grade instances
db_instance_class = "db.r6g.large"
redis_node_type   = "cache.r6g.large"

# High availability
db_multi_az    = true
redis_replicas = 2
```

## Modules

### Kubernetes Module
```hcl
# modules/kubernetes/main.tf
resource "aws_eks_cluster" "main" {
  name     = var.cluster_name
  role_arn = aws_iam_role.cluster.arn
  version  = var.cluster_version
  
  vpc_config {
    subnet_ids              = var.subnet_ids
    endpoint_private_access = true
    endpoint_public_access  = true
  }
  
  depends_on = [
    aws_iam_role_policy_attachment.cluster_policy
  ]
}

resource "aws_eks_node_group" "main" {
  for_each = var.node_groups
  
  cluster_name    = aws_eks_cluster.main.name
  node_group_name = each.key
  node_role_arn   = aws_iam_role.node.arn
  subnet_ids      = var.subnet_ids
  
  scaling_config {
    desired_size = each.value.desired_size
    max_size     = each.value.max_size
    min_size     = each.value.min_size
  }
  
  instance_types = each.value.instance_types
  
  depends_on = [
    aws_iam_role_policy_attachment.node_policy
  ]
}
```

### Database Module
```hcl
# modules/database/main.tf
resource "aws_db_instance" "main" {
  identifier     = var.identifier
  engine         = var.engine
  engine_version = var.engine_version
  instance_class = var.instance_class
  
  allocated_storage     = var.allocated_storage
  max_allocated_storage = var.max_allocated_storage
  storage_encrypted     = true
  
  db_name  = var.db_name
  username = var.username
  password = var.password
  
  vpc_security_group_ids = [aws_security_group.db.id]
  db_subnet_group_name   = aws_db_subnet_group.main.name
  
  backup_retention_period = var.backup_retention_period
  backup_window          = "03:00-04:00"
  maintenance_window     = "mon:04:00-mon:05:00"
  
  multi_az               = var.multi_az
  publicly_accessible    = false
  skip_final_snapshot    = false
  final_snapshot_identifier = "${var.identifier}-final-snapshot"
  
  enabled_cloudwatch_logs_exports = ["postgresql", "upgrade"]
  
  tags = {
    Name        = var.identifier
    Environment = var.environment
  }
}

resource "aws_db_subnet_group" "main" {
  name       = "${var.identifier}-subnet-group"
  subnet_ids = var.subnet_ids
  
  tags = {
    Name = "${var.identifier}-subnet-group"
  }
}
```

### Storage Module
```hcl
# modules/storage/main.tf
resource "aws_s3_bucket" "main" {
  bucket = var.bucket_name
  
  tags = {
    Name        = var.bucket_name
    Environment = var.environment
  }
}

resource "aws_s3_bucket_versioning" "main" {
  bucket = aws_s3_bucket.main.id
  
  versioning_configuration {
    status = var.versioning_enabled ? "Enabled" : "Disabled"
  }
}

resource "aws_s3_bucket_lifecycle_configuration" "main" {
  bucket = aws_s3_bucket.main.id
  
  dynamic "rule" {
    for_each = var.lifecycle_rules
    
    content {
      id     = rule.value.id
      status = rule.value.enabled ? "Enabled" : "Disabled"
      
      transition {
        days          = rule.value.transition.days
        storage_class = rule.value.transition.storage_class
      }
    }
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "main" {
  bucket = aws_s3_bucket.main.id
  
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}
```

## State Management

### Remote State (S3 Backend)
```hcl
terraform {
  backend "s3" {
    bucket         = "kirotax-terraform-state"
    key            = "terraform.tfstate"
    region         = "ap-south-1"
    encrypt        = true
    dynamodb_table = "terraform-state-lock"
  }
}
```

### State Locking (DynamoDB)
```hcl
resource "aws_dynamodb_table" "terraform_lock" {
  name           = "terraform-state-lock"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "LockID"
  
  attribute {
    name = "LockID"
    type = "S"
  }
}
```

## Security Best Practices

1. **Secrets Management**
   - Use AWS Secrets Manager
   - Never commit secrets to Git
   - Rotate credentials regularly

2. **Network Security**
   - Private subnets for databases
   - Security groups with minimal access
   - VPC endpoints for AWS services

3. **Encryption**
   - Encrypt data at rest (RDS, S3)
   - Encrypt data in transit (TLS)
   - Use KMS for key management

4. **Access Control**
   - IAM roles with least privilege
   - MFA for production access
   - Audit logs enabled

## Cost Optimization

1. **Right-sizing**
   - Use appropriate instance types
   - Enable auto-scaling
   - Use spot instances for non-critical workloads

2. **Storage**
   - Lifecycle policies for S3
   - Delete unused snapshots
   - Use appropriate storage classes

3. **Monitoring**
   - Set up billing alerts
   - Review Cost Explorer regularly
   - Tag resources for cost allocation

## Disaster Recovery

### Backup Strategy
- RDS automated backups (7 days retention)
- S3 versioning enabled
- Cross-region replication for critical data

### Recovery Procedures
1. Database restore from snapshot
2. S3 object recovery from versions
3. Infrastructure recreation from Terraform

## Maintenance

### Regular Tasks
- [ ] Review and update Terraform versions
- [ ] Update provider versions
- [ ] Review security group rules
- [ ] Audit IAM permissions
- [ ] Check for unused resources
- [ ] Review cost reports

### Terraform Commands
```bash
# Format code
terraform fmt -recursive

# Validate configuration
terraform validate

# Show current state
terraform show

# List resources
terraform state list

# Import existing resource
terraform import aws_instance.example i-1234567890abcdef0

# Remove resource from state
terraform state rm aws_instance.example
```

## Troubleshooting

### Common Issues

1. **State Lock**
   ```bash
   # Force unlock (use with caution)
   terraform force-unlock <lock-id>
   ```

2. **Provider Version Conflicts**
   ```bash
   # Upgrade providers
   terraform init -upgrade
   ```

3. **Resource Already Exists**
   ```bash
   # Import existing resource
   terraform import <resource_type>.<name> <resource_id>
   ```

## Resources

- [Terraform Documentation](https://www.terraform.io/docs)
- [AWS Provider Documentation](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [Terraform Best Practices](https://www.terraform-best-practices.com/)

## Contact

- **Infrastructure Lead**: Tushar
- **Team**: DevOps
- **Support**: Slack #infrastructure
