const express = require('express');
const {
  getDashboardData,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginAdmin
} = require('../controllers/admin.controller');
const { protect, isAdmin } = require('../middleware/auth.middleware');

const router = express.Router();

// Public admin routes
router.post('/login', loginAdmin);

// Protected admin routes
router.get('/dashboard', protect, isAdmin, getDashboardData);

// User management (protected)
router.get('/users', protect, isAdmin, getUsers);
router.post('/users', protect, isAdmin, createUser);
router.get('/users/:id', protect, isAdmin, getUserById);
router.put('/users/:id', protect, isAdmin, updateUser);
router.delete('/users/:id', protect, isAdmin, deleteUser);

module.exports = router; 