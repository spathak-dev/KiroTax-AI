# Bill Template System - Architecture

## Overview

This is a **hierarchical template system** designed to handle 1000+ bill formats through:
- Layout classification (reduces 1000 formats → 30 layout types)
- Template detection with confidence scoring
- Universal normalized schema
- Org-specific overrides

## Architecture

```
OCR → Layout Detection → Template Matching → Field Extraction → Normalized JSON → Export
```

## Directory Structure

```
bill_templates/
├── base/                    # Base templates (30 layouts)
│   ├── gst_invoice.json
│   ├── retail_receipt.json
│   ├── restaurant_bill.json
│   ├── ecommerce_invoice.json
│   └── ...
├── layouts/                 # Layout classifiers
│   ├── standard_invoice.json
│   ├── long_receipt.json
│   ├── multi_page_invoice.json
│   ├── tabular_invoice.json
│   └── ...
├── orgs/                    # Organization-specific overrides
│   ├── org_123/
│   │   └── custom_template.json
│   └── org_456/
│       └── custom_template.json
├── detection_rules/         # Detection logic
│   └── rules.json
└── schemas/                 # Universal schemas
    └── normalized_invoice.json
```

## Template Hierarchy

1. **Layout Templates** (30 types) - Classify document structure
2. **Base Templates** (50-100) - Common patterns per layout
3. **Org Overrides** (unlimited) - Organization-specific customizations

## Key Principles

1. **Never hardcode templates** - Store as JSON
2. **Single normalized schema** - All bills map to one format
3. **Rule-based detection** - Keywords + regex + layout
4. **Confidence scoring** - Best match wins
5. **Multi-page support** - Page number detection + content matching

## Universal Normalized Schema

Every bill, regardless of format, maps to:

```json
{
  "invoice": {
    "invoice_number": "",
    "date": "",
    "vendor_name": "",
    "vendor_gstin": "",
    "buyer_name": "",
    "currency": "INR",
    "subtotal": 0,
    "tax_total": 0,
    "grand_total": 0
  },
  "items": [...],
  "meta": {
    "template_used": "",
    "confidence": 0.93,
    "layout_type": ""
  }
}
```

## Template Detection Flow

1. **OCR** → Extract text + bounding boxes
2. **Layout Classification** → Identify document structure
3. **Template Matching** → Score candidate templates
4. **Field Extraction** → Apply extraction rules
5. **Normalization** → Map to universal schema
6. **Export** → JSON / PDF / Excel

## Usage

See `backend/services/template_engine.py` for implementation.
