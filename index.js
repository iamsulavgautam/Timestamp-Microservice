const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files (like HTML, CSS, JS)
app.use(express.static('public'));

// Endpoint for converting date
app.get('/api/timestamp/:date_string?', (req, res) => {
    try {
        let dateString = req.params.date_string;
        let date;

        // If the date_string is not provided, use the current date
        if (!dateString) {
            date = new Date();  // Current date
        } else {
            // Try parsing as Unix timestamp if it's a number with no letters
            if (/^\d+$/.test(dateString)) {
                date = new Date(parseInt(dateString));
            } else {
                date = new Date(dateString);
            }
        }

        // Check if the date is invalid using isNaN on getTime()
        if (isNaN(date.getTime())) {
            return res.json({ error: "Invalid Date" });
        }

        // Return the JSON response with both Unix and UTC format
        res.json({
            unix: date.getTime(),  // Unix timestamp
            utc: date.toUTCString()  // UTC date string
        });
    } catch (error) {
        res.json({ error: "Invalid Date" });
    }
});

// Catch-all route to handle 404s with JSON
app.use('*', (req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});