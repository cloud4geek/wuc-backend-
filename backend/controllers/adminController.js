const { pool } = require('../config/database');
const { sendAdmissionLetter } = require('../services/emailService');

const getAllApplications = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM applications ORDER BY submitted_at DESC'
    );
    res.json({ success: true, applications: result.rows });
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const approveApplication = async (req, res) => {
  const { applicationId } = req.params;

  try {
    const appResult = await pool.query(
      'SELECT * FROM applications WHERE application_id = $1',
      [applicationId]
    );

    if (appResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    const application = appResult.rows[0];
    const admissionLetterUrl = `${process.env.APP_URL}/admission-letters/${applicationId}.pdf`;

    await pool.query(
      'UPDATE applications SET status = $1, reviewed_at = NOW(), admission_letter_url = $2 WHERE application_id = $3',
      ['approved', admissionLetterUrl, applicationId]
    );

    await sendAdmissionLetter(application.email, application.first_name, admissionLetterUrl);

    res.json({ success: true, message: 'Application approved and admission letter sent' });
  } catch (error) {
    console.error('Approve error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getAllVouchers = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM vouchers ORDER BY created_at DESC'
    );
    res.json({ success: true, vouchers: result.rows });
  } catch (error) {
    console.error('Get vouchers error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const totalApps = await pool.query('SELECT COUNT(*) FROM applications');
    const pendingApps = await pool.query("SELECT COUNT(*) FROM applications WHERE status = 'pending'");
    const approvedApps = await pool.query("SELECT COUNT(*) FROM applications WHERE status = 'approved'");
    const totalVouchers = await pool.query('SELECT COUNT(*) FROM vouchers');

    res.json({
      success: true,
      stats: {
        totalApplications: parseInt(totalApps.rows[0].count),
        pendingApplications: parseInt(pendingApps.rows[0].count),
        approvedApplications: parseInt(approvedApps.rows[0].count),
        totalVouchers: parseInt(totalVouchers.rows[0].count)
      }
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { getAllApplications, approveApplication, getAllVouchers, getDashboardStats };
