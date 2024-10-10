import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import './NavLink.css';

const NavLink = ({ to, children, className, ...props }) => {
    return (
        <Link to={to} className={className}>
            <Button {...props}>{children}</Button>
        </Link>
    );
};

export default NavLink;
