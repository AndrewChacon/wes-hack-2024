const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// @desc Get all users
// @route GET /api/users
const getUsers = async (req, res) => {
	try {
		const users = await User.find().select('-password -__v'); // Exclude password and Mongoose version key
		res.json(users);
	} catch (err) {
		console.error('Error fetching users:', err);
		res.status(500).json({ message: 'Server error' });
	}
};
const userLogin = async (req, res) => {
	const { email, password } = req.body; // Destructure email and password from request body

	try {
		// Find user by email
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		// Check if password is correct
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		// Generate JWT
		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: '1d', // Token validity
		});

		// Update last login
		user.lastLogin = new Date();
		await user.save();

		res.status(200).json({
			message: 'Login successful',
			token,
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				lastLogin: user.lastLogin,
			},
		});
	} catch (error) {
		console.error('Error during login:', error);
		res.status(500).json({ message: 'Server error' });
	}
};


// @desc Create a new user
// @route POST /api/users
const createUser = async (req, res) => {
	const { name, email, password } = req.body;

	try {
		// Check if email already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) return res.status(400).json({ message: 'Email already in use' });

		// Hash the password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// Create the new user
		const newUser = new User({ name, email, password: hashedPassword });
		await newUser.save();

		res.status(201).json({ message: 'User created successfully', userId: newUser._id });
	} catch (err) {
		console.error('Error creating user:', err);
		res.status(500).json({ message: 'Server error' });
	}
};

module.exports = { getUsers, createUser };
