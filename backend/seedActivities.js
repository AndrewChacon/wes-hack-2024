const mongoose = require('mongoose');
const Activity = require('./models/Activity'); // Adjust path based on location

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const seedActivities = async () => {
    const activities = [
        { name: 'daily-login', points: 10 },
        { name: 'task-completion', points: 50 },
        { name: 'milestone-reached', points: 100 },
    ];

    try {
        // Insert activity data into the Activity collection
        await Activity.insertMany(activities);
        console.log('Activities seeded successfully');
    } catch (err) {
        console.error('Error seeding activities:', err);
    } finally {
        mongoose.connection.close(); // Ensure the connection is closed
    }
};
// Run the seeding function

seedActivities();
