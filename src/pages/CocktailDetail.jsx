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
    const [successMessage, setSuccessMessage] = useState('');
    const [isFavourited, setIsFavourited] = useState(false);

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

    useEffect(() => {
        const checkIfFavourited = async () => {
            if (user) {
                try {
                    const token = localStorage.getItem('Token');
                    if (!token) return;

                    const userResponse = await axios.get(`https://api.datavortex.nl/cocktailshaker/users/${user.username}`, {
                        headers: {
                            Authorization: token,
                            'Content-Type': 'application/json',
                            'X-Api-Key': 'cocktailshaker:02gWTBwcnwhUwPE4NIzm',
                        },
                    });

                    const currentFavourites = userResponse.data.info || '';
                    const currentFavouritesArray = currentFavourites.split(',').filter(Boolean);
                    setIsFavourited(currentFavouritesArray.includes(id));
                } catch (error) {
                    console.error('Error checking if cocktail is favourited:', error);
                }
            }
        };

        checkIfFavourited();
    }, [user, id]);

    const handleFavourite = async () => {
        if (!user) {
            setErrorMessage('You must be logged in to add to favourites.');
            return;
        }

        try {
            const token = localStorage.getItem('Token');
            if (!token) {
                setErrorMessage('You must be logged in to add to favourites.');
                return;
            }

            const userResponse = await axios.get(`https://api.datavortex.nl/cocktailshaker/users/${user.username}`, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                    'X-Api-Key': 'cocktailshaker:02gWTBwcnwhUwPE4NIzm',
                },
            });

            const currentFavourites = userResponse.data.info || '';
            const currentFavouritesArray = currentFavourites.split(',').filter(Boolean);

            if (currentFavouritesArray.includes(id)) {

                const updatedFavourites = currentFavouritesArray.filter(favId => favId !== id).join(',');
                const updateResponse = await axios.put(
                    `https://api.datavortex.nl/cocktailshaker/users/${user.username}`,
                    { info: updatedFavourites },
                    {
                        headers: {
                            Authorization: token,
                            'Content-Type': 'application/json',
                            'X-Api-Key': 'cocktailshaker:02gWTBwcnwhUwPE4NIzm',
                        },
                    }
                );

                if (updateResponse.status === 200 || updateResponse.status === 204) {
                    setIsFavourited(false);
                    setSuccessMessage('Het recept is uit favorieten verwijderd.');
                    setErrorMessage('');
                } else {
                    setErrorMessage(`Unexpected response status: ${updateResponse.status}`);
                }
            } else {

                const updatedFavourites = [...currentFavouritesArray, id].join(',');
                const updateResponse = await axios.put(
                    `https://api.datavortex.nl/cocktailshaker/users/${user.username}`,
                    { info: updatedFavourites },
                    {
                        headers: {
                            Authorization: token,
                            'Content-Type': 'application/json',
                            'X-Api-Key': 'cocktailshaker:02gWTBwcnwhUwPE4NIzm',
                        },
                    }
                );

                if (updateResponse.status === 200 || updateResponse.status === 204) {
                    setIsFavourited(true);
                    setSuccessMessage('Het recept is opgeslagen als favoriet!');
                    setErrorMessage('');
                } else {
                    setErrorMessage(`Unexpected response status: ${updateResponse.status}`);
                }
            }
        } catch (error) {
            console.error('Error updating favourites:', error.response ? error.response.data : error.message);
            setErrorMessage('Er is iets misgegaan bij het toevoegen aan favorieten.');
        }
    };

    const handleNavigateHome = () => navigate('/');
    const handleNavigateToContact = () => navigate('/contact');
    const handleNavigateToLogin = () => navigate('/login');
    const handleLogout = () => {
        logout();
        navigate('/');
    };

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
                    <h1 className="text-detail">{cocktail.strDrink}</h1>
                    <div className="cocktail-detail-content">
                        <img
                            src={cocktail.strDrinkThumb}
                            alt={cocktail.strDrink}
                            className="cocktail-image"
                        />
                        <div className="ingredients">
                            <h2 className="text-ingredients">Ingredienten:</h2>
                            <ul>
                                {Object.keys(cocktail)
                                    .filter(key => key.startsWith('strIngredient') && cocktail[key])
                                    .map((key, index) => (
                                        <li key={index}>
                                            <img
                                                src={`https://www.thecocktaildb.com/images/ingredients/${cocktail[key]}-Medium.png`}
                                                alt={cocktail[key]}
                                                className="ingredient-image"
                                            />
                                            {cocktail[key]} - {cocktail[`strMeasure${key.slice(13)}`]}
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                    <button
                        className={`detail-button ${isFavourited ? 'blue-button' : ''}`}
                        onClick={handleFavourite}
                    >
                        {isFavourited ? 'Al opgeslagen in Favorieten' : 'Favoriet'}
                    </button>
                    {successMessage && <p className="success-message">{successMessage}</p>}
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
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
