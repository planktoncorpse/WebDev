const express = require('express');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require('dotenv');

const app = express();
const port = 5000;

// Load environment variables from .env file
dotenv.config();

// Set up session management
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Default route
app.get('/', (req, res) => {
  res.send('Hello, World!'); // You can replace this with an HTML file if needed
});

// Set up Passport for Google OAuth
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/google/callback"
}, function (accessToken, refreshToken, profile, done) {
  // Store user info in session after successful login
  return done(null, profile);
}));

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Google OAuth login route
app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

// Google OAuth callback route
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function (req, res) {
    // On successful login, redirect to the profile page
    res.redirect('/profile');
  }
);

// Route to display user profile (for testing purposes)
app.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/google');
  }
  res.json(req.user);  // Display user's Google profile info
});

// Route to log out
app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send('Logout failed');
    }
    res.redirect('/');
  });
});

// Starting the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
