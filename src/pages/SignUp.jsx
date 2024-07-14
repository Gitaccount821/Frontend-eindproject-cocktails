import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logoImage from "../assets/cocktaillogoheader.png";
import newuserlogo from "../assets/newuserlogo.png";
import { PasswordInput, UsernameInput, EmailInput } from '../components/labelinputs';
import HeaderSection from '../components/HeaderSection';

function SignUp({ user }) { // Ensure user is passed as a prop
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleNavigateHome = () => {
        navigate('/');
    };

    const handleNavigateToContact = () => {
        navigate('/contact');
    };

    const handleNavigateToLogin = () => {
        navigate('/login');
    };

    const handleLogout = () => {
        // Handle logout logic
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
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
        } catch(e) {
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
                    user={user}
                    logoImage={logoImage}
                />

                <section className="flex-item section3">
                    <div>
                        <h2 className="pink-heading">Nieuw account aanmaken</h2>
                        <img src={newuserlogo} alt="logo nieuwe gebruiker" className="cocktail-logo-login"/>
                        <div className="contact-container">
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

                                {error && <p className="error"> {error}</p>}
                                <button
                                    type="submit"
                                    className="form-button"
                                    disabled={loading}
                                >
                                    Creëer nieuw account
                                </button>
                            </form>
                        </div>
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

export default SignUp;
