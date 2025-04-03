// Import required modules
require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const path = require('path');
const cors = require('cors'); // Import cors for cross-origin requests

const { OAuth2Client } = require('google-auth-library'); // Import google-auth-library

// Other imported modules for getting data from the api into the MySQL stuff~~zzzzz
const mysql = require('mysql2');
const axios = require('axios');

// Create MySQL connection pool ~~~
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});


// Initialize Express app
const app = express();
const PORT = 5000;

// Initialize Google OAuth client with your Google Client ID
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Enable CORS for your React app (if running on a different port)
app.use(cors({
  origin: 'http://localhost:3000',  // Change this if React app runs on a different URL
  credentials: true  // Allow credentials (cookies, session) to be sent
}));

// Body parser middleware to parse incoming request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware for tracking user sessions
app.use(session({
  secret: 'your-session-secret', // Make sure to change this in production
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' // Use secure cookies in production
  }
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

//test 2
// Set up the Google OAuth strategy for Passport
passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("GoogleStrategy callback invoked");
      console.log("Access Token:", accessToken);
      console.log("Refresh Token:", refreshToken);
      console.log("Profile:", profile);
      return done(null, profile);
    }
));

// Serialize and deserialize user data into the session
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

//test 1
// Route to start the Google OAuth login flow
app.get('/auth/google', (req, res, next) => {
  console.log("Entering /auth/google route, URL:", req.url);
  next();
}, passport.authenticate('google', {
  scope: ['profile', 'email']
}));

//test 3
// Google OAuth callback route to handle the redirect after successful login
app.get('/auth/google/callback',
    (req, res, next) => {
      console.log("In /auth/google/callback route, query parameters:", req.query);
      next();
    },
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
      console.log("Authentication successful, user session:", req.session);
      // Send a message back to the frontend window (open it with window.opener)
      res.send(`<script>window.opener.postMessage('login-success', window.location.origin); window.close();</script>`);
    }
);

// Route to check if user is authenticated and send profile data
app.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    return res.json(req.user); // Send back user profile if authenticated
  }
  res.status(401).send('Unauthorized'); // Send unauthorized if not authenticated
});

// Route for logging out the user
app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});

//test 4
// Route to handle login by verifying Google token
app.post('/login', async (req, res) => {
  const { token } = req.body;
  console.log("Received token in /login route:", token);

  try {
    // Verify the token using Google's OAuth2 client
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,  // Ensure it matches your Google Client ID
    });

    const payload = ticket.getPayload(); // Payload will contain user info
    console.log("Token verified. Payload:", payload);

    // You can create your session or any other logic here for your app
    req.session.user = payload;  // Store the user info in the session

    res.json(payload);  // Send back the user data to the frontend
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(400).send('Invalid token');
  }
});


//FETCHING THE DATA STUFF!!~~~
async function fetchAndStoreGarageData() {
  try {
    const url = 'https://secure.parking.ucf.edu/GarageCounter/GetOccupancy?_=1741385832468';
    const { data } = await axios.get(url);



    // Iterate over each garage record from the JSON array
    data.forEach(item => {
      const location = item.location;
      const counts = location.counts;
      const apiLocationId = counts.api_location_id;
      const locationName = counts.location_name;
      const total = counts.total;
      const available = counts.available;
      const occupied = counts.occupied;
      const vacant = counts.vacant;
      const outOfService = location.is_out_of_service;
      const timeStampDate = counts.timeStampDate;
      const timeStampTime = counts.timeStampTime;

      // Insert or update the record.
      // Make sure your "garages" table has a UNIQUE index on api_location_id.
      const sql = `
        INSERT INTO garages 
          (api_location_id, location_name, total, available, occupied, vacant, out_of_service, timeStampDate, timeStampTime)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          total = VALUES(total),
          available = VALUES(available),
          occupied = VALUES(occupied),
          vacant = VALUES(vacant),
          out_of_service = VALUES(out_of_service),
          timeStampDate = VALUES(timeStampDate),
          timeStampTime = VALUES(timeStampTime)
      `;

      pool.query(sql, [apiLocationId, locationName, total, available, occupied, vacant, outOfService, timeStampDate, timeStampTime], (err, results) => {
        if (err) {
          console.error(`Error inserting/updating data for ${locationName}:`, err);
        } else {
          console.log(`Successfully updated da stuff for ${locationName}`);
        }
      });
    });
  } catch (error) {
    console.error('Error fetching garage data:', error);
  }
}

const cron = require('node-cron');

// Schedule the update to run every 2 minutes (I think this how often Rain said the site updates)
cron.schedule('*/1 * * * *', () => {
  console.log('Updating the garage data homie!!!');
  fetchAndStoreGarageData();
});

// Endpoint to manually trigger an update of garage data
app.get('/api/update-garages', async (req, res) => {
  await fetchAndStoreGarageData();
  res.json({ success: true, message: 'Garage data updated.' });
});

// Endpoint to retrieve garage data for the front end
app.get('/api/garages', (req, res) => {
  pool.query("SELECT * FROM garages", (err, results) => {
    if (err) {
      console.error("Error fetching garage data:", err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(results);
    }
  });
});

//after this is the other react stuff

// Serve static files from the React app (build folder)
app.use(express.static(path.join(__dirname, '../client/build')));

// Catch-all route for serving the React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
//This is to test for if Node can find .env file
console.log('Server sees GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
