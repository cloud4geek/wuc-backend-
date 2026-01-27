import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ApplicationStatus: React.FC = () => {
  const [searchType, setSearchType] = useState('application');
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [application, setApplication] = useState<any>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setApplication({
      id: 'APP123456',
      name: 'John Doe',
      program: 'Nursing',
      status: 'approved',
      submittedDate: '2024-01-15',
      reviewedDate: '2024-01-20',
      admissionLetterUrl: '#'
    });
    setLoading(false);
  };

  const downloadAdmissionLetter = () => {
    alert('Admission letter download started!');
  };

  return (
    <div>
      <header className="header">
        <div className="header-content">
          <div className="logo-section"><h1>WUC Admission Portal</h1></div>
          <nav>
            <ul className="nav-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/purchase-voucher">Purchase Voucher</Link></li>
              <li><Link to="/apply">Apply Now</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="container">
        <div className="card">
          <h2 style={{ marginBottom: '1rem', color: '#1e3a8a' }}>Check Application Status</h2>
          
          <form onSubmit={handleSearch}>
            <div className="form-group">
              <label>Search By</label>
              <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                <option value="application">Application ID</option>
                <option value="voucher">Voucher Code</option>
                <option value="email">Email Address</option>
              </select>
            </div>

            <div className="form-group">
              <label>
                {searchType === 'application' ? 'Application ID' : searchType === 'voucher' ? 'Voucher Code' : 'Email Address'}
              </label>
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={`Enter your ${searchType === 'application' ? 'application ID' : searchType === 'voucher' ? 'voucher code' : 'email'}`}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Searching...' : 'Check Status'}
            </button>
          </form>
        </div>

        {application && (
          <div className="card">
            <h3 style={{ marginBottom: '1rem', color: '#1e3a8a' }}>Application Details</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Application ID</p>
                <p style={{ fontWeight: 'bold' }}>{application.id}</p>
              </div>
              <div>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Applicant Name</p>
                <p style={{ fontWeight: 'bold' }}>{application.name}</p>
              </div>
              <div>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Program</p>
                <p style={{ fontWeight: 'bold' }}>{application.program}</p>
              </div>
              <div>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Submitted Date</p>
                <p style={{ fontWeight: 'bold' }}>{application.submittedDate}</p>
              </div>
            </div>

            <div style={{ padding: '1rem', borderRadius: '4px', background: application.status === 'approved' ? '#d1fae5' : application.status === 'pending' ? '#fef3c7' : '#fee2e2', marginBottom: '1rem' }}>
              <p style={{ fontWeight: 'bold', color: application.status === 'approved' ? '#065f46' : application.status === 'pending' ? '#92400e' : '#991b1b' }}>
                Status: {application.status.toUpperCase()}
              </p>
              {application.status === 'approved' && (
                <p style={{ marginTop: '0.5rem', color: '#065f46' }}>
                  Congratulations! Your application has been approved. Download your admission letter below.
                </p>
              )}
              {application.status === 'pending' && (
                <p style={{ marginTop: '0.5rem', color: '#92400e' }}>
                  Your application is under review. You will be notified via email once a decision is made.
                </p>
              )}
            </div>

            {application.status === 'approved' && (
              <button onClick={downloadAdmissionLetter} className="btn btn-success">
                Download Admission Letter
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationStatus;
