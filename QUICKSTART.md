# WUC Admission Portal - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend (in new terminal)
cd frontend
npm install
```

### Step 2: Setup Database

```bash
# Create PostgreSQL database
createdb wuc_admissions

# Run schema
psql -d wuc_admissions -f database/schema.sql
```

### Step 3: Configure Environment

```bash
# Backend - Copy and edit .env file
cd backend
cp .env.example .env
# Edit .env with your database credentials
```

### Step 4: Start Services

```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm start
```

### Step 5: Access Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## 📋 Default Admin Credentials

- **Username**: admin
- **Email**: admin@wuc.edu.gh
- **Password**: Admin@123 (Change immediately!)

## 🧪 Test the System

1. **Purchase Voucher**: Go to http://localhost:3000/purchase-voucher
2. **Apply**: Use voucher code to fill application
3. **Check Status**: Track application status
4. **Admin**: Access admin dashboard at /admin

## 🔧 Troubleshooting

### Database Connection Error
```bash
# Check PostgreSQL is running
pg_isready

# Verify credentials in .env file
```

### Port Already in Use
```bash
# Change PORT in backend/.env
PORT=5001
```

### Frontend Build Error
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

## 📞 Need Help?

- Check README.md for detailed documentation
- Email: admissions@wuc.edu.gh
- Website: https://www.wuc.edu.gh

## 🎯 Next Steps

1. Configure payment gateway (Flutterwave)
2. Set up email service (Gmail/AWS SES)
3. Configure SMS service (HubTel)
4. Customize branding and colors
5. Deploy to production

## 🔐 Security Checklist

- [ ] Change default admin password
- [ ] Generate strong JWT secrets
- [ ] Enable HTTPS in production
- [ ] Configure CORS properly
- [ ] Set up database backups
- [ ] Enable rate limiting
- [ ] Configure file upload limits

## 📦 Production Deployment

See `deployment/` folder for:
- Nginx configuration
- PM2 setup
- Docker configuration
- AWS deployment guide

---

**Withrow University College © 2024**
Reference: https://www.wuc.edu.gh
