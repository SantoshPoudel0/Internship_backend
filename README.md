# Backend Server for Training and Services Website

This is the backend server for a training and services website built with Node.js, Express, and MongoDB.

## Features

- RESTful API for services, trainings, reviews, and contact form
- User authentication with JWT
- Admin panel API endpoints
- File uploads for images
- Data validation and error handling

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```
   cd backend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the root directory with the following variables:
   ```
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/internship_task
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=30d
   ```

### Running the Server

- Development mode:
  ```
  npm run dev
  ```
- Production mode:
  ```
  npm start
  ```

### Seeding the Database

- Import sample data:
  ```
  npm run data:import
  ```
- Delete all data:
  ```
  npm run data:destroy
  ```

## API Endpoints

### Authentication

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user and get token
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)

### Services

- `GET /api/services` - Get all services
- `GET /api/services/featured` - Get featured services
- `GET /api/services/:id` - Get single service
- `POST /api/services` - Create a service (admin only)
- `PUT /api/services/:id` - Update a service (admin only)
- `DELETE /api/services/:id` - Delete a service (admin only)

### Trainings

- `GET /api/trainings` - Get all trainings
- `GET /api/trainings/featured` - Get featured trainings
- `GET /api/trainings/:id` - Get single training
- `POST /api/trainings` - Create a training (admin only)
- `PUT /api/trainings/:id` - Update a training (admin only)
- `DELETE /api/trainings/:id` - Delete a training (admin only)

### Reviews

- `GET /api/reviews` - Get all approved reviews
- `GET /api/reviews/featured` - Get featured reviews
- `GET /api/reviews/:id` - Get single review
- `POST /api/reviews` - Submit a review
- `GET /api/reviews/admin/all` - Get all reviews including unapproved (admin only)
- `PUT /api/reviews/:id` - Update a review (admin only)
- `DELETE /api/reviews/:id` - Delete a review (admin only)

### Contact

- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact submissions (admin only)
- `GET /api/contact/:id` - Get single contact submission (admin only)
- `PUT /api/contact/:id` - Update contact status (admin only)
- `DELETE /api/contact/:id` - Delete a contact submission (admin only)

### Admin

- `GET /api/admin/dashboard` - Get dashboard data (admin only)
- `GET /api/admin/users` - Get all users (admin only)
- `POST /api/admin/users` - Create a user (admin only)
- `GET /api/admin/users/:id` - Get user by ID (admin only)
- `PUT /api/admin/users/:id` - Update user (admin only)
- `DELETE /api/admin/users/:id` - Delete user (admin only) 