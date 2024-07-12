

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Authcontext';

function Login() {
    const { authenticate, loading, error } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await authenticate(username, password);

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
            </form>
            <p>Nog geen account? <Link to="/signup">Registreer hier</Link></p>
        </div>
    );
}

export default Login;
