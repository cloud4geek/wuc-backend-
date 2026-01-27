import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const VoucherPurchase: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    paymentMethod: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const voucherCode = `WUC${Date.now().toString().slice(-8)}`;
      setMessage({
        type: 'success',
        text: `Payment successful! Your voucher code is: ${voucherCode}. Check your email and SMS for details.`
      });
      setFormData({ firstName: '', lastName: '', email: '', phone: '', paymentMethod: '' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Payment failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <header className="header">
        <div className="header-content">
          <div className="logo-section"><h1>WUC Admission Portal</h1></div>
          <nav>
            <ul className="nav-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/apply">Apply Now</Link></li>
              <li><Link to="/application-status">Check Status</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="container">
        <div className="card">
          <h2 style={{ marginBottom: '1rem', color: '#1e3a8a' }}>Purchase Application Voucher</h2>
          <p style={{ marginBottom: '2rem', color: '#666' }}>Application Fee: GHS 200.00</p>

          {message.text && (
            <div className={`alert alert-${message.type === 'success' ? 'success' : 'error'}`}>{message.text}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              <div className="form-group">
                <label>First Name *</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Last Name *</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Phone Number *</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+233XXXXXXXXX" required />
            </div>

            <div className="form-group">
              <label>Payment Method *</label>
              <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required>
                <option value="">Select Payment Method</option>
                <option value="mtn">MTN Mobile Money</option>
                <option value="telecel">Telecel Cash</option>
                <option value="visa">Visa Card</option>
                <option value="mastercard">Mastercard</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', marginTop: '1rem' }}>
              {loading ? 'Processing Payment...' : 'Pay GHS 200.00'}
            </button>
          </form>
        </div>

        <div className="card" style={{ background: '#fef3c7' }}>
          <h3 style={{ marginBottom: '0.5rem', color: '#92400e' }}>Important Notes:</h3>
          <ul style={{ lineHeight: '1.8', paddingLeft: '1.5rem', color: '#78350f' }}>
            <li>Your voucher code will be sent to your email and phone number</li>
            <li>Keep your voucher code safe - you'll need it to complete your application</li>
            <li>Voucher is valid for 30 days from purchase date</li>
            <li>If you don't receive your voucher, contact admissions@wuc.edu.gh</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VoucherPurchase;
