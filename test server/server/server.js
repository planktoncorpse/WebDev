// Import required modules
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const path = require('path');
const cors = require('cors'); // Import cors for cross-origin requests
require('dotenv').config(); // Load environment variables from .env

// Initialize Express app
const app = express();
const PORT = 5000;

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

// Set up the Google OAuth strategy for Passport
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/auth/google/callback',
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('Google Profile:', profile);  // Log the user profile from Google
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

// Route to start the Google OAuth login flow
app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Google OAuth callback route to handle the redirect after successful login
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
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

// Serve static files from the React app (build folder)
app.use(express.static(path.join(__dirname, 'client/build')));

// Catch-all route for serving the React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
