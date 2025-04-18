// src/RegisterPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// --- IMPORTANT: Update this URL to your C# API's base URL ---
const API_BASE_URL = 'https://localhost:8081'; // Example: Replace with your C# API URL (e.g., 5001, 7001, etc.)

function RegisterPage() {
    // Add other fields if your API requires them (e.g., username, firstName)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [RepeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (password !== RepeatPassword) {
            setError('Passwords do not match');
            return;
        }
        // Add more client-side validation as needed

        setIsLoading(true);

        try {
            // --- IMPORTANT: Update the endpoint path if needed ---
            const response = await fetch(`${API_BASE_URL}/api/auth/register`, { // Adjust '/api/auth/register'
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // --- IMPORTANT: Adjust body structure if needed ---
                body: JSON.stringify({
                    username: username,
                    password: password,
                    RepeatPassword: RepeatPassword
                    // Add other fields like 'username': username, if required by API
                }),
            });

            // Try to parse JSON regardless of status code for potential error messages
            let data;
            try {
                data = await response.json();
            } catch (jsonError) {
                // Handle cases where response is not JSON (e.g., plain text error)
                if (!response.ok) {
                     throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
                }
                 // If response was ok but not JSON, something unexpected happened
                 console.warn("Response was OK but not valid JSON.");
                 data = { message: "Registration successful, but unexpected response format." };
            }


            if (!response.ok) {
                 // Use error message from API response if available, otherwise generic error
                throw new Error(data?.message || data?.title || `HTTP error! status: ${response.status}`);
            }

            setMessage(data?.message || 'Registration successful! Please login.');
            setTimeout(() => navigate('/login'), 2000); // Redirect to login

        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
            console.error("Registration fetch error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p style={{ color: 'green' }}>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="username" value={username} onChange={(e) => setUsername(e.target.value)} required disabled={isLoading}/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={isLoading}/>
                </div>
                 <div>
                    <label>Confirm Password:</label>
                    <input type="password" value={RepeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} required disabled={isLoading}/>
                </div>
                {/* Add inputs for other required fields */}
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    );
}

export default RegisterPage;