// server/controllers/garageController.js

// Example: Get all garage data
exports.getAllGarages = (req, res) => {
  // Dummy data or logic to fetch data from DB
  const garages = [
    { name: 'Garage A', availableSpaces: 10 },
    { name: 'Garage B', availableSpaces: 5 },
    { name: 'Garage C', availableSpaces: 2 },
  ];
  
  res.json(garages); // Send the response back with data
};

// Example: Get a specific garage data
exports.getGarage = (req, res) => {
  const garageId = req.params.id;
  
  // Logic to fetch data from DB based on the garageId
  const garage = { name: `Garage ${garageId}`, availableSpaces: 5 }; // Dummy data
  
  res.json(garage); // Send the response back with data
};
