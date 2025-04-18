
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';  // Ensure authentication

const ProtectedRoute = ({ children }) => {
    // Get the authentication state from your context
    const { token } = useAuth(); // Or use 'user' object, or a boolean isLoggedIn flag

    // Get the current location
    const location = useLocation();

    if (!token) {
        console.log('ProtectedRoute: No token found, redirecting to login.');
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute; // Export if it's in its own file