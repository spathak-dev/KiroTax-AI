from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    # Application
    APP_NAME: str = "KiroTax AI"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True
    ENVIRONMENT: str = "development"
    
    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    
    # Database
    MONGODB_URL: str = "mongodb://localhost:27017"
    DATABASE_NAME: str = "kirotax_ai"
    
    # Security
    SECRET_KEY: str = "your-secret-key-change-this-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440
    
    # Storage
    STORAGE_TYPE: str = "local"  # local or s3
    STORAGE_PATH: str = "./storage"
    AWS_ACCESS_KEY_ID: str = ""
    AWS_SECRET_ACCESS_KEY: str = ""
    AWS_REGION: str = "ap-south-1"
    S3_BUCKET_NAME: str = ""
    
    # AI/OCR
    OCR_CONFIDENCE_THRESHOLD: float = 0.7
    TEMPLATE_MATCH_THRESHOLD: float = 0.85
    
    # GST
    GST_API_URL: str = "https://api.gst.gov.in"
    GST_API_KEY: str = ""
    
    # CORS
    CORS_ORIGINS: str = "http://localhost:3000,http://localhost:3001,https://localhost:5001,https://localhost:5002"
    
    @property
    def cors_origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
