const express = require('express');
const { addMetrics, getMetrics, updateLifestyle } = require('../controllers/metricsController');
const { protect } = require('../middleware/authMiddleware'); // Updated destructuring

const router = express.Router();

router.post('/metrics', protect, addMetrics); // Add daily/weekly metrics
router.get('/metrics', protect, getMetrics); // Get user metrics
router.put('/lifestyle', protect, updateLifestyle); // Update lifestyle choices

module.exports = router;
