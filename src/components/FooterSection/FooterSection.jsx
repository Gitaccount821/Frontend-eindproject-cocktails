import React from 'react';
import './Footer.css'

const FooterSection = ({ contactText, credits, onContactClick }) => (
    <footer className="footer">
        <div className="footer-left">
            <button className="button" onClick={onContactClick}>
                <p className="contact-text">{contactText}</p>
            </button>
        </div>
        <div className="footer-right">
            {credits.map((line, index) => (
                <p key={index}>{line}</p>
            ))}
        </div>
    </footer>
);

export default FooterSection;
