const Review = require('../models/review.model');
const path = require('path');
const fs = require('fs');

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public
exports.getReviews = async (req, res) => {
  try {
    // For public API, only return approved reviews
    const reviews = await Review.find({ approved: true }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get featured reviews
// @route   GET /api/reviews/featured
// @access  Public
exports.getFeaturedReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ approved: true, featured: true })
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all reviews (including unapproved) - Admin only
// @route   GET /api/reviews/admin
// @access  Private/Admin
exports.getAllReviewsAdmin = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single review
// @route   GET /api/reviews/:id
// @access  Public/Private depending on approval status
exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    // If review is not approved and user is not admin, don't show it
    if (!review.approved && (!req.user || !req.user.isAdmin)) {
      return res.status(403).json({ message: 'Not authorized to access this review' });
    }
    
    res.json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a review
// @route   POST /api/reviews
// @access  Public
exports.createReview = async (req, res) => {
  try {
    const { name, rating, text } = req.body;
    
    // Create new review (unapproved by default)
    const review = await Review.create({
      user: {
        name,
        // Handle avatar upload if implemented with multer
        avatar: req.file ? req.file.filename : 'default-avatar.jpg'
      },
      rating,
      text,
      // New reviews are unapproved by default
      approved: false,
      featured: false
    });
    
    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a review (admin only)
// @route   PUT /api/reviews/:id
// @access  Private/Admin
exports.updateReview = async (req, res) => {
  try {
    const { rating, text, approved, featured } = req.body;
    
    // Find review by id
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    // Update review fields
    if (rating) review.rating = rating;
    if (text) review.text = text;
    if (approved !== undefined) review.approved = approved;
    if (featured !== undefined) review.featured = featured;
    
    // Save updated review
    const updatedReview = await review.save();
    
    res.json(updatedReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private/Admin
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    // Delete associated avatar if not default
    if (review.user.avatar !== 'default-avatar.jpg') {
      const avatarPath = path.join(__dirname, '../../uploads', review.user.avatar);
      if (fs.existsSync(avatarPath)) {
        fs.unlinkSync(avatarPath);
      }
    }
    
    await Review.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Review removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}; 