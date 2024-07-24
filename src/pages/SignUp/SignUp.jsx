import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logoImage from "../../assets/cocktaillogoheader.png";
import newuserlogo from "../../assets/newuserlogo.png";
import { PasswordInput, UsernameInput, EmailInput } from '../../components/labelinputs';
import HeaderSection from '../../components/Headersection/Headersection';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';
import FooterSection from "../../components/FooterSection/FooterSection";
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

function SignUp({ user }) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

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

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': 'cocktailshaker:02gWTBwcnwhUwPE4NIzm'
            }
        };

        try {
            const response = await axios.post('https://api.datavortex.nl/cocktailshaker/users', {
                username,
                password,
                email,
                authorities: [{ authority: 'USER' }],
            }, config);

            console.log('Registration successful:', response.data);
            setSuccess('Account registratie succesvol! Je wordt terugverwezen naar de login pagina');

            setTimeout(() => {
                navigate('/login');
            }, 1000);
        } catch (e) {
            console.error('Registration error:', e);

            if (e.response && e.response.data && e.response.data.message) {
                const errorMessage = e.response.data.message.toLowerCase();
                if (errorMessage.includes('email')) {
                    setError('Het email adres bestaat al');
                } else if (errorMessage.includes('username') || errorMessage.includes('gebruikersnaam')) {
                    setError('Gebruikersnaam bestaat al');
                } else {
                    setError(e.response.data.message);
                }
            } else if (e.response && e.response.data) {
                setError(JSON.stringify(e.response.data));
            } else {
                setError('Er is een fout opgetreden. Probeer het later opnieuw.');
            }
        }

        setLoading(false);
    }

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

                <section className="flex-item section3">
                    <div>
                        <h2 className="pink-heading">Nieuw account aanmaken</h2>
                        <img src={newuserlogo} alt="logo nieuwe gebruiker" className="cocktail-logo-login"/>
                        <div className="contact-container">
                            {loading && <LoadingIndicator />}
                            <form onSubmit={handleSubmit}>
                                <EmailInput
                                    id="email-field"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
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
                                <ErrorMessage message={error} /> {}
                                {success && <p>{success}</p>}
                                <button
                                    type="submit"
                                    disabled={loading}
                                >
                                    Creëer nieuw account
                                </button>
                            </form>
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

export default SignUp;
