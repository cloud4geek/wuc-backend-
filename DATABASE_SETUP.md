# Database Setup Instructions

## Option 1: Using pgAdmin (GUI - Easiest)

1. **Open pgAdmin** (installed with PostgreSQL)

2. **Connect to PostgreSQL server**
   - Right-click "Servers" → Connect
   - Enter your postgres password

3. **Create Database**
   - Right-click "Databases" → Create → Database
   - Name: `wuc_admissions`
   - Owner: `postgres`
   - Click "Save"

4. **Run Schema**
   - Right-click `wuc_admissions` database → Query Tool
   - Open file: `database/schema.sql`
   - Click "Execute" (F5)
   - You should see "Query returned successfully"

5. **Verify Tables**
   - Expand `wuc_admissions` → Schemas → public → Tables
   - You should see 7 tables:
     - vouchers
     - applications
     - documents
     - payments
     - admin_users
     - notifications
     - audit_logs

## Option 2: Using Command Line

### Step 1: Add PostgreSQL to PATH
```cmd
set PATH=%PATH%;C:\Program Files\PostgreSQL\18\bin
```

### Step 2: Create Database
```cmd
createdb -U postgres wuc_admissions
```
Enter your postgres password when prompted.

### Step 3: Run Schema
```cmd
psql -U postgres -d wuc_admissions -f database\schema.sql
```
Enter your postgres password when prompted.

### Step 4: Verify
```cmd
psql -U postgres -d wuc_admissions -c "\dt"
```

## Option 3: Using Setup Script

Simply run:
```cmd
setup-database.bat
```

## Default Admin Credentials

After setup, you can login with:
- **Username:** admin
- **Email:** admin@wuc.edu.gh
- **Password:** Admin@123

⚠️ Change this password in production!

## Troubleshooting

### "psql: command not found"
- PostgreSQL is not in PATH
- Add manually: `C:\Program Files\PostgreSQL\18\bin`

### "password authentication failed"
- Use the password you set during PostgreSQL installation
- Default user is `postgres`

### "database already exists"
- Database was already created
- Just run the schema: `psql -U postgres -d wuc_admissions -f database\schema.sql`

### "permission denied"
- Run Command Prompt as Administrator
- Or use pgAdmin instead

## Next Steps

After database setup:
1. Configure `backend/.env` with database credentials
2. Start backend: `cd backend && npm start`
3. Start frontend: `cd frontend && npm start`

## Database Connection String

For backend/.env:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=wuc_admissions
DB_USER=postgres
DB_PASSWORD=your_postgres_password
```
