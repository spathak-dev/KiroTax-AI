import os
import aiofiles
from fastapi import UploadFile
from config import settings
import uuid

async def save_file(file: UploadFile) -> str:
    """Save uploaded file to storage"""
    # Generate unique filename
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    
    if settings.STORAGE_TYPE == "local":
        # Save to local storage
        storage_path = settings.STORAGE_PATH
        os.makedirs(storage_path, exist_ok=True)
        
        file_path = os.path.join(storage_path, unique_filename)
        
        async with aiofiles.open(file_path, 'wb') as f:
            content = await file.read()
            await f.write(content)
        
        return file_path
    else:
        # TODO: Implement S3 upload
        raise NotImplementedError("S3 storage not implemented yet")

def get_file_url(file_path: str) -> str:
    """Get public URL for file"""
    if settings.STORAGE_TYPE == "local":
        return f"/storage/{os.path.basename(file_path)}"
    else:
        # TODO: Return S3 URL
        return file_path
