const User = require('../models/user.model');

const seedAdmin = async () => {
  try {
    console.log('Starting admin user seeding...');
    
    // Check if admin user exists
    const adminExists = await User.findOne({ email: 'admin@example.com' });

    // Only create admin if it doesn't exist AND there are no other admin users
    const hasOtherAdmins = await User.exists({ isAdmin: true });

    if (adminExists) {
      console.log('Existing admin found:', adminExists.email);
      return;
    }

    if (hasOtherAdmins) {
      console.log('Other admin users exist, skipping default admin creation');
      return;
    }

    console.log('No admin found, creating new admin user...');

    // Create admin user using the model's pre-save hook for password hashing
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      isAdmin: true
    });

    console.log('New admin user created successfully:', admin.email);
    console.log('You can now login with:');
    console.log('Email: admin@example.com');
    console.log('Password: admin123');
  } catch (error) {
    console.error('Error in admin seeding:', error);
    throw error;
  }
};

module.exports = seedAdmin; 