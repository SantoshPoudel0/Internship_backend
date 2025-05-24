const User = require('../models/user.model');

const checkAdmin = async () => {
  try {
    // Find all admin users
    const adminUsers = await User.find({ isAdmin: true }).select('-password');
    
    if (adminUsers.length === 0) {
      console.log('No admin users found in the system');
      return;
    }

    console.log('\nExisting admin users:');
    adminUsers.forEach(admin => {
      console.log(`- ${admin.email} (${admin.name})`);
    });
    
  } catch (error) {
    console.error('Error checking admin users:', error);
  }
};

module.exports = checkAdmin; 