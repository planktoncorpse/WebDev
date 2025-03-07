// src/components/LoginPage.js

import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const LoginPage = ({ setIsAuthenticated, setUser }) => {
  const handleLoginSuccess = (response) => {
    // Send the credential token (from Google) to the backend
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: response.credential }),  // Send the token to your backend
      credentials: 'include',  // Include cookies for session management
    })
      .then((res) => res.json())
      .then((data) => {
        setIsAuthenticated(true);
        setUser(data);  // Store the user data from your backend
      })
      .catch((err) => {
        console.error('Error logging in:', err);
      });
  };

  const handleLoginError = () => {
    console.error('Google Login Failed');
  };

  return (
    <div>
      <h2>Login</h2>
      <GoogleLogin
        clientId="425545250222-uqe3jr5a2mpnqvbufspavlopcdip55e7.apps.googleusercontent.com"  // Make sure the ID is correct
        onSuccess={handleLoginSuccess}
        onError={handleLoginError}
      />
    </div>
  );
};

export default LoginPage;
