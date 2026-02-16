"""
Extended FastAPI application with all new features
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

# Import existing routes
from routes.auth import router as auth_router
from routes.bills import router as bills_router
from routes.gst import router as gst_router

# Import new routes
from routes.templates import router as templates_router
from routes.compliance import router as compliance_router
from routes.gemini import router as gemini_router

app = FastAPI(
    title="KiroTax AI - Extended API",
    description="Comprehensive fintech automation platform for GST compliance",
    version="2.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all routers
app.include_router(auth_router, prefix="/api/auth", tags=["Authentication"])
app.include_router(bills_router, prefix="/api/bills", tags=["Bills"])
app.include_router(gst_router, prefix="/api/gst", tags=["GST"])
app.include_router(templates_router, prefix="/api/templates", tags=["Template Marketplace"])
app.include_router(compliance_router, prefix="/api/compliance", tags=["Compliance"])
app.include_router(gemini_router, prefix="/api/gemini", tags=["Gemini AI"])

@app.get("/")
async def root():
    return {
        "message": "KiroTax AI - Extended API",
        "version": "2.0.0",
        "features": [
            "RBAC System",
            "Bill Processing Pipeline",
            "Template Marketplace",
            "Change Tracking",
            "Manual Bill Editor",
            "RAG Compliance Engine",
            "Gemini Integration",
            "Document Generator",
            "CA Workflow Automation"
        ]
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": "2024-02-14T00:00:00Z"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
