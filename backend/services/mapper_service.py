from typing import Dict, List, Optional
try:
    from database import get_collection
except:
    from database_mock import get_collection
from utils.gst_validator import validate_gstin, extract_state_from_gstin

class MapperService:
    """Service for mapping vendors and GSTINs"""
    
    async def get_gstin_info(self, gstin: str) -> Optional[Dict]:
        """Get information about a GSTIN"""
        if not validate_gstin(gstin):
            return None
        
        # Check local database first
        vendors_collection = get_collection("vendors")
        vendor = await vendors_collection.find_one({"gstin": gstin})
        
        if vendor:
            return {
                "gstin": vendor["gstin"],
                "name": vendor["name"],
                "state": extract_state_from_gstin(gstin),
                "status": "active",
                "registered_date": vendor.get("registered_date"),
                "source": "local_db"
            }
        
        # If not in local DB, return basic info from GSTIN
        return {
            "gstin": gstin,
            "state": extract_state_from_gstin(gstin),
            "status": "unknown",
            "source": "gstin_parse"
        }
    
    async def search_vendor(self, name: str) -> List[Dict]:
        """Search for vendors by name"""
        vendors_collection = get_collection("vendors")
        
        # Case-insensitive search
        vendors = await vendors_collection.find({
            "name": {"$regex": name, "$options": "i"}
        }).limit(10).to_list(length=10)
        
        return [
            {
                "id": vendor["_id"],
                "name": vendor["name"],
                "gstin": vendor["gstin"],
                "state": extract_state_from_gstin(vendor["gstin"])
            }
            for vendor in vendors
        ]
    
    async def map_vendor(self, vendor_name: str, gstin: str, user_id: str):
        """Map vendor name to GSTIN"""
        if not validate_gstin(gstin):
            raise ValueError("Invalid GSTIN")
        
        vendors_collection = get_collection("vendors")
        
        # Check if mapping already exists
        existing = await vendors_collection.find_one({"gstin": gstin})
        
        if existing:
            # Update existing mapping
            await vendors_collection.update_one(
                {"gstin": gstin},
                {"$set": {"name": vendor_name, "updated_by": user_id}}
            )
        else:
            # Create new mapping
            await vendors_collection.insert_one({
                "_id": f"{gstin}",
                "name": vendor_name,
                "gstin": gstin,
                "state": extract_state_from_gstin(gstin),
                "created_by": user_id
            })
    
    async def get_vendor_history(self, gstin: str, user_id: str) -> List[Dict]:
        """Get transaction history with a vendor"""
        bills_collection = get_collection("bills")
        
        bills = await bills_collection.find({
            "user_id": user_id,
            "extracted_data.vendor_gstin": gstin
        }).sort("created_at", -1).limit(20).to_list(length=20)
        
        return [
            {
                "invoice_number": bill.get("extracted_data", {}).get("invoice_number"),
                "date": bill.get("extracted_data", {}).get("invoice_date"),
                "amount": bill.get("extracted_data", {}).get("grand_total"),
                "status": bill.get("status")
            }
            for bill in bills
        ]
