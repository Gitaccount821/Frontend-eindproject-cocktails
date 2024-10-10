import React from 'react';
import { useAuth } from '../../context/Authcontext';
import './Contact.css';
import Button from '../../components/Button/Button'

function Contact() {
    const { user, logout } = useAuth();

    return (
        <div className="app-container">
            <main className="main-content">
                <section className="contact-section">
                    <div className="contact-container">
                        <h1 className="head-contactformulier">Stuur ons een bericht</h1>
                        <form className="contact-form">
                            <div className="form-group">
                                <label htmlFor="voornaam">Voornaam</label>
                                <input type="text" id="voornaam" name="voornaam" placeholder="verplicht" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="achternaam">Achternaam</label>
                                <input type="text" id="achternaam" name="achternaam" placeholder="verplicht" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="adress">Adres</label>
                                <input type="text" id="adress" name="adress" placeholder="verplicht" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="plaats">Plaats</label>
                                <input type="text" id="plaats" name="plaats" placeholder="verplicht" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">E-mailadres</label>
                                <input type="email" id="email" name="email" placeholder="verplicht" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="telefoonnummer">Telefoonnummer</label>
                                <input type="text" id="telefoonnummer" name="telefoonnummer" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="bericht">Bericht</label>
                                <textarea id="bericht" name="bericht"></textarea>
                            </div>
                            <Button type="submit">
                                Verstuur
                            </Button>

                        </form>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Contact;
