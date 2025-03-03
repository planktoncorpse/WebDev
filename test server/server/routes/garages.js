// /routes/garages.js

const express = require('express');
const router = express.Router();

// MySQL database connection (can be imported from a separate file)
const db = require('../db');

// Get all garages
router.get('/', (req, res) => {
  db.query('SELECT * FROM garages', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching garages' });
    }
    res.json(results);
  });
});

// Update garage availability
router.post('/update', (req, res) => {
  const { garageId, availableSpots } = req.body;
  const query = `UPDATE garages SET available_spots = ? WHERE id = ?`;
  
  db.query(query, [availableSpots, garageId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating garage availability' });
    }
    res.json({ message: 'Garage updated successfully' });
  });
});

module.exports = router;
