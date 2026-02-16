from fastapi import HTTPException, Security, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import List
from models.user import UserRole
from security.jwt import decode_access_token
try:
    from database import get_collection
except:
    from database_mock import get_collection

security = HTTPBearer()

async def get_current_user(credentials: HTTPAuthorizationCredentials = Security(security)):
    """Get current authenticated user"""
    token = credentials.credentials
    payload = decode_access_token(token)
    
    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    
    user_id = payload.get("sub")
    if user_id is None:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    
    users_collection = get_collection("users")
    user = await users_collection.find_one({"_id": user_id})
    
    if user is None:
        raise HTTPException(status_code=401, detail="User not found")
    
    return user

def require_roles(allowed_roles: List[UserRole]):
    """Decorator to require specific roles"""
    async def role_checker(current_user: dict = Depends(get_current_user)):
        user_role = current_user.get("role")
        if user_role not in [role.value for role in allowed_roles]:
            raise HTTPException(
                status_code=403,
                detail=f"Access forbidden. Required roles: {[role.value for role in allowed_roles]}"
            )
        return current_user
    return role_checker

# Convenience functions
async def require_admin(current_user: dict = Depends(get_current_user)):
    """Require admin role"""
    if current_user.get("role") != UserRole.ADMIN.value:
        raise HTTPException(status_code=403, detail="Admin access required")
    return current_user

async def require_ca(current_user: dict = Depends(get_current_user)):
    """Require CA role"""
    if current_user.get("role") not in [UserRole.CA.value, UserRole.ADMIN.value]:
        raise HTTPException(status_code=403, detail="CA access required")
    return current_user
