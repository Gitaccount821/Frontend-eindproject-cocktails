import React from 'react';
import NavLink from '../../components/NavLink/NavLink';
import './pagenotfound.css';
import AppContainer from '../../components/AppContainer/AppContainer';

function PageNotFound() {
    return (
        <AppContainer>
            <section className="page-not-found-container">
                <h1>404</h1>
                <h2>Deze pagina bestaat niet!</h2>
                <NavLink to="/" className="home-link">
                    Ga terug naar de Home pagina
                </NavLink>
            </section>
        </AppContainer>
    );
}

export default PageNotFound;
