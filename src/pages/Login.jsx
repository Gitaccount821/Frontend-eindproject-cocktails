import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoImage from "../assets/cocktaillogoheader.png";
import cocktailLogoLogin from "../assets/cocktaillogologin.png";
import '../App.css';
import { PasswordInput, UsernameInput } from "../components/labelinputs";
import HeaderSection from '../components/HeaderSection';

function Login() {
    const { authenticate, loading, error, message, user } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigateToContact = () => {
        navigate('/contact');
    };

    const handleNavigateToLogin = () => {
        navigate('/login');
    };

    const handleNavigateHome = () => {
        navigate('/');
    };

    const handleLogout = () => {
        // Handle logout logic
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await authenticate(username, password);
        setUsername('');
        setPassword('');
    };

    return (
        <div className="app-container">
            <main className="main-content">
                <HeaderSection
                    handleNavigateHome={handleNavigateHome}
                    handleNavigateToContact={handleNavigateToContact}
                    handleLogout={handleLogout}
                    handleNavigateToLogin={handleNavigateToLogin}
                    user={user}
                    logoImage={logoImage}
                />

                <section className="flex-item section3">
                    <div>
                        <h2 className="pink-heading">Cocktail Shaker Login</h2>
                        <img src={cocktailLogoLogin} alt="Cocktail Logo Login" className="cocktail-logo-login"/>
                        <div className="contact-container">
                            <form onSubmit={handleSubmit}>
                                <UsernameInput
                                    id="username-field"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <PasswordInput
                                    id="password-field"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button type="submit" disabled={loading}>
                                    Inloggen
                                </button>
                                {error && <p className="error">{error}</p>}
                                {message && <p className="success">{message}</p>}
                            </form>
                            <p style={{textAlign: 'right'}}>Nog geen account? <Link to="/signup">Registreer hier</Link></p>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="flex-item footer">
                <div className="footer-left">
                    <button className="button" onClick={handleNavigateToContact}>
                        <p className="contact-text">neem contact op</p>
                    </button>
                </div>
                <div className="footer-right">
                    <p>In opdracht van:</p>
                    <p>Novi Hogeschool</p>
                </div>
            </footer>
        </div>
    );
}

export default Login;
