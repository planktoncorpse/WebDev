const express = require('express');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mysql = require('mysql2');
const dotenv = require('dotenv');
const app = express();
const port = 5000;

// Load environment variables from .env file
dotenv.config();

// Create MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Set up session management
app.use(session({
  secret: 'your-secret-key', // Change to a secure value
  resave: false,
  saveUninitialized: true
}));

// Set up Passport for OAuth
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/google/callback"
},
function(accessToken, refreshToken, profile, done) {
  // Store user info in session after successful login
  return done(null, profile);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Serve static files (frontend)
app.use(express.static('public'));

// Google OAuth login route
app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'] // You can add more scopes if needed
  })
);

// Google OAuth callback route
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    // On successful login, redirect to the dashboard or home page
    res.redirect('/');
  }
);

// Route to get the logged-in user's info (for testing)
app.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/google');
  }
  res.json(req.user);
});

// Route to log out
app.get('/logout', (req, res) => {
  req.logout(function(err) {
    res.redirect('/');
  });
});

// Starting the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
