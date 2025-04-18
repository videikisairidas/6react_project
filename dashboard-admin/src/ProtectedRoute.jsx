
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';  // Ensure authentication

// const ProtectedRoute = ({ component: Component }) => {
const ProtectedRoute = ({ children }) => {
    // Get the authentication state from your context
    const { token } = useAuth();
    console.log(token);

    // Get the current location
    const location = useLocation();

    if (!token) {
        console.log('ProtectedRoute: No token found, redirecting to login.');
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    // return <Component />;
    return children;
};

export default ProtectedRoute; // Export if it's in its own file