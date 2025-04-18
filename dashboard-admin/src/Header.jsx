
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
                    {token && (
                        <>
                            <li><Link to="/profile">Profile</Link></li>
                            <li><Link to="/products">products</Link></li>
                            <li><Link to="/categories">categories</Link></li>
                            <li><Link to="/orders">orders</Link></li>
                            
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


