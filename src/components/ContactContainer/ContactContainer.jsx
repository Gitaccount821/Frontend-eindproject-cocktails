import React from 'react';
import './ContactContainer.css'; // Create a new CSS file for this component

function ContactContainer({ children }) {
    return (
        <div className="contact-container">
            {children}
        </div>
    );
}

export default ContactContainer;
