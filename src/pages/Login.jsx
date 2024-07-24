import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoImage from "../assets/cocktaillogoheader.png";
import cocktailLogoLogin from "../assets/cocktaillogologin.png";
import '../App.css';
import { PasswordInput, UsernameInput } from "../components/labelinputs";
import HeaderSection from '../components/HeaderSection';
import LoadingIndicator from '../components/LoadingIndicator';
import FooterSection from "../components/FooterSection"; // Import LoadingIndicator

function Login() {
    const { authenticate, loading, error, message, user } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticate(username, password);
    };

    const handleNavigateToContact = () => navigate('/contact');
    const handleNavigateToLogin = () => navigate('/login');
    const handleLogout = () => {
        logout();
        navigate('/');
    };
    const handleNavigateToSearch = () => navigate('/search');
    const handleNavigateToRecommended = () => navigate('/Recommended');
    const handleNavigateToFavourites = () => navigate('/Favourites');
    const handleNavigateHome = () => navigate('/');

    return (
        <div className="app-container">
            <HeaderSection
                handleNavigateHome={handleNavigateHome}
                handleNavigateToContact={handleNavigateToContact}
                handleLogout={handleLogout}
                handleNavigateToLogin={handleNavigateToLogin}
                handleNavigateToSearch={handleNavigateToSearch}
                handleNavigateToRecommended={handleNavigateToRecommended}
                handleNavigateToFavourites={handleNavigateToFavourites}
                user={user}
                logoImage={logoImage}
            />

            <main className="main-content">
                {loading && <LoadingIndicator />} {/* Show LoadingIndicator based on loading state */}
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

            <FooterSection
                contactText="neem contact op"
                credits={["In opdracht van:", "Novi Hogeschool"]}
                onContactClick={handleNavigateToContact}
            />
        </div>
    );
}

export default Login;
