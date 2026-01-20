const jwt = require('jsonwebtoken');

class JWTService {
  constructor() {
    this.jwtSecret = process.env.JWT_SECRET;
    this.jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;
    this.jwtAdminSecret = process.env.JWT_ADMIN_SECRET;
    
    // Verify secrets exist
    if (!this.jwtSecret || this.jwtSecret.includes('your_jwt_secret')) {
      throw new Error('JWT_SECRET not properly configured in .env');
    }
  }

  // Generate token for applicants
  generateToken(payload, expiresIn = '7d') {
    return jwt.sign(payload, this.jwtSecret, { expiresIn });
  }

  // Generate token for admin users
  generateAdminToken(payload, expiresIn = '1d') {
    return jwt.sign(payload, this.jwtAdminSecret, { expiresIn });
  }

  // Generate refresh token
  generateRefreshToken(payload) {
    return jwt.sign(payload, this.jwtRefreshSecret, { expiresIn: '30d' });
  }

  // Verify applicant token
  verifyToken(token) {
    try {
      return jwt.verify(token, this.jwtSecret);
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  // Verify admin token
  verifyAdminToken(token) {
    try {
      return jwt.verify(token, this.jwtAdminSecret);
    } catch (error) {
      throw new Error('Invalid or expired admin token');
    }
  }

  // Verify refresh token
  verifyRefreshToken(token) {
    try {
      return jwt.verify(token, this.jwtRefreshSecret);
    } catch (error) {
      throw new Error('Invalid or expired refresh token');
    }
  }

  // Decode token without verification (for debugging)
  decodeToken(token) {
    return jwt.decode(token);
  }
}

module.exports = new JWTService();