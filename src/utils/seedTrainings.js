const mongoose = require('mongoose');
const Training = require('../models/training.model');

// Seed data for trainings
const seedTrainings = async () => {
  try {
    // Check if trainings already exist
    const count = await Training.countDocuments();
    
    // Only seed if no trainings exist
    if (count === 0) {
      console.log('Seeding trainings data...');
      
      const trainings = [
        {
          title: 'MERN Stack Training in Nepal',
          description: 'Learn MongoDB, Express.js, React.js, and Node.js stack from experienced developers. This comprehensive course covers both frontend and backend development.',
          duration: '3 months',
          price: 25000,
          discount: 0,
          featured: true,
          order: 1
        },
        {
          title: 'Python with Django Training in Nepal',
          description: 'Master Python programming language and Django web framework to build robust web applications. Learn from industry experts with practical projects.',
          duration: '2.5 months',
          price: 22000,
          discount: 2000,
          featured: true,
          order: 2
        },
        {
          title: 'Digital Marketing Training in Nepal',
          description: 'Learn SEO, social media marketing, content marketing, and online advertising strategies to grow businesses in the digital world.',
          duration: '2.5 months',
          price: 18000,
          discount: 0,
          featured: true,
          order: 3
        },
        {
          title: 'Quality Assurance Training in Nepal',
          description: 'Learn software testing methodologies, automation tools, and quality assurance best practices to ensure software quality and reliability.',
          duration: '2.5 months',
          price: 20000,
          discount: 1500,
          featured: true,
          order: 4
        }
      ];
      
      await Training.insertMany(trainings);
      console.log('Trainings data seeded successfully');
    } else {
      console.log('Trainings data already exists, skipping seed');
    }
  } catch (error) {
    console.error('Error seeding trainings data:', error);
  }
};

module.exports = seedTrainings; 