const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/user.model');
const Service = require('../models/service.model');
const Training = require('../models/training.model');
const Review = require('../models/review.model');

// Load env vars
dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/internship_task');

// Sample data
const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123',
    isAdmin: true
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    isAdmin: false
  }
];

const services = [
  {
    title: 'Web Development',
    description: 'Professional web development services using the latest technologies.',
    icon: 'default-icon.png',
    imageUrl: 'default-service.jpg',
    featured: true,
    order: 1
  },
  {
    title: 'Mobile App Development',
    description: 'Create stunning mobile applications for iOS and Android platforms.',
    icon: 'default-icon.png',
    imageUrl: 'default-service.jpg',
    featured: true,
    order: 2
  },
  {
    title: 'UI/UX Design',
    description: 'Creative and user-friendly design solutions for your digital products.',
    icon: 'default-icon.png',
    imageUrl: 'default-service.jpg',
    featured: false,
    order: 3
  }
];

const trainings = [
  {
    title: 'Full Stack Web Development',
    description: 'Learn to build complete web applications with modern technologies.',
    duration: '12 weeks',
    level: 'Intermediate',
    price: 999,
    discount: 0,
    imageUrl: 'default-training.jpg',
    featured: true,
    order: 1
  },
  {
    title: 'React JS Masterclass',
    description: 'Master React JS and build modern, reactive web applications.',
    duration: '8 weeks',
    level: 'Intermediate',
    price: 799,
    discount: 100,
    imageUrl: 'default-training.jpg',
    featured: true,
    order: 2
  },
  {
    title: 'UI/UX Fundamentals',
    description: 'Learn the core principles of designing great user experiences.',
    duration: '6 weeks',
    level: 'Beginner',
    price: 599,
    discount: 0,
    imageUrl: 'default-training.jpg',
    featured: false,
    order: 3
  }
];

const reviews = [
  {
    user: {
      name: 'Sarah Johnson',
      avatar: 'default-avatar.jpg'
    },
    rating: 5,
    text: 'The web development service was excellent! They delivered exactly what I wanted on time.',
    approved: true,
    featured: true
  },
  {
    user: {
      name: 'Michael Brown',
      avatar: 'default-avatar.jpg'
    },
    rating: 4,
    text: 'Great experience with the mobile app development team. Highly recommended!',
    approved: true,
    featured: true
  },
  {
    user: {
      name: 'Emily Davis',
      avatar: 'default-avatar.jpg'
    },
    rating: 5,
    text: 'The React JS course was comprehensive and well-structured. I learned a lot!',
    approved: true,
    featured: false
  }
];

// Import data
const importData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Service.deleteMany();
    await Training.deleteMany();
    await Review.deleteMany();

    // Import new data
    await User.create(users);
    await Service.create(services);
    await Training.create(trainings);
    await Review.create(reviews);

    console.log('Data imported successfully');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// Delete all data
const destroyData = async () => {
  try {
    await User.deleteMany();
    await Service.deleteMany();
    await Training.deleteMany();
    await Review.deleteMany();

    console.log('Data destroyed successfully');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// Determine which function to run based on command line arg
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
} 