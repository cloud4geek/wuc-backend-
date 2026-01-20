const express = require('express');
const cors = require('cors');
const path = require('path');

const { authenticate, authenticateAdmin } = require('./middleware/auth');

// Load environment variables with absolute path to be sure
require('dotenv').config({ 
  path: path.resolve(__dirname, '.env.development') 
});

const app = express();
const PORT = process.env.PORT || 5000;

// Debug: Log environment variables on startup
console.log('=== ENVIRONMENT VARIABLES LOADED ===');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD value:', process.env.DB_PASSWORD);
console.log('DB_PASSWORD type:', typeof process.env.DB_PASSWORD);
console.log('DB_PASSWORD length:', process.env.DB_PASSWORD ? process.env.DB_PASSWORD.length : 0);
console.log('====================================');

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'WUC Admission Portal API',
    version: '1.0.0',
    endpoints: {
      root: '/',
      health: '/api/health',
      testDb: '/api/test-db',
      auth: {
        login: '/api/auth/applicant/login',
        refresh: '/api/auth/refresh'
      },
      protected: {
        applicantProfile: '/api/applicant/profile',
        adminDashboard: '/api/admin/dashboard',
        applicantDocuments: '/api/applicant/documents'
      }
    }
  });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'WUC Admission API',
    timestamp: new Date().toISOString()
  });
});

// Test database connection with better error handling
app.get('/api/test-db', async (req, res) => {
  console.log('\n=== DATABASE CONNECTION ATTEMPT ===');
  
  try {
    const { Pool } = require('pg');
    
    // Use hardcoded values as fallback
    const dbConfig = {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_NAME || 'wuc_admissions',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'wuc1234' // Fallback password
    };
    
    console.log('Connecting with config:', {
      ...dbConfig,
      password: dbConfig.password ? '[SET]' : '[MISSING]'
    });
    
    const pool = new Pool(dbConfig);
    
    const result = await pool.query('SELECT NOW() as time');
    console.log('✅ Database connection SUCCESS');
    
    res.json({ 
      success: true, 
      message: 'Database connected successfully',
      time: result.rows[0].time,
      config: {
        host: dbConfig.host,
        port: dbConfig.port,
        database: dbConfig.database,
        user: dbConfig.user,
        passwordSet: !!dbConfig.password
      }
    });
    
    await pool.end();
  } catch (error) {
    console.error('❌ Database connection ERROR:', error.message);
    res.status(500).json({ 
      success: false, 
      error: 'Database connection failed',
      details: error.message,
      suggestion: 'Check if PostgreSQL is running and password is correct'
    });
  }
});

// ============================================
// AUTH ROUTES
// ============================================
app.use('/api/auth', require('./routes/authRoutes'));

// ============================================
// PROTECTED ROUTES (with authentication)
// ============================================

// Protected route for applicants
app.get('/api/applicant/profile', authenticate, (req, res) => {
  res.json({
    success: true,
    message: 'Protected data',
    user: req.user,
    profileInfo: {
      userId: req.user.userId,
      email: req.user.email,
      firstName: req.user.firstName,
      role: req.user.role,
      lastLogin: new Date().toISOString()
    },
    timestamp: new Date().toISOString()
  });
});

// Admin protected route
app.get('/api/admin/dashboard', authenticateAdmin, (req, res) => {
  res.json({
    success: true,
    message: 'Admin dashboard',
    admin: req.admin,
    dashboardStats: {
      totalApplications: 245,
      pendingReviews: 18,
      approvedToday: 7,
      revenue: 12500
    },
    recentActivity: [
      { id: 1, action: 'Application submitted', time: '10:30 AM' },
      { id: 2, action: 'Payment received', time: '11:15 AM' },
      { id: 3, action: 'Document approved', time: '12:00 PM' }
    ],
    timestamp: new Date().toISOString()
  });
});

// Additional protected route for applicant documents
app.get('/api/applicant/documents', authenticate, (req, res) => {
  res.json({
    success: true,
    message: 'Your application documents',
    userId: req.user.userId,
    documents: [
      { id: 1, name: 'Transcript.pdf', type: 'academic', status: 'uploaded', size: '2.4 MB' },
      { id: 2, name: 'Recommendation_Letter.pdf', type: 'reference', status: 'pending', size: '1.8 MB' },
      { id: 3, name: 'ID_Card.jpg', type: 'identification', status: 'approved', size: '850 KB' },
      { id: 4, name: 'Application_Form.pdf', type: 'application', status: 'submitted', size: '3.1 MB' }
    ],
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 WUC Admission API running on http://localhost:${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔗 Test DB: http://localhost:${PORT}/api/test-db`);
  console.log(`🔗 Auth login: http://localhost:${PORT}/api/auth/applicant/login`);
  console.log(`🔗 Protected routes:`);
  console.log(`   • Applicant profile: http://localhost:${PORT}/api/applicant/profile`);
  console.log(`   • Admin dashboard: http://localhost:${PORT}/api/admin/dashboard`);
  console.log(`   • Applicant documents: http://localhost:${PORT}/api/applicant/documents`);
  console.log(`📁 Root: http://localhost:${PORT}/`);
});