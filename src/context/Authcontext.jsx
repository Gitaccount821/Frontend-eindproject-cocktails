import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('Token');
        if (token) {
            const rawToken = token.replace('Bearer ', '');
            const username = jwtDecode(rawToken).sub;
            fetchUserData(username, token);
        }
    }, []);

    const authenticate = async (username, password) => {
        setLoading(true);
        setError(null);
        setMessage(null);
        try {
            const response = await axios.post(
                'https://api.datavortex.nl/cocktailshaker/users/authenticate',
                { username, password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Api-Key': 'cocktailshaker:02gWTBwcnwhUwPE4NIzm',
                    },
                }
            );

            const { jwt: Token } = response.data;

            if (!Token) {
                setError('Verkeerde Token ontvangen');
                return;
            }

            localStorage.setItem('Token', Token);
            await fetchUserData(username, Token);
            setMessage('Log in successful! Je wordt terugverwezen naar de Home Pagina');

            setTimeout(() => {
                navigate('/');
            }, 1000);
        } catch (err) {
            console.error('Authentication error:', err);
            setError('Verkeerde gebruikersnaam of wachtwoord');
        } finally {
            setLoading(false);
        }
    };

    const fetchUserData = async (username, token) => {
        if (!token) return;

        setLoading(true);
        setError(null);
        setMessage(null);
        try {
            const response = await axios.get(
                `https://api.datavortex.nl/cocktailshaker/users/${username}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'X-Api-Key': 'cocktailshaker:02gWTBwcnwhUwPE4NIzm',
                    },
                }
            );
            setUser(response.data);
        } catch (err) {
            console.error('Error fetching user data:', err);
            setError('Er is een fout opgetreden bij het ophalen van gebruikersgegevens.');
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('Token');
        setUser(null);
        setMessage(null);
        setError(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, message, authenticate, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
