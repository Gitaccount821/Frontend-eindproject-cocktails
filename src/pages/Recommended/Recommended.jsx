import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';
import CocktailPreview from '../../components/CocktailPreview/CocktailPreview';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import './Recommended.css';

function Recommended() {
    const navigate = useNavigate();
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

// Helper Functies:

    const fetchFilteredCocktails = async (option, url) => {
        try {
            const response = await axios.get(url);
            return response.data.drinks || [];
        } catch (error) {
            console.error(`Error fetching ${option} cocktails:`, error);
            throw error;
        }
    };

    const filterCocktailsByGlass = async (glassOption) => {
        switch (glassOption) {
            case 'normal-glass':
                return await fetchFilteredCocktails('normal glass', 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail_glass');
            case 'special-glass':
                return await fetchFilteredCocktails('special glass', 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Champagne_flute');
            default:
                return [];
        }
    };

    const filterCocktailsByMix = async (mixOption) => {
        switch (mixOption) {
            case 'ordinary-mix':
                return await fetchFilteredCocktails('ordinary mix', 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink');
            case 'special-mix':
                return await fetchFilteredCocktails('special mix', 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail');
            default:
                return [];
        }
    };

    const filterCocktailsByType = async (selectedOption) => {
        switch (selectedOption) {
            case 'with-alcohol':
                return await fetchFilteredCocktails('alcoholic', 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic');
            case 'without-alcohol':
                return await fetchFilteredCocktails('non-alcoholic', 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic');
            default:
                return [];
        }
    };

    const filterByFlavor = async (flavorOption, recommendations) => {
        switch (flavorOption) {
            case 'fruity-cocktail':
                const fruityCocktails = await Promise.all([
                    fetchFilteredCocktails('orange juice', 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Orange_juice'),
                    fetchFilteredCocktails('pineapple', 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Pineapple'),
                    fetchFilteredCocktails('strawberry', 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Strawberry'),
                    fetchFilteredCocktails('red wine', 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Red-wine')
                ]);
                return recommendations.filter(cocktail =>
                    fruityCocktails.flat().some(fruitCocktail => fruitCocktail.idDrink === cocktail.idDrink)
                );
            case 'dry-cocktail':
                const dryCocktails = await Promise.all([
                    fetchFilteredCocktails('vodka', 'https://www.thecocktaildb.com/api/json/v1/1/search.php?i=vodka'),
                    fetchFilteredCocktails('gin', 'https://www.thecocktaildb.com/api/json/v1/1/search.php?i=gin'),
                    fetchFilteredCocktails('rum', 'https://www.thecocktaildb.com/api/json/v1/1/search.php?i=rum'),
                    fetchFilteredCocktails('scotch', 'https://www.thecocktaildb.com/api/json/v1/1/search.php?i=scotch')
                ]);
                return recommendations.filter(cocktail =>
                    !dryCocktails.flat().some(dryCocktail => dryCocktail.idDrink === cocktail.idDrink)
                );
            default:
                return recommendations;
        }
    };

    const applyVeganFilter = async (recommendations) => {
        const veganRestricted = await Promise.all([
            fetchFilteredCocktails('egg', 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Egg'),
            fetchFilteredCocktails('milk', 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Milk')
        ]);
        return recommendations.filter(cocktail =>
            !veganRestricted.flat().some(restricted => restricted.idDrink === cocktail.idDrink)
        );
    };

    const getOptionsForCurrentQuestion = () => {
        switch (currentQuestion) {
            case 1:
                return [
                    { value: 'with-alcohol', label: 'Met alcohol', isSelected: selectedOption === 'with-alcohol', setOption: setSelectedOption },
                    { value: 'without-alcohol', label: 'Zonder alcohol', isSelected: selectedOption === 'without-alcohol', setOption: setSelectedOption }
                ];
            case 2:
                return [
                    { value: 'normal-glass', label: 'Normaal glas', isSelected: secondQuestionOption === 'normal-glass', setOption: setSecondQuestionOption },
                    { value: 'special-glass', label: 'Speciaal glas', isSelected: secondQuestionOption === 'special-glass', setOption: setSecondQuestionOption }
                ];
            case 3:
                return [
                    { value: 'ordinary-mix', label: 'Gewone mix', isSelected: thirdQuestionOption === 'ordinary-mix', setOption: setThirdQuestionOption },
                    { value: 'special-mix', label: 'Speciale mix', isSelected: thirdQuestionOption === 'special-mix', setOption: setThirdQuestionOption }
                ];
            case 4:
                return [
                    { value: 'fruity-cocktail', label: 'Fruitige cocktail', isSelected: fourthQuestionOption === 'fruity-cocktail', setOption: setFourthQuestionOption },
                    { value: 'dry-cocktail', label: 'Droge cocktail', isSelected: fourthQuestionOption === 'dry-cocktail', setOption: setFourthQuestionOption }
                ];
            case 5:
                return [
                    { value: 'vegan', label: 'Vegan', isSelected: fifthQuestionOption === 'vegan', setOption: setFifthQuestionOption },
                    { value: 'non-vegan', label: 'Niet vegan', isSelected: fifthQuestionOption === 'non-vegan', setOption: setFifthQuestionOption }
                ];
            default:
                return [];
        }
    };


// De Functie voor het krijgen van de recommendations
    useEffect(() => {
        const fetchRecommendations = async () => {
            setLoading(true);
            try {
                const filteredCocktails = await filterCocktailsByType(selectedOption);
                const glassFilteredCocktails = await filterCocktailsByGlass(secondQuestionOption);

                const combinedCocktails = filteredCocktails.filter(cocktail =>
                    glassFilteredCocktails.some(glassCocktail => glassCocktail.idDrink === cocktail.idDrink)
                );

                const mixFilteredCocktails = await filterCocktailsByMix(thirdQuestionOption);

                const initialRecommendations = combinedCocktails.filter(cocktail =>
                    mixFilteredCocktails.some(mixCocktail => mixCocktail.idDrink === cocktail.idDrink)
                );

                let finalRecommendations = await filterByFlavor(fourthQuestionOption, initialRecommendations);

                if (fifthQuestionOption === 'vegan') {
                    finalRecommendations = await applyVeganFilter(finalRecommendations);
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


    const handleContinue = () => {
        switch (currentQuestion) {
            case 1:
                if (!selectedOption) {
                    setError('Maak alstublieft eerst een keuze voordat u door kan gaan');
                } else {
                    setError('');
                    if (selectedOption === 'without-alcohol') {
                        setShowResults(true);
                        setCurrentQuestion(5);
                    } else {
                        setCurrentQuestion(currentQuestion + 1);
                    }
                }
                break;
            case 2:
                if (!secondQuestionOption) {
                    setError('Maak alstublieft eerst een keuze voordat u door kan gaan');
                } else {
                    setError('');
                    setCurrentQuestion(currentQuestion + 1);
                }
                break;
            case 3:
                if (!thirdQuestionOption) {
                    setError('Maak alstublieft eerst een keuze voordat u door kan gaan');
                } else {
                    setError('');
                    setCurrentQuestion(currentQuestion + 1);
                }
                break;
            case 4:
                if (!fourthQuestionOption) {
                    setError('Maak alstublieft eerst een keuze voordat u door kan gaan');
                } else {
                    setError('');
                    setCurrentQuestion(currentQuestion + 1);
                }
                break;
            case 5:
                if (!fifthQuestionOption) {
                    setError('Maak alstublieft eerst een keuze voordat u door kan gaan');
                } else {
                    setError('');
                    setShowResults(true);
                }
                break;
            default:
                break;
        }
    };

    const handleRefresh = () => {
        window.location.reload();
    };

    // De Main

    return (
        <div className="app-container">
            <main className="main-content">
                <section className="flex-item sectionrec">
                    <div className="welcome-text">
                        <p className="large-header">Aangeraden cocktails voor jouw stemming vandaag</p>
                        <div className="question-box">
                            {error && <ErrorMessage message={error}/>}
                            {loading && <LoadingIndicator/>}

                            {!showResults && (
                                <>
                                    <p className="question-text">Vraag {currentQuestion}</p>
                                    <div className="options-container">
                                        {getOptionsForCurrentQuestion().map(option => (
                                            <label key={option.value}
                                                   className={`option-label ${option.isSelected ? 'selected' : ''}`}>
                                                <input
                                                    type="radio"
                                                    value={option.value}
                                                    checked={option.isSelected}
                                                    onChange={() => option.setOption(option.value)}
                                                />
                                                {option.label}
                                            </label>
                                        ))}
                                    </div>
                                    <button className="continue-button" onClick={handleContinue}>
                                        Doorgaan
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </section>


                <section className={"results-container"}>
                    {showResults && (
                        <div className="results-container">
                            <h2>Aangeraden cocktails:</h2>
                            <div className="cocktail-previews">
                                {recommendations.length > 0 ? (
                                    recommendations.map(cocktail => (
                                        <CocktailPreview
                                            key={cocktail.idDrink}
                                            cocktail={cocktail}
                                            onClick={() => navigate(`/cocktail/${cocktail.idDrink}`)}
                                        />
                                    ))
                                ) : (
                                    <p>Geen aanbevelingen gevonden op basis van uw keuzes.</p>
                                )}
                            </div>
                            <button className="refresh-button" onClick={handleRefresh}>
                                Vernieuwen
                            </button>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );

}

export default Recommended;
