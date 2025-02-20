const express = require("express");
const router = express.Router();
const Garage = require("../../models/garageModel");

// Get all garages
router.get("/", async (req, res) => {
  try {
    const garages = await Garage.find();
    res.json(garages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch garages" });
  }
});

// Update parking status of a garage
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { availableSpots } = req.body;

  try {
    const updatedGarage = await Garage.findByIdAndUpdate(
      id,
      { availableSpots, updatedAt: Date.now() },
      { new: true }
    );
    res.json(updatedGarage);
  } catch (err) {
    res.status(500).json({ error: "Failed to update garage" });
  }
});

module.exports = router;
