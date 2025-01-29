const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000; // Ensure this matches the port in your config.js

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Define the register endpoint
app.post('/api/auth/register', (req, res) => {
    const { name, email, password, phone } = req.body;

    // Here you would typically handle the registration logic, such as saving the user to a database
    // For this example, we'll just return a dummy token

    if (name && email && password && phone) {
        res.json({ authtoken: 'dummy-token' });
    } else {
        res.status(400).json({ error: 'All fields are required' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
