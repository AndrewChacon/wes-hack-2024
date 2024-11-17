const axios = require('axios');

// Test data to send to your `/api/users` endpoint
const testUser = {
  name: "John Doe",
  email: "johndoe@example.com",
  password: "securepassword123",
  age: 30,
  height: 170,
  weight: 70,
  exercise_hours: 5,
  Activity_level: "Moderate",
  restrictions: "None",
  conditions: "None",
  healthGoals: "Lose weight",
};

// Function to send data to the endpoint
const testEndpoint = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/users', testUser);
    console.log('Response from server:', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
};

testEndpoint();
