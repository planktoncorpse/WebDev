import React from 'react';

const LoginPage = () => {
  return (
    <div>
      <h1>Login</h1>
      <p>Login to your account</p>
      {/* Redirect to backend for Google OAuth */}
      <button onClick={() => window.location.href = 'http://localhost:5000/auth/google'}>
        Login with Google
      </button>
    </div>
  );
};

export default LoginPage;
