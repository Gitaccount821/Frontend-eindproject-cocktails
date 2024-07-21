import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CocktailDetail() {
    const { id } = useParams();
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
        // Logic to save the cocktail as a favorite
    };

    if (errorMessage) {
        return <p>{errorMessage}</p>;
    }

    if (!cocktail) {
        return <p>Loading...</p>;
    }

    return (
        <div className="cocktail-detail">
            <h1>{cocktail.strDrink}</h1>
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
            <h2>Ingredients</h2>
            <ul>
                {Object.keys(cocktail).filter(key => key.startsWith('strIngredient') && cocktail[key]).map((key, index) => (
                    <li key={index}>{cocktail[key]} - {cocktail[`strMeasure${key.slice(13)}`]}</li>
                ))}
            </ul>
            <button onClick={handleFavourite}>Favourite</button>
        </div>
    );
}

export default CocktailDetail;
