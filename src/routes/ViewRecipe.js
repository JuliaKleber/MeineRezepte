import React from "react";
import { Link, useParams } from "react-router-dom";
import useRecipeStore from "../store/recipeStore";
import ShowIngredients from "../components/ShowIngredients";
import ShowRecipeDescription from "../components/ShowRecipeDescription";

const ViewRecipe = () => {
  const { recipes } = useRecipeStore();
  const recipeName = useParams().recipeName;
  const recipe = recipes.filter(
    (rec) => rec.name.replaceAll(" ", "-").toLowerCase() === recipeName
  )[0];

  return (
    <div className="container show-recipe">
      <div className="container">
        <h2 className="align-center">{recipe.name}</h2>
        <ShowIngredients recipe={recipe} />
        <ShowRecipeDescription recipeDescription={recipe.description} />
        <span>
          <Link to={`edit`}>
            <button className="show-recipe-button white">Rezept ändern</button>
          </Link>
          <Link to={"delete"}>
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

export default ViewRecipe;
