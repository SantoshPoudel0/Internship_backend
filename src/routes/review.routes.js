const express = require('express');
const {
  getReviews,
  getFeaturedReviews,
  getAllReviewsAdmin,
  getReviewById,
  createReview,
  updateReview,
  deleteReview
} = require('../controllers/review.controller');
const { protect, isAdmin } = require('../middleware/auth.middleware');

const router = express.Router();

// Public routes
router.get('/', getReviews);
router.get('/featured', getFeaturedReviews);
router.post('/', createReview);
router.get('/:id', getReviewById);

// Protected routes (admin only)
router.get('/admin/all', protect, isAdmin, getAllReviewsAdmin);
router.put('/:id', protect, isAdmin, updateReview);
router.delete('/:id', protect, isAdmin, deleteReview);

module.exports = router; 