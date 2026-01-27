const express = require('express');
const router = express.Router();
const { getAllApplications, approveApplication, getAllVouchers, getDashboardStats } = require('../controllers/adminController');
const { authenticateAdmin } = require('../middleware/auth');

router.use(authenticateAdmin);

router.get('/dashboard/stats', getDashboardStats);
router.get('/applications', getAllApplications);
router.post('/applications/:applicationId/approve', approveApplication);
router.get('/vouchers', getAllVouchers);

module.exports = router;
