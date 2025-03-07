import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css';

// Import components for different pages
import HomePage from './components/HomePage';
import GarageStatusPage from './components/GarageStatusPage';
import ContactUsPage from './components/ContactUsPage';
import LoginPage from './components/LoginPage';
import ProfilePage from './components/ProfilePage';
import UserProfile from './components/UserProfile'; // Assuming this is your UserProfile page

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is authenticated
  useEffect(() => {
    fetch('/profile') // Check if the user is logged in
      .then((response) => {
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch((err) => {
        console.error('Error checking authentication:', err);
        setIsAuthenticated(false);
      });
  }, []);

  return (
    <Router>
      <div className="App">
        <header>
          <nav className="navbar">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/garage-status">Garage Status</Link></li>
              <li><Link to="/contact-us">Contact Us</Link></li>
              {/* Only show Profile link if authenticated */}
              {isAuthenticated ? (
                <li><Link to="/profile">Profile</Link></li>
              ) : (
                <li><Link to="/login">Login</Link></li>
              )}
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            {/* Home page should be the default route */}
            <Route path="/" element={<HomePage />} />
            <Route path="/garage-status" element={<GarageStatusPage />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/login" element={<LoginPage />} />
            {/* Only show ProfilePage if user is authenticated */}
            <Route path="/profile" element={isAuthenticated ? <UserProfile /> : <LoginPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
