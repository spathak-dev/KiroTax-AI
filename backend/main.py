from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from config import settings
# Use mock database for demo (no MongoDB required)
try:
    from database import connect_to_mongo, close_mongo_connection
except:
    from database_mock import connect_to_mongo, close_mongo_connection

# Import routes
from routes import auth, bills, ocr, templates, gst, tax, tenders, mapper, admin

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await connect_to_mongo()
    yield
    # Shutdown
    await close_mongo_connection()

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(bills.router, prefix="/bills", tags=["Bills"])
app.include_router(ocr.router, prefix="/ocr", tags=["OCR"])
app.include_router(templates.router, prefix="/templates", tags=["Templates"])
app.include_router(gst.router, prefix="/gst", tags=["GST"])
app.include_router(tax.router, prefix="/tax", tags=["Tax"])
app.include_router(tenders.router, prefix="/tenders", tags=["Tenders"])
app.include_router(mapper.router, prefix="/map", tags=["Mapper"])
app.include_router(admin.router, prefix="/admin", tags=["Admin"])

@app.get("/")
async def root():
    return {
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "running",
        "message": "AI for Viksit Bharat 🇮🇳"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG
    )
