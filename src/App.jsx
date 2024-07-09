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
                <section className="flex-item">
                    <h2>Section 2</h2>
                    <p>Content for Section 2</p>
                </section>
                <section className="flex-item">
                    <h2>Section 3</h2>
                    <p>Content for Section 3</p>
                </section>
                <section className="flex-item">
                    <h2>Section 4</h2>
                    <p>Content for Section 4</p>
                </section>
            </main>
            <footer>
                <p>Footer content here</p>
            </footer>
        </div>
    );
};

export default App;
