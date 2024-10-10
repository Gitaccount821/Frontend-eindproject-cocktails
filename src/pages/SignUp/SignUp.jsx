import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import newuserlogo from "../../assets/newuserlogo.png";
import { PasswordInput, UsernameInput, EmailInput } from '../../components/labelinputs';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useLoading } from '../../context/LoadingContext';

function SignUp({ user }) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const { isLoading, setIsLoading, loadingProgress, setLoadingProgress } = useLoading();
    const navigate = useNavigate();

    const updateLoadingProgress = (progress) => {
        setLoadingProgress(progress);
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setIsLoading(true);
        setLoadingProgress(0);

        updateLoadingProgress(10);

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': 'cocktailshaker:02gWTBwcnwhUwPE4NIzm',
            },
        };

        await new Promise((resolve) => setTimeout(resolve, 300));
        updateLoadingProgress(30);

        try {
            const response = await axios.post(
                'https://api.datavortex.nl/cocktailshaker/users',
                {
                    username,
                    password,
                    email,
                    authorities: [{ authority: 'USER' }],
                },
                config
            );

            await new Promise((resolve) => setTimeout(resolve, 300));
            updateLoadingProgress(60);

            console.log('Registration successful:', response.data);
            setSuccess('Account registratie succesvol! Je wordt terugverwezen naar de login pagina');

            await new Promise((resolve) => setTimeout(resolve, 300));
            updateLoadingProgress(80);

            setTimeout(() => {
                updateLoadingProgress(100);
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
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="app-container">
            <main className="main-content">
                <section className="flex-item section3">
                    <div>
                        <h2 className="pink-heading">Nieuw account aanmaken</h2>
                        <img src={newuserlogo} alt="logo nieuwe gebruiker" className="cocktail-logo-login" />
                        <div className="contact-container">
                            {isLoading && <LoadingIndicator loadingProgress={loadingProgress} />}
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
                                {success && <p className="success">{success}</p>}
                                <button type="submit" disabled={isLoading}>
                                    {isLoading ? 'Loading...' : 'Creëer nieuw account'}
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default SignUp;
