import React from 'react';
import logoImage from "../assets/cocktaillogoheader.png";
import { useNavigate, useLocation } from 'react-router-dom';

function Contact() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigateToContact = () => {
        navigate('/contact');
    };

    const handleNavigateHome = () => {
        navigate('/');
    };

    return (
        <div className="app-container">
            <main className="main-content">
                <section className="flex-container section1">
                    <div className="logo-container" onClick={handleNavigateHome} style={{cursor: 'pointer'}}>
                        <img src={logoImage} alt="Logo" className="logo"/>
                    </div>
                    <div className="buttons-container">
                        <button className="button">Aangeraden Cocktails</button>
                        <button className="button">Favorieten Cocktails</button>
                        <button className="button">Zoeken naar Cocktails</button>
                        <button className="button" onClick={handleNavigateToContact}
                                disabled={location.pathname === '/contact'}>Contact
                        </button>
                        <button className="login">Login</button>
                    </div>
                </section>


                <section className="contact-section">
                    <div className="contact-container">
                        <h1>Stuur ons een bericht</h1>
                        <form className="contact-form">
                            <div className="form-group">
                                <label htmlFor="voornaam">Voornaam</label>
                                <input type="text" id="voornaam" name="voornaam" placeholder="verplicht" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="achternaam">Achternaam</label>
                                <input type="text" id="achternaam" name="achternaam" placeholder="verplicht" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="adress">Adres</label>
                                <input type="text" id="adress" name="adress" placeholder="verplicht" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="plaats">Plaats</label>
                                <input type="text" id="plaats" name="plaats" placeholder="verplicht" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">E-mailadres</label>
                                <input type="email" id="email" name="email" placeholder="verplicht" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="telefoonnummer">Telefoonnummer</label>
                                <input type="text" id="telefoonnummer" name="telefoonnummer"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="bericht">Bericht</label>
                                <textarea id="bericht" name="bericht"></textarea>
                            </div>
                            <button className="button">Verstuur</button>
                        </form>
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

export default Contact;
