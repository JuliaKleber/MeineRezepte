import React from "react";
import { Link } from "react-router-dom";
import useRecipeStore from '../stores/recipeStore';
import ShowImage from "./ShowImage";

const RecipeCard = ({ recipe }) => {
  return (
    <Link
      to={`/recipes/${recipe.name.replaceAll(" ", "-").toLowerCase()}`}
      className="container card recipe-card align-center"
      onClick={() => useRecipeStore.setState({
        currentRecipe: recipe,
      })}
    >
      <ShowImage recipe={recipe} />
      <span className="recipe-card-text">{recipe.name}</span>
    </Link>
  );
};

export default RecipeCard;
