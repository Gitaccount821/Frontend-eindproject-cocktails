import React from "react";
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../../context/Authcontext';
import logoImage from "../../assets/cocktaillogoheader.png";
import HeaderSection from '../../components/Headersection/Headersection';
import FooterSection from '../../components/FooterSection/FooterSection';
import './Home.css';

function Home() {
    const {user, logout} = useAuth();
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

    const handleNavigateToRecommended = () => {
        navigate('/Recommended');
    };

    const handleNavigateToFavourites = () => {
        navigate('/Favourites');
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
                    handleNavigateToRecommended={handleNavigateToRecommended}
                    handleNavigateToFavourites={handleNavigateToFavourites}
                    user={user}
                    logoImage={logoImage}
                />

                <section className="flex-item section2">
                    <div>
                        <p className="small-text">welkom op de site</p>
                        <h1 className="large-text-Home">Cocktail Shaker</h1>
                    </div>
                </section>
                <section className="flex-item section3">
                    <div className="midden-tekst-container">
                        <p className="small-text">Welkom op deze website! Deze website is bedoelt voor het opslaan van
                            cocktail recepten en je helpen om de beste cocktails aangeraden te krijgen op basis van jouw
                            huidige stemming! Log graag eerst in om tot alle functies toegang te krijgen, en ga op
                            avontuur met de 'Aangeraden Cocktails' knop bovenin om jouw ideale cocktail te vinden.</p>
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

export default Home;
