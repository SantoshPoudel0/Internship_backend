const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

const fixAdmin = async (email, password) => {
  try {
    // Find the user
    const user = await User.findOne({ email });

    if (!user) {
      console.log(`No user found with email: ${email}`);
      return false;
    }

    // Update user to be admin and set new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.isAdmin = true;
    user.password = hashedPassword;
    await user.save();

    console.log(`Successfully updated user ${email} to admin status`);
    return true;
  } catch (error) {
    console.error('Error fixing admin:', error);
    return false;
  }
};

module.exports = fixAdmin; 