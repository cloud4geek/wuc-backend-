# WUC Admission Portal

Production-ready student admission portal for Withrow University College (WUC) - Ghana.

## Features

### ✅ Complete Admission System
- **Voucher Purchase System** with MTN Mobile Money, Telecel Cash, Visa & Mastercard
- **Multi-step Application Form** (GTEC & NMC compliant)
- **Document Upload System** (Photo, Birth Cert, WASSCE, Medical Cert, Recommendation)
- **Application Status Tracking**
- **Automated Email & SMS Notifications**
- **Admin Dashboard** for managing applications
- **Admission Letter Generation**
- **Voucher Resend Feature** (if delivery fails)

### 🔐 Security Features
- JWT Authentication
- Helmet.js security headers
- Input validation
- File upload restrictions
- SQL injection protection

### 📧 Notifications
- Email notifications for voucher codes
- SMS notifications via HubTel
- Application confirmation emails
- Admission letter delivery

### 💳 Payment Integration
- Flutterwave payment gateway
- MTN Mobile Money
- Telecel Cash
- Visa/Mastercard support

## Tech Stack

**Frontend:**
- React 19 + TypeScript
- React Router v7
- CSS3 (responsive design)

**Backend:**
- Node.js + Express
- PostgreSQL database
- Nodemailer (email)
- Multer (file uploads)
- Flutterwave API (payments)
- HubTel API (SMS)

## Installation

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=wuc_admissions
DB_USER=postgres
DB_PASSWORD=your_password

JWT_SECRET=your_jwt_secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password
SMTP_FROM=admissions@wuc.edu.gh

FLUTTERWAVE_SECRET_KEY=your_key
SMS_API_KEY=your_hubtel_key
APP_URL=http://localhost:3000
```

Initialize database:
```bash
psql -U postgres -d wuc_admissions -f ../database/schema.sql
```

Start backend:
```bash
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

Access at: http://localhost:3000

## API Endpoints

### Vouchers
- `POST /api/vouchers/purchase` - Purchase voucher
- `POST /api/vouchers/verify` - Verify voucher code
- `POST /api/vouchers/resend` - Resend voucher (admin)

### Applications
- `POST /api/applications/submit` - Submit application
- `GET /api/applications/status` - Check status
- `POST /api/applications/:id/documents` - Upload documents

### Admin
- `GET /api/admin/dashboard/stats` - Dashboard statistics
- `GET /api/admin/applications` - All applications
- `POST /api/admin/applications/:id/approve` - Approve application
- `GET /api/admin/vouchers` - All vouchers

## Database Schema

Tables:
- `vouchers` - Voucher codes and payment info
- `applications` - Student applications
- `documents` - Uploaded documents (GTEC/NMC compliant)
- `payments` - Payment transactions
- `admin_users` - Admin accounts
- `notifications` - Email/SMS logs
- `audit_logs` - System audit trail

## Compliance

✅ **GTEC Compliant** - Ghana Tertiary Education Commission standards
✅ **NMC Compliant** - Nursing and Midwifery Council requirements

Required documents:
- WASSCE/SSSCE Certificate
- Birth Certificate/National ID
- Passport Photo
- Medical Certificate
- Recommendation Letter (optional)

## Deployment

### Production Checklist
- [ ] Set strong JWT secrets
- [ ] Configure production database
- [ ] Set up SSL certificates
- [ ] Configure email service (AWS SES recommended)
- [ ] Set up SMS service (HubTel)
- [ ] Configure Flutterwave production keys
- [ ] Set up file storage (AWS S3 recommended)
- [ ] Enable database backups
- [ ] Set up monitoring (CloudWatch)

### Recommended Hosting
- **Frontend**: Vercel, Netlify, or AWS Amplify
- **Backend**: AWS EC2, Heroku, or DigitalOcean
- **Database**: AWS RDS PostgreSQL
- **Files**: AWS S3

## Support

For issues or questions:
- Email: admissions@wuc.edu.gh
- Website: https://www.wuc.edu.gh

## License

Proprietary - Withrow University College © 2024
