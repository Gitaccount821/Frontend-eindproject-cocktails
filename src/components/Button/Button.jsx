import React from 'react';
import './Button.css';

function Button({
                    type = "button",
                    onClick,
                    disabled = false,
                    children,
                    style = {},
                    loading = false,
                }) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className="button"
            style={style}
        >
            {loading && <span className="loading-spinner"></span>}
            {children}
        </button>
    );
}

export default Button;
