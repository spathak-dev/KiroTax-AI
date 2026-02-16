from typing import List, Optional, Dict, Any
from datetime import datetime
import uuid
from models.template import (
    TemplateCreate, TemplateUpdate, TemplateResponse, 
    TemplateStatus, TemplateRating, TemplatePurchase
)
try:
    from database import get_collection
except:
    from database_mock import get_collection

class TemplateMarketplaceService:
    """Service for managing template marketplace operations"""
    
    def __init__(self):
        self.templates_collection = get_collection("templates")
        self.purchases_collection = get_collection("template_purchases")
        self.ratings_collection = get_collection("template_ratings")
    
    async def create_template(self, template_data: TemplateCreate, creator_id: str, creator_name: str) -> str:
        """Create a new template and submit for review"""
        template_dict = {
            "_id": str(uuid.uuid4()),
            **template_data.dict(),
            "status": TemplateStatus.PENDING_REVIEW,
            "creator_id": creator_id,
            "creator_name": creator_name,
            "rating": 0.0,
            "download_count": 0,
            "usage_count": 0,
            "accuracy_score": 0.0,
            "version": "1.0.0",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "is_featured": False
        }
        
        await self.templates_collection.insert_one(template_dict)
        return template_dict["_id"]
    
    async def approve_template(self, template_id: str, admin_id: str) -> bool:
        """Approve a template for publication"""
        result = await self.templates_collection.update_one(
            {"_id": template_id},
            {
                "$set": {
                    "status": TemplateStatus.PUBLISHED,
                    "approved_by": admin_id,
                    "approved_at": datetime.utcnow()
                }
            }
        )
        return result.modified_count > 0
    
    async def search_templates(
        self, 
        query: Optional[str] = None,
        category: Optional[str] = None,
        price_filter: Optional[str] = None,
        min_rating: Optional[float] = None,
        page: int = 1,
        page_size: int = 20
    ) -> List[TemplateResponse]:
        """Search and filter templates in marketplace"""
        filter_dict = {"status": TemplateStatus.PUBLISHED}
        
        if query:
            filter_dict["$or"] = [
                {"name": {"$regex": query, "$options": "i"}},
                {"description": {"$regex": query, "$options": "i"}},
                {"vendor_name": {"$regex": query, "$options": "i"}}
            ]
        
        if category:
            filter_dict["category"] = category
        
        if price_filter == "free":
            filter_dict["price"] = 0
        elif price_filter == "premium":
            filter_dict["price"] = {"$gt": 0}
        
        if min_rating:
            filter_dict["rating"] = {"$gte": min_rating}
        
        skip = (page - 1) * page_size
        cursor = self.templates_collection.find(filter_dict).sort("download_count", -1).skip(skip).limit(page_size)
        
        templates = []
        async for template in cursor:
            templates.append(TemplateResponse(**template))
        
        return templates
    
    async def purchase_template(self, purchase: TemplatePurchase, user_id: str) -> Dict[str, Any]:
        """Process template purchase"""
        template = await self.templates_collection.find_one({"_id": purchase.template_id})
        
        if not template:
            raise ValueError("Template not found")
        
        if template["price"] == 0:
            # Free template - just record download
            await self.templates_collection.update_one(
                {"_id": purchase.template_id},
                {"$inc": {"download_count": 1}}
            )
            return {"success": True, "amount": 0}
        
        # Record purchase
        purchase_record = {
            "_id": str(uuid.uuid4()),
            "template_id": purchase.template_id,
            "user_id": user_id,
            "amount": template["price"],
            "creator_earnings": template["price"] * 0.8,
            "platform_fee": template["price"] * 0.2,
            "payment_method": purchase.payment_method,
            "transaction_id": purchase.transaction_id,
            "purchased_at": datetime.utcnow()
        }
        
        await self.purchases_collection.insert_one(purchase_record)
        
        # Update download count
        await self.templates_collection.update_one(
            {"_id": purchase.template_id},
            {"$inc": {"download_count": 1}}
        )
        
        return {"success": True, "amount": template["price"], "purchase_id": purchase_record["_id"]}
    
    async def rate_template(self, rating: TemplateRating, user_id: str) -> bool:
        """Submit rating and review for a template"""
        # Check if user already rated
        existing = await self.ratings_collection.find_one({
            "template_id": rating.template_id,
            "user_id": user_id
        })
        
        if existing:
            # Update existing rating
            await self.ratings_collection.update_one(
                {"_id": existing["_id"]},
                {"$set": {"rating": rating.rating, "review": rating.review, "updated_at": datetime.utcnow()}}
            )
        else:
            # Create new rating
            rating_record = {
                "_id": str(uuid.uuid4()),
                "template_id": rating.template_id,
                "user_id": user_id,
                "rating": rating.rating,
                "review": rating.review,
                "created_at": datetime.utcnow()
            }
            await self.ratings_collection.insert_one(rating_record)
        
        # Recalculate average rating
        pipeline = [
            {"$match": {"template_id": rating.template_id}},
            {"$group": {"_id": None, "avg_rating": {"$avg": "$rating"}, "count": {"$sum": 1}}}
        ]
        
        result = await self.ratings_collection.aggregate(pipeline).to_list(1)
        
        if result:
            await self.templates_collection.update_one(
                {"_id": rating.template_id},
                {"$set": {"rating": round(result[0]["avg_rating"], 2)}}
            )
        
        return True
    
    async def get_creator_earnings(self, creator_id: str) -> Dict[str, Any]:
        """Get earnings summary for template creator"""
        pipeline = [
            {"$match": {"creator_id": creator_id}},
            {"$lookup": {
                "from": "template_purchases",
                "localField": "_id",
                "foreignField": "template_id",
                "as": "purchases"
            }},
            {"$unwind": {"path": "$purchases", "preserveNullAndEmptyArrays": True}},
            {"$group": {
                "_id": None,
                "total_earnings": {"$sum": "$purchases.creator_earnings"},
                "total_sales": {"$sum": 1},
                "total_downloads": {"$sum": "$download_count"}
            }}
        ]
        
        result = await self.templates_collection.aggregate(pipeline).to_list(1)
        
        if result:
            return result[0]
        
        return {"total_earnings": 0, "total_sales": 0, "total_downloads": 0}
