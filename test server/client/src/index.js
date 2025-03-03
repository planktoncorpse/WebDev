import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Correct path to refer to index.css located in src
import App from './App'; // Make sure App.js exists and has your code

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // This should match the root div in index.html
);
