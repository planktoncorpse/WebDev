import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';  // Ensure correct imports
import './index.css';  // Assuming your styles are in index.css

// Components for different pages
import HomePage from './components/HomePage';
import GarageStatusPage from './components/GarageStatusPage';
import ContactUsPage from './components/ContactUsPage';
import LoginPage from './components/LoginPage'; // Add LoginPage import
import UserProfile from './components/UserProfile'; // Add UserProfile import

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in when the app loads
    fetch('/profile')
      .then((response) => {
        if (response.ok) {
          setIsAuthenticated(true);
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
              {/* Add login/logout link */}
              {isAuthenticated ? (
                <li><Link to="/profile">Profile</Link></li>
              ) : (
                <li><Link to="/login">Login</Link></li>
              )}
            </ul>
          </nav>
        </header>

        <main>
          <Routes> {/* Use Routes to wrap Route elements */}
            <Route path="/" element={<HomePage />} />
            <Route path="/garage-status" element={<GarageStatusPage />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={isAuthenticated ? <UserProfile /> : <LoginPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
