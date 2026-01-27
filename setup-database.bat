@echo off
echo ========================================
echo WUC Admission Portal - Database Setup
echo ========================================
echo.

REM Set PostgreSQL path
set PGPATH=C:\Program Files\PostgreSQL\18\bin
set PATH=%PGPATH%;%PATH%

echo Checking PostgreSQL installation...
"%PGPATH%\psql.exe" --version
if %errorlevel% neq 0 (
    echo ERROR: PostgreSQL not found!
    echo Please install PostgreSQL from: https://www.postgresql.org/download/windows/
    pause
    exit /b 1
)
echo.

echo Creating database 'wuc_admissions'...
"%PGPATH%\createdb.exe" -U postgres wuc_admissions
if %errorlevel% neq 0 (
    echo Note: Database may already exist or credentials needed
)
echo.

echo Running database schema...
"%PGPATH%\psql.exe" -U postgres -d wuc_admissions -f database\schema.sql
if %errorlevel% neq 0 (
    echo ERROR: Failed to run schema!
    pause
    exit /b 1
)
echo.

echo ========================================
echo Database setup complete!
echo ========================================
echo.
echo Database: wuc_admissions
echo Tables created: 7
echo - vouchers
echo - applications
echo - documents
echo - payments
echo - admin_users
echo - notifications
echo - audit_logs
echo.
echo Default admin user created:
echo Username: admin
echo Email: admin@wuc.edu.gh
echo Password: Admin@123
echo.
echo Next: Configure backend/.env file
echo ========================================
pause
