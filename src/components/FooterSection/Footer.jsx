import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import NavLink from '../NavLink/NavLink';

const Footer = ({ contactText, credits }) => (
    <footer className="footer">
        <div className="footer-left">
            <NavLink to="/contact" className="button-footer">
                <p className="contact-text">{contactText}</p>
            </NavLink>
        </div>
        <div className="footer-right">
            {credits.map((line, index) => (
                <p key={index}>{line}</p>
            ))}
        </div>
    </footer>
);

export default Footer;
