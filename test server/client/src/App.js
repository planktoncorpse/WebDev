import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';  // Ensure correct imports
import './index.css';  // Assuming your styles are in index.css

// Components for different pages
import HomePage from './components/HomePage';
import GarageStatusPage from './components/GarageStatusPage';
import ContactUsPage from './components/ContactUsPage';
import LoginPage from './components/LoginPage';
import ProfilePage from './components/ProfilePage';

const App = () => {
  return (
    <Router>
      <div className="App">
        <header>
          <nav className="navbar">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/garage-status">Garage Status</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/contact-us">Contact Us</Link></li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/garage-status" element={<GarageStatusPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
