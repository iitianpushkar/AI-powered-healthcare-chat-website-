const express = require('express');
const axios = require('axios');
const cors = require("cors");

const app = express();

const corsOptions = {
    origin: "http://localhost:5173", // Allow requests from this origin
};

app.use(cors(corsOptions));
app.use(express.json()); // Ensure JSON body parsing is enabled

// Define the API endpoint
const apiEndpoint = "http://localhost:8000/v1/pw_ai_answer";

// Handle POST requests to "/"
app.post('/', async (req, res) => {
  try {
    const { prompt } = req.body; // Destructure the prompt from req.body

    // Make the POST request to the API
    const response = await axios.post(apiEndpoint, { prompt }, {
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json'
      }
    });

    // Log the response data to the console
    console.log('Response from API:', response.data);

    // Send the API response back to the client
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error making POST request:', error);

    // Send an error response to the client
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Express server is running on http://localhost:3000');
});
