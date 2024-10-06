import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Headersection.css';

const HeaderSection = ({
                           handleLogout,
                           logoImage,
                           user
                       }) => {
    const location = useLocation();

    return (
        <header className="section1">
            <Link to="/" className="logo-container" style={{ cursor: 'pointer' }}>
                <img src={logoImage} alt="Logo" className="logo" />
            </Link>
            <nav className="buttons-container">
                {user && (
                    <>
                        <Link to="/Recommended" className="button" disabled={location.pathname === '/Recommended'}>
                            Aangeraden Cocktails
                        </Link>
                        <Link to="/Favourites" className="button" disabled={location.pathname === '/Favourites'}>
                            Favorieten Cocktails
                        </Link>
                    </>
                )}
                <Link to="/search" className="button" disabled={location.pathname === '/search'}>
                    Zoeken naar Cocktails
                </Link>
                <Link to="/contact" className="button" disabled={location.pathname === '/contact'}>
                    Contact
                </Link>
                {user ? (
                    <button className="login" onClick={handleLogout}>Uitloggen</button>
                ) : (
                    <Link to="/login" className="login" disabled={location.pathname === '/login'}>
                        Login
                    </Link>
                )}
            </nav>
        </header>
    );
};

export default HeaderSection;
