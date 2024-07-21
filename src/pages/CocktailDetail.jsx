import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logoImage from "../assets/cocktaillogoheader.png";
import HeaderSection from '../components/HeaderSection';
import { useAuth } from '../context/AuthContext';

function CocktailDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [cocktail, setCocktail] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchCocktail = async () => {
            try {
                const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
                setCocktail(response.data.drinks[0]);
            } catch (error) {
                console.error('Error fetching data from API:', error);
                setErrorMessage('Er is iets misgegaan met het ophalen van de cocktail.');
            }
        };

        fetchCocktail();
    }, [id]);

    const handleFavourite = () => {

    };

    const handleNavigateHome = () => navigate('/');
    const handleNavigateToContact = () => navigate('/contact');
    const handleNavigateToLogin = () => navigate('/login');
    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (errorMessage) {
        return <p>{errorMessage}</p>;
    }

    if (!cocktail) {
        return <p>Loading...</p>;
    }

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

                <section className="cocktail-detail">
                    <h1>{cocktail.strDrink}</h1>
                    <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
                    <h2>Ingredients</h2>
                    <ul>
                        {Object.keys(cocktail)
                            .filter(key => key.startsWith('strIngredient') && cocktail[key])
                            .map((key, index) => (
                                <li key={index}>
                                    <img
                                        src={`https://www.thecocktaildb.com/images/ingredients/${cocktail[key]}-Small.png`}
                                        alt={cocktail[key]}
                                        width="50"
                                        height="50"
                                    />
                                    {cocktail[key]} - {cocktail[`strMeasure${key.slice(13)}`]}
                                </li>
                            ))}
                    </ul>
                    <button onClick={handleFavourite}>Favourite</button>
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

export default CocktailDetail;
