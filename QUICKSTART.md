# KiroTax AI - Quick Start Guide

## Overview

This guide will help you get started with the newly implemented features of KiroTax AI.

## What's New

✅ **Template Marketplace** - Buy, sell, and share bill templates  
✅ **Gemini AI Integration** - Intelligent bill analysis and validation  
✅ **RAG Compliance Engine** - Automated GST regulation tracking  
✅ **Change Tracking** - Complete audit trail for all edits  
✅ **Workflow Automation** - Streamlined CA task management  
✅ **Document Generator** - Professional PDF/Excel generation  

---

## Prerequisites

1. Python 3.11+
2. MongoDB running
3. Node.js 18+ (for frontend)
4. Gemini API key (optional, for AI features)

---

## Installation

### 1. Backend Setup

```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Additional dependencies for new features
pip install google-generativeai reportlab beautifulsoup4 PyPDF2

# Set environment variables
export GEMINI_API_KEY="your_gemini_api_key"
export GEMINI_MONTHLY_TOKEN_LIMIT=1000000
export DOCUMENT_OUTPUT_DIR="./documents"
```

### 2. Generate Sample Data

```bash
# Generate 50 sample bills
python utils/bill_generator.py

# This creates: backend/data/generated_bills.json
```

### 3. Start Extended API

```bash
# Start the extended FastAPI server
python main_extended.py

# API will be available at: http://localhost:8000
# API docs at: http://localhost:8000/docs
```

### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Frontend will be available at: http://localhost:3000
```

---

## Testing the Features

### 1. Template Marketplace

#### Create a Template (CA/Admin only)
```bash
curl -X POST http://localhost:8000/api/templates \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "My Custom Template",
    "description": "Template for vendor XYZ",
    "category": "vendor_specific",
    "price": 99.0,
    "license": "commercial",
    "fields": [
      {
        "field_name": "invoice_number",
        "field_type": "text",
        "keywords": ["Invoice No"],
        "required": true,
        "confidence_threshold": 0.9
      }
    ]
  }'
```

#### Search Templates
```bash
curl http://localhost:8000/api/templates?category=general&price_filter=free
```

#### Purchase Template
```bash
curl -X POST http://localhost:8000/api/templates/{template_id}/purchase \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "template_id": "template_id_here",
    "payment_method": "razorpay"
  }'
```

### 2. Gemini AI Integration

#### Analyze Bill with Gemini
```bash
curl -X POST http://localhost:8000/api/gemini/analyze-bill \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@sample_bill.pdf" \
  -F "bill_type=invoice"
```

#### Detect Anomalies
```bash
curl -X POST http://localhost:8000/api/gemini/detect-anomalies \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "bill_data": {
      "invoice_number": "INV-2024-001",
      "grand_total": 118000.00
    }
  }'
```

#### Ask Question About Bill
```bash
curl -X POST http://localhost:8000/api/gemini/ask-question \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "question": "Is the GST calculation correct?",
    "bill_data": {...}
  }'
```

### 3. RAG Compliance Engine

#### Scrape Latest Regulations (Admin only)
```bash
curl -X POST http://localhost:8000/api/compliance/scrape \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

#### Validate Bill Compliance
```bash
curl -X POST http://localhost:8000/api/compliance/validate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d @backend/data/sample_bills.json
```

#### Search Regulations
```bash
curl "http://localhost:8000/api/compliance/search?query=GST+rate+for+services" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 4. Change Tracking

#### View Change History
```bash
curl "http://localhost:8000/api/changes?bill_id=BILL_ID" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Revert to Previous Version
```bash
curl -X POST http://localhost:8000/api/changes/revert \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "bill_id": "BILL_ID",
    "target_version": "1.0",
    "reason": "Reverting incorrect changes"
  }'
```

### 5. Workflow Automation

#### Get Task Queue
```bash
curl http://localhost:8000/api/tasks/queue \
  -H "Authorization: Bearer CA_TOKEN"
```

#### Bulk Approve Bills
```bash
curl -X POST http://localhost:8000/api/tasks/bulk-approve \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer CA_TOKEN" \
  -d '{
    "bill_ids": ["BILL_ID_1", "BILL_ID_2"],
    "action": "approve",
    "comment": "All bills verified"
  }'
```

---

## Sample Data

### Sample Bills
- **Location:** `backend/data/sample_bills.json` (5 bills)
- **Location:** `backend/data/generated_bills.json` (50 bills)

### Sample Templates
- **Location:** `backend/data/sample_templates.json` (5 templates)
- Includes free and premium templates
- Various categories: general, vendor-specific, industry

---

## API Documentation

Once the server is running, visit:
- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

---

## Feature Specifications

All feature specifications are in `.kiro/specs/`:

1. **ROADMAP.md** - Master roadmap
2. **README.md** - Specifications index
3. **rbac-system/** - RBAC requirements
4. **bill-processing-pipeline/** - Pipeline requirements
5. **template-marketplace/** - Marketplace requirements
6. **change-tracking-system/** - Change tracking requirements
7. **manual-bill-editor/** - Editor requirements
8. **rag-compliance-engine/** - RAG requirements
9. **gemini-integration/** - Gemini requirements
10. **document-generator/** - Document generation requirements
11. **ca-workflow-automation/** - Workflow requirements

---

## Troubleshooting

### Gemini API Not Working
- Check if `GEMINI_API_KEY` is set
- Verify API key is valid
- Check token usage limits

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string in `config.py`
- Verify database permissions

### Template Upload Fails
- Check file size limits
- Verify user has CA or Admin role
- Check template validation rules

---

## Next Steps

1. **Review Specifications** - Read `.kiro/specs/README.md`
2. **Test Features** - Use sample data to test each feature
3. **Integrate Frontend** - Connect frontend components
4. **Deploy** - Follow deployment guide in `DEPLOYMENT.md`

---

## Support

For issues or questions:
- Check specifications in `.kiro/specs/`
- Review implementation summary in `.kiro/specs/IMPLEMENTATION_SUMMARY.md`
- Check API documentation at `/docs`

---

**Version:** 2.0.0  
**Last Updated:** February 14, 2026
