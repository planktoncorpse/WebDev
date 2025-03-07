import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Ensure that your .env file has REACT_APP_GOOGLE_CLIENT_ID set correctly
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

if (!clientId) {
  console.error('REACT_APP_GOOGLE_CLIENT_ID is not set. Please add it to your .env file.');
} else {
  console.log('Using Google Client ID:', clientId);
}

ReactDOM.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
