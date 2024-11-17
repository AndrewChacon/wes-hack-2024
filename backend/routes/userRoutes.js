const express = require('express');

const {
	getUsers,
	createUser,
	userLogin,
	createUserStats,
} = require('../controllers/userControllers');
const router = express.Router();
// @route GET /api/users
router.get('/', getUsers);

// @route POST /api/users
router.post('/', createUser);
router.post('/login', userLogin); // POST for user login
router.post('/userstats', createUserStats);

module.exports = router;
