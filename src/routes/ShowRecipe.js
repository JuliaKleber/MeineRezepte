import React from "react";
import { Link } from "react-router-dom";
import ShowIngredients from "../components/ShowIngredients";
import ShowRecipeDescription from "../components/ShowRecipeDescription";

const ShowRecipe = () => {
  const recipe = {
    name: "Rezeptname",
    ingredients: [],
    description: "Beschreibung des Rezepts",
  };

  return (
    <div className="container show-recipe">
      <div className="container">
        <h2 className="align-center">{recipe.name}</h2>
        <ShowIngredients recipe={recipe} />
        <ShowRecipeDescription recipeDescription={recipe.description} />
        <span>
          <Link to={`edit/${recipe.name}`}>
            <button className="show-recipe-button white">Rezept ändern</button>
          </Link>
          <Link to={`delete/${recipe.name}`}>
            <button className="show-recipe-button white">Rezept löschen</button>
          </Link>
        </span>
      </div>

      <Link to={"/"}>
        <button>zurück</button>
      </Link>
    </div>
  );
};

export default ShowRecipe;
