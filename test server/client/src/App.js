import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { LoadScript } from '@react-google-maps/api';
import HomePage from './components/HomePage';
import GarageStatusPage from './components/GarageStatusPage';
import ContactUsPage from './components/ContactUsPage';
import LoginPage from './components/LoginPage';
import UserProfile from './components/UserProfile';
import NotAffiliated from './components/NotAffiliated';
import Footer from './components/Footer';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    // On app load, check if we have an active session
    useEffect(() => {
        fetch('http://localhost:5000/profile', { credentials: 'include' })
            .then((res) => {
                if (res.ok) return res.json();
                throw new Error('Not authenticated');
            })
            .then((data) => {
                setIsAuthenticated(true);
                setUser(data);
            })
            .catch((err) => {
                console.error(err);
                setIsAuthenticated(false);
                setUser(null);
            });
    }, []);

    return (
        <Router>
            <LoadScript googleMapsApiKey="AIzaSyDJFRaWGw-lAyGLq-mcjr8_weu-Get6E-o">
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
                            <Route
                                path="/login"
                                element={<LoginPage setIsAuthenticated={setIsAuthenticated} setUser={setUser} />}
                            />
                            <Route
                                path="/profile"
                                element={isAuthenticated ? <UserProfile user={user} /> : <Navigate to="/login" />}
                            />
                            <Route path="/logout" element={<Logout setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
                            <Route path="/not-affiliated" element={<NotAffiliated />} />
                        </Routes>
                    </main>

                    <Footer />
                </div>
            </LoadScript>
        </Router>
    );
}

// Logout component (same as before) for clearing the session on the client
const Logout = ({ setIsAuthenticated, setUser }) => {
    useEffect(() => {
        fetch('http://localhost:5000/logout', { credentials: 'include' })
            .then(() => {
                setIsAuthenticated(false);
                setUser(null);
                window.location.href = '/';
            })
            .catch(err => {
                console.error("Logout failed", err);
            });
    }, [setIsAuthenticated, setUser]);

    return <div>Logging out...</div>;
};

export default App;
