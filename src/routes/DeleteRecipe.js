import React from "react";
import { Link } from "react-router-dom";
import useRecipeStore from "../stores/recipeStore";

const DeleteRecipe = () => {
  const { recipes, currentRecipe, deleteRecipe } = useRecipeStore();

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
        <Link to={currentRecipe ? `/recipes/${currentRecipe.name.replaceAll(' ', '-').toLowerCase()}` : "/"}>
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
