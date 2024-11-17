const mongoose = require('mongoose');

// Sub-schema for health metrics
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

// Main user schema
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
    age: { type: Number, required: true },
    exercise_hours: {type: Number, required: true},
    Activity_level: {type: String, required: true},
    restrictions: {type: String, required: true},
    conditions: { type: String, required: false },
    healthGoals: { type: String, required: false },
    metrics: [MetricsSchema],
    lifestyle: LifestyleSchema,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
