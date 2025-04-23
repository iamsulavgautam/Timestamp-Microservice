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
        // Check if the date_string is a valid date or a Unix timestamp
        // Parse as a Unix timestamp (if it's a number)
        date = isNaN(dateString) 
            ? new Date(dateString)  // If it's a string, parse it as a date string
            : new Date(parseInt(dateString)); // If it's a number, parse as a Unix timestamp
    }

    // Check if the date is invalid
    if (date.getTime() !== date.getTime()) {  // This checks for an invalid date
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
