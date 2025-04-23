// api/timestamp.js
const express = require('express');
const app = express();

// Endpoint for converting date
app.get('/api/timestamp/:date_string?', (req, res) => {
    try {
        let dateString = req.params.date_string;
        let date;

        // If the date_string is not provided, use the current date
        if (!dateString) {
            date = new Date();
        } else {
            // Try parsing as Unix timestamp if it's a number with no letters
            if (/^\d+$/.test(dateString)) {
                date = new Date(parseInt(dateString));
            } else {
                date = new Date(dateString);
            }
        }

        // Check if the date is invalid
        if (isNaN(date.getTime())) {
            return res.status(400).json({ error: "Invalid Date" });
        }

        // Return the JSON response
        res.json({
            unix: date.getTime(),
            utc: date.toUTCString()
        });
    } catch (error) {
        res.status(400).json({ error: "Invalid Date" });
    }
});

// For Vercel serverless functions
module.exports = app;