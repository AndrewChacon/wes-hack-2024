const User = require('../models/Users');

// Add new metrics
const addMetrics = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.metrics.push(req.body);
        await user.save();
        res.status(200).json({ message: 'Metrics added successfully', metrics: user.metrics });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add metrics', error: error.message });
    }
};

// Get user metrics
const getMetrics = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json(user.metrics);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve metrics', error: error.message });
    }
};

// Update lifestyle choices
const updateLifestyle = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.lifestyle = req.body;
        await user.save();
        res.status(200).json({ message: 'Lifestyle updated successfully', lifestyle: user.lifestyle });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update lifestyle', error: error.message });
    }
};

module.exports = { addMetrics, getMetrics, updateLifestyle };