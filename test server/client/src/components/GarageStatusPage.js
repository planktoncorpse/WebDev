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

// I changed the function to add more colorrs lmao
const getGarageStatusClass = (current, capacity) => {
    const percentageFull = (current / capacity) * 100;

    if (percentageFull <= 10) {
        return 'status-1'; // 0-10% full: Bright Green (mostly empty)
    } else if (percentageFull <= 20) {
        return 'status-2'; // 11-20%
    } else if (percentageFull <= 30) {
        return 'status-3'; // 21-30%
    } else if (percentageFull <= 40) {
        return 'status-4'; // 31-40%
    } else if (percentageFull <= 50) {
        return 'status-5'; // 41-50%
    } else if (percentageFull <= 60) {
        return 'status-6'; // 51-60%
    } else if (percentageFull <= 70) {
        return 'status-7'; // 61-70%
    } else if (percentageFull <= 80) {
        return 'status-8'; // 71-80%
    } else if (percentageFull <= 90) {
        return 'status-9'; // 81-90%
    } else {
        return 'status-10'; // 91-100%: Red (almost or completely full)
    }
};

const GarageStatusPage = () => {
  // Use the initial data as a fallback until API data loads
  const [garages, setGarages] = useState(initialGarages);

  // Fetch parking data from backend on component mount
  useEffect(() => {
      fetch('http://localhost:5000/api/garages')
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
