const express = require('express');
const router = express.Router();
const { getUsers, createUser } = require('../controllers/userController');

// @route GET /api/users
router.get('/', getUsers);

// @route POST /api/users
router.post('/', createUser);

module.exports = router;
