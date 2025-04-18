// src/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const [user, setUser] = useState(null); // Optional: store basic user info from login/token

    useEffect(() => {
        // Basic check on load. Production apps might verify token validity here.
        if (token) {
            // You could potentially decode the token here to get user info/expiry
            // using a library like jwt-decode (npm install jwt-decode)
            // Example:
            // import { jwtDecode } from 'jwt-decode'; // Correct named import
            // try {
            //     const decoded = jwtDecode(token);
            //     setUser({ email: decoded.email, /* other claims */ }); // Adjust based on your token payload
            //     // Check expiry (decoded.exp * 1000 < Date.now()) and logout if expired
            // } catch (error) {
            //     console.error("Error decoding token:", error);
            //     logout(); // Clear invalid token
            // }
             console.log("Token found on load.");
        } else {
            setUser(null);
        }
    }, [token]);

    const login = (newToken, userData) => {
        localStorage.setItem('authToken', newToken);
        setToken(newToken);
        setUser(userData); // Store user data 
        console.log("Logged in, token stored.");
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setToken(null);
        setUser(null);
        console.log("Logged out, token removed.");
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};