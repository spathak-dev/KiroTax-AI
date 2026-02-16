# Template Creation Guide

## Overview

This guide explains how to create templates for the KiroTax AI bill recognition system.

## Template Hierarchy

```
1. Layout Templates (30 types)
   ↓
2. Base Templates (50-100 common patterns)
   ↓
3. Org-Specific Templates (unlimited customizations)
```

## Creating a New Template

### Step 1: Identify Layout Type

Choose from existing layouts:
- `standard_invoice` - A4/Letter invoices
- `long_receipt` - Thermal printer receipts
- `multi_page_invoice` - Multi-page documents
- `tabular_invoice` - Complex table-heavy invoices

### Step 2: Define Detection Rules

```json
{
  "detection": {
    "keywords": ["Invoice", "GSTIN"],
    "min_matches": 2,
    "regex": ["Invoice\\s+No[:\\s]*(.*)"],
    "layout_match": "standard_invoice",
    "confidence_threshold": 0.7
  }
}
```

**Detection Methods:**
- **keywords** - Must appear in document
- **regex** - Patterns that must match
- **layout_match** - Required layout type
- **confidence_threshold** - Minimum score to use template

### Step 3: Define Field Extraction

```json
{
  "fields": {
    "invoice_number": {
      "method": "regex",
      "pattern": "Invoice\\s+No[:\\s]*(.*?)(?:\\n|$)",
      "aliases": ["Bill No", "Inv No"],
      "required": true,
      "type": "string"
    },
    "total": {
      "method": "regex",
      "pattern": "Total[:\\s]*(?:Rs\\.?|₹)?\\s*([\\d,]+\\.?\\d*)",
      "required": true,
      "type": "number"
    }
  }
}
```

**Extraction Methods:**
- **regex** - Regular expression matching
- **region** - Extract from specific document region
- **anchor** - Find text near anchor keyword

**Field Types:**
- `string` - Text value
- `number` - Numeric value (auto-parsed)
- `date` - Date value (auto-formatted)
- `integer` - Whole number

### Step 4: Define Table Structure

```json
{
  "table": {
    "detection": {
      "header_keywords": ["Item", "Qty", "Amount"],
      "min_columns": 3
    },
    "columns": [
      {
        "name": "description",
        "aliases": ["Item", "Product"],
        "type": "string",
        "required": true
      },
      {
        "name": "quantity",
        "aliases": ["Qty"],
        "type": "number",
        "required": true
      },
      {
        "name": "total",
        "aliases": ["Amount"],
        "type": "number",
        "required": true
      }
    ],
    "end_indicators": ["Subtotal", "Total"]
  }
}
```

### Step 5: Add Validation Rules

```json
{
  "validation": {
    "required_fields": ["invoice_number", "date", "total"],
    "calculations": [
      {
        "rule": "subtotal + tax = grand_total",
        "tolerance": 1.0
      }
    ]
  }
}
```

## Template Types

### Base Template
Generic template for a category of bills.

**Location:** `base/template_name.json`

**Use when:** Creating a reusable template for common bill types

### Org-Specific Template
Customized template for a specific organization.

**Location:** `orgs/org_id/template_name.json`

**Use when:** Organization has unique bill format

## Best Practices

### 1. Use Aliases
```json
{
  "invoice_number": {
    "pattern": "Invoice\\s+No[:\\s]*(.*)",
    "aliases": ["Bill No", "Inv No", "Invoice #"]
  }
}
```

### 2. Make Fields Optional When Appropriate
```json
{
  "buyer_gstin": {
    "pattern": "...",
    "required": false
  }
}
```

### 3. Add Confidence Boosters
```json
{
  "vendor_gstin": {
    "pattern": "...",
    "required": true,
    "confidence_boost": 0.1
  }
}
```

### 4. Handle Multiple Formats
```json
{
  "date": {
    "pattern": "(\\d{1,2}[/-]\\d{1,2}[/-]\\d{2,4})",
    "aliases": ["Date", "Invoice Date", "Bill Date"]
  }
}
```

### 5. Use Validation
```json
{
  "validation": {
    "required_fields": ["invoice_number", "total"],
    "calculations": [
      {
        "rule": "sum(items.total) = subtotal",
        "tolerance": 1.0
      }
    ]
  }
}
```

## Testing Templates

### 1. Create Test OCR Data
```json
{
  "text": "Invoice No: INV-001\nDate: 15/01/2024\nTotal: ₹1000",
  "blocks": [...]
}
```

### 2. Test Template Matching
```python
from services.template_engine import TemplateEngine

engine = TemplateEngine()
result = engine.process_bill(ocr_data)
print(result)
```

### 3. Verify Normalized Output
Check that output matches universal schema.

## Common Patterns

### Invoice Number
```regex
Invoice\\s+(?:No|Number|#)[:\\s]*(.*?)(?:\\n|$)
```

### Date
```regex
(\\d{1,2}[/-]\\d{1,2}[/-]\\d{2,4})
```

### GSTIN
```regex
(\\d{2}[A-Z]{5}\\d{4}[A-Z]{1}\\d{1}[A-Z]{1}\\d{1})
```

### Amount
```regex
(?:Rs\\.?|₹)?\\s*([\\d,]+\\.?\\d*)
```

### Table Row
```regex
(.+?)\\s+(\\d+)\\s+([\\d,]+\\.?\\d*)\\s+([\\d,]+\\.?\\d*)
```

## Troubleshooting

### Template Not Matching
- Check keyword spelling
- Lower confidence_threshold
- Add more aliases
- Verify layout_type

### Fields Not Extracting
- Test regex pattern separately
- Check for typos in pattern
- Add aliases for variations
- Verify field is in OCR text

### Table Not Parsing
- Check header_keywords match exactly
- Verify column count
- Add end_indicators
- Check for merged cells

## Contributing Templates

1. Create template JSON file
2. Test with sample bills
3. Document special cases
4. Submit for review

## Support

For help creating templates:
- Check existing templates in `base/`
- Review `schemas/normalized_invoice.json`
- Test with `template_engine.py`
