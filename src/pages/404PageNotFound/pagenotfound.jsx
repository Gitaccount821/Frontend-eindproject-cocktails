import React from 'react';
import { Link } from 'react-router-dom';
import './pagenotfound.css';

function PageNotFound() {
    return (
        <div className="app-container">
            <h1>404</h1>
            <p>Deze pagina bestaat niet!</p>
            <Link to="/">Ga terug naar de Home pagina</Link>
        </div>
    );
}

export default PageNotFound;
