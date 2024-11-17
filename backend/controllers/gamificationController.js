const Activity = require('../models/activities');
const User = require('../models/Users');

// Add a new task to a user
exports.addTask = async (req, res) => {
    const { userId, description } = req.body; // Receive user ID and task description

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Add a new task
        user.tasks.push({ description });

        // Save the updated user document
        await user.save();

        res.status(201).json({ message: 'Task added', tasks: user.tasks });
    } catch (error) {
        console.error('Error adding task:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.completeTask = async (req, res) => {
    const { userId, taskId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const task = user.tasks.id(taskId);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        if (task.completed) return res.status(400).json({ message: 'Task already completed' });

        task.completed = true;
        task.dateCompleted = new Date();

        await user.save();

        res.status(200).json({ message: 'Task completed', task });
    } catch (error) {
        console.error('Error completing task:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.awardPoints = async (req, res) => {
    const { userId, activity } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Fetch points dynamically from the Activity collection
        const activityData = await Activity.findOne({ name: activity });
        if (!activityData) return res.status(400).json({ message: 'Invalid activity type' });

        const points = activityData.points;

        // Update user points 
        user.points += points;

        // Optionally log the activity 
        user.pointLog.push({
            activity: activityData.name,
            points,
        });
        await user.save();

        res.status(200).json({
            message: 'Points awarded',
            totalPoints: user.points,
            pointLog: user.pointLog,
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};



// Update Streaks
exports.updateStreak = async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const lastLogDate = user.lastLog || new Date(0);
        const today = new Date();

        if ((today - lastLogDate) / (1000 * 60 * 60 * 24) > 1) {
            user.streaks = 0; // Reset streak if more than a day has passed
        } else {
            user.streaks += 1; // Increment streak
        }

        user.lastLog = today;
        await user.save();
        res.status(200).json({ streaks: user.streaks });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
