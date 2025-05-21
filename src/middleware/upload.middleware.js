const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // Create unique filename with original extension
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  }
});

// Check file type
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: Images only (jpeg, jpg, png, gif, webp)!');
  }
};

// Create upload instances
const uploadSingle = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5000000 } // 5MB
}).single('image');

const uploadMultiple = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5000000 } // 5MB
}).fields([
  { name: 'image', maxCount: 1 },
  { name: 'icon', maxCount: 1 }
]);

module.exports = {
  uploadSingle,
  uploadMultiple
}; 