const express = require('express');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = 5000;

// Enable CORS
app.use(cors());

// MySQL connection setup
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Express session setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Passport Google OAuth2.0 Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/google/callback"
}, function(accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));

// Serialize and Deserialize user for session management
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Serve static files (Frontend)
app.use(express.static('public'));

// Google OAuth login route
app.get('/auth/google', 
  passport.authenticate('google', {
    scope: ['profile', 'email']  // You can adjust the scope as needed
  })
);

// Google OAuth callback route
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    // Redirect to the profile page after successful login
    res.redirect('/profile');
  }
);

// Profile route to check if the user is authenticated
app.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/google');
  }
  res.json(req.user); // You can display user data here
});

// Logout route
app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send('Logout failed');
    }
    res.redirect('/');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
