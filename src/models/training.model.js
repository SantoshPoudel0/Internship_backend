const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Please add a description']
    },
    imageUrl: {
      type: String,
      default: 'default-training.jpg'
    },
    duration: {
      type: String,
      required: [true, 'Please add duration']
    },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'All Levels'],
      default: 'All Levels'
    },
    learningTopics: {
      type: [String],
      default: []
    },
    instructor: {
      name: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
      bio: {
        type: String,
        default: ''
      },
      imageUrl: {
        type: String,
        default: 'default-instructor.jpg'
      }
    },
    price: {
      type: Number,
      required: [true, 'Please add a price']
    },
    discount: {
      type: Number,
      default: 0
    },
    featured: {
      type: Boolean,
      default: false
    },
    order: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Training', trainingSchema); 