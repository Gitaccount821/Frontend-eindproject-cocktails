import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/Authcontext';
import './Favourites.css';
import { useLoading } from '../../context/LoadingContext';
import CocktailPreview from '../../components/CocktailPreview/CocktailPreview';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useNavigate } from 'react-router-dom';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';
import AppContainer from '../../components/AppContainer/AppContainer';


function Favourites() {
    const { user } = useAuth();
    const { setIsLoading, loadingProgress, setLoadingProgress } = useLoading();
    const [favourites, setFavourites] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    let progressInterval;
    const controller = new AbortController();

    useEffect(() => {
        const fetchFavourites = async () => {
            setIsLoading(true);
            setLoadingProgress(0);
            let progressInterval;
            const controller = new AbortController();

            try {
                if (user) {
                    const token = localStorage.getItem('Token');
                    if (!token) {
                        setErrorMessage('Je moet ingelogd zijn om je favorieten recepten te zien');
                        return;
                    }

                    progressInterval = setInterval(() => {
                        setLoadingProgress(prev => (prev < 90 ? prev + 10 : prev));
                    }, 200);

                    const userResponse = await axios.get(
                        `https://api.datavortex.nl/cocktailshaker/users/${user.username}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                'Content-Type': 'application/json',
                                'X-Api-Key': import.meta.env.API_KEY,
                            },
                            signal: controller.signal
                        }
                    );

                    const favouritesString = userResponse.data.info || '';
                    if (!favouritesString) {
                        setFavourites([]);
                        return;
                    }

                    const favouritesArray = favouritesString.split(',').filter(Boolean);

                    const cocktails = await Promise.all(
                        favouritesArray.map(id =>
                            axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`, {
                                signal: controller.signal
                            })
                        )
                    );

                    setFavourites(cocktails.map(res => res.data.drinks[0]));
                }
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log('Request canceled:', error.message);
                } else {
                    console.error('Error fetching favourites:', error);
                    setErrorMessage('Er is iets misgegaan met het ophalen van favorieten.');
                }
            } finally {
                if (progressInterval) clearInterval(progressInterval);
                setLoadingProgress(100);
                setTimeout(() => {
                    setIsLoading(false);
                }, 300);
            }
        };
        fetchFavourites().catch(error => console.error(error));

        return () => {
            if (progressInterval) clearInterval(progressInterval);
            controller.abort();
        };
    }, [user, setIsLoading, setLoadingProgress]);




    return (
        <AppContainer>
            {loadingProgress < 100 && <LoadingIndicator loadingProgress={loadingProgress} />} {/* Show loading indicator */}
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
            </AppContainer>
    );
}

export default Favourites;
