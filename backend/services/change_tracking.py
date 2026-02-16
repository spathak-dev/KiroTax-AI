from typing import List, Dict, Any, Optional
from datetime import datetime
import uuid
from models.change_tracking import (
    ChangeEvent, BillVersion, ChangeLogQuery, 
    RevertRequest, BillLockRequest, ChangeStatus
)
try:
    from database import get_collection
except:
    from database_mock import get_collection

class ChangeTrackingService:
    """Service for tracking all changes to bill data"""
    
    def __init__(self):
        self.changes_collection = get_collection("changes")
        self.versions_collection = get_collection("bill_versions")
        self.bills_collection = get_collection("bills")
    
    async def record_change(
        self,
        bill_id: str,
        field_name: str,
        old_value: Any,
        new_value: Any,
        user_id: str,
        user_name: str,
        change_note: Optional[str] = None,
        requires_approval: bool = False
    ) -> str:
        """Record a change event"""
        
        change_event = {
            "_id": str(uuid.uuid4()),
            "bill_id": bill_id,
            "field_name": field_name,
            "old_value": old_value,
            "new_value": new_value,
            "user_id": user_id,
            "user_name": user_name,
            "timestamp": datetime.utcnow(),
            "change_note": change_note,
            "status": ChangeStatus.PENDING_APPROVAL if requires_approval else ChangeStatus.APPLIED
        }
        
        await self.changes_collection.insert_one(change_event)
        
        return change_event["_id"]
    
    async def create_version_snapshot(
        self,
        bill_id: str,
        bill_data: Dict[str, Any],
        user_id: str,
        change_note: Optional[str] = None
    ) -> str:
        """Create a version snapshot of bill data"""
        
        # Get current version number
        last_version = await self.versions_collection.find_one(
            {"bill_id": bill_id},
            sort=[("created_at", -1)]
        )
        
        if last_version:
            # Increment version
            major, minor = map(int, last_version["version_number"].split("."))
            version_number = f"{major}.{minor + 1}"
        else:
            version_number = "1.0"
        
        version = {
            "_id": str(uuid.uuid4()),
            "version_number": version_number,
            "bill_id": bill_id,
            "data": bill_data,
            "created_by": user_id,
            "created_at": datetime.utcnow(),
            "change_note": change_note
        }
        
        await self.versions_collection.insert_one(version)
        
        return version_number
    
    async def get_change_history(
        self,
        query: ChangeLogQuery
    ) -> List[ChangeEvent]:
        """Get change history with filtering"""
        
        filter_dict = {}
        
        if query.bill_id:
            filter_dict["bill_id"] = query.bill_id
        
        if query.user_id:
            filter_dict["user_id"] = query.user_id
        
        if query.field_name:
            filter_dict["field_name"] = query.field_name
        
        if query.start_date or query.end_date:
            filter_dict["timestamp"] = {}
            if query.start_date:
                filter_dict["timestamp"]["$gte"] = query.start_date
            if query.end_date:
                filter_dict["timestamp"]["$lte"] = query.end_date
        
        skip = (query.page - 1) * query.page_size
        
        cursor = self.changes_collection.find(filter_dict).sort("timestamp", -1).skip(skip).limit(query.page_size)
        
        changes = []
        async for change in cursor:
            changes.append(ChangeEvent(**change))
        
        return changes
    
    async def revert_to_version(
        self,
        revert_request: RevertRequest,
        user_id: str,
        user_name: str
    ) -> bool:
        """Revert bill to a previous version"""
        
        # Get target version
        version = await self.versions_collection.find_one({
            "bill_id": revert_request.bill_id,
            "version_number": revert_request.target_version
        })
        
        if not version:
            raise ValueError("Version not found")
        
        # Get current bill data
        current_bill = await self.bills_collection.find_one({"_id": revert_request.bill_id})
        
        if not current_bill:
            raise ValueError("Bill not found")
        
        # Create snapshot of current state before reverting
        await self.create_version_snapshot(
            revert_request.bill_id,
            current_bill,
            user_id,
            f"Before revert to {revert_request.target_version}"
        )
        
        # Update bill with version data
        await self.bills_collection.update_one(
            {"_id": revert_request.bill_id},
            {"$set": version["data"]}
        )
        
        # Record revert event
        await self.record_change(
            bill_id=revert_request.bill_id,
            field_name="__revert__",
            old_value=current_bill.get("version", "unknown"),
            new_value=revert_request.target_version,
            user_id=user_id,
            user_name=user_name,
            change_note=revert_request.reason
        )
        
        return True
    
    async def lock_bill(
        self,
        lock_request: BillLockRequest,
        user_id: str
    ) -> bool:
        """Lock or unlock a bill"""
        
        update_data = {
            "is_locked": lock_request.lock,
            "locked_by": user_id if lock_request.lock else None,
            "locked_at": datetime.utcnow() if lock_request.lock else None,
            "lock_reason": lock_request.reason if lock_request.lock else None
        }
        
        result = await self.bills_collection.update_one(
            {"_id": lock_request.bill_id},
            {"$set": update_data}
        )
        
        # Record lock/unlock event
        await self.record_change(
            bill_id=lock_request.bill_id,
            field_name="__lock__",
            old_value=not lock_request.lock,
            new_value=lock_request.lock,
            user_id=user_id,
            user_name="",
            change_note=lock_request.reason
        )
        
        return result.modified_count > 0
    
    async def detect_suspicious_activity(
        self,
        user_id: str,
        time_window_hours: int = 1
    ) -> Dict[str, Any]:
        """Detect suspicious change patterns"""
        
        from datetime import timedelta
        
        start_time = datetime.utcnow() - timedelta(hours=time_window_hours)
        
        # Count changes by user in time window
        pipeline = [
            {
                "$match": {
                    "user_id": user_id,
                    "timestamp": {"$gte": start_time}
                }
            },
            {
                "$group": {
                    "_id": "$bill_id",
                    "change_count": {"$sum": 1}
                }
            }
        ]
        
        results = await self.changes_collection.aggregate(pipeline).to_list(None)
        
        suspicious_bills = [r for r in results if r["change_count"] > 50]
        
        return {
            "is_suspicious": len(suspicious_bills) > 0,
            "suspicious_bills": suspicious_bills,
            "total_changes": sum(r["change_count"] for r in results)
        }
