import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [sessionExpiration, setSessionExpiration] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('Token');
        if (token) {
            const rawToken = token.replace('Bearer ', '');
            const username = jwtDecode(rawToken).sub;
            fetchUserData(username, token);
            setSessionExpiration(Date.now() + 3600000);
        }
    }, []);

    useEffect(() => {
        const checkSession = setInterval(() => {
            if (sessionExpiration && Date.now() > sessionExpiration) {
                logout('Je sessie is verlopen. Log opnieuw in.');
            }
        }, 1000);

        return () => clearInterval(checkSession);
    }, [sessionExpiration]);

    const authenticate = async (username, password, updateLoadingProgress) => {
        const controller = new AbortController();
        const signal = controller.signal;

        setLoading(true);
        setError('');
        setMessage('');
        updateLoadingProgress(10);

        try {
            const response = await axios.post(
                'https://api.datavortex.nl/cocktailshaker/users/authenticate',
                { username, password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Api-Key': import.meta.env.API_KEY,
                    },
                    signal: signal
                }
            );

            updateLoadingProgress(50);

            const { jwt: Token } = response.data;

            if (!Token) {
                setError('Verkeerde Token ontvangen');
                updateLoadingProgress(100);
                return;
            }

            localStorage.setItem('Token', Token);
            await fetchUserData(username, Token, signal);
            setMessage('Log in successful! Je wordt terugverwezen naar de Home Pagina');

            updateLoadingProgress(90);

            setTimeout(() => {
                updateLoadingProgress(100);
                navigate('/');
            }, 1000);
        } catch (err) {
            if (err.name !== 'CanceledError') {
                console.error('Authentication error:', err);
                setError('Verkeerde gebruikersnaam of wachtwoord');
            }
            updateLoadingProgress(100);
        } finally {
            setLoading(false);
        }

        return () => {
            controller.abort();
        };
    };

    const fetchUserData = async (username, token, signal) => {
        if (!token) return;

        setLoading(true);
        setError('');
        setMessage('');

        try {
            const response = await axios.get(
                `https://api.datavortex.nl/cocktailshaker/users/${username}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'X-Api-Key': 'cocktailshaker:02gWTBwcnwhUwPE4NIzm',
                    },
                    signal: signal
                }
            );

            setUser(response.data);
        } catch (err) {
            if (err.name === 'CanceledError') return;

            if (err.response && err.response.status === 401) {
                logout('Je sessie is verlopen. Log opnieuw in.');
                return;
            }

            console.error('Error fetching user data:', err);
            setError('Er is een fout opgetreden bij het ophalen van gebruikersgegevens.');
        } finally {
            setLoading(false);
        }
    };

    const logout = (logoutMessage = '') => {
        localStorage.removeItem('Token');
        setUser('');
        setMessage(logoutMessage);
        setError('');
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, message, authenticate, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
