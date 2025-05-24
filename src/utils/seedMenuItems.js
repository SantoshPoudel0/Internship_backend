const MenuItem = require('../models/menuItem.model');

const sampleMenuItems = [
  {
    name: 'Americano',
    price: 150,
    description: 'A classic espresso diluted with hot water, served hot.',
    category: 'Coffee',
    imageUrl: 'default-menu-item.jpg',
    featured: true,
    available: true
  },
  {
    name: 'Blended Mocha',
    price: 315,
    description: 'A delicious blend of chocolate, espresso, and milk, topped with whipped cream.',
    category: 'Coffee',
    imageUrl: 'default-menu-item.jpg',
    featured: true,
    available: true
  },
  {
    name: 'Cappucino',
    price: 185,
    description: 'Equal parts espresso, steamed milk, and foamed milk for a perfect balance.',
    category: 'Coffee',
    imageUrl: 'default-menu-item.jpg',
    featured: false,
    available: true
  },
  {
    name: 'Caffe Latte',
    price: 180,
    description: 'Espresso with steamed milk and a thin layer of foamed milk on top.',
    category: 'Coffee',
    imageUrl: 'default-menu-item.jpg',
    featured: false,
    available: true
  },
  {
    name: 'Milk Tea',
    price: 80,
    description: 'Black tea with steamed milk and optional sweetener.',
    category: 'Tea',
    imageUrl: 'default-menu-item.jpg',
    featured: false,
    available: true
  },
  {
    name: 'Croissant',
    price: 120,
    description: 'Flaky, buttery French pastry, perfect with coffee.',
    category: 'Pastry',
    imageUrl: 'default-menu-item.jpg',
    featured: true,
    available: true
  },
  {
    name: 'Baguette',
    price: 120,
    description: 'Traditional French bread with a crispy crust and soft interior.',
    category: 'Pastry',
    imageUrl: 'default-menu-item.jpg',
    featured: false,
    available: true
  },
  {
    name: 'Cheese Cake',
    price: 300,
    description: 'Creamy cheesecake with a graham cracker crust.',
    category: 'Dessert',
    imageUrl: 'default-menu-item.jpg',
    featured: true,
    available: true
  },
  {
    name: 'Brownie with Ice Cream',
    price: 280,
    description: 'Warm chocolate brownie served with vanilla ice cream.',
    category: 'Dessert',
    imageUrl: 'default-menu-item.jpg',
    featured: false,
    available: true
  }
];

const seedMenuItems = async () => {
  try {
    // Only seed if there are no menu items in the database
    const count = await MenuItem.countDocuments();
    
    if (count === 0) {
      await MenuItem.insertMany(sampleMenuItems);
      console.log('Menu items seeded successfully');
    } else {
      console.log('Menu items already exist, skipping seed');
    }
  } catch (error) {
    console.error('Menu items seed error:', error);
  }
};

module.exports = seedMenuItems; 