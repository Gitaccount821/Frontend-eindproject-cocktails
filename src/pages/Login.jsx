import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
    const { authenticate, loading, error, message } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await authenticate(username, password);
        setUsername('');
        setPassword('');
    };

    return (
        <div>
            <h2>Inloggen</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Gebruikersnaam:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    Wachtwoord:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button type="submit" disabled={loading}>
                    Inloggen
                </button>
                {error && <p className="error">{error}</p>}
                {message && <p className="success">{message}</p>}
            </form>
            <p>Nog geen account? <Link to="/signup">Registreer hier</Link></p>
        </div>
    );
}

export default Login;
