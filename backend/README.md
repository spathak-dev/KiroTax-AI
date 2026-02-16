# KiroTax AI Backend

FastAPI-based backend for AI-powered GST automation platform.

## Features

- **Authentication & Authorization**: JWT-based auth with RBAC
- **OCR Processing**: PaddleOCR for invoice data extraction
- **GST Automation**: Auto-compute CGST/SGST/IGST
- **Report Generation**: GSTR-1, GSTR-3B, sales/purchase registers
- **Template Learning**: Learn and reuse invoice templates
- **Fraud Detection**: Detect fake GSTINs and duplicate invoices
- **Tender Analysis**: AI-powered government tender analysis
- **Vendor Mapping**: Intelligent vendor and GSTIN mapping

## Setup

### Prerequisites

- Python 3.9+
- MongoDB
- PaddlePaddle (for OCR)

### Installation

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env

# Edit .env with your configuration
```

### Run

```bash
# Development
uvicorn main:app --reload

# Production
uvicorn main:app --host 0.0.0.0 --port 8000
```

## API Documentation

Once running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Project Structure

```
backend/
├── main.py                 # FastAPI application
├── config.py              # Configuration
├── database.py            # MongoDB connection
├── models/                # Pydantic models
│   ├── user.py
│   ├── bill.py
│   ├── template.py
│   └── gst.py
├── routes/                # API routes
│   ├── auth.py
│   ├── bills.py
│   ├── ocr.py
│   ├── templates.py
│   ├── gst.py
│   ├── tax.py
│   ├── tenders.py
│   └── mapper.py
├── services/              # Business logic
│   ├── ocr_service.py
│   ├── gst_engine.py
│   ├── template_matcher.py
│   ├── fraud_detector.py
│   ├── tender_ai.py
│   └── mapper_service.py
├── ai/                    # AI/ML modules
│   ├── layout_detector.py
│   ├── table_extractor.py
│   └── classifier.py
├── security/              # Security utilities
│   ├── jwt.py
│   └── rbac.py
└── utils/                 # Utility functions
    ├── storage.py
    ├── gst_validator.py
    ├── pdf_parser.py
    └── excel_export.py
```

## API Endpoints

### Authentication
- POST `/auth/register` - Register new user
- POST `/auth/login` - Login user
- GET `/auth/me` - Get current user

### Bills
- POST `/bills/upload` - Upload bill
- GET `/bills` - Get user bills
- GET `/bills/{id}` - Get specific bill
- DELETE `/bills/{id}` - Delete bill

### OCR
- POST `/ocr/scan` - Scan document

### Templates
- POST `/templates/train` - Create template
- GET `/templates` - Get templates
- GET `/templates/{id}` - Get specific template
- DELETE `/templates/{id}` - Delete template

### GST
- POST `/gst/generate` - Generate GST report
- GET `/gst/report` - Get GST reports
- POST `/gst/export/{id}` - Export report

### Tax
- POST `/tax/prepare` - Prepare tax filing
- GET `/tax/status` - Get tax status

### Tenders
- POST `/tenders/analyze` - Analyze tender
- GET `/tenders/opportunities` - Get opportunities

### Mapper
- GET `/map/gstin/{gstin}` - Get GSTIN info
- GET `/map/vendor/{name}` - Search vendor
- POST `/map/vendor/map` - Map vendor to GSTIN

## License

Proprietary - KiroTax AI Platform
