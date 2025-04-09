import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useLocation } from 'react-router-dom';
import '../index.css';

// Reusable component for each garage map card
const GarageCard = ({ garage }) => (
    <div className="garage-address">
        <h3 className="garage-banner">{garage.name}</h3>
        <p className="garage-info">{garage.address}</p>
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
            <Marker
                position={garage.coordinates}
                icon={{
                    url: "/images/pin.png",
                    scaledSize: new window.google.maps.Size(40, 40),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(20, 40)
                }}
                title={garage.name}
            />
        </GoogleMap>
    </div>
);

const HomePage = () => {
    // You can still use useLocation if needed for other purposes
    const location = useLocation();

    const garages = [
        { name: "Garage A", address: "12491 University Blvd, Orlando, FL 32816", coordinates: { lat: 28.5999, lng: -81.20564 } },
        { name: "Garage B", address: "4799 Hydra Ln, Orlando, FL 32816", coordinates: { lat: 28.59689, lng: -81.20033 } },
        { name: "Garage C", address: "4000 Central Florida Blvd, Orlando, FL 32816", coordinates: { lat: 28.60239, lng: -81.19592 } },
        { name: "Garage D", address: "Gemini Blvd N, Orlando, FL 32816", coordinates: { lat: 28.60494, lng: -81.19694 } },
        { name: "Garage H", address: "Gemini Boulevard North Orlando, FL, 32816", coordinates: { lat: 28.60494, lng: -81.20117 } },
        { name: "Garage I", address: "4277 Gemini Blvd W, Orlando, FL 32816", coordinates: { lat: 28.60117, lng: -81.20447 } },
    ];

    return (
        <div className="home-page">
            <div className="banner">
                <h1>Welcome to the UCF Parking App!</h1>
            </div>
            <p>Your one‑stop solution for managing parking garages at UCF.</p>
            <p>Click the links above to explore garage status, and more.</p>
            <h1>Garage Addresses:</h1>
            <div className="garages-list">
                <div className="garage-row">
                    {garages.slice(0, 3).map((garage) => (
                        <GarageCard key={garage.name} garage={garage} />
                    ))}
                </div>
                <div className="garage-row">
                    {garages.slice(3).map((garage) => (
                        <GarageCard key={garage.name} garage={garage} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;