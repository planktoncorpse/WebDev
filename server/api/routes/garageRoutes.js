const express = require('express');
const router = express.Router();
const Garage = require('../../models/garageModel'); // Your garage model

// Get all garages
router.get('/', async (req, res) => {
  try {
    const garages = await Garage.find();
    res.json(garages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch garages' });
  }
});

// Update a garage's available spots
router.put('/:id', async (req, res) => {
  try {
    const { availableSpots } = req.body;
    const garage = await Garage.findByIdAndUpdate(
      req.params.id,
      { availableSpots },
      { new: true }
    );

    // Emit an update to all connected clients via WebSocket
    req.io.emit('parkingUpdate', garage);
    res.json(garage);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update garage' });
  }
});

module.exports = router;
