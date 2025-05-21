const express = require('express');
const {
  getDashboardData,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/admin.controller');
const { protect, isAdmin } = require('../middleware/auth.middleware');

const router = express.Router();

// All admin routes require authentication and admin privileges
router.use(protect, isAdmin);

// Dashboard data
router.get('/dashboard', getDashboardData);

// User management
router.get('/users', getUsers);
router.post('/users', createUser);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router; 