import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import HomePage from './components/HomePage';
import GarageStatusPage from './components/GarageStatusPage';
import ContactUsPage from './components/ContactUsPage';
import LoginPage from './components/LoginPage';
import UserProfile from './components/UserProfile';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is authenticated on initial load
    fetch('/profile', {
      credentials: 'include',  // Include cookies for session management
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Not authenticated');
      })
      .then((data) => {
        setIsAuthenticated(true);
        setUser(data); // Set user data from backend
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
              {isAuthenticated ? (
                <>
                  <li><Link to="/profile">Profile</Link></li>
                  <li><Link to="/logout">Logout</Link></li>
                </>
              ) : (
                <li><Link to="/login">Login</Link></li>
              )}
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/garage-status" element={<GarageStatusPage />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
            <Route path="/profile" element={isAuthenticated ? <UserProfile user={user} /> : <Navigate to="/login" />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

// Logout component to handle logout
const Logout = () => {
  useEffect(() => {
    fetch('/logout', {
      credentials: 'include',  // Include cookies for session management
    })
      .then((response) => {
        window.location.href = '/';  // Redirect to home page after logout
      })
      .catch((err) => console.error('Error logging out:', err));
  }, []);

  return <div>Logging out...</div>;
};

export default App;
