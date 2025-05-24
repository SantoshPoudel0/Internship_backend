const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Simplified middleware that always allows access
exports.protect = async (req, res, next) => {
  // Set a default admin user
  req.user = {
    _id: '000000000000000000000001',
    name: 'Admin',
    email: 'admin@example.com',
    isAdmin: true
  };
  next();
};

// Simplified admin check that always allows access
exports.isAdmin = (req, res, next) => {
  next();
}; 