import React from 'react';
import ShowImage from './ShowImage';

const RecipeCard = ({ recipe, onRecipeSelection }) => {
  return (
    <div className='container card recipe-card align-center' onClick={() => onRecipeSelection(recipe)}>
      <ShowImage recipe={recipe} />
      <span className="recipe-card-text">{recipe.recipeName}</span>
    </div>
  );
}

export default RecipeCard;
