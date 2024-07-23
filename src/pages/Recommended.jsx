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
    const [fourthQuestionOption, setFourthQuestionOption] = useState('');
    const [fifthQuestionOption, setFifthQuestionOption] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [error, setError] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        const fetchRecommendations = async () => {
            setLoading(true);
            try {
                let filteredCocktails = [];

                if (selectedOption === 'with-alcohol') {
                    const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic');
                    filteredCocktails = response.data.drinks || [];
                } else if (selectedOption === 'without-alcohol') {
                    const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic');
                    filteredCocktails = response.data.drinks || [];
                }

                let glassFilteredCocktails = [];

                if (secondQuestionOption === 'normal-glass') {
                    const normalGlassResponse = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail_glass');
                    glassFilteredCocktails = normalGlassResponse.data.drinks || [];
                } else if (secondQuestionOption === 'special-glass') {
                    const specialGlassResponse = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Champagne_flute');
                    glassFilteredCocktails = specialGlassResponse.data.drinks || [];
                }

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

                const initialRecommendations = combinedCocktails.filter(cocktail =>
                    mixFilteredCocktails.some(mixCocktail => mixCocktail.idDrink === cocktail.idDrink)
                );

                let finalRecommendations = [];

                if (fourthQuestionOption === 'fruity-cocktail') {
                    const ingredientResponses = await Promise.all([
                        axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Orange_juice'),
                        axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Pineapple'),
                        axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Strawberry'),
                        axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Red-wine')
                    ]);

                    const fruityCocktails = ingredientResponses.flatMap(response => response.data.drinks || []);
                    finalRecommendations = initialRecommendations.filter(cocktail =>
                        fruityCocktails.some(fruityCocktail => fruityCocktail.idDrink === cocktail.idDrink)
                    );
                } else if (fourthQuestionOption === 'dry-cocktail') {
                    const ingredientResponses = await Promise.all([
                        axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?i=vodka'),
                        axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?i=gin'),
                        axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?i=rum'),
                        axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?i=scotch')
                    ]);

                    const dryCocktails = ingredientResponses.flatMap(response => response.data.drinks || []);
                    finalRecommendations = initialRecommendations.filter(cocktail =>
                        !dryCocktails.some(dryCocktail => dryCocktail.idDrink === cocktail.idDrink)
                    );
                }

                if (fifthQuestionOption === 'vega') {
                    const ingredientResponses = await Promise.all([
                        axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Egg'),
                        axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Milk')
                    ]);

                    const restrictedCocktails = ingredientResponses.flatMap(response => response.data.drinks || []);
                    finalRecommendations = finalRecommendations.filter(cocktail =>
                        !restrictedCocktails.some(restrictedCocktail => restrictedCocktail.idDrink === cocktail.idDrink)
                    );
                }

                setRecommendations(finalRecommendations);
            } catch (error) {
                console.error('Error fetching recommendations:', error);
                setError('Er is iets misgegaan bij het ophalen van aanbevelingen.');
            } finally {
                setLoading(false);
            }
        };

        if (currentQuestion === 5 && fifthQuestionOption) {
            fetchRecommendations();
        }
    }, [selectedOption, secondQuestionOption, thirdQuestionOption, fourthQuestionOption, fifthQuestionOption, currentQuestion]);

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleSecondOptionChange = (e) => {
        setSecondQuestionOption(e.target.value);
    };

    const handleThirdOptionChange = (e) => {
        setThirdQuestionOption(e.target.value);
    };

    const handleFourthOptionChange = (e) => {
        setFourthQuestionOption(e.target.value);
    };

    const handleFifthOptionChange = (e) => {
        setFifthQuestionOption(e.target.value);
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
        } else if (currentQuestion === 4) {
            if (fourthQuestionOption === '') {
                setError('Maak alstublieft eerst een keuze voordat u door kan gaan');
            } else {
                setError('');
                setCurrentQuestion(currentQuestion + 1);
            }
        } else if (currentQuestion === 5) {
            if (fifthQuestionOption === '') {
                setError('Maak alstublieft eerst een keuze voordat u door kan gaan');
            } else {
                setError('');
                setShowResults(true);
            }
        }
    };

    const handleRefresh = () => {
        window.location.reload();
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
                            {!showResults && (
                                <>
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
                                        <>
                                            <p className="question-text">Vraag 4</p>
                                            <div className="options-container">
                                                <label className="option-label">
                                                    <input
                                                        type="radio"
                                                        name="fruitiness"
                                                        value="fruity-cocktail"
                                                        checked={fourthQuestionOption === 'fruity-cocktail'}
                                                        onChange={handleFourthOptionChange}
                                                    />
                                                    Een fruitige cocktail
                                                </label>
                                                <label className="option-label">
                                                    <input
                                                        type="radio"
                                                        name="fruitiness"
                                                        value="dry-cocktail"
                                                        checked={fourthQuestionOption === 'dry-cocktail'}
                                                        onChange={handleFourthOptionChange}
                                                    />
                                                    Een droge cocktail
                                                </label>
                                            </div>
                                        </>
                                    )}
                                    {currentQuestion === 5 && (
                                        <>
                                            <p className="question-text">Vraag 5</p>
                                            <div className="options-container">
                                                <label className="option-label">
                                                    <input
                                                        type="radio"
                                                        name="allergens"
                                                        value="vega"
                                                        checked={fifthQuestionOption === 'vega'}
                                                        onChange={handleFifthOptionChange}
                                                    />
                                                    Vega
                                                </label>
                                                <label className="option-label">
                                                    <input
                                                        type="radio"
                                                        name="allergens"
                                                        value="geen-voorkeur"
                                                        checked={fifthQuestionOption === 'geen-voorkeur'}
                                                        onChange={handleFifthOptionChange}
                                                    />
                                                    Geen voorkeur
                                                </label>
                                            </div>
                                        </>
                                    )}
                                    <button className="continue-button" onClick={handleContinue} disabled={loading}>
                                        {currentQuestion === 5 ? 'Toon Resultaten' : 'Doorgaan'}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                {showResults && (
                    <section className="favourites">
                        <div className="results-message-container">
                            <p className="large-text">We laten nu de matches zien</p>
                        </div>
                        <div className="cocktail-list">
                            {recommendations.length > 0 ? (
                                <div className="cocktail-list">
                                    {recommendations.map(cocktail => (
                                        <div
                                            key={cocktail.idDrink}
                                            className="cocktail-preview"
                                            onClick={() => navigate(`/cocktail/${cocktail.idDrink}`)}
                                        >
                                            <h2>{cocktail.strDrink}</h2>
                                            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>Geen resultaten gevonden.</p>
                            )}
                        </div>
                        <button className="continue-button refresh-button" onClick={handleRefresh}>
                            Terug naar start
                        </button>
                    </section>
                )}
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
