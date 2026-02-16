#!/bin/bash

echo "========================================"
echo "KiroTax AI - Starting All Services"
echo "========================================"
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python is not installed or not in PATH"
    exit 1
fi

# Check if .NET is installed
if ! command -v dotnet &> /dev/null; then
    echo "ERROR: .NET SDK is not installed or not in PATH"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed or not in PATH"
    exit 1
fi

echo "All prerequisites found!"
echo ""

# Start Python Backend
echo "[1/3] Starting Python FastAPI Backend (Port 8000)..."
cd backend
python3 -m uvicorn main:app --reload --host 0.0.0.0 --port 8000 &
PYTHON_PID=$!
cd ..
sleep 2

# Start .NET Admin Dashboard
echo "[2/3] Starting .NET Admin Dashboard (Port 5001)..."
cd backend/microservices/admin
dotnet run &
DOTNET_PID=$!
cd ../../..
sleep 2

# Start Next.js Frontend (if exists)
if [ -d "frontend" ]; then
    echo "[3/3] Starting Next.js Frontend (Port 3000)..."
    cd frontend
    npm run dev &
    NEXTJS_PID=$!
    cd ..
else
    echo "[3/3] Next.js frontend directory not found, skipping..."
    NEXTJS_PID=""
fi

echo ""
echo "========================================"
echo "All services are running!"
echo "========================================"
echo ""
echo "Services:"
echo "  - Python Backend:   http://localhost:8000"
echo "  - Python API Docs:  http://localhost:8000/docs"
echo "  - Admin Dashboard:  https://localhost:5001"
echo "  - Admin API:        https://localhost:5001/api"
echo "  - Admin Swagger:    https://localhost:5001/swagger"
if [ -n "$NEXTJS_PID" ]; then
    echo "  - Next.js Frontend: http://localhost:3000"
fi
echo ""
echo "Press Ctrl+C to stop all services..."

# Trap Ctrl+C and cleanup
trap cleanup INT

cleanup() {
    echo ""
    echo "Stopping all services..."
    kill $PYTHON_PID 2>/dev/null
    kill $DOTNET_PID 2>/dev/null
    if [ -n "$NEXTJS_PID" ]; then
        kill $NEXTJS_PID 2>/dev/null
    fi
    echo "All services stopped."
    exit 0
}

# Wait indefinitely
wait
