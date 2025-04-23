const express = require('express');
const app = express();
const serverless = require('serverless-http'); // needed for Vercel

app.get('/', (req, res) => {
  res.send('Timestamp Microservice. Use /api or /api/:date');
});

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
    return res.json({ error: 'Invalid Date' });
  }

  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString()
  });
});

module.exports = serverless(app); // export handler for Vercel
