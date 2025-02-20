const mongoose = require('mongoose');

const garageSchema = new mongoose.Schema({
  name: String,
  totalSpots: Number,
  availableSpots: Number,
  updatedAt: { type: Date, default: Date.now },
});

const Garage = mongoose.model('Garage', garageSchema);

module.exports = Garage;
