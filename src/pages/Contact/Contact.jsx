import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from "../../assets/cocktaillogoheader.png";
import HeaderSection from '../../components/Headersection';
import { useAuth } from '../../context/Authcontext';
import FooterSection from "../../components/FooterSection";
import './Contact.css';

function Contact() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

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
                            <button type="submit" className="button center-button">Verstuur</button>
                        </form>
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

export default Contact;
