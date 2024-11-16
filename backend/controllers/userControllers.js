const User = require('../models/User');

// @desc Get all users
// @route GET /api/users
const getUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (err) {
		res.status(500).json({ message: 'Server error' });
	}
};

// @desc Create a new user
// @route POST /api/users
const createUser = async (req, res) => {
	const { name, email, password } = req.body;

	try {
		const newUser = new User({ name, email, password });
		await newUser.save();
		res.status(201).json(newUser);
	} catch (err) {
		res.status(500).json({ message: 'Error creating user' });
	}
};

module.exports = { getUsers, createUser };
