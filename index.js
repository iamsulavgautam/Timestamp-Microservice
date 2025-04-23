const express = require('express');
const app = express();

// Root
app.get('/', (req, res) => {
  res.send('Timestamp Microservice. Use /api or /api/:date');
});

// Timestamp API
app.get('/api/:date?', (req, res) => {
  let { date } = req.params;
  let parsedDate;

  if (!date) {
    parsedDate = new Date();
  } else {
    // Check if it's a number (unix timestamp in milliseconds)
    if (/^\d+$/.test(date)) {
      parsedDate = new Date(parseInt(date));
    } else {
      parsedDate = new Date(date);
    }
  }

  // Invalid date check
  if (parsedDate.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString()
  });
});

module.exports = app;
