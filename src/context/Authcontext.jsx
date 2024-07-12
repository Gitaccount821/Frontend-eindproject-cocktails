

import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const authenticate = async (username, password) => {
        setLoading(true);
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
            const { accessToken } = response.data;
            localStorage.setItem('accessToken', accessToken);
            await fetchUserData(username);
        } catch (err) {
            console.error('Authentication error:', err);
            setError('Combinatie van gebruikersnaam en wachtwoord is onjuist');
        } finally {
            setLoading(false);
        }
    };

    const fetchUserData = async (username) => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.get(
                `https://api.datavortex.nl/cocktailshaker/users/${username}/info`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
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
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, authenticate, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

/* check */