import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const [applications] = useState([
    { id: 'APP001', name: 'John Doe', email: 'john@example.com', phone: '+233241234567', status: 'pending', date: '2024-01-15' },
    { id: 'APP002', name: 'Jane Smith', email: 'jane@example.com', phone: '+233241234568', status: 'approved', date: '2024-01-14' },
    { id: 'APP003', name: 'Mike Johnson', email: 'mike@example.com', phone: '+233241234569', status: 'pending', date: '2024-01-13' }
  ]);

  const [vouchers] = useState([
    { code: 'WUC12345678', email: 'test@example.com', phone: '+233241234567', status: 'used', date: '2024-01-10' },
    { code: 'WUC87654321', email: 'user@example.com', phone: '+233241234568', status: 'unused', date: '2024-01-12' }
  ]);

  const resendVoucher = (voucher: any) => {
    alert(`Voucher ${voucher.code} resent to ${voucher.email} and ${voucher.phone}`);
  };

  const approveApplication = (appId: string) => {
    alert(`Application ${appId} approved! Admission letter generated and sent.`);
  };

  return (
    <div>
      <header className="header">
        <div className="header-content">
          <div className="logo-section"><h1>WUC Admin Dashboard</h1></div>
          <nav>
            <ul className="nav-links">
              <li><Link to="/admin">Dashboard</Link></li>
              <li><Link to="/admin/applications">Applications</Link></li>
              <li><Link to="/admin/vouchers">Vouchers</Link></li>
              <li><Link to="/">Exit Admin</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="container">
        <Routes>
          <Route path="/" element={
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="card" style={{ background: '#eff6ff', border: '2px solid #3b82f6' }}>
                  <h3 style={{ color: '#1e40af' }}>Total Applications</h3>
                  <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1e3a8a' }}>{applications.length}</p>
                </div>
                <div className="card" style={{ background: '#fef3c7', border: '2px solid #f59e0b' }}>
                  <h3 style={{ color: '#92400e' }}>Pending Review</h3>
                  <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#92400e' }}>{applications.filter(a => a.status === 'pending').length}</p>
                </div>
                <div className="card" style={{ background: '#d1fae5', border: '2px solid #10b981' }}>
                  <h3 style={{ color: '#065f46' }}>Approved</h3>
                  <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#065f46' }}>{applications.filter(a => a.status === 'approved').length}</p>
                </div>
                <div className="card" style={{ background: '#e0e7ff', border: '2px solid #6366f1' }}>
                  <h3 style={{ color: '#3730a3' }}>Total Vouchers</h3>
                  <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3730a3' }}>{vouchers.length}</p>
                </div>
              </div>

              <div className="card">
                <h3 style={{ marginBottom: '1rem', color: '#1e3a8a' }}>Quick Actions</h3>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Link to="/admin/applications"><button className="btn btn-primary">View Applications</button></Link>
                  <Link to="/admin/vouchers"><button className="btn btn-success">Manage Vouchers</button></Link>
                </div>
              </div>
            </div>
          } />

          <Route path="/applications" element={
            <div className="card">
              <h2 style={{ marginBottom: '1rem', color: '#1e3a8a' }}>Applications Management</h2>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f3f4f6', borderBottom: '2px solid #e5e7eb' }}>
                      <th style={{ padding: '0.75rem', textAlign: 'left' }}>ID</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left' }}>Name</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left' }}>Email</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left' }}>Status</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left' }}>Date</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map(app => (
                      <tr key={app.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '0.75rem' }}>{app.id}</td>
                        <td style={{ padding: '0.75rem' }}>{app.name}</td>
                        <td style={{ padding: '0.75rem' }}>{app.email}</td>
                        <td style={{ padding: '0.75rem' }}>
                          <span style={{ padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.85rem', background: app.status === 'approved' ? '#d1fae5' : '#fef3c7', color: app.status === 'approved' ? '#065f46' : '#92400e' }}>
                            {app.status}
                          </span>
                        </td>
                        <td style={{ padding: '0.75rem' }}>{app.date}</td>
                        <td style={{ padding: '0.75rem' }}>
                          {app.status === 'pending' && (
                            <button onClick={() => approveApplication(app.id)} className="btn btn-success" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                              Approve
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          } />

          <Route path="/vouchers" element={
            <div className="card">
              <h2 style={{ marginBottom: '1rem', color: '#1e3a8a' }}>Vouchers Management</h2>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f3f4f6', borderBottom: '2px solid #e5e7eb' }}>
                      <th style={{ padding: '0.75rem', textAlign: 'left' }}>Voucher Code</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left' }}>Email</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left' }}>Phone</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left' }}>Status</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left' }}>Date</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vouchers.map(voucher => (
                      <tr key={voucher.code} style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{voucher.code}</td>
                        <td style={{ padding: '0.75rem' }}>{voucher.email}</td>
                        <td style={{ padding: '0.75rem' }}>{voucher.phone}</td>
                        <td style={{ padding: '0.75rem' }}>
                          <span style={{ padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.85rem', background: voucher.status === 'used' ? '#e5e7eb' : '#d1fae5', color: voucher.status === 'used' ? '#6b7280' : '#065f46' }}>
                            {voucher.status}
                          </span>
                        </td>
                        <td style={{ padding: '0.75rem' }}>{voucher.date}</td>
                        <td style={{ padding: '0.75rem' }}>
                          <button onClick={() => resendVoucher(voucher)} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                            Resend
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
