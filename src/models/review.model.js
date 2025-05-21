const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: {
      name: {
        type: String,
        required: [true, 'Please add a name']
      },
      avatar: {
        type: String,
        default: 'default-avatar.jpg'
      }
    },
    rating: {
      type: Number,
      required: [true, 'Please add a rating between 1 and 5'],
      min: 1,
      max: 5
    },
    text: {
      type: String,
      required: [true, 'Please add review text']
    },
    approved: {
      type: Boolean,
      default: false
    },
    featured: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Review', reviewSchema); 