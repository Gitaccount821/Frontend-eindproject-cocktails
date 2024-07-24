import React from 'react';
import { useLocation } from 'react-router-dom';
import './Headersection.css'

const HeaderSection = ({
                           handleNavigateHome,
                           handleNavigateToContact,
                           handleLogout,
                           handleNavigateToLogin,
                           handleNavigateToSearch,
                           handleNavigateToRecommended,
                           handleNavigateToFavourites,
                           logoImage,
                           user
                       }) => {
    const location = useLocation();

    return (
        <section className="section1">
            <div className="logo-container" onClick={handleNavigateHome} style={{ cursor: 'pointer' }}>
                <img src={logoImage} alt="Logo" className="logo" />
            </div>
            <div className="buttons-container">
                { user && (
                    <>
                        <button className="button" onClick={handleNavigateToRecommended} disabled={location.pathname === '/Recommended'}>
                            Aangeraden Cocktails
                        </button>
                        <button className="button" onClick={handleNavigateToFavourites} disabled={location.pathname === '/Favourites'}>
                            Favorieten Cocktails
                        </button>
                    </>
                )}
                <button className="button" onClick={handleNavigateToSearch} disabled={location.pathname === '/search'}>
                    Zoeken naar Cocktails
                </button>
                <button className="button" onClick={handleNavigateToContact} disabled={location.pathname === '/contact'}>
                    Contact
                </button>
                { user ? (
                    <button className="login" onClick={handleLogout}>Uitloggen</button>
                ) : (
                    <button className="login" onClick={handleNavigateToLogin} disabled={location.pathname === '/login'}>
                        Login
                    </button>
                )}
            </div>
        </section>
    );
};

export default HeaderSection;
