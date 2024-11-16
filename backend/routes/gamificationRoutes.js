const express = require('express');
const { awardPoints, updateStreak, addTask, completeTask } = require('../controllers/gamificationController');
const protect = require('../middleware/authMiddleware'); // For authentication
const validatePoints = require('../middleware/validatePoints'); // For points validation

const router = express.Router();
//protect for authetnicated users.
//validpoints to make sure user has correct amount of points

// Route to add a task
router.post('/add-task', protect, addTask);

// Route to award points
router.post('/award-points', protect, validatePoints, awardPoints);

// Route to mark a task as completed
router.post('/complete-task', protect, completeTask);

// Route to update user streak
router.post('/update-streak', protect, updateStreak);

//awarding points and updating streak
module.exports = router;

