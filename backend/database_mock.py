"""Mock database for demo without MongoDB"""
from typing import Dict, List, Optional
import json
import os

class MockCollection:
    def __init__(self, name: str):
        self.name = name
        self.data: Dict[str, dict] = {}
        self.data_file = f"./storage/{name}.json"
        self._load_data()
    
    def _load_data(self):
        """Load data from file"""
        if os.path.exists(self.data_file):
            try:
                with open(self.data_file, 'r') as f:
                    self.data = json.load(f)
            except:
                self.data = {}
    
    def _save_data(self):
        """Save data to file"""
        os.makedirs(os.path.dirname(self.data_file), exist_ok=True)
        with open(self.data_file, 'w') as f:
            json.dump(self.data, f, default=str)
    
    async def find_one(self, query: dict) -> Optional[dict]:
        """Find one document"""
        for doc_id, doc in self.data.items():
            match = True
            for key, value in query.items():
                if key == "_id":
                    if doc_id != value:
                        match = False
                        break
                elif doc.get(key) != value:
                    match = False
                    break
            if match:
                return {**doc, "_id": doc_id}
        return None
    
    async def insert_one(self, document: dict):
        """Insert one document"""
        doc_id = document.get("_id")
        if not doc_id:
            import uuid
            doc_id = str(uuid.uuid4())
        
        doc_copy = {k: v for k, v in document.items() if k != "_id"}
        self.data[doc_id] = doc_copy
        self._save_data()
        return type('Result', (), {'inserted_id': doc_id})()
    
    async def update_one(self, query: dict, update: dict):
        """Update one document"""
        doc = await self.find_one(query)
        if doc:
            doc_id = doc["_id"]
            if "$set" in update:
                self.data[doc_id].update(update["$set"])
            if "$inc" in update:
                for key, value in update["$inc"].items():
                    self.data[doc_id][key] = self.data[doc_id].get(key, 0) + value
            self._save_data()
        return type('Result', (), {'modified_count': 1 if doc else 0})()
    
    async def delete_one(self, query: dict):
        """Delete one document"""
        doc = await self.find_one(query)
        if doc:
            del self.data[doc["_id"]]
            self._save_data()
        return type('Result', (), {'deleted_count': 1 if doc else 0})()
    
    def find(self, query: dict = None):
        """Find multiple documents"""
        return MockCursor(self.data, query or {})

class MockCursor:
    def __init__(self, data: Dict, query: dict):
        self.data = data
        self.query = query
        self.skip_count = 0
        self.limit_count = None
        self.sort_field = None
        self.sort_order = 1
    
    def skip(self, count: int):
        self.skip_count = count
        return self
    
    def limit(self, count: int):
        self.limit_count = count
        return self
    
    def sort(self, field: str, order: int = 1):
        self.sort_field = field
        self.sort_order = order
        return self
    
    async def to_list(self, length: int = None):
        """Convert to list"""
        results = []
        for doc_id, doc in self.data.items():
            match = True
            for key, value in self.query.items():
                if key == "_id":
                    if doc_id != value:
                        match = False
                        break
                elif doc.get(key) != value:
                    match = False
                    break
            if match:
                results.append({**doc, "_id": doc_id})
        
        # Apply skip and limit
        if self.skip_count:
            results = results[self.skip_count:]
        if self.limit_count:
            results = results[:self.limit_count]
        
        return results

class MockDatabase:
    def __init__(self):
        self.collections = {}
    
    def __getitem__(self, name: str):
        if name not in self.collections:
            self.collections[name] = MockCollection(name)
        return self.collections[name]

# Mock database instance
mock_db = MockDatabase()

def get_collection(name: str):
    """Get collection from mock database"""
    return mock_db[name]

async def connect_to_mongo():
    """Mock connect"""
    print("📦 Using mock database (no MongoDB required)")

async def close_mongo_connection():
    """Mock close"""
    pass

def get_database():
    """Get mock database"""
    return mock_db
