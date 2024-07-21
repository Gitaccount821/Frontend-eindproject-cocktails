import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from "../assets/cocktaillogoheader.png";
import HeaderSection from '../components/HeaderSection';
import { useAuth } from '../context/AuthContext';

function Search() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const handleNavigateToContact = () => navigate('/contact');
    const handleNavigateHome = () => navigate('/');
    const handleNavigateToLogin = () => navigate('/login');
    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleSearch = (query) => {
        if (query.trim() === '') {
            setSearchResults([]);
            setErrorMessage('Vul alsjeblieft een waarde in');
            return;
        }

        setErrorMessage('');

        // TEST ZOEK RESULTATEN: vul hier later de API in (integreren)
        const simulatedResults = [
            { id: 1, name: 'Margarita' },
            { id: 2, name: 'Mojito' },
            { id: 3, name: 'Old Fashioned' },
            { id: 4, name: 'Cosmopolitan' },
            { id: 5, name: 'Daiquiri' }
        ];
        setSearchResults(simulatedResults.filter(cocktail => cocktail.name.toLowerCase().includes(query.toLowerCase())));
    };

    const handleInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        handleSearch(query);
    };

    const handleSelectSuggestion = (name) => {
        setSearchQuery(name);
        setSearchResults([]);
    };

    return (
        <div className="app-container">
            <main className="main-content">
                <HeaderSection
                    handleNavigateHome={handleNavigateHome}
                    handleNavigateToContact={handleNavigateToContact}
                    handleLogout={handleLogout}
                    handleNavigateToLogin={handleNavigateToLogin}
                    handleNavigateToSearch={() => navigate('/search')}
                    handleNavigateToRecommended={() => navigate('/Recommended')}
                    handleNavigateToFavourites={() => navigate('/Favourites')}
                    user={user}
                    logoImage={logoImage}
                />
                <section className="search-section">
                    <div className="search-container">
                        <form onSubmit={(e) => e.preventDefault()} className="search-form">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleInputChange}
                                placeholder="Zoek naar cocktails"
                                className="search-input"
                            />
                            <button type="submit" className="search-button">Zoeken</button>
                        </form>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        {searchResults.length > 0 && (
                            <ul className="suggestions-list">
                                {searchResults.map(result => (
                                    <li
                                        key={result.id}
                                        onClick={() => handleSelectSuggestion(result.name)}
                                        className="suggestion-item"
                                    >
                                        {result.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </section>
            </main>
            <footer className="flex-item footer">
                <div className="footer-left">
                    <button className="button" onClick={handleNavigateToContact}>
                        <p className="contact-text">neem contact op</p>
                    </button>
                </div>
                <div className="footer-right">
                    <p>In opdracht van:</p>
                    <p>Novi Hogeschool</p>
                </div>
            </footer>
        </div>
    );
}

export default Search;
