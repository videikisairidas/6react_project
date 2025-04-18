
// export default Header
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
// import { IconName } from "react-icons/bs";

const Header = () => {
    const { token, logout, user } = useAuth();

    return (
        <header>
            <h1>My App</h1>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/shop">Shop </Link></li>
                    <li><Link to="/cart">Cart </Link></li>
                    <li><Link to="/favorites">Love</Link></li>
                    {!token && (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </>
                    )}
                    {token && (
                        <>
                            <li><Link to="/profile">Profile</Link></li>
                            <button onClick={logout} style={{ marginLeft: '10px', background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
                                Logout
                            </button>
                            
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;


