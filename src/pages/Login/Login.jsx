import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/Authcontext';
import { useLoading } from '../../context/LoadingContext';
import cocktailLogoLogin from "../../assets/cocktaillogologin.png";
import '../../App.css';
import InputField from "../../components/Labelinputs/labelinputs";
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';
import AppContainer from '../../components/AppContainer/AppContainer';
import MainContent from '../../components/MainContent/MainContent';
import ContactContainer from '../../components/ContactContainer/ContactContainer';

function Login() {
    const { authenticate, error, message, user } = useAuth();
    const { isLoading, setIsLoading, loadingProgress, setLoadingProgress } = useLoading();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setLoadingProgress(0);

        try {
            await authenticate(username, password, updateLoadingProgress);
        } finally {
            setIsLoading(false);
        }
    };

    const updateLoadingProgress = (progress) => {
        setLoadingProgress(progress);
    };

    return (
<AppContainer>
    <MainContent>
                {isLoading && <LoadingIndicator loadingProgress={loadingProgress} />}
                <section className="flex-item sectionBoxfor2SectionsPages">
                    <div>
                        <h2 className="pink-heading">Cocktail Shaker Login</h2>
                        <img src={cocktailLogoLogin} alt="Cocktail Logo Login" className="cocktail-logo-login" />
                        <ContactContainer>
                            <form onSubmit={handleSubmit}>
                                <InputField
                                    id="username-field"
                                    type="text"
                                    label="Gebruikersnaam:"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Vul hier je gebruikersnaam in"
                                />
                                <InputField
                                    id="password-field"
                                    type="password"
                                    label="Wachtwoord:"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Vul hier je wachtwoord in"
                                />
                                <button type="submit" disabled={isLoading}>
                                    {isLoading ? 'Loading...' : 'Inloggen'}
                                </button>
                                {error && <p className="error">{error}</p>}
                                {message && <p className="success">{message}</p>}
                            </form>
                            <p style={{ textAlign: 'right' }}>Nog geen account? <Link to="/signup">Registreer hier</Link></p>
                        </ContactContainer>
                    </div>
                </section>
        </MainContent>
</AppContainer>
    );
}

export default Login;
