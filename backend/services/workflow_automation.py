from typing import List, Dict, Any, Optional
from datetime import datetime, timedelta
import uuid
from models.workflow import (
    Task, WorkflowTemplate, BulkApprovalRequest,
    TaskDelegation, TaskPriority, TaskStatus, WorkflowTrigger
)
try:
    from database import get_collection
except:
    from database_mock import get_collection

class WorkflowAutomationService:
    """Service for CA workflow automation"""
    
    def __init__(self):
        self.tasks_collection = get_collection("tasks")
        self.workflows_collection = get_collection("workflows")
        self.bills_collection = get_collection("bills")
        self.users_collection = get_collection("users")
    
    async def auto_assign_bill(
        self,
        bill_id: str,
        client_org_id: str
    ) -> str:
        """Automatically assign bill to designated CA"""
        
        # Find CA assigned to this client organization
        ca_user = await self.users_collection.find_one({
            "role": "ca",
            "assigned_organizations": client_org_id,
            "is_active": True
        })
        
        if not ca_user:
            # Fallback: assign to least loaded CA
            ca_user = await self._find_least_loaded_ca()
        
        if not ca_user:
            raise ValueError("No available CA found")
        
        # Create task
        task = await self.create_task(
            title=f"Review Bill {bill_id}",
            description="Review and approve uploaded bill",
            bill_id=bill_id,
            assignee_id=ca_user["_id"],
            assignee_name=ca_user["name"],
            priority=TaskPriority.NORMAL,
            sla_hours=24
        )
        
        return task
    
    async def _find_least_loaded_ca(self) -> Optional[Dict[str, Any]]:
        """Find CA with least workload"""
        
        pipeline = [
            {"$match": {"role": "ca", "is_active": True}},
            {
                "$lookup": {
                    "from": "tasks",
                    "let": {"user_id": "$_id"},
                    "pipeline": [
                        {
                            "$match": {
                                "$expr": {
                                    "$and": [
                                        {"$eq": ["$assignee_id", "$$user_id"]},
                                        {"$eq": ["$status", TaskStatus.PENDING]}
                                    ]
                                }
                            }
                        }
                    ],
                    "as": "pending_tasks"
                }
            },
            {
                "$addFields": {
                    "task_count": {"$size": "$pending_tasks"}
                }
            },
            {"$sort": {"task_count": 1}},
            {"$limit": 1}
        ]
        
        result = await self.users_collection.aggregate(pipeline).to_list(1)
        
        return result[0] if result else None
    
    async def create_task(
        self,
        title: str,
        description: str,
        assignee_id: str,
        assignee_name: str,
        priority: TaskPriority,
        sla_hours: int,
        bill_id: Optional[str] = None
    ) -> str:
        """Create a new task"""
        
        due_date = datetime.utcnow() + timedelta(hours=sla_hours)
        
        task = {
            "_id": str(uuid.uuid4()),
            "title": title,
            "description": description,
            "bill_id": bill_id,
            "assignee_id": assignee_id,
            "assignee_name": assignee_name,
            "priority": priority,
            "status": TaskStatus.PENDING,
            "due_date": due_date,
            "created_at": datetime.utcnow(),
            "completed_at": None,
            "sla_hours": sla_hours,
            "delegation_history": []
        }
        
        await self.tasks_collection.insert_one(task)
        
        return task["_id"]
    
    async def get_task_queue(
        self,
        user_id: str,
        page: int = 1,
        page_size: int = 50
    ) -> List[Task]:
        """Get prioritized task queue for user"""
        
        # Priority order: urgent > high > normal > low
        # Within priority: overdue first, then by due date
        
        now = datetime.utcnow()
        
        pipeline = [
            {
                "$match": {
                    "assignee_id": user_id,
                    "status": {"$in": [TaskStatus.PENDING, TaskStatus.IN_PROGRESS]}
                }
            },
            {
                "$addFields": {
                    "is_overdue": {"$lt": ["$due_date", now]},
                    "priority_order": {
                        "$switch": {
                            "branches": [
                                {"case": {"$eq": ["$priority", TaskPriority.URGENT]}, "then": 1},
                                {"case": {"$eq": ["$priority", TaskPriority.HIGH]}, "then": 2},
                                {"case": {"$eq": ["$priority", TaskPriority.NORMAL]}, "then": 3},
                                {"case": {"$eq": ["$priority", TaskPriority.LOW]}, "then": 4}
                            ],
                            "default": 5
                        }
                    }
                }
            },
            {"$sort": {"is_overdue": -1, "priority_order": 1, "due_date": 1}},
            {"$skip": (page - 1) * page_size},
            {"$limit": page_size}
        ]
        
        cursor = self.tasks_collection.aggregate(pipeline)
        
        tasks = []
        async for task in cursor:
            tasks.append(Task(**task))
        
        return tasks
    
    async def bulk_approve_bills(
        self,
        request: BulkApprovalRequest,
        user_id: str,
        user_name: str
    ) -> Dict[str, Any]:
        """Approve or reject multiple bills"""
        
        results = {"success": [], "failed": []}
        
        for bill_id in request.bill_ids:
            try:
                # Update bill status
                await self.bills_collection.update_one(
                    {"_id": bill_id},
                    {
                        "$set": {
                            "status": "approved" if request.action == "approve" else "rejected",
                            "reviewed_by": user_id,
                            "reviewed_at": datetime.utcnow(),
                            "review_comment": request.comment
                        }
                    }
                )
                
                # Complete associated task
                await self.tasks_collection.update_one(
                    {"bill_id": bill_id, "assignee_id": user_id},
                    {
                        "$set": {
                            "status": TaskStatus.COMPLETED,
                            "completed_at": datetime.utcnow()
                        }
                    }
                )
                
                results["success"].append(bill_id)
                
            except Exception as e:
                results["failed"].append({"bill_id": bill_id, "error": str(e)})
        
        return results
    
    async def delegate_task(
        self,
        delegation: TaskDelegation,
        delegator_id: str
    ) -> bool:
        """Delegate task to another user"""
        
        # Get new assignee info
        new_assignee = await self.users_collection.find_one({"_id": delegation.new_assignee_id})
        
        if not new_assignee:
            raise ValueError("New assignee not found")
        
        # Update task
        result = await self.tasks_collection.update_one(
            {"_id": delegation.task_id},
            {
                "$set": {
                    "assignee_id": delegation.new_assignee_id,
                    "assignee_name": new_assignee["name"]
                },
                "$push": {
                    "delegation_history": {
                        "from_user_id": delegator_id,
                        "to_user_id": delegation.new_assignee_id,
                        "reason": delegation.reason,
                        "delegated_at": datetime.utcnow()
                    }
                }
            }
        )
        
        return result.modified_count > 0
    
    async def check_sla_violations(self) -> List[Dict[str, Any]]:
        """Check for tasks exceeding SLA"""
        
        now = datetime.utcnow()
        
        overdue_tasks = await self.tasks_collection.find({
            "status": {"$in": [TaskStatus.PENDING, TaskStatus.IN_PROGRESS]},
            "due_date": {"$lt": now}
        }).to_list(None)
        
        return overdue_tasks
    
    async def get_productivity_stats(
        self,
        user_id: str,
        days: int = 30
    ) -> Dict[str, Any]:
        """Get productivity statistics for user"""
        
        start_date = datetime.utcnow() - timedelta(days=days)
        
        pipeline = [
            {
                "$match": {
                    "assignee_id": user_id,
                    "completed_at": {"$gte": start_date}
                }
            },
            {
                "$group": {
                    "_id": None,
                    "total_completed": {"$sum": 1},
                    "avg_completion_time": {
                        "$avg": {
                            "$subtract": ["$completed_at", "$created_at"]
                        }
                    }
                }
            }
        ]
        
        result = await self.tasks_collection.aggregate(pipeline).to_list(1)
        
        if result:
            stats = result[0]
            # Convert milliseconds to hours
            stats["avg_completion_time_hours"] = stats["avg_completion_time"] / (1000 * 60 * 60)
            return stats
        
        return {"total_completed": 0, "avg_completion_time_hours": 0}
