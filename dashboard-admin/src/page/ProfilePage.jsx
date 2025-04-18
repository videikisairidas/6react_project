import React, { useEffect, useState } from "react";
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext.jsx';
// import { ApiUrl } from '../services/config.js';

const ProfilePage = () => {
    const { accessToken, logout } = useAuth();
    const navigate = useNavigate();
    const [protectedData, setProtectedData] = useState('');
    const userId = localStorage.getItem('userId'); // Correct the localStorage.getItem syntax
    const [user, setUser] = useState(null); // State to hold user data
    const [loading, setLoading] = useState(true); // State to show loading
    const [error, setError] = useState(null); 
    const [message, setMessage] = useState(''); // State to show messages
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const fetchUserProfile = async () => {
        try {
            const response = await ApiUrl.get(`/user/profile`, {
                params: { Id: userId }, // Pass userId as a query parameter
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            console.log(response.data);
            setUser(response.data); 
            setUsername(response.data.username);
            setEmail(response.data.email);
        } catch (err) {
            setError("Failed to load user profile.");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const response = await ApiUrl.put(`/user/profile/update`, {
                id: userId,
                username,
                email,
                password
            }, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            setMessage('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage('Failed to update profile');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login'); // Redirect to the login page after logout
    };

    useEffect(() => {
        if (userId) {
            fetchUserProfile();
        }
    }, [userId]); // Add userId as a dependency

    return (
        <div>
            <h1>Welcome to Your Profile</h1>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {user && (
                <div>
                    <h2>User Profile</h2>
                    <form onSubmit={handleUpdateProfile}>
                        <div>
                            <label>Username:</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit">Update Profile</button>
                    </form>
                    {message && <p>{message}</p>}
                </div>
            )}
            <button className="button" onClick={handleLogout}>Logout</button>
            {protectedData && <p>Protected Data: {JSON.stringify(protectedData)}</p>}
        </div>
    );
};

export default ProfilePage;
