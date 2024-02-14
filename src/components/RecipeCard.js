import React from "react";
import { Link } from "react-router-dom";
import useRecipeStore from "../stores/recipeStore";
import RecipeImage from "./RecipeImage";

const RecipeCard = ({ recipe }) => {
  const resetMessage = useRecipeStore((state) => state.resetMessage);
  const setCurrentRecipe = useRecipeStore((state) => state.setCurrentRecipe);

  const selectRecipe = () => {
    setCurrentRecipe(recipe);
    resetMessage();
  };

  return (
    <Link
      className="container card recipe-card align-center"
      onClick={() => selectRecipe()}
      to={`/recipes/${recipe.name.replaceAll(" ", "-").toLowerCase()}`}
    >
      <RecipeImage recipe={recipe} />
      <span className="recipe-card-text">{recipe.name}</span>
    </Link>
  );
};

export default RecipeCard;
