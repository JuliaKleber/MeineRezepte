import React from "react";
import { Link } from "react-router-dom";
import useRecipeStore from "../stores/recipeStore";
import ShowIngredients from "../components/ShowIngredients";
import ShowRecipeDescription from "../components/ShowRecipeDescription";

const ViewRecipe = () => {
  const currentRecipe = useRecipeStore((state) => state.currentRecipe);
  const lastLocation = useRecipeStore((state) => state.lastLocation);
  const message = useRecipeStore((state) => state.message);
  const resetMessage = useRecipeStore((state) => state.resetMessage);

  const editAndDeleteButtons = (
    <span>
      <Link to={`edit`}>
        <button className="show-recipe-button white" onClick={resetMessage}>
          Rezept ändern
        </button>
      </Link>
      <Link to={"delete"}>
        <button className="show-recipe-button white" onClick={resetMessage}>
          Rezept löschen
        </button>
      </Link>
    </span>
  );

  return (
    <div className="container show-recipe">
      <div className="container">
        <div className="message">
          <div className="align-center">{message}</div>
        </div>
        <h2 className="align-center">{currentRecipe.name}</h2>
        <ShowIngredients recipe={currentRecipe} />
        <ShowRecipeDescription recipeDescription={currentRecipe.description} />
        {editAndDeleteButtons}
      </div>
      <Link to={lastLocation}>
        <button onClick={resetMessage}>zurück</button>
      </Link>
    </div>
  );
};

export default ViewRecipe;
