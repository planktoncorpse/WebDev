import React, { useEffect } from 'react';

const LoginPage = ({ setIsAuthenticated, setUser }) => {
    useEffect(() => {
        console.log("LoginPage rendered");
    }, []);

    return (
        <div>
            <h1>Login</h1>
            <p>Please log in using your Google account.</p>
            <a href="http://localhost:5000/auth/google">
                <button type="button">Login with Google</button>
            </a>
        </div>
    );
};

export default LoginPage;