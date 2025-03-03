import React, { useState, useEffect } from 'react';

const GarageList = () => {
  const [garages, setGarages] = useState([
    { name: "Garage A", value1: 1647, value2: 1647, status: "0%" },
    { name: "Garage B", value1: 1289, value2: 1289, status: "0%" },
    { name: "Garage C", value1: 1852, value2: 1852, status: "0%" },
    { name: "Garage D", value1: 1278, value2: 1289, status: "0%" },
    { name: "Garage H", value1: 1340, value2: 1340, status: "0%" },
    { name: "Garage I", value1: 1270, value2: 1270, status: "0%" }
  ]);

  return (
    <div>
      <h1>Garage List</h1>
      {garages.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {garages.map((garage, index) => (
            <li key={index}>
              <h2>{garage.name}</h2>
              <p>Value 1: {garage.value1}</p>
              <p>Value 2: {garage.value2}</p>
              <p>Status: {garage.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GarageList;
