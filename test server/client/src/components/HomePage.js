import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';  // Import useLocation hook
import '../index.css';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const garages = [
    { name: "Garage A", address: "12491 University Blvd, Orlando, FL 32816", coordinates: { lat: 28.5999, lng: -81.20564 } },
    { name: "Garage B", address: "4799 Hydra Ln, Orlando, FL 32816", coordinates: { lat: 28.59689, lng: -81.20033 } },
    { name: "Garage C", address: "4000 Central Florida Blvd, Orlando, FL 32816", coordinates: { lat: 28.60239, lng: -81.19592 } },
    { name: "Garage D", address: "Gemini Blvd N, Orlando, FL 32816", coordinates: { lat: 28.60494, lng: -81.19694 } },
    { name: "Garage H", address: "Gemini Boulevard North Orlando, FL, 32816", coordinates: { lat: 28.60494, lng: -81.20117 } },
    { name: "Garage I", address: "4277 Gemini Blvd W, Orlando, FL 32816", coordinates: { lat: 28.60117, lng: -81.20447 } },
  ];

  const location = useLocation();  // Get the current route/location

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDJFRaWGw-lAyGLq-mcjr8_weu-Get6E-o&callback=initMap`;
        script.async = true;
        script.defer = true;

        script.onload = () => {
          setIsLoading(false); // Maps script loaded
          initMap(); // Call initMap after loading
        };

        script.onerror = () => {
          console.error('Error loading Google Maps script');
        };

        document.head.appendChild(script);
      } else {
        setIsLoading(false);
        initMap(); // Initialize map if already loaded
      }
    };

    loadGoogleMaps();

    return () => {
      // Cleanup map if necessary
      if (window.google && window.google.maps) {
        window.google.maps.event.clearInstanceListeners(document);
      }
    };
  }, [location]); // Depend on `location`, so the map reinitializes when the location changes

  const initMap = () => {
    garages.forEach((garage, index) => {
      const mapElement = document.getElementById(`map-${index}`);
      if (mapElement) {
        // Clean up old map instances if present
        const existingMap = mapElement.__map__;
        if (existingMap) {
          existingMap.setCenter(garage.coordinates);
          existingMap.setZoom(15);
        } else {
          const map = new window.google.maps.Map(mapElement, {
            center: garage.coordinates,
            zoom: 15, // Set zoom level for accuracy
          });

          new window.google.maps.Marker({
            position: garage.coordinates,
            map,
            title: garage.name,
          });

          mapElement.__map__ = map; // Store map instance on the DOM element
        }
      }
    });
  };

  if (isLoading) {
    return <div>Loading maps...</div>; // Show loading message until maps are loaded
  }

  return (
    <div className="home-page">
      <div className="banner">
        <h1>Welcome to the UCF Parking App!</h1>
      </div>

      <p>Your one-stop solution for managing parking garages at UCF.</p>
      <p>Click the links above to explore garage status, and more.</p>

      <h2>Garage Addresses:</h2>

      <div className="garages-list">
        <div className="garage-row">
          {garages.slice(0, 3).map((garage, index) => (
            <div key={garage.name} className="garage-address">
              <h3 className="garage-banner">{garage.name}</h3>
              <p className="garage-info">{garage.address}</p>
              <div id={`map-${index}`} style={{ height: "300px", width: "100%" }}></div>
            </div>
          ))}
        </div>

        <div className="garage-row">
          {garages.slice(3).map((garage, index) => (
            <div key={garage.name} className="garage-address">
              <h3 className="garage-banner">{garage.name}</h3>
              <p className="garage-info">{garage.address}</p>
              <div id={`map-${index + 3}`} style={{ height: "300px", width: "100%" }}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
