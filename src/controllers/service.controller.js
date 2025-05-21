const Service = require('../models/service.model');
const path = require('path');
const fs = require('fs');

// @desc    Get all services
// @route   GET /api/services
// @access  Public
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1 });
    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get featured services
// @route   GET /api/services/featured
// @access  Public
exports.getFeaturedServices = async (req, res) => {
  try {
    const services = await Service.find({ featured: true }).sort({ order: 1 });
    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single service
// @route   GET /api/services/:id
// @access  Public
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    
    if (service) {
      res.json(service);
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a service
// @route   POST /api/services
// @access  Private/Admin
exports.createService = async (req, res) => {
  try {
    const { title, description, featured, order } = req.body;
    
    // Create new service
    const service = await Service.create({
      title,
      description,
      featured: featured || false,
      order: order || 0,
      // Handle image upload if implemented with multer
      icon: req.files?.icon ? req.files.icon[0].filename : 'default-icon.png',
      imageUrl: req.files?.image ? req.files.image[0].filename : 'default-service.jpg'
    });
    
    res.status(201).json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a service
// @route   PUT /api/services/:id
// @access  Private/Admin
exports.updateService = async (req, res) => {
  try {
    const { title, description, featured, order } = req.body;
    
    // Find service by id
    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    // Update service fields
    service.title = title || service.title;
    service.description = description || service.description;
    service.featured = featured !== undefined ? featured : service.featured;
    service.order = order !== undefined ? order : service.order;
    
    // Handle icon upload if present
    if (req.files?.icon) {
      // Delete old icon if not default
      if (service.icon !== 'default-icon.png') {
        const iconPath = path.join(__dirname, '../../uploads', service.icon);
        if (fs.existsSync(iconPath)) {
          fs.unlinkSync(iconPath);
        }
      }
      service.icon = req.files.icon[0].filename;
    }
    
    // Handle image upload if present
    if (req.files?.image) {
      // Delete old image if not default
      if (service.imageUrl !== 'default-service.jpg') {
        const imagePath = path.join(__dirname, '../../uploads', service.imageUrl);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
      service.imageUrl = req.files.image[0].filename;
    }
    
    // Save updated service
    const updatedService = await service.save();
    
    res.json(updatedService);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  Private/Admin
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    // Remove image file if it exists
    if (service.imageUrl && service.imageUrl !== 'default-service.jpg') {
      const imagePath = path.join(__dirname, '../../uploads', service.imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}; 