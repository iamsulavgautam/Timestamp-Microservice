// index.js

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files (like HTML, CSS, JS)
app.use(express.static('public'));

// Endpoint for converting date
app.get('/api/timestamp/:date_string?', (req, res) => {
    let dateString = req.params.date_string;
    let date;

    // If the date_string is not provided, use the current date
    if (!dateString) {
        date = new Date();
    } else {
        // Check if the date_string is a valid date or a Unix timestamp
        date = isNaN(dateString) 
            ? new Date(dateString) 
            : new Date(parseInt(dateString));
    }

    // If the date is invalid, return an error
    if (date.toString() === 'Invalid Date') {
        return res.json({ error: 'Invalid Date' });
    }

    // Return the JSON response with both Unix and natural format
    res.json({
        unix: date.getTime(),
        utc: date.toUTCString()
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

