const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { getUsers, createUser } = require('./controllers/userController');
const User = require('./models/User');



// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/metrics', require('./routes/metricsRoutes'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
console.log('MONGO_URI:', process.env.MONGO_URI);