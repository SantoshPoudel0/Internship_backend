const express = require('express');
const {
  getReviews,
  getFeaturedReviews,
  getReviewById,
  createReview
} = require('../controllers/review.controller');

const router = express.Router();

// Public routes
router.get('/', getReviews);
router.get('/featured', getFeaturedReviews);
router.get('/:id', getReviewById);
router.post('/', createReview);

module.exports = router; 