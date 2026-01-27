const { pool } = require('../config/database');
const { initiatePayment, verifyPayment } = require('../services/paymentService');
const { sendVoucherEmail } = require('../services/emailService');
const { sendVoucherSMS } = require('../services/smsService');

const generateVoucherCode = () => {
  return `WUC${Date.now().toString().slice(-8)}`;
};

const purchaseVoucher = async (req, res) => {
  const { firstName, lastName, email, phone, paymentMethod } = req.body;

  try {
    const paymentResult = await initiatePayment({
      email, phone, amount: 200, paymentMethod, firstName, lastName
    });

    if (!paymentResult.success) {
      return res.status(400).json({ success: false, message: 'Payment initiation failed' });
    }

    const voucherCode = generateVoucherCode();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    const result = await pool.query(
      `INSERT INTO vouchers (voucher_code, first_name, last_name, email, phone, payment_method, amount, expires_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [voucherCode, firstName, lastName, email, phone, paymentMethod, 200, expiresAt]
    );

    await sendVoucherEmail(email, voucherCode, firstName);
    await sendVoucherSMS(phone, voucherCode);

    res.json({
      success: true,
      voucherCode,
      message: 'Voucher purchased successfully',
      paymentUrl: paymentResult.data?.data?.link
    });
  } catch (error) {
    console.error('Purchase error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const verifyVoucher = async (req, res) => {
  const { voucherCode } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM vouchers WHERE voucher_code = $1',
      [voucherCode]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Invalid voucher code' });
    }

    const voucher = result.rows[0];

    if (voucher.status === 'used') {
      return res.status(400).json({ success: false, message: 'Voucher already used' });
    }

    if (new Date(voucher.expires_at) < new Date()) {
      return res.status(400).json({ success: false, message: 'Voucher expired' });
    }

    res.json({ success: true, voucher });
  } catch (error) {
    console.error('Verify error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const resendVoucher = async (req, res) => {
  const { voucherId } = req.body;

  try {
    const result = await pool.query('SELECT * FROM vouchers WHERE id = $1', [voucherId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Voucher not found' });
    }

    const voucher = result.rows[0];
    await sendVoucherEmail(voucher.email, voucher.voucher_code, voucher.first_name);
    await sendVoucherSMS(voucher.phone, voucher.voucher_code);

    res.json({ success: true, message: 'Voucher resent successfully' });
  } catch (error) {
    console.error('Resend error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { purchaseVoucher, verifyVoucher, resendVoucher };
