import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logoImage from "../assets/cocktaillogoheader.png";
import HeaderSection from '../components/HeaderSection';
import { useAuth } from '../context/AuthContext';
import './Favourites.css';

function Favourites() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [favourites, setFavourites] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchFavourites = async () => {
            if (!user) {
                setErrorMessage('You must be logged in to view favourites.');
                return;
            }

            try {
                const token = localStorage.getItem('Token');
                if (!token) {
                    setErrorMessage('You must be logged in to view favourites.');
                    return;
                }

                const userResponse = await axios.get(`https://api.datavortex.nl/cocktailshaker/users/${user.username}`, {
                    headers: {
                        Authorization: token,
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
            }
        };

        fetchFavourites();
    }, [user]);

    const handleNavigateToContact = () => navigate('/contact');
    const handleNavigateToLogin = () => navigate('/login');
    const handleLogout = () => {
        logout();
        navigate('/');
    };
    const handleNavigateToSearch = () => navigate('/search');
    const handleNavigateToRecommended = () => navigate('/Recommended');
    const handleNavigateToFavourites = () => navigate('/Favourites');
    const handleNavigateHome = () => navigate('/');

    if (errorMessage) {
        return <p>{errorMessage}</p>;
    }

    return (
        <div className="app-container">
            <main className="main-content">
                <HeaderSection
                    handleNavigateHome={handleNavigateHome}
                    handleNavigateToContact={handleNavigateToContact}
                    handleLogout={handleLogout}
                    handleNavigateToLogin={handleNavigateToLogin}
                    handleNavigateToSearch={handleNavigateToSearch}
                    handleNavigateToRecommended={handleNavigateToRecommended}
                    handleNavigateToFavourites={handleNavigateToFavourites}
                    user={user}
                    logoImage={logoImage}
                />

                <section className="flex-item sectionfavheader">
                    <div className="welcome-text">
                        <h1 className="large-text">Welkom! Hier vind je all je opgeslagen recepten</h1>
                    </div>
                </section>

                <section className="favourites">
                    <h1>Jouw Favorieten</h1>
                    <div className="cocktail-list">
                        {favourites.length === 0 ? (
                            <p>Je hebt nog geen opgeslagen recepten als favouriet</p>
                        ) : (
                            favourites.map((cocktail, index) => (
                                <div key={index} className="cocktail-preview"
                                     onClick={() => navigate(`/cocktail/${cocktail.idDrink}`)}>
                                    <h2>{cocktail.strDrink}</h2>
                                    <img
                                        src={cocktail.strDrinkThumb}
                                        alt={cocktail.strDrink}
                                    />
                                </div>
                            ))
                        )}
                    </div>
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

export default Favourites;
