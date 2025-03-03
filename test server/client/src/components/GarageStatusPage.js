import React, { useState, useEffect } from 'react';
import '../index.css';

// Initial garage data, with 0 current spots (fully available by default)
const initialGarages = [
  { name: "Garage A", current: 0, capacity: 1647 },
  { name: "Garage B", current: 0, capacity: 1289 },
  { name: "Garage C", current: 0, capacity: 1852 },
  { name: "Garage D", current: 0, capacity: 1289 },
  { name: "Garage H", current: 0, capacity: 1340 },
  { name: "Garage I", current: 0, capacity: 1270 },
];

// Function to determine garage fullness and assign color based on availability
const getGarageStatusClass = (current, capacity) => {
  const percentageFull = (current / capacity) * 100;

  if (percentageFull === 0) {
    return 'green'; // Green: 100% available (no spots taken)
  } else if (percentageFull > 75) {
    return 'red'; // Red: More than 75% full
  } else if (percentageFull <= 75 && percentageFull >= 25) {
    return 'orange'; // Orange: Between 25% and 75%
  } else {
    return 'green'; // Green: Less than 25% full
  }
};

const GarageStatusPage = () => {
  // State to hold garage data with dynamic current spots
  const [garages, setGarages] = useState(initialGarages);

  // Function to simulate the change in parking availability (to test different statuses)
  useEffect(() => {
    // Here you can update the garage data dynamically if needed
    // For example, you can simulate full parking or other scenarios by adjusting `current`
    // For now, we leave the state at 0 to keep all garages as fully available (green).
  }, []);

  return (
    <div className="App">
      <h1>Garage Fullness</h1>
      <div className="garages-list">
        {/* First Row (Garages A, B, C) */}
        <div className="garage-row">
          {garages.slice(0, 3).map((garage) => {
            const statusClass = getGarageStatusClass(garage.current, garage.capacity);
            return (
              <div key={garage.name} className={`garage ${statusClass}`}>
                <div className="garage-banner">
                  <h2>{garage.name}</h2>
                </div>
                <div className="garage-info">
                  <p>Available Spots: {garage.capacity - garage.current}</p>
                  <p>Total Spots: {garage.capacity}</p>
                  <p>Status: {statusClass.charAt(0).toUpperCase() + statusClass.slice(1)}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Second Row (Garages D, H, I) */}
        <div className="garage-row">
          {garages.slice(3).map((garage) => {
            const statusClass = getGarageStatusClass(garage.current, garage.capacity);
            return (
              <div key={garage.name} className={`garage ${statusClass}`}>
                <div className="garage-banner">
                  <h2>{garage.name}</h2>
                </div>
                <div className="garage-info">
                  <p>Available Spots: {garage.capacity - garage.current}</p>
                  <p>Total Spots: {garage.capacity}</p>
                  <p>Status: {statusClass.charAt(0).toUpperCase() + statusClass.slice(1)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GarageStatusPage;
