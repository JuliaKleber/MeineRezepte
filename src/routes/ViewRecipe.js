import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { getRecipes } from "../AJAX/apiCalls";
import ShowIngredients from "../components/ShowIngredients";
import ShowRecipeDescription from "../components/ShowRecipeDescription";

// The recipes are loaded from the json file
export const loader = async (recipeName) => {
  const recipes = await getRecipes();
  const selectedRecipe = recipes.filter((recipe) => {
    return recipe.name.replaceAll(" ", "-").toLowerCase() === recipeName;
  });
  return [recipes, selectedRecipe[0]];
};

const ViewRecipe = () => {
  const [recipes, setRecipes] = useState(useLoaderData()[0]);
  const [recipe, setRecipe] = useState(useLoaderData()[1]);

  // const [currentStep, setCurrentStep] = useState("recipeIsShown");
  // const [output, setOutput] = useState("");

  // // Recipe is shown again after recipe update has been (un)successfully performed
  // const handleRecipeChangeOff = (output, editedRecipe) => {
  //   setOutput(output);
  //   setRecipe(editedRecipe);
  //   setCurrentStep("recipeIsShown");
  // };

  // // Next step initiated after recipe deletion has been (un)successfully performed
  // const handleRecipeDeletionOff = (wasRemoved, newOutput) => {
  //   setOutput(newOutput);
  //   if (wasRemoved) {
  //     setCurrentStep("recipeWasRemoved");
  //   }
  //   if (!wasRemoved) {
  //     setCurrentStep("recipeIsShown");
  //   }
  // };

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
          <Link to={'delete'}>
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
