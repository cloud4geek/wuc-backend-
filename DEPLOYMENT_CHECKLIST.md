# WUC Admission Portal - Deployment Checklist

## Pre-Deployment Checklist

### 🔐 Security
- [ ] Generate strong JWT secrets (min 32 characters)
- [ ] Change default admin password
- [ ] Set up HTTPS/SSL certificates
- [ ] Configure CORS for production domain
- [ ] Enable rate limiting
- [ ] Set secure cookie settings
- [ ] Review and restrict file upload sizes
- [ ] Enable Helmet.js security headers
- [ ] Set up firewall rules
- [ ] Configure environment variables securely

### 💾 Database
- [ ] Create production PostgreSQL database
- [ ] Run database schema (schema.sql)
- [ ] Set up database backups (daily)
- [ ] Configure connection pooling
- [ ] Set up database monitoring
- [ ] Create database indexes
- [ ] Test database performance
- [ ] Set up read replicas (optional)

### 📧 Email Service
- [ ] Choose email provider (AWS SES, Gmail, SendGrid)
- [ ] Configure SMTP settings
- [ ] Verify sender domain
- [ ] Test email delivery
- [ ] Set up email templates
- [ ] Configure bounce handling
- [ ] Set up email monitoring

### 📱 SMS Service
- [ ] Create HubTel account
- [ ] Get API credentials
- [ ] Configure sender ID (WUC-ADM)
- [ ] Test SMS delivery
- [ ] Set up SMS monitoring
- [ ] Configure SMS templates

### 💳 Payment Gateway
- [ ] Create Flutterwave account
- [ ] Get production API keys
- [ ] Configure webhook URL
- [ ] Test MTN Mobile Money
- [ ] Test Telecel Cash
- [ ] Test Visa/Mastercard
- [ ] Set up payment monitoring
- [ ] Configure payment notifications

### 🌐 Frontend Deployment
- [ ] Build production bundle (`npm run build`)
- [ ] Choose hosting (Vercel, Netlify, AWS Amplify)
- [ ] Configure custom domain
- [ ] Set up SSL certificate
- [ ] Configure environment variables
- [ ] Test all pages and routes
- [ ] Set up CDN (optional)
- [ ] Configure caching

### 🖥️ Backend Deployment
- [ ] Choose hosting (AWS EC2, Heroku, DigitalOcean)
- [ ] Set up Node.js environment
- [ ] Install dependencies
- [ ] Configure environment variables
- [ ] Set up process manager (PM2)
- [ ] Configure reverse proxy (Nginx)
- [ ] Set up SSL certificate
- [ ] Configure logging
- [ ] Set up monitoring

### 📁 File Storage
- [ ] Choose storage (AWS S3, local, DigitalOcean Spaces)
- [ ] Configure upload directory
- [ ] Set up file permissions
- [ ] Configure backup strategy
- [ ] Test file uploads
- [ ] Set up CDN for files (optional)

### 🔍 Monitoring & Logging
- [ ] Set up error tracking (Sentry, Rollbar)
- [ ] Configure application logging
- [ ] Set up uptime monitoring
- [ ] Configure performance monitoring
- [ ] Set up database monitoring
- [ ] Configure alert notifications
- [ ] Set up log aggregation

### 🧪 Testing
- [ ] Test voucher purchase flow
- [ ] Test all payment methods
- [ ] Test application submission
- [ ] Test document uploads
- [ ] Test email notifications
- [ ] Test SMS notifications
- [ ] Test admin dashboard
- [ ] Test admission letter generation
- [ ] Test voucher resend feature
- [ ] Load testing
- [ ] Security testing
- [ ] Mobile responsiveness testing

---

## Deployment Steps

### Step 1: Database Setup
```bash
# Create database
createdb wuc_admissions_prod

# Run schema
psql -d wuc_admissions_prod -f database/schema.sql

# Verify tables
psql -d wuc_admissions_prod -c "\dt"
```

### Step 2: Backend Deployment
```bash
# Clone repository
git clone <repo-url>
cd wuc-admission-portal/backend

# Install dependencies
npm install --production

# Set environment variables
cp .env.production .env
nano .env  # Edit with production values

# Start with PM2
pm2 start server.js --name wuc-api
pm2 save
pm2 startup
```

