const express = require('express');
const router = express.Router();
const { purchaseVoucher, verifyVoucher, resendVoucher } = require('../controllers/voucherController');
const { authenticateAdmin } = require('../middleware/auth');

router.post('/purchase', purchaseVoucher);
router.post('/verify', verifyVoucher);
router.post('/resend', authenticateAdmin, resendVoucher);

module.exports = router;
