import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ handleLogout, user }) => {
    const location = useLocation();

    // Help functie actieve link
    const isActive = (path) => location.pathname === path;

    return (
        <nav className="buttons-container">
            {user && (
                <>
                    <Link
                        to="/Recommended"
                        className={`button ${isActive('/Recommended') ? 'disabled' : ''}`}
                    >
                        Aangeraden Cocktails
                    </Link>
                    <Link
                        to="/Favourites"
                        className={`button ${isActive('/Favourites') ? 'disabled' : ''}`}
                    >
                        Favorieten Cocktails
                    </Link>
                </>
            )}
            <Link
                to="/search"
                className={`button ${isActive('/search') ? 'disabled' : ''}`}
            >
                Zoeken naar Cocktails
            </Link>
            <Link
                to="/contact"
                className={`button ${isActive('/contact') ? 'disabled' : ''}`}
            >
                Contact
            </Link>
            {user ? (
                <button className="login" onClick={handleLogout}>Uitloggen</button>
            ) : (
                <Link
                    to="/login"
                    className={`login ${isActive('/login') ? 'disabled' : ''}`}
                >
                    Login
                </Link>
            )}
        </nav>
    );
};

export default Navbar;
