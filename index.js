// index.js
const express = require('express');
const app = express();

app.get('/api/:date?', (req, res) => {
  const { date } = req.params;

  let parsedDate;
  if (!date) {
    parsedDate = new Date();
  } else if (!isNaN(date)) {
    parsedDate = new Date(parseInt(date));
  } else {
    parsedDate = new Date(date);
  }

  if (parsedDate.toString() === 'Invalid Date') {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString()
  });
});

module.exports = app;
