const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// @desc Get all users
// @route GET /api/users
const getUsers = async (req, res) => {
	try {
		const users = await User.find().select('-password -__v'); // Exclude sensitive data
		if (!users || users.length === 0) {
			return res.status(404).json({ message: 'No users found' });
		}
		res.json(users);
	} catch (err) {
		console.error('Error fetching users:', err);
		res.status(500).json({ message: 'Server error' });
	}
};

const userLogin = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res
			.status(400)
			.json({ message: 'Email and password are required' });
	}

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ message: 'Invalid credentials' }); // Generic error for security
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: '1d',
		});

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
	} catch (err) {
		console.error('Error during login:', err);
		res.status(500).json({ message: 'Server error' });
	}
};

// @desc Create a new user
// @route POST /api/users
const createUser = async (req, res) => {
	const { name, email, password } = req.body;

	// Validate required fields
	if (!name || !email || !password) {
		return res
			.status(400)
			.json({ message: 'Name, email, and password are required' });
	}

	try {
		// Check if the email is already in use
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: 'Email already in use' });
		}

		// Hash the password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// Create a new user
		const newUser = new User({ name, email, password: hashedPassword });
		await newUser.save();

		// Respond with success
		res.status(201).json({
			message: 'User created successfully',
			userId: newUser._id,
		});
	} catch (err) {
		console.error('Error creating user:', err);
		res.status(500).json({ message: 'Server error' });
	}
};

module.exports = { getUsers, createUser, userLogin };
