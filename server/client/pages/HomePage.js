import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const HomePage = () => {
  const [garages, setGarages] = useState([]);
  const socket = io('http://localhost:5000');

  useEffect(() => {
    // Listen for updates from the server
    socket.on('garageUpdates', (updatedGarages) => {
      setGarages(updatedGarages);
    });

    return () => {
      socket.off('garageUpdates');
    };
  }, []);

  return (
    <div>
      <h1>UCF Parking Garages</h1>
      <ul>
        {garages.map((garage) => (
          <li key={garage._id}>
            {garage.name} - {garage.availableSpaces}/{garage.capacity} spaces available
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
