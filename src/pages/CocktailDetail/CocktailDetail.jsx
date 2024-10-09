import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/Authcontext';
import { useLoading } from '../../context/LoadingContext';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import './CocktailDetail.css';

function CocktailDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { isLoading, setIsLoading } = useLoading();
    const [cocktail, setCocktail] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isFavourited, setIsFavourited] = useState(false);

    useEffect(() => {
        const fetchCocktail = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
                setCocktail(response.data.drinks[0]);
            } catch (error) {
                handleError('fetching cocktail', error);
            } finally {
                setIsLoading(false);
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
                        headers: createAuthHeaders(token),
                    });

                    const currentFavourites = userResponse.data.info || '';
                    const currentFavouritesArray = currentFavourites.split(',').filter(Boolean);
                    setIsFavourited(currentFavouritesArray.includes(id));
                } catch (error) {
                    handleError('checking favorites', error);
                }
            }
        };

        checkIfFavourited();
    }, [user, id]);

    const handleFavourite = async () => {
        const token = localStorage.getItem('Token');

        switch (true) {
            case !user:
                setErrorMessage('Je moet eerst inloggen voordat je favorieten recepten kan opslaan');
                return;

            case !token:
                setErrorMessage('Je moet eerst inloggen voordat je favorieten recepten kan opslaan');
                return;

            default:
                try {
                    const userResponse = await axios.get(`https://api.datavortex.nl/cocktailshaker/users/${user.username}`, {
                        headers: createAuthHeaders(token),
                    });

                    const currentFavourites = userResponse.data.info || '';
                    const currentFavouritesArray = currentFavourites.split(',').filter(Boolean);

                    const updateResponse = await updateFavourites(
                        currentFavouritesArray.includes(id),
                        currentFavouritesArray,
                        token
                    );

                    handleResponse(updateResponse.status, currentFavouritesArray.includes(id));
                } catch (error) {
                    handleError('updating favorites', error);
                }
        }
    };

    // Helper function voor authorisatie
    const createAuthHeaders = (token) => ({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Api-Key': 'cocktailshaker:02gWTBwcnwhUwPE4NIzm',
    });

    // Helper function voor het updaten van gebruiker favourieten
    const updateFavourites = async (isFavourite, currentFavouritesArray, token) => {
        const updatedFavourites = isFavourite
            ? currentFavouritesArray.filter(favId => favId !== id).join(',')
            : [...currentFavouritesArray, id].join(',');

        return await axios.put(
            `https://api.datavortex.nl/cocktailshaker/users/${user.username}`,
            { info: updatedFavourites },
            { headers: createAuthHeaders(token) }
        );
    };

    // Switch statement voor updaten van berichten
    const handleResponse = (status, isRemoving) => {
        switch (status) {
            case 200:
            case 204:
                setIsFavourited(!isRemoving);
                setSuccessMessage(isRemoving ? 'Het recept is uit favorieten verwijderd.' : 'Het recept is opgeslagen als favoriet!');
                setErrorMessage('');
                break;
            default:
                setErrorMessage(`Unexpected response status: ${status}`);
                break;
        }
    };

    // Helper function errors
    const handleError = (context, error) => {
        console.error(`Error ${context}:`, error);
        setErrorMessage(`Er is iets misgegaan bij ${context}.`);
    };

    if (isLoading) return null;

    if (!cocktail) return <p>Error loading cocktail details.</p>;

    return (
        <div className="app-container">
            <main className="main-content">
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
                        type="button"
                        className={`detail-button ${isFavourited ? 'blue-button' : ''}`}
                        onClick={handleFavourite}
                    >
                        {isFavourited ? 'Verwijder uit Favorieten' : 'Favoriet'}
                    </button>
                    <ErrorMessage message={errorMessage} />
                    {successMessage && <p className="success-message">{successMessage}</p>}
                </section>
            </main>
        </div>
    );
}

export default CocktailDetail;
