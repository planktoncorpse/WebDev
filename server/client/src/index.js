import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';  // Ensure the correct path to App.js
import './styles/index.css';  // If you have global styles

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')  // Make sure there's an element with id "root" in your HTML
);
