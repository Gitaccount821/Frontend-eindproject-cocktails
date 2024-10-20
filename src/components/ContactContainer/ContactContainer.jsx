import React from 'react';
import './ContactContainer.css';

function ContactContainer({ children }) {
    return (
        <div className="contact-container">
            {children}
        </div>
    );
}

export default ContactContainer;
