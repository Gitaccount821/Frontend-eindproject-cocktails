import React from 'react';
import './AppContainer.css';

function AppContainer({ children }) {
    return (
        <div className="app-container">
            {children}
        </div>
    );
}

export default AppContainer;
