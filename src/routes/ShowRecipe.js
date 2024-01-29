import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { getRecipes } from '../fetchData/apiCalls';
import ShowIngredients from "../components/ShowIngredients";
import ShowRecipeDescription from "../components/ShowRecipeDescription";
import EditRecipe from '../components/EditRecipe';
import DeleteRecipe from '../components/DeleteRecipe';

export const loader = async (recipeName) => {
  const recipes = await getRecipes();
  const selectedRecipe = recipes.filter((recipe) => {
    return recipe.name.replaceAll(' ', '-').toLowerCase() === recipeName;
  });
  return [recipes, selectedRecipe[0]];
}

const ShowRecipe = () => {
  const [recipes, setRecipes] = useState(useLoaderData()[0]);
  const [recipe, setRecipe] = useState(useLoaderData()[1]);

  const [currentStep, setCurrentStep] = useState("recipeIsShown");
  const [output, setOutput] = useState("");

  // Recipe is shown again after recipe update has been (un)successfully performed
  const handleRecipeChangeOff = (output, editedRecipe) => {
    setOutput(output);
    setRecipe(editedRecipe);
    setCurrentStep("recipeIsShown");
  };

  // Next step initiated after recipe deletion has been (un)successfully performed
  const handleRecipeDeletionOff = (wasRemoved, newOutput) => {
    setOutput(newOutput);
    if (wasRemoved) {
      setCurrentStep("recipeWasRemoved");
    }
    if (!wasRemoved) {
      setCurrentStep("recipeIsShown");
    }
  };

  return (
    <div className="container show-recipe">
        {currentStep === "recipeIsShown" && (
      <div className="container">
        <h2 className="align-center">{recipe.name}</h2>
        <ShowIngredients recipe={recipe} />
        <ShowRecipeDescription recipeDescription={recipe.description} />
        <span>
            <button
              className="show-recipe-button white"
              onClick={() => setCurrentStep("recipeIsEdited")}
            >
              Rezept ändern
            </button>
            <button
              className="show-recipe-button white"
              onClick={() => setCurrentStep("deletionInitiated")}
            >
              Rezept löschen
            </button>
          </span>
        {/* <span>
          <Link to={`edit/${recipe.name.replaceAll(' ', '-')}`}>
            <button className="show-recipe-button white">Rezept ändern</button>
          </Link>
          <Link to={`delete/${recipe.name.replaceAll(' ', '-')}`}>
            <button className="show-recipe-button white">Rezept löschen</button>
          </Link>
        </span> */}
      </div>)}

      {/* <Link to={"/"}>
        <button>zurück</button>
      </Link> */}

      {/* {currentStep === "recipeIsShown" && searchTerm !== "fromHome" && (
  <button onClick={() => onBackToSearch(searchTerm)}>zurück</button>
)} */}

{currentStep === "recipeIsShown" && output !== "" && (
  <p className="align-center primary-color">
    {/* <FontAwesomeIcon icon={faHandPointRight} /> */}
    {output}
    {/* <FontAwesomeIcon icon={faHandPointLeft} /> */}
  </p>
)}

{currentStep === "recipeIsEdited" && (
  <EditRecipe
    recipe={recipe}
    setRecipe={setRecipe}
    recipes={recipes}
    setRecipes={setRecipes}
    onReturn={handleRecipeChangeOff}
  />
)}

{currentStep === "deletionInitiated" && (
  <DeleteRecipe
    recipes={recipes}
    setRecipes={setRecipes}
    recipe={recipe}
    onReturn={handleRecipeDeletionOff}
  />
)}

{currentStep === "deletionNotPerformed" && (
  <p className="align-center">
    {/* <FontAwesomeIcon icon={faHandPointRight} /> */}
    {output}
    {/* <FontAwesomeIcon icon={faHandPointLeft} /> */}
  </p>
)}

{currentStep === "recipeWasRemoved" && (
  <div className="align-center">
    <p className="secondary-color">
      {/* <FontAwesomeIcon icon={faHandPointRight} /> */}
      {output}
      {/* <FontAwesomeIcon icon={faHandPointLeft} /> */}
    </p>
    {/* <button onClick={() => navigate("/")}>zum Startmenü</button> */}
  </div>
)}
    </div>
  );
};

export default ShowRecipe;
