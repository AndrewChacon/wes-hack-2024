require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/Users'); // Adjust the path based on your project structure

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    return seedDatabase();
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  })
  .finally(() => {
    mongoose.connection.close(() => {
      console.log('Connection to MongoDB closed');
    });
  });

// Function to seed the database with sample data
async function seedDatabase() {
  try {
    // Clear existing data
    await User.deleteMany({});
    console.log('Cleared existing user data');

    // Add sample users
    const users = [
      {
        name: 'devarshee special ai opps',
        email: 'skibeedeee',
        password: 'password123',
        weight: 75,
        height: 175,
        age: 30,
        exercise_hours: 5,
        Activity_level: 'active',
        restrictions: 'None',
        conditions: 'Healthy',
        healthGoals: 'Build muscle',
        metrics: [
          { weight: 75, sleepHours: 7, calorieIntake: 2000, steps: 10000, waterIntake: 2.5 },
        ],
        lifestyle: { smoking: false, alcoholConsumption: 'low', exerciseRoutine: 'Gym 3x/week' },
      }
      
    ]

    const result = await User.insertMany(users);
    console.log('Sample users added:', result);
  } catch (err) {
    console.error('Error seeding the database:', err);
  }
}
