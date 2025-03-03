const express = require('express');
const mysql = require('mysql2');  // MySQL connection
const cors = require('cors');    // Allow cross-origin requests (for React and backend communication)

const app = express();
const port = 5000;  // Choose your port (can be 5000 or anything you prefer)

// Middleware
app.use(cors());
app.use(express.json());  // Parse JSON bodies

// MySQL Connection (Direct Configuration)
const db = mysql.createConnection({
  host: 'localhost',  // MySQL server address (localhost if running locally)
  user: 'your_mysql_user',  // Your MySQL username, e.g., 'root' or 'admin'
  password: 'your_mysql_password',  // Your MySQL password
  database: 'ucf_parking',  // The database you're using
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('MySQL Connected');
  }
});

// Routes (API endpoints)
app.get('/garages', (req, res) => {
  // Example: Fetch garage data from the database
  db.query('SELECT * FROM garages', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching garages' });
    }
    res.json(results);
  });
});

// Example POST route for updating parking garage availability
app.post('/update-garage', (req, res) => {
  const { garageId, availableSpots } = req.body;
  const query = `UPDATE garages SET available_spots = ? WHERE id = ?`;
  
  db.query(query, [availableSpots, garageId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating garage availability' });
    }
    res.json({ message: 'Garage updated successfully' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
