import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const LoginPage = () => {
  const handleLoginSuccess = (credentialResponse) => {
    console.log('Login Success:', credentialResponse);
    // Process credentialResponse.credential as needed.
  };

  const handleLoginError = () => {
    console.log('Login Failed');
  };

  return (
    <div>
      <h2>Login</h2>
      <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
    </div>
  );
};

export default LoginPage;
