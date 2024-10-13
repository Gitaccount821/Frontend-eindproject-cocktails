import React from 'react';
import NavLink from '../NavLink/NavLink';
import { useLocation } from 'react-router-dom';
import Button from '../Button/Button';

const Navbar = ({ handleLogout, user }) => {
    const location = useLocation();

    // Helper functie
    const isActive = (path) => location.pathname === path;

    return (
        <nav className="buttons-container">
            {user && (
                <>
                    <NavLink
                        to="/Recommended"
                        disabled={isActive('/Recommended')}
                    >
                        Aangeraden Cocktails
                    </NavLink>
                    <NavLink
                        to="/Favourites"
                        disabled={isActive('/Favourites')}
                    >
                        Favorieten Cocktails
                    </NavLink>
                </>
            )}
            <NavLink
                to="/search"
                disabled={isActive('/search')}
            >
                Zoeken naar Cocktails
            </NavLink>
            <NavLink
                to="/contact"
                disabled={isActive('/contact')}
            >
                Contact
            </NavLink>
            {user ? (
                <Button
                    onClick={handleLogout}
                    style={{
                        marginLeft: '50px',
                        padding: '10px 50px',
                        backgroundColor: '#8b32a8',
                        borderRadius: '50px',
                        marginRight: '10px',
                    }}
                >
                    Uitloggen
                </Button>
            ) : (
                <NavLink
                    to="/login"
                    style={{
                        marginLeft: '50px',
                        padding: '10px 50px',
                        backgroundColor: '#8b32a8',
                        color: '#ffffff',
                        borderRadius: '50px',
                        cursor: 'pointer',
                        marginRight: '10px',
                    }}
                    disabled={isActive('/login')}
                >
                    Login
                </NavLink>
            )}
        </nav>
    );
};

export default Navbar;
