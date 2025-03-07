// src/components/LoginPage.js

import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const LoginPage = ({ setIsAuthenticated, setUser }) => {
  const handleLoginSuccess = (response) => {
    // Here you would typically send the response to your backend to verify the token
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: response.credential }),
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
        onSuccess={handleLoginSuccess}
        onError={handleLoginError}
      />
    </div>
  );
};

export default LoginPage;
