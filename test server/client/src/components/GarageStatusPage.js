import React from 'react';
import '../index.css';

const garages = [
  { name: "Garage A", current: 1647, capacity: 1647 },
  { name: "Garage B", current: 1289, capacity: 1289 },
  { name: "Garage C", current: 1852, capacity: 1852 },
  { name: "Garage D", current: 1278, capacity: 1289 },
  { name: "Garage H", current: 1340, capacity: 1340 },
  { name: "Garage I", current: 1270, capacity: 1270 },
];

// Function to determine garage fullness and assign color
const getGarageStatusClass = (current, capacity) => {
  const percentageFull = (current / capacity) * 100;

  if (percentageFull > 75) {
    return 'green'; // More than 75% full -> Green
  } else if (percentageFull < 25) {
    return 'red'; // Less than 25% full -> Red
  } else {
    return 'orange'; // Between 25% and 75% -> Orange
  }
};

const GarageStatusPage = () => {
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
