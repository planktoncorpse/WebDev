const express = require('express');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');  // For serving static files

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS with frontend URL (for development)
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend URL
  methods: ['GET', 'POST'],
  credentials: true,  // Allow cookies to be sent
};
app.use(cors(corsOptions));

// MySQL connection setup
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Express session setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,  // Use true in production with HTTPS
    httpOnly: true,
    maxAge: 3600000,  // 1 hour
  },
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Passport Google OAuth2.0 Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/google/callback",  // Callback URL
}, function (accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));

// Serialize and Deserialize user for session management
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

// Google OAuth login route
app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']  // You can adjust the scope as needed
  })
);

// Google OAuth callback route
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function (req, res) {
    res.redirect('/profile');
  }
);

// Profile route to check if the user is authenticated
app.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/google');
  }
  res.json(req.user);  // Return user data
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

// Serve static files from the React app (for production)
if (process.env.NODE_ENV === 'production') {
  // Serve the static files from the build folder
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  // For any other route, serve the React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
} else {
  // For development, React handles its own routing
  app.get('/', (req, res) => {
    res.send('Hello, World!');
  });
}

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
