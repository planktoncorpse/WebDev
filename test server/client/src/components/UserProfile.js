import React, { useState, useEffect } from 'react';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [garage, setGarage] = useState('');
  const [reservationStatus, setReservationStatus] = useState('');

  useEffect(() => {
    // Fetch the user's profile info from the backend
    fetch('/profile')
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error('Error fetching profile:', error));
  }, []);

  const handleReserveSpot = () => {
    // Simulate reserving a parking spot
    if (!garage) {
      setReservationStatus('Please select a garage.');
      return;
    }

    // Send the reservation request to the backend
    fetch('/reserve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ garage, userId: user.id }),  // Assuming 'user.id' is available
    })
      .then((response) => response.json())
      .then((data) => {
        setReservationStatus(data.message); // Display the success message
      })
      .catch((error) => {
        setReservationStatus('Failed to reserve spot.');
      });
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome, {user.displayName}</h1>
      <p>Email: {user.emails[0].value}</p>
      <img src={user.photos[0].value} alt="Profile" />
      <div>
        <h2>Reserve a Parking Spot</h2>
        <label htmlFor="garage">Choose a Garage:</label>
        <select
          id="garage"
          value={garage}
          onChange={(e) => setGarage(e.target.value)}
        >
          <option value="">Select a Garage</option>
          <option value="A">Garage A</option>
          <option value="B">Garage B</option>
          <option value="C">Garage C</option>
        </select>

        <button onClick={handleReserveSpot}>Reserve Spot</button>

        {reservationStatus && <p>{reservationStatus}</p>}
      </div>

      <a href="/logout">Logout</a>
    </div>
  );
};

export default UserProfile;
