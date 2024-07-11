import logoImage from "../assets/cocktaillogoheader.png";
import React from "react";
import { useNavigate } from 'react-router-dom';

function Home () {

    const navigate = useNavigate();

    const handleNavigateToContact = () => {
        navigate('/contact');
    };


    return (

        <div className="app-container">
            <main className="main-content">
                <section className="flex-container section1">
                    <div className="logo-container">
                        <img src={logoImage} alt="Logo" className="logo"/>
                    </div>
                    <div className="buttons-container">
                        <button className="button">Aangeraden Cocktails</button>
                        <button className="button">Favourieten Cocktails</button>
                        <button className="button">Zoeken naar Cocktails</button>
                        <button className="button" onClick={handleNavigateToContact}>Contact</button>
                        <button className="login">Login</button>
                    </div>
                </section>
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
                        <p className="contact-text">neem contact op</p></button>
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