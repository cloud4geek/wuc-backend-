// backend/// <reference types="react-scripts" />

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Pages
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
zZ/routes/applicants.js
const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

// Simple registration endpoint
router.post('/register', async (req, res) => {
  try {
    const { email, phone, firstName, lastName, dob } = req.body;
    
    // Basic validation
    if (!email || !phone || !firstName || !lastName) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    // Check if email exists
    const emailCheck = await pool.query(
      'SELECT id FROM applicants WHERE email = $1',
      [email]
    );
    
    if (emailCheck.rows.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    
    // Insert applicant
    const result = await pool.query(
      `INSERT INTO applicants (email, phone, first_name, last_name, date_of_birth, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING id, email, first_name, last_name`,
      [email, phone, firstName, lastName, dob]
    );
    
    res.status(201).json({
      success: true,
      message: 'Registration successful',
      applicant: result.rows[0]
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

module.exports = router;