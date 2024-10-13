import React from 'react';
import { Link } from 'react-router-dom';
import './pagenotfound.css';
import AppContainer from '../../components/AppContainer/AppContainer';

function PageNotFound() {
    return (
        <AppContainer>
            <section className="page-not-found-container">
                <h1>404</h1>
                <h2>Deze pagina bestaat niet!</h2>
                <Link to="/" className="home-link">
                    Ga terug naar de Home pagina
                </Link>
            </section>
        </AppContainer>
    );
}

export default PageNotFound;
