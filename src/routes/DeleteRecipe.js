import React from "react";
import { Link, useParams } from "react-router-dom";
import useRecipeStore from "../stores/recipeStore";
import { saveRecipes, deleteImage } from "../AJAX/apiCalls";

const DeleteRecipe = () => {
  const { recipes } = useRecipeStore();
  const recipeName = useParams().recipeName;
  const recipe = recipes.filter(
    (rec) => rec.name.replaceAll(" ", "-").toLowerCase() === recipeName
  )[0];

  // Recipe is deleted from the json file.
  // If there is a picture for the recipe, it is also deleted.
  const deleteRecipe = async () => {
    try {
      const index = recipes.indexOf(recipe);
      let updatedRecipes = recipes;
      updatedRecipes.splice(index, 1);
      saveRecipes(updatedRecipes);
      if (recipe.imageName !== null) {
        deleteImage(recipe.imageName);
      }
    } catch (error) {
      console.error("Fehler beim Löschen des Rezepts", error);
    }
  };

  return (
    <div className="container">
      <span className="align-center black">
        Möchtest du das Rezept wirklich unwiderbringlich löschen?
      </span>
      <span>
        <Link to={recipes.includes(recipe) ? `/recipes/${recipeName}` : "/"}>
          <button className="y-n" onClick={() => deleteRecipe()}>
            ja
          </button>
        </Link>
        <Link to={`/recipes/${recipeName}`}>
          <button className="y-n">nein</button>
        </Link>
      </span>
    </div>
  );
};

export default DeleteRecipe;
