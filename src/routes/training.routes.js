const express = require('express');
const multer = require('multer');
const path = require('path');
const {
  getTrainings,
  getFeaturedTrainings,
  getTrainingById,
  createTraining,
  updateTraining,
  deleteTraining
} = require('../controllers/training.controller');
const { protect, isAdmin } = require('../middleware/auth.middleware');

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const prefix = file.fieldname === 'instructorImage' ? 'instructor-' : 'training-';
    cb(null, prefix + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload images only.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB max size
});

const router = express.Router();

// Public routes
router.get('/', getTrainings);
router.get('/featured', getFeaturedTrainings);
router.get('/:id', getTrainingById);

// Protected routes (admin only)
router.post('/', protect, isAdmin, upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'instructorImage', maxCount: 1 }
]), createTraining);
router.put('/:id', protect, isAdmin, upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'instructorImage', maxCount: 1 }
]), updateTraining);
router.delete('/:id', protect, isAdmin, deleteTraining);

module.exports = router; 