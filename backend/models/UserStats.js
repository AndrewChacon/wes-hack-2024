const mongoose = require('mongoose');

const userStatsSchema = new mongoose.Schema(
	{
		weight: {
			type: Number,
			required: true,
		}, // User's weight in kg or lbs
		height: {
			type: Number,
			required: true,
		}, // User's height in cm or inches
		age: {
			type: Number,
			required: true,
		}, // User's age
		dietaryRestrictions: {
			type: [String],
			default: [],
		}, // Array to store dietary restrictions like 'vegetarian', 'gluten-free'
		healthConditions: {
			type: [String],
			default: [],
		}, // Array for health conditions like 'diabetes', 'hypertension'
		exerciseHours: {
			type: Number,
			default: 0,
		}, // Weekly exercise hours, defaults to 0
		activityLevel: {
			type: String,
			required: true,
			enum: ['low', 'moderate', 'high', 'Very Active'],
		}, // User's activity level, restricted to valid options
	},
	{
		timestamps: true, // Automatically creates `createdAt` and `updatedAt` fields
	}
);

module.exports = mongoose.model('UserStats', userStatsSchema);
