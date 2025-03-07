import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import '../index.css';

const HomePage = () => {
  const location = useLocation();
  const [mapLoaded, setMapLoaded] = useState(false);

  const garages = [
    { name: "Garage A", address: "12491 University Blvd, Orlando, FL 32816", coordinates: { lat: 28.5999, lng: -81.20564 } },
    { name: "Garage B", address: "4799 Hydra Ln, Orlando, FL 32816", coordinates: { lat: 28.59689, lng: -81.20033 } },
    { name: "Garage C", address: "4000 Central Florida Blvd, Orlando, FL 32816", coordinates: { lat: 28.60239, lng: -81.19592 } },
    { name: "Garage D", address: "Gemini Blvd N, Orlando, FL 32816", coordinates: { lat: 28.60494, lng: -81.19694 } },
    { name: "Garage H", address: "Gemini Boulevard North Orlando, FL, 32816", coordinates: { lat: 28.60494, lng: -81.20117 } },
    { name: "Garage I", address: "4277 Gemini Blvd W, Orlando, FL 32816", coordinates: { lat: 28.60117, lng: -81.20447 } },
  ];

  useEffect(() => {
    setMapLoaded(true);
  }, [location.pathname]);

  return (
    <div className="home-page">
      <div className="banner">
        <h1>Welcome to the UCF Parking App!</h1>
      </div>
      <p>Your one‑stop solution for managing parking garages at UCF.</p>
      <p>Click the links above to explore garage status, and more.</p>
      <h2>Garage Addresses:</h2>
      <div className="garages-list">
        <div className="garage-row">
          {garages.slice(0, 3).map((garage) => (
            <div key={garage.name} className="garage-address">
              <h3 className="garage-banner">{garage.name}</h3>
              <p className="garage-info">{garage.address}</p>
              {mapLoaded ? (
                <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                  <GoogleMap
                    mapContainerStyle={{ height: '300px', width: '100%' }}
                    center={garage.coordinates}
                    zoom={15}
                    onLoad={(map) => {
                      console.log(`Map loaded for ${garage.name}`);
                    }}
                    onError={(e) => {
                      console.error(`Error loading map for ${garage.name}`, e);
                    }}
                  >
                    <Marker position={garage.coordinates} title={garage.name} />
                  </GoogleMap>
                </LoadScript>
              ) : (
                <p>Loading map...</p>
              )}
            </div>
          ))}
        </div>
        <div className="garage-row">
          {garages.slice(3).map((garage) => (
            <div key={garage.name} className="garage-address">
              <h3 className="garage-banner">{garage.name}</h3>
              <p className="garage-info">{garage.address}</p>
              {mapLoaded ? (
                <LoadScript googleMapsApiKey="AIzaSyDJFRaWGw-lAyGLq-mcjr8_weu-Get6E-o">
                  <GoogleMap
                    mapContainerStyle={{ height: '300px', width: '100%' }}
                    center={garage.coordinates}
                    zoom={15}
                    onLoad={(map) => {
                      console.log(`Map loaded for ${garage.name}`);
                    }}
                    onError={(e) => {
                      console.error(`Error loading map for ${garage.name}`, e);
                    }}
                  >
                    <Marker position={garage.coordinates} title={garage.name} />
                  </GoogleMap>
                </LoadScript>
              ) : (
                <p>Loading map...</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
