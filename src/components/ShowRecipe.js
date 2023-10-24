import React, { useState } from "react";
import ShowIngredients from "./ShowIngredients";
import ChangeOfRecipe from "./ChangeOfRecipe";
import DeleteRecipe from "./DeleteRecipe";

function ShowRecipe({ recipe, onBackToSearchResults, recipes }) {
  const [currentStep, setCurrentStep] = useState("recipeIsShown");
  const [currentRecipe, setCurrentRecipe] = useState(recipe);
  const [output, setOutput] = useState("");

  const handleRecipeChangeOn = () => {
    setCurrentStep("recipeIsChanged");
  };
  // Die Frage, ob das Rezept wirklich gelöscht werden soll,
  // wird nicht mehr angezeigt
  const handleRecipeChangeOff = (newOutput, newRecipe) => {
    setOutput(newOutput);
    setCurrentRecipe(newRecipe);
    setCurrentStep("recipeIsShown");
  };

  // Die Frage, ob das Rezept wirklich gelöscht werden soll,
  // wird angezeigt
  const handleRecipeDeletionOn = () => {
    setCurrentStep("deletionInitiated");
  };

  // Die Frage, ob das Rezept wirklich gelöscht werden soll,
  // wird nicht mehr angezeigt
  const handleRecipeDeletionOff = (wasRemoved, newOutput) => {
    wasRemoved && setCurrentStep("recipeWasRemoved");
    setOutput(newOutput);
    !wasRemoved && setCurrentStep("recipeIsShown");
  };

  return (
    <div className="container">
      {currentStep === "recipeIsShown" && (
        <div className="container">
          <h2 className="recipe-box center">{recipe.recipeName}</h2>
          <ShowIngredients recipe={recipe} />
          <p className="recipe-box center" id="recipe-description">
            {recipe.description}
          </p>
        </div>
      )}

      {currentStep === "recipeIsShown" && (
        <div className="container">
          <button onClick={() => onBackToSearchResults()}>zurück</button>
          <span>
            <button className="white" onClick={handleRecipeChangeOn}>
              Rezept ändern
            </button>
            <button className="white" onClick={handleRecipeDeletionOn}>
              Rezept löschen
            </button>
          </span>
        </div>
      )}

      {currentStep === "recipeIsShown" && <p className="align-center">{output}</p>}

      {currentStep === "recipeIsChanged" && (
        <ChangeOfRecipe recipe={recipe} recipes={recipes} onReturn={handleRecipeChangeOff} />
      )}

      {currentStep === "deletionInitiated" && (
        <DeleteRecipe
          recipes={recipes}
          recipe={recipe}
          onReturn={handleRecipeDeletionOff}
        />
      )}

      {currentStep === "deletionNotPerformed" && (
        <p className="align-center">{output}</p>
      )}

      {currentStep === "recipeWasRemoved" && (
        <div className="align-center">
          <p>{output}</p>
          <button onClick={() => onBackToSearchResults()}>zurück</button>
        </div>
      )}
    </div>
  );
}

export default ShowRecipe;
