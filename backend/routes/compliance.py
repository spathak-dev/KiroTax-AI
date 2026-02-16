from fastapi import APIRouter, HTTPException, Depends
from typing import Dict, Any, List
from services.rag_compliance import RAGComplianceEngine
from security.rbac import get_current_user, require_role

router = APIRouter()
compliance_engine = RAGComplianceEngine()

@router.post("/compliance/scrape")
async def scrape_regulations(
    current_user: dict = Depends(require_role("admin"))
):
    """Scrape latest GST regulations (Admin only)"""
    
    result = await compliance_engine.scrape_regulations()
    
    return result

@router.post("/compliance/validate")
async def validate_bill_compliance(
    bill_data: Dict[str, Any],
    current_user: dict = Depends(get_current_user)
):
    """Validate bill against GST compliance rules"""
    
    result = await compliance_engine.validate_compliance(bill_data)
    
    return result

@router.get("/compliance/search")
async def search_regulations(
    query: str,
    top_k: int = 5,
    current_user: dict = Depends(get_current_user)
):
    """Search compliance knowledge base"""
    
    results = await compliance_engine.search_regulations(query, top_k)
    
    return {"query": query, "results": results}

@router.get("/compliance/stats")
async def get_knowledge_base_stats(
    current_user: dict = Depends(get_current_user)
):
    """Get knowledge base statistics"""
    
    stats = compliance_engine.get_knowledge_base_stats()
    
    return stats

@router.post("/compliance/explain")
async def explain_regulation(
    regulation_text: str,
    current_user: dict = Depends(get_current_user)
):
    """Get plain language explanation of regulation"""
    
    explanation = await compliance_engine.get_plain_language_explanation(regulation_text)
    
    return {"explanation": explanation}
