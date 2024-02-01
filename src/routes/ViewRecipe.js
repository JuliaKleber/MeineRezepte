import React from "react";
import { Link } from "react-router-dom";
import useRecipeStore from "../stores/recipeStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ShowIngredients from "../components/ShowIngredients";
import ShowRecipeDescription from "../components/ShowRecipeDescription";

const ViewRecipe = () => {
  const { recipes, currentRecipe } = useRecipeStore();
  const recipeName = currentRecipe.name
  const recipe = recipes.filter(
    (rec) => rec.name.replaceAll(" ", "-").toLowerCase() === recipeName
  )[0];
  const { message } = useRecipeStore();

  return (
    <div className="container show-recipe">
      <div className="container">
        <div className="message">
          <i className="fa-solid fa-circle-info"></i>
          {message}
        </div>
        <h2 className="align-center">{recipe.name}</h2>
        <ShowIngredients recipe={recipe} />
        <ShowRecipeDescription recipeDescription={recipe.description} />
        <span>
          <Link to={`edit`}>
            <button className="show-recipe-button white" onClick={() => useRecipeStore.setState({ message: '' })}>Rezept ändern</button>
          </Link>
          <Link to={"delete"}>
            <button className="show-recipe-button white" onClick={() => useRecipeStore.setState({ message: '' })}>Rezept löschen</button>
          </Link>
        </span>
      </div>
      <Link to={"/"}>
        <button onClick={() => useRecipeStore.setState({ message: '' })}>zurück</button>
      </Link>
    </div>
  );
};

export default ViewRecipe;
