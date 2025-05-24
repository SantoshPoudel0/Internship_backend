const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const rateLimit = require('express-rate-limit');
const { 
  ValidationError, 
  AuthenticationError, 
  AuthorizationError, 
  NotFoundError, 
  ConflictError 
} = require('./src/utils/errors');

// Routes
const serviceRoutes = require('./src/routes/service.routes');
const trainingRoutes = require('./src/routes/training.routes');
const reviewRoutes = require('./src/routes/review.routes');
const contactRoutes = require('./src/routes/contact.routes');
const bookingRoutes = require('./src/routes/booking.routes');
const menuItemRoutes = require('./src/routes/menuItem.routes');
const adminRoutes = require('./src/routes/admin.routes');

// Seed data
const seedServices = require('./src/utils/seedServices');
const seedTrainings = require('./src/utils/seedTrainings');
const seedMenuItems = require('./src/utils/seedMenuItems');
const seedAdmin = require('./src/utils/seedAdmin');

// Load environment variables
dotenv.config();

// Connect to MongoDB with retry logic
const connectDB = async (retries = 5, timeout = 5000) => {
  for (let i = 0; i < retries; i++) {
    try {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/coffee_shop');
      console.log('Connected to MongoDB');
      
      // Seed data
      try {
        await seedAdmin();
        console.log('Admin seeding completed');
        
        if (process.env.SEED_DATA === 'true') {
          await seedServices();
          await seedTrainings();
          await seedMenuItems();
          console.log('Data seeding completed');
        }
      } catch (error) {
        console.error('Seeding error:', error);
      }
      
      return;
    } catch (err) {
      console.error(`MongoDB connection attempt ${i + 1} failed:`, err);
      if (i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, timeout));
      }
    }
  }
  throw new Error('Failed to connect to MongoDB');
};

connectDB().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

const app = express();

// Rate limiting - More lenient for development
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'production' ? 100 : 1000 // Higher limit for development
});

// Apply rate limiting to all routes
app.use(limiter);

// Login rate limit - More lenient for development
const loginLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: process.env.NODE_ENV === 'production' ? 5 : 100, // Higher limit for development
  message: { message: 'Too many login attempts, please try again later' }
});

// Apply to login endpoints
app.use('/api/admin/login', loginLimiter);

// CORS configuration
const corsOptions = {
  origin: true, // Allow all origins in development
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // 24 hours
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging in development
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
}

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/services', serviceRoutes);
app.use('/api/trainings', trainingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/menu-items', menuItemRoutes);
app.use('/api/admin', adminRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('API is running');
});

// 404 handler
app.use((req, res, next) => {
  next(new NotFoundError('Route not found'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  // Handle known error types
  if (err instanceof ValidationError ||
      err instanceof AuthenticationError ||
      err instanceof AuthorizationError ||
      err instanceof NotFoundError ||
      err instanceof ConflictError) {
    return res.status(err.status).json({
      error: err.name,
      message: err.message
    });
  }

  // Handle Mongoose validation errors
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      error: 'ValidationError',
      message: Object.values(err.errors).map(e => e.message)
    });
  }

  // Handle Mongoose duplicate key errors
  if (err.name === 'MongoError' && err.code === 11000) {
    return res.status(409).json({
      error: 'ConflictError',
      message: 'Duplicate entry found'
    });
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'AuthenticationError',
      message: 'Invalid token'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'AuthenticationError',
      message: 'Token expired'
    });
  }

  // Default error
  res.status(500).json({
    error: 'InternalServerError',
    message: process.env.NODE_ENV === 'production'
      ? 'Something went wrong'
      : err.message
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 