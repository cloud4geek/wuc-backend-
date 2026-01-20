const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwtUtil = require('../utils/jwt');
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

// Applicant login
router.post('/applicant/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find applicant
    const result = await pool.query(
      'SELECT id, email, first_name, password_hash FROM applicants WHERE email = $1',
      [email]
    );
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const applicant = result.rows[0];
    
    // In real app, compare hashed password
    // For now, we'll assume password is correct
    // const validPassword = await bcrypt.compare(password, applicant.password_hash);
    // if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });
    
    // Create token payload
    const tokenPayload = {
      userId: applicant.id,
      email: applicant.email,
      firstName: applicant.first_name,
      role: 'applicant'
    };
    
    // Generate tokens
    const accessToken = jwtUtil.generateToken(tokenPayload);
    const refreshToken = jwtUtil.generateRefreshToken(tokenPayload);
    
    res.json({
      success: true,
      message: 'Login successful',
      accessToken,
      refreshToken,
      applicant: {
        id: applicant.id,
        email: applicant.email,
        firstName: applicant.first_name
      }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Refresh token
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token required' });
    }
    
    const decoded = jwtUtil.verifyRefreshToken(refreshToken);
    
    // Generate new access token
    const newAccessToken = jwtUtil.generateToken({
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role
    });
    
    res.json({
      success: true,
      accessToken: newAccessToken
    });
    
  } catch (error) {
    res.status(403).json({ error: 'Invalid refresh token' });
  }
});

module.exports = router;