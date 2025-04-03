import React from 'react';
import ReactDOM from 'react-dom/client';  // Use createRoot in React 18
import './index.css';
import App from './App';
//import { GoogleOAuthProvider } from '@react-oauth/google';

// Fetch the client ID from the .env file
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

if (!clientId) {
    console.error('Google Client ID is missing. Please check your .env file.');
} else {
    console.log('Using Google Client ID:', clientId);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);