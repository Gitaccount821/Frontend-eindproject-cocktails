import React from 'react';

const CocktailPreview = ({ cocktail, onClick }) => (
    <div className="cocktail-preview" onClick={onClick}>
        <h2>{cocktail.strDrink}</h2>
        <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
    </div>
);

export default CocktailPreview;