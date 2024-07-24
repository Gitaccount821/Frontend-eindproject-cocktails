import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logoImage from "../assets/cocktaillogoheader.png";
import HeaderSection from '../components/HeaderSection';
import { useAuth } from '../context/AuthContext';
import { useLoading } from '../context/LoadingContext';
import FooterSection from "../components/FooterSection";
import ErrorMessage from '../components/ErrorMessage';

function Search() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { setIsLoading } = useLoading();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedCocktail, setSelectedCocktail] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleNavigateToContact = () => navigate('/contact');
    const handleNavigateHome = () => navigate('/');
    const handleNavigateToLogin = () => navigate('/login');
    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleSearch = async (query) => {
        if (query.trim() === '') {
            setSearchResults([]);
            setErrorMessage('Vul alsjeblieft een waarde in');
            return;
        }

        setErrorMessage('');
        setIsLoading(true);

        try {
            const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
            const data = response.data.drinks || [];
            setSearchResults(data.map(drink => ({
                id: drink.idDrink,
                name: drink.strDrink,
                thumbnail: drink.strDrinkThumb + '/preview'
            })));
        } catch (error) {
            console.error('Error fetching data from API:', error);
            setErrorMessage('Er is iets misgegaan met het ophalen van de cocktails.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        handleSearch(query);
    };

    const handleSelectSuggestion = (cocktail) => {
        setSearchQuery(cocktail.name);
        setSelectedCocktail(cocktail);
        setSearchResults([]);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim() === '') {
            setErrorMessage('Vul alsjeblieft een waarde in');
            return;
        }

        setErrorMessage('');
        setSelectedCocktail(searchResults.find(cocktail => cocktail.name.toLowerCase() === searchQuery.toLowerCase()) || null);
    };

    const handleCocktailClick = (id) => {
        navigate(`/cocktail/${id}`);
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
                        <p className="search-prompt">Vul hieronder je gezochte cocktail in!</p>
                        <form onSubmit={handleSearchSubmit} className="search-form">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleInputChange}
                                placeholder="Zoek naar cocktails"
                                className="search-input"
                            />
                        </form>
                        <ErrorMessage message={errorMessage} /> {}
                        {searchResults.length > 0 && (
                            <ul className="suggestions-list">
                                {searchResults.map(result => (
                                    <li
                                        key={result.id}
                                        onClick={() => handleSelectSuggestion(result)}
                                        className="suggestion-item"
                                    >
                                        <img src={result.thumbnail} alt={result.name} className="thumbnail" />
                                        {result.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                        {selectedCocktail && (
                            <div className="selected-cocktail" onClick={() => handleCocktailClick(selectedCocktail.id)}>
                                <div className="selected-cocktail-overlay">
                                    <p className="selected-cocktail-text">{selectedCocktail.name}</p>
                                    <img src={selectedCocktail.thumbnail.replace('/preview', '')} alt={selectedCocktail.name} className="large-thumbnail" />
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <FooterSection
                contactText="neem contact op"
                credits={["In opdracht van:", "Novi Hogeschool"]}
                onContactClick={handleNavigateToContact}
            />
        </div>
    );
}

export default Search;
