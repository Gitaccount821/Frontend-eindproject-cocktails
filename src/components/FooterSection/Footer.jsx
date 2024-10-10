import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = ({ contactText, credits }) => (
    <footer className="footer">
        <div className="footer-left">
            <Link to="/contact" className="button-footer">
                <p className="contact-text">Neem contact op</p>
            </Link>
        </div>
        <div className="footer-right">
            {credits.map((line, index) => (
                <p key={index}>{line}</p>
            ))}
        </div>
    </footer>
);

export default Footer;
