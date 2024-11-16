const express = require('express');
const router = express.Router();
const { getUsers, createUser, userLogin } = require('../controllers/userControllers');

// @route GET /api/users
router.get('/', getUsers);

// @route POST /api/users
router.post('/', createUser);
router.post('/login', userLogin); // POST for user login

module.exports = router;
