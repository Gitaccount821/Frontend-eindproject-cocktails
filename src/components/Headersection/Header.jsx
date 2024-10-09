import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Header.css';

const Header = ({ handleLogout, logoImage, user }) => {
    return (
        <header className="section1">
            <Link to="/" className="logo-container">
                <img src={logoImage} alt="Logo" className="logo" />
            </Link>
            <Navbar handleLogout={handleLogout} user={user} />
        </header>
    );
};

export default Header;
