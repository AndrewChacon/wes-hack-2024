const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors'); // Enable CORS
const helmet = require('helmet'); // Secure HTTP headers
const morgan = require('morgan'); // Logging
const gamificationRoutes = require('./routes/gamificationRoutes'); // Gamification routes
const User = require('./models/Users');
const { getUsers, createUser } = require('./controllers/userControllers');
const userRoutes = require('./routes/userRoutes'); // User routes
const metricsRoutes = require('./routes/metricsRoutes');

// Load environment variables
dotenv.config();

// Validate required environment variables
if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined in .env');
}

// Connect to the database
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS
app.use(helmet()); // Set secure HTTP headers
app.use(morgan('dev')); // Log HTTP requests

// Routes
app.use('/api/users', userRoutes); // Mount user routes
app.use('/api/gamification', gamificationRoutes); // Mount gamification routes
app.use('/api/metrics', require('./routes/metricsRoutes'))

// 404 Handler for unmatched routes
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(`Error: ${err.message}`);
    res.status(err.status || 500).json({ message: err.message || 'Server Error' });
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
