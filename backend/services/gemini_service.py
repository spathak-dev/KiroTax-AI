import os
import json
import hashlib
from typing import Dict, Any, Optional, List
from datetime import datetime, timedelta
import google.generativeai as genai
from PIL import Image
import io

class GeminiService:
    """Service for integrating Google Gemini AI for bill analysis"""
    
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if api_key:
            genai.configure(api_key=api_key)
            self.model = genai.GenerativeModel('gemini-1.5-pro')
        else:
            self.model = None
        
        self.cache = {}  # Simple in-memory cache, use Redis in production
        self.token_usage = {"daily": 0, "monthly": 0}
        self.budget_limit = int(os.getenv("GEMINI_MONTHLY_TOKEN_LIMIT", 1000000))
    
    def _generate_cache_key(self, image_data: bytes) -> str:
        """Generate hash for caching"""
        return hashlib.sha256(image_data).hexdigest()
    
    async def analyze_bill_image(
        self, 
        image_data: bytes, 
        bill_type: Optional[str] = None,
        vendor_context: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """Analyze bill image using Gemini multimodal capabilities"""
        
        if not self.model:
            return {"error": "Gemini API not configured", "fallback": True}
        
        # Check cache
        cache_key = self._generate_cache_key(image_data)
        if cache_key in self.cache:
            return self.cache[cache_key]
        
        # Check budget
        if self.token_usage["monthly"] >= self.budget_limit:
            return {"error": "Monthly token budget exceeded", "fallback": True}
        
        try:
            # Load image
            image = Image.open(io.BytesIO(image_data))
            
            # Construct prompt
            prompt = self._build_extraction_prompt(bill_type, vendor_context)
            
            # Generate response
            response = self.model.generate_content([prompt, image])
            
            # Parse JSON response
            result = self._parse_gemini_response(response.text)
            
            # Update token usage
            self.token_usage["daily"] += response.usage_metadata.total_token_count
            self.token_usage["monthly"] += response.usage_metadata.total_token_count
            
            # Cache result
            self.cache[cache_key] = result
            
            return result
            
        except Exception as e:
            return {"error": str(e), "fallback": True}
    
    def _build_extraction_prompt(
        self, 
        bill_type: Optional[str], 
        vendor_context: Optional[Dict[str, Any]]
    ) -> str:
        """Build structured prompt for Gemini"""
        
        base_prompt = """
        Analyze this bill/invoice image and extract the following information in JSON format:
        
        {
            "invoice_number": "string",
            "invoice_date": "YYYY-MM-DD",
            "vendor_name": "string",
            "vendor_gstin": "string (15 characters)",
            "customer_name": "string",
            "customer_gstin": "string",
            "subtotal": float,
            "cgst_amount": float,
            "sgst_amount": float,
            "igst_amount": float,
            "total_tax": float,
            "grand_total": float,
            "line_items": [
                {
                    "description": "string",
                    "quantity": float,
                    "rate": float,
                    "amount": float
                }
            ],
            "confidence": float (0-1),
            "anomalies": ["list of any unusual patterns detected"],
            "suggestions": ["list of corrections or improvements"]
        }
        
        Important:
        - Extract all amounts as numbers, not strings
        - Validate GSTIN format (2 digits + 10 alphanumeric + 1 digit + 1 letter + 1 alphanumeric)
        - Check if subtotal + taxes = grand total
        - Identify any suspicious patterns (duplicate invoices, unusual amounts, etc.)
        """
        
        if bill_type:
            base_prompt += f"\n\nBill Type: {bill_type}"
        
        if vendor_context:
            base_prompt += f"\n\nVendor Context: {json.dumps(vendor_context)}"
            base_prompt += "\n\nCompare extracted data with historical patterns and flag inconsistencies."
        
        return base_prompt
    
    def _parse_gemini_response(self, response_text: str) -> Dict[str, Any]:
        """Parse and validate Gemini JSON response"""
        try:
            # Extract JSON from markdown code blocks if present
            if "```json" in response_text:
                start = response_text.find("```json") + 7
                end = response_text.find("```", start)
                response_text = response_text[start:end].strip()
            elif "```" in response_text:
                start = response_text.find("```") + 3
                end = response_text.find("```", start)
                response_text = response_text[start:end].strip()
            
            data = json.loads(response_text)
            return data
            
        except json.JSONDecodeError:
            return {"error": "Failed to parse Gemini response", "raw_response": response_text}
    
    async def detect_anomalies(
        self, 
        bill_data: Dict[str, Any],
        historical_data: Optional[List[Dict[str, Any]]] = None
    ) -> Dict[str, Any]:
        """Use Gemini to detect anomalies in bill data"""
        
        if not self.model:
            return {"anomalies": [], "risk_score": "unknown"}
        
        prompt = f"""
        Analyze this bill data for anomalies and potential fraud:
        
        Bill Data: {json.dumps(bill_data)}
        
        Historical Data: {json.dumps(historical_data) if historical_data else "Not available"}
        
        Identify:
        1. Duplicate invoices
        2. Unusual amounts compared to history
        3. Mismatched dates or sequences
        4. Invalid GSTIN or tax calculations
        5. Suspicious patterns
        
        Return JSON:
        {{
            "anomalies": [
                {{
                    "type": "string",
                    "description": "string",
                    "risk_score": "low|medium|high"
                }}
            ],
            "overall_risk": "low|medium|high",
            "explanation": "string"
        }}
        """
        
        try:
            response = self.model.generate_content(prompt)
            return self._parse_gemini_response(response.text)
        except Exception as e:
            return {"error": str(e), "anomalies": []}
    
    async def suggest_corrections(
        self, 
        field_name: str,
        ocr_value: Any,
        confidence: float,
        context: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Get Gemini suggestions for low-confidence fields"""
        
        if not self.model or confidence > 0.7:
            return {"suggestion": None}
        
        prompt = f"""
        The OCR extracted this value with low confidence:
        
        Field: {field_name}
        OCR Value: {ocr_value}
        Confidence: {confidence}
        Context: {json.dumps(context)}
        
        Suggest the most likely correct value and explain why.
        
        Return JSON:
        {{
            "suggested_value": "string or number",
            "confidence": float (0-1),
            "explanation": "string"
        }}
        """
        
        try:
            response = self.model.generate_content(prompt)
            return self._parse_gemini_response(response.text)
        except Exception as e:
            return {"error": str(e), "suggestion": None}
    
    async def answer_question(
        self, 
        question: str,
        bill_data: Dict[str, Any],
        conversation_history: Optional[List[Dict[str, str]]] = None
    ) -> str:
        """Interactive Q&A about bills"""
        
        if not self.model:
            return "Gemini API not configured"
        
        context = f"Bill Data: {json.dumps(bill_data)}\n\n"
        
        if conversation_history:
            context += "Conversation History:\n"
            for msg in conversation_history[-5:]:  # Last 5 messages
                context += f"{msg['role']}: {msg['content']}\n"
        
        prompt = f"{context}\nUser Question: {question}\n\nProvide a clear, accurate answer with citations to specific bill fields."
        
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            return f"Error: {str(e)}"
    
    def get_usage_stats(self) -> Dict[str, Any]:
        """Get token usage statistics"""
        return {
            "daily_tokens": self.token_usage["daily"],
            "monthly_tokens": self.token_usage["monthly"],
            "budget_limit": self.budget_limit,
            "budget_remaining": self.budget_limit - self.token_usage["monthly"],
            "budget_used_percent": (self.token_usage["monthly"] / self.budget_limit) * 100
        }
