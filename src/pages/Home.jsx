import React from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoImage from "../assets/cocktaillogoheader.png";
import HeaderSection from '../components/HeaderSection';

function Home() {
    let { user, logout} = useAuth();
    const navigate = useNavigate();

    const handleNavigateToContact = () => {
        navigate('/contact');
    };

    const handleNavigateToLogin = () => {
        navigate('/login');
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleNavigateToSearch = () => {
        navigate('/search');
    };

    const handleNavigateHome = () => {
        navigate('/');
    };

    return (
        <div className="app-container">
            <main className="main-content">
                <HeaderSection
                    handleNavigateHome={handleNavigateHome}
                    handleNavigateToContact={handleNavigateToContact}
                    handleLogout={handleLogout}
                    handleNavigateToLogin={handleNavigateToLogin}
                    handleNavigateToSearch={handleNavigateToSearch}
                    logoImage={logoImage}
                    user={user}
                />

                <section className="flex-item section2">
                    <div className="welcome-text">
                        <p className="small-text">welkom op de site</p>
                        <h1 className="large-text">Cocktail Shaker</h1>
                    </div>
                </section>
                <section className="flex-item section3">
                    <div className="midden-tekst-container">
                        <p className="small-text">Welkom op deze website! Deze website is bedoelt voor het opslaan van
                            cocktail recepten je helpen om de beste cocktails aangeraden te krijgen op basis van jouw
                            huidige stemming! Log graag eerst in om tot alle functies toegang te krijgen, en ga op
                            avontuur met de 'aangraden cocktails' knop bovenin om jouw ideale cocktails te vinden.</p>
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

export default Home;
