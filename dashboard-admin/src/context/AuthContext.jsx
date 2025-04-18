// src/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const [user, setUser] = useState(null); // Optional: store basic user info from login/token

    useEffect(() => {
        // Basic check on load. Production apps might verify token validity here.
        if (token) {
             console.log("Token found on load.");
        } else {
            setUser(null);
        }
    }, [token]);

    const login = (newToken, userData) => {
        localStorage.setItem('authToken', newToken);
        setToken(newToken);
        setUser(userData); // Store user data received from login (if any)
        console.log("Logged in, token stored.");
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setToken(null);
        setUser(null);
        console.log("Logged out, token removed.");
        // Maybe redirect or refresh state elsewhere
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