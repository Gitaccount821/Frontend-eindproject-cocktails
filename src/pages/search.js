import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logoImage from "../assets/cocktaillogoheader.png";
import HeaderSection from '../components/HeaderSection';
import { useAuth } from '../context/AuthContext';

function Contact() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();

    const handleNavigateToContact = () => {
        navigate('/contact');
    };

    const handleNavigateHome = () => {
        navigate('/');
    };

    const handleNavigateToLogin = () => {
        navigate('/login');
    };

    const handleLogout = () => {
        // Handle logout logic
    };