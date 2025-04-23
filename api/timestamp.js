// /api/timestamp.js
export default function handler(req, res) {
    let dateParam = req.query.date;
  
    let date;
    if (!dateParam) {
      date = new Date();
    } else if (!isNaN(dateParam)) {
      date = new Date(parseInt(dateParam));
    } else {
      date = new Date(dateParam);
    }
  
    if (isNaN(date.getTime())) {
      res.status(400).json({ error: "Invalid Date" });
    } else {
      res.status(200).json({
        unix: date.getTime(),
        utc: date.toUTCString()
      });
    }
  }
  