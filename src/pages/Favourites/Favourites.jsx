import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/Authcontext';
import './Favourites.css';
import { useLoading } from '../../context/LoadingContext';
import CocktailPreview from '../../components/CocktailPreview/CocktailPreview';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useNavigate } from 'react-router-dom';
function Favourites() {
    const { user, logout } = useAuth();
    const { setIsLoading } = useLoading();
    const [favourites, setFavourites] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFavourites = async () => {
            setIsLoading(true);
            if (user) {
                try {
                    const token = localStorage.getItem('Token');
                    if (!token) {
                        setErrorMessage('Je moet ingelogd zijn om je favourieten recepten te zien');
                        return;
                    }

                    const userResponse = await axios.get(`https://api.datavortex.nl/cocktailshaker/users/${user.username}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                            'X-Api-Key': 'cocktailshaker:02gWTBwcnwhUwPE4NIzm',
                        },
                    });
                    const favouritesString = userResponse.data.info || '';

                    if (!favouritesString) {
                        setFavourites([]);
                        return;
                    }

                    const favouritesArray = favouritesString.split(',').filter(Boolean);

                    const cocktails = await Promise.all(favouritesArray.map(id =>
                        axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
                    ));

                    setFavourites(cocktails.map(res => res.data.drinks[0]));
                } catch (error) {
                    console.error('Error fetching favourites:', error);
                    setErrorMessage('Er is iets misgegaan met het ophalen van favorieten.');
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchFavourites();
    }, [user, setIsLoading]);

    return (
        <div className="app-container">
            <section className="flex-item sectionfavheader">
                <div className="welcome-text">
                    <h1 className="large-text-Fav">Welkom! Hier vind je al je opgeslagen recepten</h1>
                </div>
            </section>

            <section className="favourites">
                <h1>Jouw Favorieten</h1>
                {errorMessage ? (
                    <ErrorMessage message={errorMessage} />
                ) : (
                    <div className="cocktail-list">
                        {favourites.length === 0 ? (
                            <p>Je hebt nog geen opgeslagen recepten als favouriet</p>
                        ) : (
                            favourites.map((cocktail) => (
                                <CocktailPreview
                                    key={cocktail.idDrink}
                                    cocktail={cocktail}
                                    onClick={() => navigate(`/cocktail/${cocktail.idDrink}`)}
                                />
                            ))
                        )}
                    </div>
                )}
            </section>
        </div>
    );
}

export default Favourites;
