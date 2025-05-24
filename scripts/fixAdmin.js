require('dotenv').config();
const mongoose = require('mongoose');
const checkAdmin = require('../src/utils/checkAdmin');
const fixAdmin = require('../src/utils/fixAdmin');

const email = process.argv[2];
const password = process.argv[3];

if (!email || !password) {
  console.log('Usage: node scripts/fixAdmin.js <email> <password>');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // First check existing admins
    await checkAdmin();
    
    // Fix the specified admin
    const success = await fixAdmin(email, password);
    
    if (success) {
      console.log('\nAdmin access has been fixed. You can now login with:');
      console.log(`Email: ${email}`);
      console.log(`Password: ${password}`);
    }
    
    process.exit(0);
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }); 