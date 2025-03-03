import React from 'react';

const LoginPage = () => {
  return (
    <div>
      <h1>Login</h1>
      <p>Login to your account</p>
      <button onClick={() => window.location.href = '/auth/google'}>
        Login with Google
      </button>
    </div>
  );
};

export default LoginPage;
