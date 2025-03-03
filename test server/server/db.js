// /server/db.js

const mysql = require('mysql2');

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'aden',
  password: 'adenGroup60',
  database: 'ucf_parking',
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('MySQL connected');
});

module.exports = db;
