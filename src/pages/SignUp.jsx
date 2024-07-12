import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
    // state for the form
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // state for functionality
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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
                email,  // Include email in the payload
                authorities: [{ authority: 'USER' }],
            }, config);


            console.log('Registration successful:', response.data);
        } catch(e) {
            console.error('Registration error:', e);


            if (e.response && e.response.data && e.response.data.message) {
                setError(e.response.data.message);
            } else if (e.response && e.response.data) {
                setError(JSON.stringify(e.response.data));
            } else {
                setError('Er is een fout opgetreden. Probeer het later opnieuw.');
            }
        }

        setLoading(false);
    }

    return (
        <>
            <h1>Registreren</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque eligendi
                harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur deserunt
                doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?
            </p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email-field">
                    Emailadres:
                    <input
                        type="email"
                        id="email-field"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>

                <label htmlFor="username-field">
                    Gebruikersnaam:
                    <input
                        type="text"
                        id="username-field"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>

                <label htmlFor="password-field">
                    Wachtwoord:
                    <input
                        type="password"
                        id="password-field"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                {error && <p className="error">{error}</p>}
                <button
                    type="submit"
                    className="form-button"
                    disabled={loading}
                >
                    Registreren
                </button>
            </form>

        </>
    );
}

export default SignUp;
