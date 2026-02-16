@echo off
echo ========================================
echo KiroTax AI - Starting All Services
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    pause
    exit /b 1
)

REM Check if .NET is installed
dotnet --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: .NET SDK is not installed or not in PATH
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    pause
    exit /b 1
)

echo All prerequisites found!
echo.

REM Start Python Backend
echo [1/3] Starting Python FastAPI Backend (Port 8000)...
start "Python Backend" cmd /k "cd backend && python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000"
timeout /t 3 >nul

REM Start .NET Admin Dashboard
echo [2/3] Starting .NET Admin Dashboard (Port 5001)...
start ".NET Admin" cmd /k "cd backend\microservices\admin && dotnet run"
timeout /t 3 >nul

REM Start Next.js Frontend (if exists)
if exist "frontend" (
    echo [3/3] Starting Next.js Frontend (Port 3000)...
    start "Next.js Frontend" cmd /k "cd frontend && npm run dev"
) else (
    echo [3/3] Next.js frontend directory not found, skipping...
)

echo.
echo ========================================
echo All services are starting!
echo ========================================
echo.
echo Services:
echo   - Python Backend:  http://localhost:8000
echo   - Python API Docs: http://localhost:8000/docs
echo   - Admin Dashboard: https://localhost:5001
echo   - Admin API:       https://localhost:5001/api
echo   - Admin Swagger:   https://localhost:5001/swagger
echo   - Next.js Frontend: http://localhost:3000 (if available)
echo.
echo Press any key to stop all services...
pause >nul

REM Kill all services
taskkill /FI "WindowTitle eq Python Backend*" /F >nul 2>&1
taskkill /FI "WindowTitle eq .NET Admin*" /F >nul 2>&1
taskkill /FI "WindowTitle eq Next.js Frontend*" /F >nul 2>&1

echo All services stopped.
