import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <h1>Withrow University College</h1>
          </div>
          <nav>
            <ul className="nav-links">
              <li><a href="https://www.wuc.edu.gh" target="_blank" rel="noopener noreferrer">Main Website</a></li>
              <li><Link to="/purchase-voucher">Purchase Voucher</Link></li>
              <li><Link to="/apply">Apply Now</Link></li>
              <li><Link to="/application-status">Check Status</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="container">
        <div className="card">
          <h2 style={{ marginBottom: '1rem', color: '#1e3a8a' }}>Welcome to WUC Admission Portal</h2>
          <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
            Apply for admission to Withrow University College (WUC) - A leading tertiary institution in Ghana.
            Our admission process is fully compliant with GTEC and NMC standards.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
            <div className="card" style={{ background: '#eff6ff', border: '2px solid #3b82f6' }}>
              <h3 style={{ color: '#1e40af', marginBottom: '0.5rem' }}>Step 1: Purchase Voucher</h3>
              <p style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
                Buy your application voucher using MTN Mobile Money, Telecel Cash, Visa, or Mastercard.
              </p>
              <Link to="/purchase-voucher">
                <button className="btn btn-primary" style={{ width: '100%' }}>Get Voucher</button>
              </Link>
            </div>

            <div className="card" style={{ background: '#f0fdf4', border: '2px solid #10b981' }}>
              <h3 style={{ color: '#065f46', marginBottom: '0.5rem' }}>Step 2: Complete Application</h3>
              <p style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
                Fill out the application form and upload required documents (GTEC & NMC compliant).
              </p>
              <Link to="/apply">
                <button className="btn btn-success" style={{ width: '100%' }}>Apply Now</button>
              </Link>
            </div>

            <div className="card" style={{ background: '#fef3c7', border: '2px solid #f59e0b' }}>
              <h3 style={{ color: '#92400e', marginBottom: '0.5rem' }}>Step 3: Track Application</h3>
              <p style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
                Check your application status and download admission letter if approved.
              </p>
              <Link to="/application-status">
                <button className="btn" style={{ width: '100%', background: '#f59e0b', color: 'white' }}>Check Status</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '1rem', color: '#1e3a8a' }}>Required Documents</h3>
          <ul style={{ lineHeight: '2', paddingLeft: '1.5rem' }}>
            <li>WASSCE/SSSCE Certificate or Results Slip</li>
            <li>Birth Certificate or National ID</li>
            <li>Passport-size Photograph (recent)</li>
            <li>Recommendation Letter (if applicable)</li>
            <li>Medical Certificate</li>
            <li>Transcript (for transfer students)</li>
          </ul>
        </div>

        <div className="card" style={{ background: '#dbeafe' }}>
          <h3 style={{ marginBottom: '1rem', color: '#1e40af' }}>Contact Information</h3>
          <p><strong>Email:</strong> admissions@wuc.edu.gh</p>
          <p><strong>Phone:</strong> +233 XX XXX XXXX</p>
          <p><strong>Website:</strong> <a href="https://www.wuc.edu.gh" target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6' }}>www.wuc.edu.gh</a></p>
        </div>
      </div>
    </div>
  );
};

export default Home;
