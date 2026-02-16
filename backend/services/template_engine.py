"""
Template Engine - Handles 1000+ bill formats through hierarchical detection
"""

import json
import re
import os
from typing import Dict, Any, List, Optional, Tuple
from pathlib import Path
import logging

logger = logging.getLogger(__name__)

class TemplateEngine:
    """
    Scalable template engine for bill recognition
    
    Architecture:
    OCR → Layout Detection → Template Matching → Field Extraction → Normalized JSON
    """
    
    def __init__(self, templates_dir: str = "backend/bill_templates"):
        self.templates_dir = Path(templates_dir)
        self.layouts = {}
        self.base_templates = {}
        self.org_templates = {}
        
        self._load_layouts()
        self._load_base_templates()
    
    def _load_layouts(self):
        """Load layout classifiers"""
        layouts_dir = self.templates_dir / "layouts"
        
        if not layouts_dir.exists():
            logger.warning(f"Layouts directory not found: {layouts_dir}")
            return
        
        for layout_file in layouts_dir.glob("*.json"):
            with open(layout_file, 'r') as f:
                layout = json.load(f)
                self.layouts[layout["layout_id"]] = layout
        
        logger.info(f"Loaded {len(self.layouts)} layout classifiers")
    
    def _load_base_templates(self):
        """Load base templates"""
        base_dir = self.templates_dir / "base"
        
        if not base_dir.exists():
            logger.warning(f"Base templates directory not found: {base_dir}")
            return
        
        for template_file in base_dir.glob("*.json"):
            with open(template_file, 'r') as f:
                template = json.load(f)
                self.base_templates[template["template_id"]] = template
        
        logger.info(f"Loaded {len(self.base_templates)} base templates")
    
    def detect_layout(self, ocr_data: Dict[str, Any]) -> Tuple[str, float]:
        """
        Classify document layout
        
        Returns: (layout_id, confidence)
        """
        text = ocr_data.get("text", "")
        blocks = ocr_data.get("blocks", [])
        
        # Calculate document dimensions
        if blocks:
            max_x = max(b["bbox"][0] + b["bbox"][2] for b in blocks)
            max_y = max(b["bbox"][1] + b["bbox"][3] for b in blocks)
            aspect_ratio = max_y / max_x if max_x > 0 else 0
        else:
            aspect_ratio = 0
        
        best_layout = None
        best_score = 0
        
        for layout_id, layout in self.layouts.items():
            score = 0
            detection_rules = layout.get("detection_rules", {})
            
            # Check aspect ratio for long receipts
            if "aspect_ratio" in detection_rules:
                min_ratio = detection_rules["aspect_ratio"].get("min", 0)
                if aspect_ratio >= min_ratio:
                    score += 0.3
            
            # Check keywords
            keywords = detection_rules.get("keywords", [])
            if keywords:
                matches = sum(1 for kw in keywords if kw.lower() in text.lower())
                min_matches = detection_rules.get("min_keywords", 1)
                if matches >= min_matches:
                    score += 0.4 * (matches / len(keywords))
            
            # Check table presence for tabular layouts
            if detection_rules.get("table_dominant"):
                # Simple heuristic: look for table-like patterns
                if self._has_table_structure(text):
                    score += 0.3
            
            if score > best_score:
                best_score = score
                best_layout = layout_id
        
        return best_layout or "standard_invoice", best_score
    
    def _has_table_structure(self, text: str) -> bool:
        """Detect if text has table-like structure"""
        lines = text.split('\n')
        
        # Look for lines with multiple numbers (likely table rows)
        table_lines = 0
        for line in lines:
            numbers = re.findall(r'\d+\.?\d*', line)
            if len(numbers) >= 3:  # At least 3 numbers per line
                table_lines += 1
        
        return table_lines >= 3
    
    def match_template(
        self, 
        ocr_data: Dict[str, Any], 
        layout_id: str,
        org_id: Optional[str] = None
    ) -> Tuple[Dict[str, Any], float]:
        """
        Find best matching template
        
        Returns: (template, confidence)
        """
        text = ocr_data.get("text", "")
        
        # Check org-specific templates first
        if org_id and org_id in self.org_templates:
            org_template = self.org_templates[org_id]
            score = self._score_template(org_template, text, layout_id)
            if score >= org_template["detection"]["confidence_threshold"]:
                return org_template, score
        
        # Check base templates
        candidates = []
        for template_id, template in self.base_templates.items():
            if template.get("layout_type") == layout_id:
                score = self._score_template(template, text, layout_id)
                candidates.append((template, score))
        
        if not candidates:
            # Fallback to generic template
            return self._get_generic_template(layout_id), 0.5
        
        # Return best match
        candidates.sort(key=lambda x: x[1], reverse=True)
        return candidates[0]
    
    def _score_template(self, template: Dict[str, Any], text: str, layout_id: str) -> float:
        """Score template match"""
        score = 0
        detection = template.get("detection", {})
        
        # Layout match
        if template.get("layout_type") == layout_id:
            score += 0.3
        
        # Keyword matching
        keywords = detection.get("keywords", [])
        if keywords:
            matches = sum(1 for kw in keywords if kw.lower() in text.lower())
            min_matches = detection.get("min_matches", 1)
            if matches >= min_matches:
                score += 0.4 * (matches / len(keywords))
        
        # Regex matching
        regex_patterns = detection.get("regex", [])
        if regex_patterns:
            matches = sum(1 for pattern in regex_patterns if re.search(pattern, text, re.IGNORECASE))
            score += 0.3 * (matches / len(regex_patterns))
        
        return min(score, 1.0)
    
    def extract_fields(
        self, 
        ocr_data: Dict[str, Any], 
        template: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Extract fields using template rules"""
        text = ocr_data.get("text", "")
        blocks = ocr_data.get("blocks", [])
        
        extracted = {}
        fields = template.get("fields", {})
        
        for field_name, field_config in fields.items():
            method = field_config.get("method")
            
            if method == "regex":
                value = self._extract_regex(text, field_config)
            elif method == "region":
                value = self._extract_region(blocks, field_config)
            else:
                value = None
            
            if value:
                # Type conversion
                field_type = field_config.get("type", "string")
                if field_type == "number":
                    value = self._parse_number(value)
                elif field_type == "date":
                    value = self._parse_date(value)
                
                extracted[field_name] = value
        
        return extracted
    
    def _extract_regex(self, text: str, config: Dict[str, Any]) -> Optional[str]:
        """Extract field using regex"""
        pattern = config.get("pattern")
        if not pattern:
            return None
        
        # Try main pattern
        match = re.search(pattern, text, re.IGNORECASE | re.MULTILINE)
        if match:
            return match.group(1).strip() if match.groups() else match.group(0).strip()
        
        # Try aliases
        aliases = config.get("aliases", [])
        for alias in aliases:
            alias_pattern = pattern.replace(pattern.split('[:\\s]*')[0], alias)
            match = re.search(alias_pattern, text, re.IGNORECASE | re.MULTILINE)
            if match:
                return match.group(1).strip() if match.groups() else match.group(0).strip()
        
        return None
    
    def _extract_region(self, blocks: List[Dict], config: Dict[str, Any]) -> Optional[str]:
        """Extract field from specific region"""
        region = config.get("region")
        # Simplified region extraction
        # In production, use actual bounding box analysis
        return None
    
    def _parse_number(self, value: str) -> float:
        """Parse number from string"""
        # Remove currency symbols and commas
        cleaned = re.sub(r'[₹Rs\.,]', '', str(value))
        try:
            return float(cleaned)
        except ValueError:
            return 0.0
    
    def _parse_date(self, value: str) -> str:
        """Parse date to YYYY-MM-DD format"""
        # Simplified date parsing
        # In production, use dateutil.parser
        return value
    
    def extract_table(
        self, 
        ocr_data: Dict[str, Any], 
        template: Dict[str, Any]
    ) -> List[Dict[str, Any]]:
        """Extract line items table"""
        text = ocr_data.get("text", "")
        table_config = template.get("table", {})
        
        if not table_config:
            # Try items config for vertical lists
            items_config = template.get("items", {})
            if items_config:
                return self._extract_vertical_list(text, items_config)
            return []
        
        # Extract table rows
        items = []
        lines = text.split('\n')
        
        # Find table start
        header_keywords = table_config.get("detection", {}).get("header_keywords", [])
        table_started = False
        
        for line in lines:
            # Check if table header
            if not table_started:
                if any(kw.lower() in line.lower() for kw in header_keywords):
                    table_started = True
                continue
            
            # Check if table end
            end_indicators = table_config.get("end_indicators", [])
            if any(ind.lower() in line.lower() for ind in end_indicators):
                break
            
            # Parse row
            row = self._parse_table_row(line, table_config)
            if row:
                items.append(row)
        
        return items
    
    def _extract_vertical_list(self, text: str, items_config: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Extract items from vertical list format (receipts)"""
        pattern = items_config.get("detection", {}).get("pattern")
        if not pattern:
            return []
        
        items = []
        for match in re.finditer(pattern, text):
            fields = items_config.get("fields", {})
            item = {}
            
            for field_name, group_index in fields.items():
                try:
                    value = match.group(group_index)
                    if field_name in ["quantity", "unit_price", "total"]:
                        value = self._parse_number(value)
                    item[field_name] = value
                except IndexError:
                    pass
            
            if item:
                items.append(item)
        
        return items
    
    def _parse_table_row(self, line: str, table_config: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Parse a single table row"""
        # Split by multiple spaces or tabs
        parts = re.split(r'\s{2,}|\t', line.strip())
        
        if len(parts) < 3:  # Minimum columns
            return None
        
        columns = table_config.get("columns", [])
        row = {}
        
        for i, col_config in enumerate(columns):
            if i < len(parts):
                value = parts[i].strip()
                col_type = col_config.get("type", "string")
                
                if col_type == "number":
                    value = self._parse_number(value)
                elif col_type == "integer":
                    try:
                        value = int(value)
                    except ValueError:
                        value = 0
                
                row[col_config["name"]] = value
        
        return row if row else None
    
    def normalize_to_schema(
        self, 
        extracted_data: Dict[str, Any], 
        items: List[Dict[str, Any]],
        template: Dict[str, Any],
        confidence: float
    ) -> Dict[str, Any]:
        """Map extracted data to universal schema"""
        
        # Calculate totals if missing
        if "subtotal" not in extracted_data and items:
            extracted_data["subtotal"] = sum(item.get("total", 0) for item in items)
        
        if "tax_total" not in extracted_data:
            cgst = extracted_data.get("cgst_total", 0)
            sgst = extracted_data.get("sgst_total", 0)
            igst = extracted_data.get("igst_total", 0)
            extracted_data["tax_total"] = cgst + sgst + igst
        
        # Map to normalized schema
        normalized = {
            "invoice": {
                "invoice_number": extracted_data.get("invoice_number") or extracted_data.get("bill_number") or extracted_data.get("receipt_number", ""),
                "date": extracted_data.get("date", ""),
                "vendor_name": extracted_data.get("vendor_name") or extracted_data.get("store_name") or extracted_data.get("restaurant_name", ""),
                "vendor_gstin": extracted_data.get("vendor_gstin"),
                "buyer_name": extracted_data.get("buyer_name"),
                "buyer_gstin": extracted_data.get("buyer_gstin"),
                "currency": "INR",
                "subtotal": extracted_data.get("subtotal", 0),
                "tax_total": extracted_data.get("tax_total", 0),
                "grand_total": extracted_data.get("grand_total") or extracted_data.get("total", 0)
            },
            "items": items,
            "taxes": self._extract_taxes(extracted_data),
            "meta": {
                "template_used": template.get("template_id", "unknown"),
                "layout_type": template.get("layout_type", "unknown"),
                "confidence": confidence,
                "ocr_engine": "PaddleOCR",
                "page_count": 1
            }
        }
        
        return normalized
    
    def _extract_taxes(self, data: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Extract tax breakdown"""
        taxes = []
        
        if data.get("cgst_total"):
            taxes.append({
                "tax_type": "CGST",
                "rate": data.get("cgst_rate", 0),
                "amount": data.get("cgst_total", 0)
            })
        
        if data.get("sgst_total"):
            taxes.append({
                "tax_type": "SGST",
                "rate": data.get("sgst_rate", 0),
                "amount": data.get("sgst_total", 0)
            })
        
        if data.get("igst_total"):
            taxes.append({
                "tax_type": "IGST",
                "rate": data.get("igst_rate", 0),
                "amount": data.get("igst_total", 0)
            })
        
        return taxes
    
    def _get_generic_template(self, layout_id: str) -> Dict[str, Any]:
        """Return generic fallback template"""
        return {
            "template_id": f"generic_{layout_id}",
            "layout_type": layout_id,
            "detection": {"confidence_threshold": 0.5},
            "fields": {},
            "table": {}
        }
    
    def process_bill(
        self, 
        ocr_data: Dict[str, Any],
        org_id: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Complete bill processing pipeline
        
        OCR → Layout → Template → Extract → Normalize
        """
        
        # Step 1: Detect layout
        layout_id, layout_confidence = self.detect_layout(ocr_data)
        logger.info(f"Detected layout: {layout_id} (confidence: {layout_confidence:.2f})")
        
        # Step 2: Match template
        template, template_confidence = self.match_template(ocr_data, layout_id, org_id)
        logger.info(f"Matched template: {template.get('template_id')} (confidence: {template_confidence:.2f})")
        
        # Step 3: Extract fields
        extracted_data = self.extract_fields(ocr_data, template)
        
        # Step 4: Extract table/items
        items = self.extract_table(ocr_data, template)
        
        # Step 5: Normalize to universal schema
        normalized = self.normalize_to_schema(
            extracted_data, 
            items, 
            template,
            min(layout_confidence, template_confidence)
        )
        
        return normalized
