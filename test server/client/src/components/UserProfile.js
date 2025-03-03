import React, { useState, useEffect } from 'react';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch the user's profile info from the backend
    fetch('/profile')
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error('Error fetching profile:', error));
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome, {user.displayName}</h1>
      <p>Email: {user.emails[0].value}</p>
      <img src={user.photos[0].value} alt="Profile" />
      <a href="/logout">Logout</a>
    </div>
  );
};

export default UserProfile;
