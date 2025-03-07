import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BackendMessage() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Make a GET request to your backend to fetch the message (this will be handled by the server)
    axios.get('http://localhost:5000/')
      .then(response => {
        setMessage(response.data);  // The response should be "Hello, World!" from the backend
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h1>Backend Message: {message}</h1>
    </div>
  );
}

export default BackendMessage;
