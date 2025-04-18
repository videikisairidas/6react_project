// src/LoginPage.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

// --- IMPORTANT: Update this URL to your C# API's base URL ---
const API_BASE_URL = 'https://localhost:8081'; 

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Redirect to previous page or profile after login
    const from = location.state?.from?.pathname || "/profile";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // --- IMPORTANT: Update the endpoint path if needed ---
            const response = await fetch(`${API_BASE_URL}/api/auth/login`, { // Adjust '/api/auth/login' or '/api/token' etc.
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                 // --- IMPORTANT: Adjust body structure if needed (e.g., use 'username'?) ---
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json(); // Assume login always returns JSON

            if (!response.ok) {
                // Use error message from API if available
                throw new Error(data?.message || data?.title || `HTTP error! status: ${response.status}`);
            }

            // --- IMPORTANT: Extract token based on YOUR API response ---
            const token = data.token || data.accessToken; // Adjust 'token' or 'accessToken'
            if (!token) {
                 console.error("JWT Token not found in response:", data);
                 throw new Error("Login successful, but token was not provided by the server.");
            }

            // Optional: Extract user info from response if available
            const userData = data.user || { username: username }; // Adjust based on response

            // Call login from AuthContext
            login(token, userData);

            // Redirect
            navigate(from, { replace: true });

        } catch (err) {
            setError(err.message || 'Login failed. Please check credentials.');
             console.error("Login fetch error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    {/* Change label/type if using username */}
                    <label>username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required disabled={isLoading}/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={isLoading}/>
                </div>
                <button type="submit" disabled={isLoading}>
                     {isLoading ? 'Logging In...' : 'Login'}
                </button>
            </form>
        </div>
    );
}

export default LoginPage;