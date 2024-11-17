const mongoose = require('mongoose');
//weight, height, age, exercise_hours, Activity_level, restrictions, conditions, healthGoals, metrics:[MetricsSchema], lifestyle: LifestyleSchema, createdAt: 
const MetricsSchema = new mongoose.Schema({
	date: { type: Date, default: Date.now },
	weight: { type: Number, required: false },
	sleepHours: { type: Number, required: false },
	calorieIntake: { type: Number, required: false },
	steps: { type: Number, required: false },
	waterIntake: { type: Number, required: false },
});

// Sub-schema for lifestyle choices
const LifestyleSchema = new mongoose.Schema({
	smoking: { type: Boolean, default: false },
	alcoholConsumption: {
		type: String,
		enum: ['none', 'low', 'moderate', 'high'],
		default: 'none'
	},
	exerciseRoutine: { type: String, required: false },
});
const UserSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true }, // for auth
	createdAt: { type: Date, default: Date.now }, // user registration date
	points: { type: Number, default: 0 }, // points user has on app
	weight: { type: Number, required: true },
	height: { type: Number, required: true },
	age: { type: Number, required: true },
	exercise_hours: { type: Number, required: true },
	Activity_level: { type: String, required: true },
	restrictions: { type: String, required: true },
	conditions: { type: String, required: false },
	healthGoals: { type: String, required: false },
	metrics: [MetricsSchema],
	lifestyle: LifestyleSchema,
	createdAt: { type: Date, default: Date.now },
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

