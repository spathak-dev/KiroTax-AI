#!/bin/bash

echo "🚀 Starting KiroTax AI Backend..."

# Create virtual environment if it doesn't exist
if [ ! -d "backend/venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv backend/venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source backend/venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install --upgrade pip
pip install -r backend/requirements-dev.txt

# Create storage directory
mkdir -p backend/storage

# Start the server
echo "✅ Starting FastAPI server on http://localhost:8000"
cd backend && uvicorn main:app --reload --host 0.0.0.0 --port 8000
