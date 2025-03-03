import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';  // Ensure this is properly imported

const HomePage = () => {
  const garages = [
    { name: "Garage A", address: "12491 University Blvd, Orlando, FL 32816" },
    { name: "Garage B", address: "4799 Hydra Ln, Orlando, FL 32816" },
    { name: "Garage C", address: "4000 Central Florida Blvd, Orlando, FL 32816" },
    { name: "Garage D", address: "Gemini Blvd N, Orlando, FL 32816" },
    { name: "Garage H", address: "Gemini Boulevard North Orlando, FL, 32816" },
    { name: "Garage I", address: "4277 Gemini Blvd W, Orlando, FL 32816" },
  ];

  return (
    <div className="home-page">
      {/* Full-width black banner */}
      <div className="banner">
        <h1>Welcome to the UCF Parking App!</h1>
      </div>

      <p>Your one-stop solution for managing parking garages at UCF.</p>
      <p>Click the links above to explore garage status, and more.</p>
      
      <h2>Garage Addresses:</h2>
      
      {/* Two Rows of Garages */}
      <div className="garages-list">
        {/* Row 1 - Garage A, B, C */}
        <div className="garage-row">
          {garages.slice(0, 3).map((garage) => (
            <div key={garage.name} className="garage-address">
              <h3 className="garage-banner">{garage.name}</h3>
              <p className="garage-info">{garage.address}</p>
            </div>
          ))}
        </div>

        {/* Row 2 - Garage D, H, I */}
        <div className="garage-row">
          {garages.slice(3).map((garage) => (
            <div key={garage.name} className="garage-address">
              <h3 className="garage-banner">{garage.name}</h3>
              <p className="garage-info">{garage.address}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
