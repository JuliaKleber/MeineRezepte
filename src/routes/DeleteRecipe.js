import React from "react";
import { Link, useParams } from "react-router-dom";
import useRecipeStore from "../store/recipeStore";

const DeleteRecipe = () => {
  const recipe = useParams;
  const { deleteRecipe } = useRecipeStore();

  const handleDelete = async () => {
    await deleteRecipe(recipe);
  };

  return (
    <div className="container">
      <span className="align-center black">
        Möchtest du das Rezept wirklich unwiderbringlich löschen?
      </span>
      <span>
        <Link to="/">
          <button className="y-n" onClick={handleDelete}>
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
