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
        date = new Date();  // Current date
    } else {
        // Try parsing as Unix timestamp first
        date = isNaN(dateString) 
            ? new Date(dateString)  // If it's a string, parse as date string
            : new Date(parseInt(dateString)); // If it's a number, parse as Unix timestamp
    }

    // If the date is invalid, return an error
    if (date.toString() === 'Invalid Date') {
        return res.json({ error: 'Invalid Date' });
    }

    // Return the JSON response with both Unix and UTC format
    res.json({
        unix: date.getTime(),  // Unix timestamp
        utc: date.toUTCString()  // UTC date string
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
