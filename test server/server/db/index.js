// /db/index.js

const mysql = require('mysql2');

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',  // Your MySQL host (use 'localhost' or your MySQL server address)
  user: 'your_user',  // Your MySQL username
  password: 'your_password',  // Your MySQL password
  database: 'ucf_parking',  // Your database name
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('MySQL Connected');
  }
});

module.exports = db;
