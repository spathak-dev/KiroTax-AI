# KiroTax AI – AI CA Billing & GST Automation Platform

## 🇮🇳 AI for Viksit Bharat

Enterprise-grade AI-powered billing, GST automation, and tax filing platform for Indian MSMEs, CAs, and Auditors.

## Architecture

- **Frontend**: Next.js 16 (App Router, TypeScript, Tailwind CSS)
- **Backend**: Python FastAPI
- **Database**: MongoDB
- **Storage**: AWS S3-style abstraction
- **Auth**: JWT + RBAC
- **AI/OCR**: PaddleOCR, OpenCV, ML hybrid

## Quick Start

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

## Features

- 🤖 AI-powered OCR for bill/invoice extraction
- 📊 Automated GST computation (CGST/SGST/IGST)
- 📝 GSTR-1, GSTR-3B generation
- 🎯 Template learning & reuse
- 🔍 Fraud detection (fake GSTIN, duplicates)
- 👥 Multi-role dashboard (Admin, CA, Client, Auditor)
- 📈 Tender analysis
- 🗺️ Vendor/GSTIN mapping

## Project Structure

```
kirotax-ai/
├── frontend/          # Next.js 16 application
├── backend/           # FastAPI application
└── README.md
```

## License

Proprietary - KiroTax AI Platform
