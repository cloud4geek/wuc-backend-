import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import VoucherPurchase from './pages/VoucherPurchase';
import ApplicationForm from './pages/ApplicationForm';
import AdminDashboard from './pages/AdminDashboard';
import ApplicationStatus from './pages/ApplicationStatus';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/purchase-voucher" element={<VoucherPurchase />} />
          <Route path="/apply" element={<ApplicationForm />} />
          <Route path="/application-status" element={<ApplicationStatus />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
