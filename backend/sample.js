const mongoose = require('mongoose');
const User = require('./models/Users'); // Assuming your User model is in a file named User.js
require('dotenv').config();

// Sample data
const sampleUsers = [
  {
    name: 'devarshee special ai opps',
    email: 'skibeedeee',
    password: 'password123',
    points: 0,
    weight: 75,
    height: 175,
    age: 30,
    exercise_hours: 5,
    Activity_level: 'active',
    restrictions: 'None',
    conditions: 'Healthy',
    healthGoals: 'Build muscle',
    metrics: [
      {
        date: new Date(),
        weight: 75,
        sleepHours: 7,
        calorieIntake: 2500,
        steps: 10000,
        waterIntake: 2.5,
      },
    ],
    lifestyle: {
      smoking: false,
      alcoholConsumption: 'low',
      exerciseRoutine: 'Gym 3x/week',
    },
    badges: [],
    streaks: 0,
    challenges: [],
    pointLog: [],
  },
];

(async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    console.log('Cleared existing user data');

    // Add sample users
    const result = await User.insertMany(sampleUsers);
    console.log('Sample users added:', result);

    // Close connection properly
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (err) {
    console.error('Error:', err);
    // Ensure connection is closed even if an error occurs
    await mongoose.connection.close();
    console.log('MongoDB connection closed after error');
  }
})();
