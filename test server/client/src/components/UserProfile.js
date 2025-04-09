import React, { useState, useEffect } from 'react';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [garage, setGarage] = useState('');
  const [reservationStatus, setReservationStatus] = useState('');

  useEffect(() => {
    // Fetch the user's profile info from the backend with credentials included
    fetch('http://localhost:5000/profile', { credentials: 'include' })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Not authenticated');
          }
          return response.json();
        })
        .then((data) => setUser(data))
        .catch((error) => console.error('Error fetching profile:', error));
  }, []);

  const handleReserveSpot = () => {
    if (!garage) {
      setReservationStatus('Please select a garage.');
      return;
    }
    fetch('http://localhost:5000/reserve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ garage, userId: user.id }),
      credentials: 'include'
    })
        .then((response) => response.json())
        .then((data) => setReservationStatus(data.message))
        .catch((error) => {
          console.error(error);
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
            <option value="A">We were gonna add some cool reservation stuff</option>
            <option value="B">Like if there were spots that could be reserved for specific resons</option>
            <option value="C">But alas, it's a dream that may never come true. </option>
            <option value="D">Anyways, remember to delete this ~(^o^~)</option>
          </select>

          <button onClick={handleReserveSpot}>Reserve Spot</button>
          {reservationStatus && <p>{reservationStatus}</p>}
        </div>

        <a href="/logout">Logout</a>
      </div>
  );
};

export default UserProfile;