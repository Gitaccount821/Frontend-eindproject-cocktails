import React from 'react';
import './App.css';
import logoImage from './assets/cocktaillogoheader.png';

const App = () => {
    return (
        <div className="app-container">
            <main>
                <section className="flex-container section1">
                    <div className="logo-container">
                        <img src={logoImage} alt="Logo" className="logo"/>
                    </div>
                    <div className="buttons-container">
                        <button className="button">Aangeraden Cocktails</button>
                        <button className="button">Favourieten Cocktails</button>
                        <button className="button">Zoeken naar Cocktails</button>
                        <button className="button">Contact</button>
                        <button className="login">Login</button>
                    </div>
                </section>
                <section className="flex-item section2">
                    <div className="welcome-text">
                        <p className="small-text">welkom op de site</p>
                        <h1 className="large-text">Cocktail Shaker</h1>
                    </div>
                </section>
                <section className="flex-item">
                    <p className="small-text">welkom op deze website! Deze website is bedoelt voor het opslaan van cocktail recepten je helpen om de beste cocktails aangeraden te krijgen op basis van jouw huidige stemming! Log graag eerst in om tot alle functies toegang te krijgen, en ga op avontuur met de 'aangraden cocktails' knop bovenin om jouw ideale cocktails te vinden.</p>
                </section>
            </main>
            <footer>
                <p>Footer content here</p>
            </footer>
        </div>
    );
};

export default App;
