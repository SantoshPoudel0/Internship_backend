const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add your name'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please add your email'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email'
      ]
    },
    phone: {
      type: String,
      required: [true, 'Please add your phone number'],
      trim: true,
      match: [
        /^[+]?[\s./0-9()-]+$/,
        'Please provide a valid phone number'
      ]
    },
    subject: {
      type: String,
      required: [true, 'Please add a subject'],
      trim: true
    },
    message: {
      type: String,
      required: [true, 'Please add a message']
    },
    status: {
      type: String,
      enum: ['new', 'read', 'responded'],
      default: 'new'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Contact', contactSchema); 