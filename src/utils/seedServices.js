const mongoose = require('mongoose');
const Service = require('../models/service.model');

// Seed data for services
const seedServices = async () => {
  try {
    // Check if services already exist
    const count = await Service.countDocuments();
    
    // Only seed if no services exist
    if (count === 0) {
      console.log('Seeding services data...');
      
      const services = [
        {
          title: 'Nepali Coffee Beans',
          description: 'Himalayan Java offers its customers with locally brewed taste.',
          icon: 'default-icon.png',
          featured: true,
          order: 1
        },
        {
          title: 'Barista Training',
          description: 'Himalayan Java Barista Coffee School was introduced to promote the culture of vocational training in Nepal.',
          icon: 'default-icon.png',
          featured: true,
          order: 2
        },
        {
          title: 'Bakery Equipments',
          description: 'Himalayan Java is the sole distributor of various coffee equipment and products in Nepal.',
          icon: 'default-icon.png', 
          featured: true,
          order: 3
        },
        {
          title: 'Fresh Bakery Items',
          description: 'We provide you a wide variety of fresh bakery items.',
          icon: 'default-icon.png',
          featured: true,
          order: 4
        }
      ];
      
      await Service.insertMany(services);
      console.log('Services data seeded successfully');
    } else {
      console.log('Services data already exists, skipping seed');
    }
  } catch (error) {
    console.error('Error seeding services data:', error);
  }
};

module.exports = seedServices; 