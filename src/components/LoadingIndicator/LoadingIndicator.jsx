import React from 'react';
import './LoadingIndicator.css';

const LoadingIndicator = ({ loadingProgress }) => {
    return (
        <div className="loading-indicator">
            <div className="loading-bar-container">
                <div className="loading-bar" style={{ width: `${loadingProgress}%` }} />
                <span className="loading-text">Loading...</span>
            </div>
        </div>
    );
};

export default LoadingIndicator;
