import React from 'react';
import { Link } from 'react-router-dom';
import ShowImage from './ShowImage';

const RecipeCard = ({ recipe }) => {
  return (
    <Link to={`/show/${recipe.name}`} className='container card recipe-card align-center'>
      <ShowImage recipe={recipe} />
      <span className="recipe-card-text">{recipe.recipeName}</span>
    </Link>
  );
}

export default RecipeCard;
