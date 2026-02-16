from typing import Dict, List, Optional
try:
    from database import get_collection
except:
    from database_mock import get_collection
import difflib

class TemplateMatcher:
    """Match invoices to learned templates"""
    
    def __init__(self):
        self.similarity_threshold = 0.85
    
    async def find_matching_template(self, extracted_data: Dict, user_id: str) -> Optional[Dict]:
        """Find matching template for extracted data"""
        templates_collection = get_collection("templates")
        
        # Get user's templates
        templates = await templates_collection.find({
            "user_id": user_id
        }).to_list(length=100)
        
        best_match = None
        best_score = 0
        
        for template in templates:
            score = self._calculate_similarity(extracted_data, template)
            
            if score > best_score and score >= self.similarity_threshold:
                best_score = score
                best_match = template
        
        return best_match
    
    def _calculate_similarity(self, extracted_data: Dict, template: Dict) -> float:
        """Calculate similarity between extracted data and template"""
        score = 0
        total_checks = 0
        
        # Check vendor name similarity
        if template.get("vendor_name") and extracted_data.get("vendor_name"):
            vendor_similarity = difflib.SequenceMatcher(
                None,
                template["vendor_name"].lower(),
                extracted_data["vendor_name"].lower()
            ).ratio()
            score += vendor_similarity
            total_checks += 1
        
        # Check field presence
        template_fields = {field["field_name"] for field in template.get("fields", [])}
        extracted_fields = set(extracted_data.keys())
        
        field_overlap = len(template_fields & extracted_fields) / len(template_fields) if template_fields else 0
        score += field_overlap
        total_checks += 1
        
        return score / total_checks if total_checks > 0 else 0
    
    async def apply_template(self, extracted_data: Dict, template: Dict) -> Dict:
        """Apply template to improve extraction"""
        enhanced_data = extracted_data.copy()
        
        # Use template field mappings to enhance data
        for field in template.get("fields", []):
            field_name = field["field_name"]
            
            # If field is missing in extracted data, try to find it using template coordinates
            if field_name not in enhanced_data or not enhanced_data[field_name]:
                # In production, would re-extract using coordinates
                pass
        
        # Update template usage statistics
        templates_collection = get_collection("templates")
        await templates_collection.update_one(
            {"_id": template["_id"]},
            {"$inc": {"usage_count": 1}}
        )
        
        return enhanced_data
