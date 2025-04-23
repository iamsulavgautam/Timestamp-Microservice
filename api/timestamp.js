const express = require('express');
const router = express.Router();

// API endpoint for timestamp conversion
router.get('/:date_string?', (req, res) => {
    try {
        let dateString = req.params.date_string;
        let date;

        // If no date_string is provided, use current date
        if (!dateString) {
            date = new Date();
        } else {
            // Try parsing as Unix timestamp if it's a number
            if (/^\d+$/.test(dateString)) {
                date = new Date(parseInt(dateString));
            } else {
                date = new Date(dateString);
            }
        }

        // Check if date is invalid
        if (isNaN(date.getTime())) {
            return res.json({ error: "Invalid Date" });
        }

        // Return JSON response
        res.json({
            unix: date.getTime(),
            utc: date.toUTCString()
        });
    } catch (error) {
        res.json({ error: "Invalid Date" });
    }
});

module.exports = router;