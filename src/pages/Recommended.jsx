import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logoImage from "../assets/cocktaillogoheader.png";
import HeaderSection from '../components/HeaderSection';
import { useAuth } from '../context/AuthContext';
import LoadingIndicator from '../components/LoadingIndicator';

function Recommended() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [selectedOption, setSelectedOption] = useState('');
    const [error, setError] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(1);

    useEffect(() => {
        const fetchRecommendations = async () => {
            setLoading(true);
            try {
                let filteredCocktails = [];
                console.log('Fetching recommendations with selected option:', selectedOption);

                if (selectedOption === 'with-alcohol') {
                    const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic');
                    filteredCocktails = response.data.drinks || [];
                } else if (selectedOption === 'without-alcohol') {
                    const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic');
                    filteredCocktails = response.data.drinks || [];
                }

                console.log('Filtered by alcohol:', filteredCocktails);


                setRecommendations(filteredCocktails);
                console.log('Final recommendations:', filteredCocktails);
            } catch (error) {
                console.error('Error fetching recommendations:', error);
                setError('Er is iets misgegaan bij het ophalen van aanbevelingen.');
            } finally {
                setLoading(false);
            }
        };

        if (currentQuestion === 1 && selectedOption) {
            fetchRecommendations();
        }
    }, [selectedOption, currentQuestion]);

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleContinue = () => {
        if (selectedOption === '') {
            setError('Maak alstublieft eerst een keuze voordat u door kan gaan');
        } else {
            setError('');
            if (currentQuestion === 1) {
                setCurrentQuestion(currentQuestion + 1);
            }
        }
    };

    return (
        <div className="app-container">
            <main className="main-content">
                <HeaderSection
                    handleNavigateHome={() => navigate('/')}
                    handleNavigateToContact={() => navigate('/contact')}
                    handleLogout={() => { logout(); navigate('/'); }}
                    handleNavigateToLogin={() => navigate('/login')}
                    handleNavigateToSearch={() => navigate('/search')}
                    handleNavigateToRecommended={() => navigate('/Recommended')}
                    handleNavigateToFavourites={() => navigate('/Favourites')}
                    user={user}
                    logoImage={logoImage}
                />
                <section className="flex-item sectionrec">
                    <div className="welcome-text">
                        <p className="large-header">Aangeraden cocktails voor jouw stemming vandaag</p>
                        <div className="question-box">
                            {error && <p className="error-message">{error}</p>}
                            {loading && <LoadingIndicator />}
                            {currentQuestion === 1 && (
                                <>
                                    <p className="question-text">Vraag 1</p>
                                    <div className="options-container">
                                        <label className="option-label">
                                            <input
                                                type="radio"
                                                name="alcohol"
                                                value="with-alcohol"
                                                checked={selectedOption === 'with-alcohol'}
                                                onChange={handleOptionChange}
                                            />
                                            Met alcohol
                                        </label>
                                        <label className="option-label">
                                            <input
                                                type="radio"
                                                name="alcohol"
                                                value="without-alcohol"
                                                checked={selectedOption === 'without-alcohol'}
                                                onChange={handleOptionChange}
                                            />
                                            Zonder alcohol
                                        </label>
                                    </div>
                                </>
                            )}
                            {currentQuestion > 1 && (
                                <div className="cocktail-results">
                                    <p className="completion-text">We laten nu je matches zien!</p>
                                    {loading ? (
                                        <LoadingIndicator />
                                    ) : (
                                        <div className="cocktail-list">
                                            {recommendations.length === 0 ? (
                                                <p>Geen cocktails gevonden op basis van je keuze.</p>
                                            ) : (
                                                recommendations.map(cocktail => (
                                                    <div
                                                        key={cocktail.idDrink}
                                                        className="cocktail-preview"
                                                        onClick={() => navigate(`/cocktail/${cocktail.idDrink}`)}
                                                    >
                                                        <h2>{cocktail.strDrink}</h2>
                                                        <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                            <button className="continue-button" onClick={handleContinue} disabled={loading}>
                                {currentQuestion > 1 ? ' ' : 'Doorgaan'}
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="flex-item footer">
                <div className="footer-left">
                    <button className="button" onClick={() => navigate('/contact')}>
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

export default Recommended;
