from fastapi import APIRouter, HTTPException, Depends
from datetime import datetime
from models.user import UserCreate, UserResponse, UserRole
from security.jwt import get_password_hash, verify_password, create_access_token
from security.rbac import get_current_user
try:
    from database import get_collection
except:
    from database_mock import get_collection
import uuid

router = APIRouter()

@router.post("/register", response_model=dict)
async def register(user_data: UserCreate):
    """Register a new user"""
    users_collection = get_collection("users")
    
    # Check if user already exists
    existing_user = await users_collection.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create user document
    user_dict = {
        "_id": str(uuid.uuid4()),
        "email": user_data.email,
        "name": user_data.name,
        "role": user_data.role.value,
        "company": user_data.company,
        "password_hash": get_password_hash(user_data.password),
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
        "is_active": True
    }
    
    await users_collection.insert_one(user_dict)
    
    # Create access token
    access_token = create_access_token(data={"sub": user_dict["_id"], "role": user_dict["role"]})
    
    return {
        "user": {
            "id": user_dict["_id"],
            "email": user_dict["email"],
            "name": user_dict["name"],
            "role": user_dict["role"],
            "company": user_dict.get("company")
        },
        "token": access_token
    }

@router.post("/login", response_model=dict)
async def login(email: str, password: str):
    """Login user"""
    users_collection = get_collection("users")
    
    # Find user
    user = await users_collection.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    # Verify password
    if not verify_password(password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    # Check if user is active
    if not user.get("is_active", True):
        raise HTTPException(status_code=401, detail="User account is disabled")
    
    # Create access token
    access_token = create_access_token(data={"sub": user["_id"], "role": user["role"]})
    
    return {
        "user": {
            "id": user["_id"],
            "email": user["email"],
            "name": user["name"],
            "role": user["role"],
            "company": user.get("company")
        },
        "token": access_token
    }

@router.get("/me", response_model=dict)
async def get_me(current_user: dict = Depends(get_current_user)):
    """Get current user info"""
    return {
        "id": current_user["_id"],
        "email": current_user["email"],
        "name": current_user["name"],
        "role": current_user["role"],
        "company": current_user.get("company")
    }
