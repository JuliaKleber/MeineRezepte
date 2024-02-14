import React from "react";
import { Link } from "react-router-dom";
import useRecipeStore from "../stores/recipeStore";

const DeleteRecipe = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const currentRecipe = useRecipeStore((state) => state.currentRecipe);
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  const lastLocation = useRecipeStore((state) => state.lastLocation);

  // Recipe is deleted from the json file.
  // If there is a picture for the recipe, it is also deleted.
  const destroyRecipe = async () => {
    deleteRecipe(recipes, currentRecipe);
  };

  return (
    <div className="container">
      <span className="align-center black">
        Möchtest du das Rezept wirklich unwiderbringlich löschen?
      </span>
      <span>
        <Link to={lastLocation}>
          <button className="y-n" onClick={destroyRecipe}>
            ja
          </button>
        </Link>
        <Link to={`/recipes/${currentRecipe}`}>
          <button className="y-n">nein</button>
        </Link>
      </span>
    </div>
  );
};

export default DeleteRecipe;
