require("dotenv").config();  // Load environment variables
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const socketIO = require("socket.io"); // Ensure this is only declared once

const authRoutes = require("./auth/authRoutes");
const garageRoutes = require("./api/routes/garageRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", authRoutes);
app.use("/api/garages", garageRoutes);

// Connect to MongoDB (only once)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Error connecting to MongoDB", err));

// Start the server
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// WebSocket setup for real-time updates
const io = socketIO(server);  // Ensure this is declared only once

io.on('connection', (socket) => {
  console.log("New client connected");

  // Listen for parking updates
  socket.on('updateParking', (garageId, newAvailableSpots) => {
    // Update the garage status in the database
    Garage.findByIdAndUpdate(
      garageId,
      { availableSpots: newAvailableSpots, updatedAt: Date.now() },
      { new: true }
    )
    .then(updatedGarage => {
      // Emit the updated garage info to all clients
      io.emit('parkingUpdate', updatedGarage);
    })
    .catch(err => {
      socket.emit('error', 'Failed to update parking');
    });
  });

  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
