const axios = require('axios');

const FLUTTERWAVE_BASE_URL = 'https://api.flutterwave.com/v3';

const initiatePayment = async (paymentData) => {
  const { email, phone, amount, paymentMethod, firstName, lastName } = paymentData;
  
  try {
    const payload = {
      tx_ref: `WUC-${Date.now()}`,
      amount: amount || 200,
      currency: 'GHS',
      redirect_url: `${process.env.APP_URL}/payment/callback`,
      customer: { email, phonenumber: phone, name: `${firstName} ${lastName}` },
      customizations: {
        title: 'WUC Admission Voucher',
        description: 'Application Form Purchase',
        logo: 'https://www.wuc.edu.gh/logo.png'
      }
    };

    if (paymentMethod === 'mtn' || paymentMethod === 'telecel') {
      payload.payment_options = 'mobilemoney';
    } else if (paymentMethod === 'visa' || paymentMethod === 'mastercard') {
      payload.payment_options = 'card';
    }

    const response = await axios.post(`${FLUTTERWAVE_BASE_URL}/payments`, payload, {
      headers: {
        Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    return { success: true, data: response.data };
  } catch (error) {
    console.error('Payment error:', error);
    return { success: false, error: error.message };
  }
};

const verifyPayment = async (transactionId) => {
  try {
    const response = await axios.get(`${FLUTTERWAVE_BASE_URL}/transactions/${transactionId}/verify`, {
      headers: { Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}` }
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Verification error:', error);
    return { success: false, error: error.message };
  }
};

module.exports = { initiatePayment, verifyPayment };
