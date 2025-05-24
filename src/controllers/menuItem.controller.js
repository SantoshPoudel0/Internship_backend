const MenuItem = require('../models/menuItem.model');
const path = require('path');
const fs = require('fs');

// @desc    Get all menu items
// @route   GET /api/menu
// @access  Public
exports.getMenuItems = async (req, res) => {
  try {
    // Build filter object
    const filter = {};
    
    // Category filter
    if (req.query.category) {
      filter.category = req.query.category;
    }
    
    // Featured filter
    if (req.query.featured === 'true') {
      filter.featured = true;
    }
    
    // Available filter
    if (req.query.available === 'true') {
      filter.available = true;
    }
    
    const menuItems = await MenuItem.find(filter).sort({ displayOrder: 1, category: 1, name: 1 });
    res.json(menuItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single menu item
// @route   GET /api/menu/:id
// @access  Public
exports.getMenuItemById = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    
    if (menuItem) {
      res.json(menuItem);
    } else {
      res.status(404).json({ message: 'Menu item not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a menu item
// @route   POST /api/menu
// @access  Private/Admin
exports.createMenuItem = async (req, res) => {
  try {
    const { name, price, description, category, featured, available, displayOrder } = req.body;
    
    // Handle image upload
    let imageUrl = 'default-menu-item.jpg';
    if (req.file) {
      imageUrl = req.file.filename;
    }
    
    const menuItem = await MenuItem.create({
      name,
      price,
      description,
      category,
      imageUrl,
      featured: featured === 'true',
      available: available === 'true',
      displayOrder: displayOrder !== undefined ? Number(displayOrder) : 9999
    });
    
    res.status(201).json(menuItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a menu item
// @route   PUT /api/menu/:id
// @access  Private/Admin
exports.updateMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    
    const { name, price, description, category, featured, available, displayOrder } = req.body;
    
    // Handle image upload and replace if necessary
    if (req.file) {
      // If there's a previous image that's not the default, delete it
      if (menuItem.imageUrl && menuItem.imageUrl !== 'default-menu-item.jpg') {
        const oldImagePath = path.join(__dirname, '../../uploads', menuItem.imageUrl);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      menuItem.imageUrl = req.file.filename;
    }
    
    menuItem.name = name || menuItem.name;
    menuItem.price = price !== undefined ? price : menuItem.price;
    menuItem.description = description !== undefined ? description : menuItem.description;
    menuItem.category = category || menuItem.category;
    menuItem.featured = featured === 'true';
    menuItem.available = available === 'true';
    menuItem.displayOrder = displayOrder !== undefined ? Number(displayOrder) : menuItem.displayOrder;
    
    const updatedMenuItem = await menuItem.save();
    res.json(updatedMenuItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a menu item
// @route   DELETE /api/menu/:id
// @access  Private/Admin
exports.deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Menu item removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}; 