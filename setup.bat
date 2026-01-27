@echo off
echo ========================================
echo WUC Admission Portal - Setup Script
echo ========================================
echo.

echo [1/4] Installing Backend Dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Backend installation failed!
    pause
    exit /b 1
)
echo Backend dependencies installed successfully!
echo.

echo [2/4] Installing Frontend Dependencies...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Frontend installation failed!
    pause
    exit /b 1
)
echo Frontend dependencies installed successfully!
echo.

echo [3/4] Creating necessary directories...
cd ..\backend
if not exist "uploads\documents" mkdir uploads\documents
echo Directories created successfully!
echo.

echo [4/4] Setup Complete!
echo.
echo ========================================
echo Next Steps:
echo ========================================
echo 1. Configure backend/.env file with your credentials
echo 2. Create PostgreSQL database: createdb wuc_admissions
echo 3. Run database schema: psql -d wuc_admissions -f database/schema.sql
echo 4. Start backend: cd backend && npm start
echo 5. Start frontend: cd frontend && npm start
echo.
echo For detailed instructions, see QUICKSTART.md
echo ========================================
echo.
pause
