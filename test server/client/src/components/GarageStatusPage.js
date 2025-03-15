import React, { useState, useEffect } from 'react';
import '../index.css';

// Fallback initial state (optional) while data is loading
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
    return 'green'; // 100% available
  } else if (percentageFull > 75) {
    return 'red';   // More than 75% full
  } else if (percentageFull <= 75 && percentageFull >= 25) {
    return 'orange'; // Between 25% and 75%
  } else {
    return 'green'; // Less than 25% full
  }
};

const GarageStatusPage = () => {
  // Use the initial data as a fallback until API data loads
  const [garages, setGarages] = useState(initialGarages);

  // Fetch parking data from backend on component mount
  useEffect(() => {
    fetch('/api/garages')
        .then((response) => response.json())
        .then((data) => {
          // Map the backend data to match the expected object structure:
          // Use "location_name" for the name, "occupied" for current occupancy, and "total" for capacity.
          const mappedData = data.map(record => ({
            name: record.location_name,
            current: record.occupied, // assuming 'occupied' represents current vehicles
            capacity: record.total,
          }));
          setGarages(mappedData);
        })
        .catch((error) => console.error('Error fetching garage data:', error));
  }, []);

  return (
      <div className="App">
        <h1>Garage Fullness</h1>
        <div className="garages-list">
          {/* First Row (e.g., first three garages) */}
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

          {/* Second Row (remaining garages) */}
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
