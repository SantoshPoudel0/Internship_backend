const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
      min: 0
    },
    description: {
      type: String,
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
      enum: ['Coffee', 'Tea', 'Pastry', 'Dessert', 'Snack', 'Other'],
      default: 'Coffee'
    },
    imageUrl: {
      type: String,
      default: 'default-menu-item.jpg'
    },
    available: {
      type: Boolean,
      default: true
    },
    displayOrder: {
      type: Number,
      default: 9999 // Default to a high number so new items appear at the end
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('MenuItem', menuItemSchema); 