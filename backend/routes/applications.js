const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { submitApplication, getApplicationStatus, uploadDocuments } = require('../controllers/applicationController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/documents/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

router.post('/submit', submitApplication);
router.get('/status', getApplicationStatus);
router.post('/:applicationId/documents', upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'birthCert', maxCount: 1 },
  { name: 'wassce', maxCount: 1 },
  { name: 'medicalCert', maxCount: 1 },
  { name: 'recommendation', maxCount: 1 }
]), uploadDocuments);

module.exports = router;
