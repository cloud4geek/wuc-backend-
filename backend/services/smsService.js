const axios = require('axios');

const sendSMS = async (phone, message) => {
  try {
    const response = await axios.post('https://api.hubtel.com/v1/messages/send', {
      From: process.env.SMS_SENDER_ID || 'WUC-ADM',
      To: phone,
      Content: message
    }, {
      auth: {
        username: process.env.SMS_API_KEY,
        password: process.env.SMS_API_KEY
      }
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error('SMS error:', error);
    return { success: false, error: error.message };
  }
};

const sendVoucherSMS = async (phone, voucherCode) => {
  const message = `WUC Admission: Your voucher code is ${voucherCode}. Valid for 30 days. Apply at ${process.env.APP_URL}/apply`;
  return sendSMS(phone, message);
};

const sendApplicationSMS = async (phone, applicationId) => {
  const message = `WUC Admission: Application ${applicationId} received. Track at ${process.env.APP_URL}/application-status`;
  return sendSMS(phone, message);
};

module.exports = { sendSMS, sendVoucherSMS, sendApplicationSMS };
