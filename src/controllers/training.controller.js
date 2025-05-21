const Training = require('../models/training.model');
const path = require('path');
const fs = require('fs');

// @desc    Get all trainings
// @route   GET /api/trainings
// @access  Public
exports.getTrainings = async (req, res) => {
  try {
    const trainings = await Training.find().sort({ order: 1 });
    res.json(trainings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get featured trainings
// @route   GET /api/trainings/featured
// @access  Public
exports.getFeaturedTrainings = async (req, res) => {
  try {
    const trainings = await Training.find({ featured: true }).sort({ order: 1 });
    res.json(trainings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single training
// @route   GET /api/trainings/:id
// @access  Public
exports.getTrainingById = async (req, res) => {
  try {
    const training = await Training.findById(req.params.id);
    
    if (training) {
      res.json(training);
    } else {
      res.status(404).json({ message: 'Training not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a training
// @route   POST /api/trainings
// @access  Private/Admin
exports.createTraining = async (req, res) => {
  try {
    const { title, description, duration, price, discount, featured, order } = req.body;
    
    // Create new training
    const training = await Training.create({
      title,
      description,
      duration,
      price,
      discount: discount || 0,
      featured: featured || false,
      order: order || 0,
      // Handle image upload if implemented with multer
      imageUrl: req.file ? req.file.filename : 'default-training.jpg'
    });
    
    res.status(201).json(training);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a training
// @route   PUT /api/trainings/:id
// @access  Private/Admin
exports.updateTraining = async (req, res) => {
  try {
    const { title, description, duration, price, discount, featured, order } = req.body;
    
    // Find training by id
    const training = await Training.findById(req.params.id);
    
    if (!training) {
      return res.status(404).json({ message: 'Training not found' });
    }
    
    // Update training fields
    training.title = title || training.title;
    training.description = description || training.description;
    training.duration = duration || training.duration;
    training.price = price !== undefined ? price : training.price;
    training.discount = discount !== undefined ? discount : training.discount;
    training.featured = featured !== undefined ? featured : training.featured;
    training.order = order !== undefined ? order : training.order;
    
    // Handle image upload if present
    if (req.file) {
      // Delete old image if not default
      if (training.imageUrl !== 'default-training.jpg') {
        const imagePath = path.join(__dirname, '../../uploads', training.imageUrl);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
      training.imageUrl = req.file.filename;
    }
    
    // Save updated training
    const updatedTraining = await training.save();
    
    res.json(updatedTraining);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a training
// @route   DELETE /api/trainings/:id
// @access  Private/Admin
exports.deleteTraining = async (req, res) => {
  try {
    const training = await Training.findById(req.params.id);
    
    if (!training) {
      return res.status(404).json({ message: 'Training not found' });
    }
    
    // Remove image file if it exists
    if (training.imageUrl && training.imageUrl !== 'default-training.jpg') {
      const imagePath = path.join(__dirname, '../../uploads', training.imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    await Training.findByIdAndDelete(req.params.id);
    res.json({ message: 'Training removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}; 