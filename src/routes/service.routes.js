const express = require('express');
const {
  getServices,
  getFeaturedServices,
  getServiceById,
  createService,
  updateService,
  deleteService
} = require('../controllers/service.controller');
const { protect, isAdmin } = require('../middleware/auth.middleware');

const router = express.Router();

// Public routes
router.get('/', getServices);
router.get('/featured', getFeaturedServices);
router.get('/:id', getServiceById);

// Protected routes (admin only)
router.post('/', protect, isAdmin, createService);
router.put('/:id', protect, isAdmin, updateService);
router.delete('/:id', protect, isAdmin, deleteService);

module.exports = router; 