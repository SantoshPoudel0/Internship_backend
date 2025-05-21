const express = require('express');
const {
  createBooking,
  getBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking
} = require('../controllers/booking.controller');
const { protect, isAdmin } = require('../middleware/auth.middleware');

const router = express.Router();

// Public routes
router.post('/', createBooking);

// Protected routes (admin only)
router.get('/', protect, isAdmin, getBookings);
router.get('/:id', protect, isAdmin, getBookingById);
router.put('/:id', protect, isAdmin, updateBookingStatus);
router.delete('/:id', protect, isAdmin, deleteBooking);

module.exports = router; 