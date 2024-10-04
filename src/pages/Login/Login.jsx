import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../../context/Authcontext';
import cocktailLogoLogin from "../../assets/cocktaillogologin.png";
import '../../App.css';
import {PasswordInput, UsernameInput} from "../../components/labelinputs";
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';

function Login() {
    const {authenticate, loading, error, message, user, logout} = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticate(username, password);
    };


    return (<div className="app-container">

            <main className="main-content">
                {loading && <LoadingIndicator/>}
                <section className="flex-item section3">
                    <div>
                        <h2 className="pink-heading">Cocktail Shaker Login</h2>
                        <img src={cocktailLogoLogin} alt="Cocktail Logo Login" className="cocktail-logo-login"/>
                        <div className="contact-container">
                            <form onSubmit={handleSubmit}>
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
                                <button type="submit" disabled={loading}>
                                    Inloggen
                                </button>
                                {error && <p className="error">{error}</p>}
                                {message && <p className="success">{message}</p>}
                            </form>
                            <p style={{textAlign: 'right'}}>Nog geen account? <Link to="/signup">Registreer hier</Link>
                            </p>
                        </div>
                    </div>
                </section>
            </main>

        </div>);
}

export default Login;
