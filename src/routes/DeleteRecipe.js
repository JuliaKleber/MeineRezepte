import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { getRecipes, saveRecipes, deleteImage } from "../AJAX/apiCalls";

export const loader = async (recipeName) => {
  const recipes = await getRecipes();
  const filteredRecipe = recipes.filter((recipe) => {
    return recipe.name === recipeName;
  });
  return [recipes, filteredRecipe[0]];
};

const DeleteRecipe = () => {
  const recipes = useLoaderData()[0];
  const recipe = useLoaderData()[1];

  // The recipe is removed from the json file
  const handleRecipeDeletion = () => {
    const index = recipes.indexOf(recipe);
    recipes.splice(index, 1);
    const success = saveRecipes(recipes);
    if (success && recipe.imageName !== null) {
      deleteImage(recipe.imageName);
    }
  };

  return (
    <div className="container">
      <span className="align-center black">
        Möchtest du das Rezept wirklich unwiderbringlich löschen?
      </span>
      <span>
        <Link to="/">
          <button className="y-n" onClick={handleRecipeDeletion}>
            ja
          </button>
        </Link>
        <Link to={`/recipes/${recipe.name}`}>
          <button className="y-n">nein</button>
        </Link>
      </span>
    </div>
  );
};

export default DeleteRecipe;
