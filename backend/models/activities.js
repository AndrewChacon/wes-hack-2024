const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // E.g., "daily-login"
    points: { type: Number, required: true }, // Points for the activity
    description: { type: String }, // Optional description
});

module.exports = mongoose.model('Activity', activitySchema);
