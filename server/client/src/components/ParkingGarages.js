import React, { useEffect, useState } from 'react';
import io from 'socket.io-client'; // Import the socket.io client

// Connect to the backend server
const socket = io('http://localhost:5000'); // Adjust this URL if needed

const ParkingGarages = () => {
  const [garages, setGarages] = useState([]);
  
  useEffect(() => {
    // Fetch initial data from the backend
    fetch('/api/garages')
      .then(response => response.json())
      .then(data => setGarages(data))
      .catch(err => console.log("Error fetching data:", err));

    // Listen for real-time parking updates from the server
    socket.on('parkingUpdate', (updatedGarage) => {
      setGarages(prevGarages =>
        prevGarages.map(garage =>
          garage._id === updatedGarage._id ? updatedGarage : garage
        )
      );
    });

    // Cleanup the socket connection when the component is unmounted
    return () => socket.off('parkingUpdate');
  }, []);

  return (
    <div>
      <h2>Parking Garages</h2>
      <ul>
        {garages.map(garage => (
          <li key={garage._id}>
            <h3>{garage.name}</h3>
            <p>Available Spots: {garage.availableSpots}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParkingGarages;
