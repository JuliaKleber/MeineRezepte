import React from "react";
import { Link } from "react-router-dom";
import useRecipeStore from "../stores/recipeStore";
import ShowIngredients from "../components/ShowIngredients";
import ShowRecipeDescription from "../components/ShowRecipeDescription";

const ViewRecipe = () => {
  const { recipes, currentRecipe } = useRecipeStore();
  const recipeName = currentRecipe.name;
  const recipe = recipes.filter(
    (rec) => rec.name.replaceAll(" ", "-").toLowerCase() === recipeName
  )[0];
  const { message } = useRecipeStore();

  const editAndDeleteButtons = (
    <span>
      <Link to={`edit`}>
        <button
          className="show-recipe-button white"
          onClick={() => useRecipeStore.setState({ message: "" })}
        >
          Rezept ändern
        </button>
      </Link>
      <Link to={"delete"}>
        <button
          className="show-recipe-button white"
          onClick={() => useRecipeStore.setState({ message: "" })}
        >
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
        <h2 className="align-center">{recipe.name}</h2>
        <ShowIngredients recipe={recipe} />
        <ShowRecipeDescription recipeDescription={recipe.description} />
        {editAndDeleteButtons}
      </div>
      <Link to={"/"}>
        <button onClick={() => useRecipeStore.setState({ message: "" })}>
          zurück
        </button>
      </Link>
    </div>
  );
};

export default ViewRecipe;
