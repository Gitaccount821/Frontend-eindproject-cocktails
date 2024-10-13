import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/Authcontext';
import { useLoading } from '../../context/LoadingContext';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import './Search.css';

function Search() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { setIsLoading } = useLoading();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedCocktail, setSelectedCocktail] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSearch = async (query) => {
        if (query.trim() === '') {
            setSearchResults([]);
            setErrorMessage('Vul alsjeblieft een naam in');
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
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        handleSearch(searchQuery);
    };

    const handleSelectSuggestion = (cocktail) => {
        setSearchQuery(cocktail.name);
        setSelectedCocktail(cocktail);
        setSearchResults([]);
    };

    const handleCocktailClick = (id) => {
        navigate(`/cocktail/${id}`);
    };

    return (
        <div className="app-container">
            <main className="main-content">
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
                        <ErrorMessage message={errorMessage} />
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
                                    <img src={selectedCocktail.thumbnail.replace('/preview', '')}
                                         alt={selectedCocktail.name} className="large-thumbnail" />
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Search;
