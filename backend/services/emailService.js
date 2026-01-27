const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'admissions@wuc.edu.gh',
      to,
      subject,
      html
    });
    return { success: true };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error: error.message };
  }
};

const sendVoucherEmail = async (email, voucherCode, firstName) => {
  const html = `
    <h2>WUC Admission Voucher</h2>
    <p>Dear ${firstName},</p>
    <p>Your application voucher has been generated successfully.</p>
    <p><strong>Voucher Code: ${voucherCode}</strong></p>
    <p>Use this code to complete your application at: ${process.env.APP_URL}/apply</p>
    <p>Valid for 30 days from purchase.</p>
    <p>Best regards,<br>WUC Admissions Team</p>
  `;
  return sendEmail(email, 'WUC Application Voucher', html);
};

const sendApplicationConfirmation = async (email, applicationId, firstName) => {
  const html = `
    <h2>Application Received</h2>
    <p>Dear ${firstName},</p>
    <p>Your application has been received successfully.</p>
    <p><strong>Application ID: ${applicationId}</strong></p>
    <p>Track your status at: ${process.env.APP_URL}/application-status</p>
    <p>Best regards,<br>WUC Admissions Team</p>
  `;
  return sendEmail(email, 'Application Confirmation', html);
};

const sendAdmissionLetter = async (email, firstName, admissionLetterUrl) => {
  const html = `
    <h2>Congratulations!</h2>
    <p>Dear ${firstName},</p>
    <p>Your application has been approved!</p>
    <p><a href="${admissionLetterUrl}">Download Admission Letter</a></p>
    <p>Best regards,<br>WUC Admissions Team</p>
  `;
  return sendEmail(email, 'Admission Approved', html);
};

module.exports = { sendEmail, sendVoucherEmail, sendApplicationConfirmation, sendAdmissionLetter };