### Step 3: Frontend Deployment
```bash
cd frontend

# Build production bundle
npm run build

# Deploy to Vercel
vercel --prod

# Or deploy to Netlify
netlify deploy --prod
```

### Step 4: Configure Nginx (if using)
```nginx
server {
    listen 80;
    server_name api.wuc.edu.gh;
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Step 5: SSL Setup
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d api.wuc.edu.gh
sudo certbot --nginx -d apply.wuc.edu.gh
```

---

## Post-Deployment Checklist

### ✅ Verification
- [ ] Frontend loads correctly
- [ ] API health check responds
- [ ] Database connection works
- [ ] Payment gateway connects
- [ ] Email sending works
- [ ] SMS sending works
- [ ] File uploads work
- [ ] Admin login works
- [ ] All routes accessible
- [ ] HTTPS enabled
- [ ] Mobile responsive

### 📊 Monitoring Setup
- [ ] Error tracking active
- [ ] Uptime monitoring active
- [ ] Performance monitoring active
- [ ] Database monitoring active
- [ ] Alert notifications configured
- [ ] Backup system running

### 📝 Documentation
- [ ] Update API documentation
- [ ] Document deployment process
- [ ] Create admin user guide
- [ ] Create applicant user guide
- [ ] Document troubleshooting steps

### 🎓 Training
- [ ] Train admin staff
- [ ] Create admin manual
- [ ] Set up support system
- [ ] Document common issues

---

## Environment Variables Checklist

### Backend (.env)
```bash
✅ NODE_ENV=production
✅ PORT=5000
✅ DB_HOST=<production-db-host>
✅ DB_PORT=5432
✅ DB_NAME=wuc_admissions
✅ DB_USER=<db-user>
✅ DB_PASSWORD=<strong-password>
✅ JWT_SECRET=<strong-secret>
✅ JWT_REFRESH_SECRET=<strong-secret>
✅ JWT_ADMIN_SECRET=<strong-secret>
✅ SMTP_HOST=<smtp-host>
✅ SMTP_PORT=587
✅ SMTP_USER=<smtp-user>
✅ SMTP_PASS=<smtp-password>
✅ SMTP_FROM=admissions@wuc.edu.gh
✅ FLUTTERWAVE_PUBLIC_KEY=<production-key>
✅ FLUTTERWAVE_SECRET_KEY=<production-key>
✅ SMS_API_KEY=<hubtel-key>
✅ SMS_SENDER_ID=WUC-ADM
✅ APP_URL=https://apply.wuc.edu.gh
✅ API_URL=https://api.wuc.edu.gh
```

### Frontend (.env)
```bash
✅ REACT_APP_API_URL=https://api.wuc.edu.gh
✅ REACT_APP_WUC_WEBSITE=https://www.wuc.edu.gh
```

---

## Backup Strategy

### Database Backups
```bash
# Daily backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump wuc_admissions > /backups/wuc_db_$DATE.sql
# Keep last 30 days
find /backups -name "wuc_db_*.sql" -mtime +30 -delete
```

### File Backups
```bash
# Daily file backup
rsync -av /path/to/uploads /backups/uploads_$(date +%Y%m%d)
```

---

## Rollback Plan

### If Deployment Fails:
1. Revert to previous version
2. Restore database backup
3. Check error logs
4. Fix issues
5. Redeploy

### Emergency Contacts:
- Technical Lead: [contact]
- Database Admin: [contact]
- DevOps: [contact]

---

## Success Criteria

✅ All features working
✅ No critical errors
✅ Performance acceptable
✅ Security measures active
✅ Monitoring active
✅ Backups running
✅ Documentation complete
✅ Team trained

---

## Launch Day Tasks

1. **Morning:**
   - [ ] Final system check
   - [ ] Verify all services running
   - [ ] Test critical paths
   - [ ] Notify stakeholders

2. **Launch:**
   - [ ] Enable production mode
   - [ ] Monitor error logs
   - [ ] Watch performance metrics
   - [ ] Be ready for support

3. **Post-Launch:**
   - [ ] Monitor for 24 hours
   - [ ] Address any issues
   - [ ] Collect feedback
   - [ ] Document lessons learned

---

**Deployment Date:** _______________
**Deployed By:** _______________
**Verified By:** _______________

**Status:** ⬜ Ready | ⬜ In Progress | ⬜ Complete

---

**Withrow University College © 2024**
Reference: https://www.wuc.edu.gh
