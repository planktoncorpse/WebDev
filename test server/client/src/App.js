import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Make sure Routes and Route are properly imported
import './index.css';  // Ensure this file is correctly imported

// Components for different pages
import HomePage from './components/HomePage';
import GarageStatusPage from './components/GarageStatusPage';
import ContactUsPage from './components/ContactUsPage';

const App = () => {
  return (
    <Router>
      <div className="App">
        <header>
          <nav className="navbar">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/garage-status">Garage Status</Link></li>
              <li><Link to="/contact-us">Contact Us</Link></li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes> {/* Use Routes instead of Switch */}
            <Route path="/" element={<HomePage />} />
            <Route path="/garage-status" element={<GarageStatusPage />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
