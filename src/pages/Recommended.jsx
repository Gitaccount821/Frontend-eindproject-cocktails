import React, { useState } from 'react';
import logoImage from "../assets/cocktaillogoheader.png";
import HeaderSection from '../components/HeaderSection';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Search() {
    const navigate = useNavigate(); // Use useNavigate hook
    const { user, logout } = useAuth();
    const [selectedOption, setSelectedOption] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [error, setError] = useState('');
    const [userResponses, setUserResponses] = useState({
        alcohol: '',
        ingredients: '',
        glass: '',
        taste: '',
        vegan: ''
    });

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleContinue = () => {
        if (selectedOption === '') {
            setError('Maak alstublieft eerst een keuze voordat u door kan gaan');
        } else {
            setError('');
            const questionKeys = ['alcohol', 'ingredients', 'glass', 'taste', 'vegan'];
            setUserResponses({
                ...userResponses,
                [questionKeys[currentQuestion - 1]]: selectedOption
            });

            if (currentQuestion < 5) {
                setCurrentQuestion(currentQuestion + 1);
                setSelectedOption('');
            } else {
                // All questions answered, show matching cocktails
                // Fetch or compute the matching cocktails based on userResponses
                // Placeholder logic
                console.log('User responses:', userResponses);
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
                                                name="ingredients"
                                                value="more-ingredients"
                                                checked={selectedOption === 'more-ingredients'}
                                                onChange={handleOptionChange}
                                            />
                                            Meer ingrediënten
                                        </label>
                                        <label className="option-label">
                                            <input
                                                type="radio"
                                                name="ingredients"
                                                value="fewer-ingredients"
                                                checked={selectedOption === 'fewer-ingredients'}
                                                onChange={handleOptionChange}
                                            />
                                            Minder ingrediënten
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
                                                name="glass"
                                                value="normal-glass"
                                                checked={selectedOption === 'normal-glass'}
                                                onChange={handleOptionChange}
                                            />
                                            Normaal glas
                                        </label>
                                        <label className="option-label">
                                            <input
                                                type="radio"
                                                name="glass"
                                                value="special-glass"
                                                checked={selectedOption === 'special-glass'}
                                                onChange={handleOptionChange}
                                            />
                                            Speciaal glas
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
                                                name="taste"
                                                value="fruity"
                                                checked={selectedOption === 'fruity'}
                                                onChange={handleOptionChange}
                                            />
                                            Fruitig
                                        </label>
                                        <label className="option-label">
                                            <input
                                                type="radio"
                                                name="taste"
                                                value="dry"
                                                checked={selectedOption === 'dry'}
                                                onChange={handleOptionChange}
                                            />
                                            Droog
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
                                                name="vegan"
                                                value="vegan"
                                                checked={selectedOption === 'vegan'}
                                                onChange={handleOptionChange}
                                            />
                                            Vegan
                                        </label>
                                        <label className="option-label">
                                            <input
                                                type="radio"
                                                name="vegan"
                                                value="non-vegan"
                                                checked={selectedOption === 'non-vegan'}
                                                onChange={handleOptionChange}
                                            />
                                            Niet-vegan
                                        </label>
                                    </div>
                                </>
                            )}
                            {currentQuestion > 5 && (
                                <div className="cocktail-results">
                                    <p className="completion-text">We laten nu je matchen zien!</p>
                                    {/* Render matching cocktails here */}
                                    <p>Matching cocktails based on your choices will be shown here.</p>
                                </div>
                            )}
                            <button className="continue-button" onClick={handleContinue} disabled={currentQuestion > 5}>
                                {currentQuestion > 5 ? ' ' : 'Doorgaan'}
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

export default Search;
