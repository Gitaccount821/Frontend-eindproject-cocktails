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
    const [secondQuestionOption, setSecondQuestionOption] = useState('');
    const [thirdQuestionOption, setThirdQuestionOption] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [error, setError] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchRecommendations = async () => {
            setLoading(true);
            try {
                let filteredCocktails = [];

                console.log('Fetching recommendations with selected options:', selectedOption, secondQuestionOption, thirdQuestionOption);


                if (selectedOption === 'with-alcohol') {
                    const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic');
                    filteredCocktails = response.data.drinks || [];
                } else if (selectedOption === 'without-alcohol') {
                    const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic');
                    filteredCocktails = response.data.drinks || [];
                }

                console.log('Filtered by alcohol:', filteredCocktails);


                let glassFilteredCocktails = [];

                if (secondQuestionOption === 'normal-glass') {
                    const normalGlassResponse = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail_glass');
                    glassFilteredCocktails = normalGlassResponse.data.drinks || [];
                } else if (secondQuestionOption === 'special-glass') {
                    const specialGlassResponse = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Champagne_flute');
                    glassFilteredCocktails = specialGlassResponse.data.drinks || [];
                }

                console.log('Filtered by glass:', glassFilteredCocktails);


                let combinedCocktails = filteredCocktails.filter(cocktail =>
                    glassFilteredCocktails.some(glassCocktail => glassCocktail.idDrink === cocktail.idDrink)
                );


                let mixFilteredCocktails = [];

                if (thirdQuestionOption === 'ordinary-mix') {
                    const ordinaryMixResponse = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink');
                    mixFilteredCocktails = ordinaryMixResponse.data.drinks || [];
                } else if (thirdQuestionOption === 'special-mix') {
                    const specialMixResponse = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail');
                    mixFilteredCocktails = specialMixResponse.data.drinks || [];
                }

                console.log('Filtered by mix:', mixFilteredCocktails);


                const finalRecommendations = combinedCocktails.filter(cocktail =>
                    mixFilteredCocktails.some(mixCocktail => mixCocktail.idDrink === cocktail.idDrink)
                );

                setRecommendations(finalRecommendations);
                console.log('Final recommendations:', finalRecommendations);
            } catch (error) {
                console.error('Error fetching recommendations:', error);
                setError('Er is iets misgegaan bij het ophalen van aanbevelingen.');
            } finally {
                setLoading(false);
            }
        };

        if (currentQuestion === 3 && selectedOption && secondQuestionOption && thirdQuestionOption) {
            fetchRecommendations();
        }
    }, [selectedOption, secondQuestionOption, thirdQuestionOption, currentQuestion]);

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleSecondOptionChange = (e) => {
        setSecondQuestionOption(e.target.value);
    };

    const handleThirdOptionChange = (e) => {
        setThirdQuestionOption(e.target.value);
    };

    const handleContinue = () => {
        if (currentQuestion === 1) {
            if (selectedOption === '') {
                setError('Maak alstublieft eerst een keuze voordat u door kan gaan');
            } else {
                setError('');
                setCurrentQuestion(currentQuestion + 1);
            }
        } else if (currentQuestion === 2) {
            if (secondQuestionOption === '') {
                setError('Maak alstublieft eerst een keuze voordat u door kan gaan');
            } else {
                setError('');
                setCurrentQuestion(currentQuestion + 1);
            }
        } else if (currentQuestion === 3) {
            if (thirdQuestionOption === '') {
                setError('Maak alstublieft eerst een keuze voordat u door kan gaan');
            } else {
                setError('');
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
                            {currentQuestion === 2 && (
                                <>
                                    <p className="question-text">Vraag 2</p>
                                    <div className="options-container">
                                        <label className="option-label">
                                            <input
                                                type="radio"
                                                name="glass"
                                                value="normal-glass"
                                                checked={secondQuestionOption === 'normal-glass'}
                                                onChange={handleSecondOptionChange}
                                            />
                                            Normaal glas
                                        </label>
                                        <label className="option-label">
                                            <input
                                                type="radio"
                                                name="glass"
                                                value="special-glass"
                                                checked={secondQuestionOption === 'special-glass'}
                                                onChange={handleSecondOptionChange}
                                            />
                                            Speciaal glas
                                        </label>
                                    </div>
                                </>
                            )}
                            {currentQuestion === 3 && (
                                <>
                                    <p className="question-text">Vraag 3</p>
                                    <div className="options-container">
                                        <label className="option-label">
                                            <input
                                                type="radio"
                                                name="mix"
                                                value="ordinary-mix"
                                                checked={thirdQuestionOption === 'ordinary-mix'}
                                                onChange={handleThirdOptionChange}
                                            />
                                            Gewone mix
                                        </label>
                                        <label className="option-label">
                                            <input
                                                type="radio"
                                                name="mix"
                                                value="special-mix"
                                                checked={thirdQuestionOption === 'special-mix'}
                                                onChange={handleThirdOptionChange}
                                            />
                                            Speciale mix
                                        </label>
                                    </div>
                                </>
                            )}
                            {currentQuestion === 4 && (
                                <div className="cocktail-results">
                                    <p className="completion-text">We laten nu je matches zien!</p>
                                    {loading ? (
                                        <LoadingIndicator />
                                    ) : (
                                        <div className="cocktail-list">
                                            {recommendations.length === 0 ? (
                                                <p>Geen cocktails gevonden op basis van je keuzes.</p>
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
                                {currentQuestion === 4 ? ' ' : 'Doorgaan'}
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
