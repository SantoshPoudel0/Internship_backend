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
    const { 
      title, description, duration, level, format, careerProspect, price, discount, featured, order, learningTopics,
      instructor 
    } = req.body;
    
    // Prepare instructor data
    const instructorData = instructor ? {
      name: instructor.name || '',
      title: instructor.title || '',
      bio: instructor.bio || '',
      imageUrl: 'default-instructor.jpg'
    } : {
      name: '',
      title: '',
      bio: '',
      imageUrl: 'default-instructor.jpg'
    };
    
    // Handle instructor image if uploaded
    if (req.files && req.files.instructorImage) {
      instructorData.imageUrl = req.files.instructorImage[0].filename;
    }
    
    // Create new training
    const training = await Training.create({
      title,
      description,
      duration,
      level: level || 'All Levels',
      format: format || 'Physical/Online Class',
      careerProspect: careerProspect || 'Industry Professional',
      price,
      discount: discount || 0,
      featured: featured || false,
      order: order || 0,
      learningTopics: learningTopics || [],
      instructor: instructorData,
      // Handle image upload
      imageUrl: req.files && req.files.image ? req.files.image[0].filename : 'default-training.jpg'
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
    const { 
      title, description, duration, level, format, careerProspect, price, discount, featured, order, learningTopics,
      instructor 
    } = req.body;
    
    // Find training by id
    const training = await Training.findById(req.params.id);
    
    if (!training) {
      return res.status(404).json({ message: 'Training not found' });
    }
    
    // Update training fields
    training.title = title || training.title;
    training.description = description || training.description;
    training.duration = duration || training.duration;
    training.level = level || training.level;
    training.format = format || training.format;
    training.careerProspect = careerProspect || training.careerProspect;
    training.price = price !== undefined ? price : training.price;
    training.discount = discount !== undefined ? discount : training.discount;
    training.featured = featured !== undefined ? featured : training.featured;
    training.order = order !== undefined ? order : training.order;
    training.learningTopics = learningTopics || training.learningTopics;
    
    // Update instructor fields
    if (instructor) {
      training.instructor = {
        ...training.instructor,
        name: instructor.name !== undefined ? instructor.name : training.instructor?.name,
        title: instructor.title !== undefined ? instructor.title : training.instructor?.title,
        bio: instructor.bio !== undefined ? instructor.bio : training.instructor?.bio
      };
    }
    
    // Handle image upload if present
    if (req.files && req.files.image) {
      // Delete old image if not default
      if (training.imageUrl !== 'default-training.jpg') {
        const imagePath = path.join(__dirname, '../../uploads', training.imageUrl);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
      training.imageUrl = req.files.image[0].filename;
    } else if (req.file) {
      // Handle single file upload
      // Delete old image if not default
      if (training.imageUrl !== 'default-training.jpg') {
        const imagePath = path.join(__dirname, '../../uploads', training.imageUrl);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
      training.imageUrl = req.file.filename;
    }

    // Handle instructor image upload if present
    if (req.files && req.files.instructorImage) {
      // Delete old instructor image if not default
      if (training.instructor && training.instructor.imageUrl && training.instructor.imageUrl !== 'default-instructor.jpg') {
        const imagePath = path.join(__dirname, '../../uploads', training.instructor.imageUrl);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
      training.instructor.imageUrl = req.files.instructorImage[0].filename;
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