import React, { useState, useEffect } from 'react';

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from backend
    fetch('/profile')
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((err) => console.error('Error fetching profile:', err));
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {user.displayName}</p>
      <p>Email: {user.emails[0].value}</p>
      {/* Add additional user details if needed */}
    </div>
  );
};

export default ProfilePage;
