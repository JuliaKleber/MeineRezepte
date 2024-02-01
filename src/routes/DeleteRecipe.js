import React from "react";
import { Link, useParams } from "react-router-dom";
import useRecipeStore from "../stores/recipeStore";

const DeleteRecipe = () => {
  const { recipes, deleteRecipe } = useRecipeStore();
  const recipeName = useParams().recipeName;
  const recipe = recipes.filter(
    (rec) => rec.name.replaceAll(" ", "-").toLowerCase() === recipeName
  )[0];

  // Recipe is deleted from the json file.
  // If there is a picture for the recipe, it is also deleted.
  const destroyRecipe = async () => {
    deleteRecipe(recipes, recipe);
  };

  return (
    <div className="container">
      <span className="align-center black">
        Möchtest du das Rezept wirklich unwiderbringlich löschen?
      </span>
      <span>
        <Link to="/">
        {/* <Link to={recipes.includes(recipe) ? `/recipes/${recipeName}` : "/"}> */}
          <button className="y-n" onClick={destroyRecipe}>
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
