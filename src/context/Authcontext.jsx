// AuthContext.js

import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

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

            const { jwt: accessToken } = response.data;
            localStorage.setItem('accessToken', accessToken);
            await fetchUserData(username, accessToken);
            setMessage('Log in succesvol!');
        } catch (err) {
            console.error('Authentication error:', err);
            setError('Combinatie van gebruikersnaam en wachtwoord is onjuist');
        } finally {
            setLoading(false);
        }
    };

    const fetchUserData = async (username, token) => {
        try {
            const response = await axios.get(
                `https://api.datavortex.nl/cocktailshaker/users/${username}/info`,
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
        }
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        setUser(null);
        setMessage(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, message, authenticate, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
