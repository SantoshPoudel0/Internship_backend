const express = require('express');
const {
  createContact,
  getContacts,
  getContactById,
  updateContactStatus,
  deleteContact
} = require('../controllers/contact.controller');
const { protect, isAdmin } = require('../middleware/auth.middleware');

const router = express.Router();

// Public routes
router.post('/', createContact);

// Protected routes (admin only)
router.get('/', protect, isAdmin, getContacts);
router.get('/:id', protect, isAdmin, getContactById);
router.put('/:id', protect, isAdmin, updateContactStatus);
router.delete('/:id', protect, isAdmin, deleteContact);

module.exports = router; 