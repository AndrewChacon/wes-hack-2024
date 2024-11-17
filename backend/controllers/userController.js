const User = require('../models/User');

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Create a new user
const createUser = async (req, res) => {
    const { name, email, password, age, height, weight, conditions, healthGoals } = req.body;

    try {
        const newUser = new User({ name, email, password, age, height, weight, conditions, healthGoals });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

module.exports = { getUsers, createUser };
