const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true }, // for auth
	createdAt: { type: Date, default: Date.now }, // user registration date
	points: { type: Number, default: 0 }, // points user has on app
	badges: { type: [String], default: [] }, // potential feature, later implement, badges
	streaks: { type: Number, default: 0 }, // potential feature, later implement, streaks
	lastLogin: { type: Date },
	challenges: [ // challenge feature
		{
			description: String,
			completed: { type: Boolean, default: false },
			progress: { type: Number, default: 0 },
			target: Number,
		}
	],
	pointLog: [ // Log each point-awarding activity tracking points
		{
			activity: { type: String, required: true }, // e.g., "daily-login"
			points: { type: Number, required: true }, // points earned for this activity
			date: { type: Date, default: Date.now }, // date of the activity
		}
	],
});

module.exports = mongoose.model('User', UserSchema);

