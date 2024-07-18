import React from 'react';
import { useLocation } from 'react-router-dom';
import {useAuth} from "../context/Authcontext";

const HeaderSection = ({
                           handleNavigateHome,
                           handleNavigateToContact,
                           handleLogout,
                           handleNavigateToLogin,
                           handleNavigateToSearch,
                           logoImage,
                           user
                       }) => {
    const location = useLocation();



    return (
        <section className="flex-container section1">
            <div className="logo-container" onClick={handleNavigateHome} style={{ cursor: 'pointer' }}>
                <img src={logoImage} alt="Logo" className="logo" />
            </div>
            <div className="buttons-container">
                { user && (
                    <>
                        <button className="button" disabled={location.pathname === '/recommended'}>
                            Aangeraden Cocktails
                        </button>
                        <button className="button" disabled={location.pathname === '/favorites'}>
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
