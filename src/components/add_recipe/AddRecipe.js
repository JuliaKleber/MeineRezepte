import React, { useState } from "react";
import AddIngredients from "./AddIngredients";
import AddAmounts from "./AddAmounts";
import AddKeywords from "./AddKeywords";
import SaveRecipe from "./SaveRecipe";
import RecipeAdded from "./RecipeAdded";
import RecipeNotAdded from "./RecipeNotAdded";

function AddRecipe(props) {
  const [currentStep, setCurrentStep] = useState("ingredients");
  const [ingredients, setIngredients] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [recipeName, setRecipeName] = useState("");
  const [amounts, setAmounts] = useState(Array(ingredients.length).fill(""));
  const [description, setDescription] = useState("");
  const recipe = {
    name: { recipeName },
    amounts: { amounts },
    ingredients: { ingredients },
    description: { description },
    keywords: { keywords },
  };

  //Geht zum nächsten Schritt
  const handleCurrentStep = (nextStep) => {
    setCurrentStep(nextStep);
    nextStep === "none" && props.onReturnHome(true);
  };

  const handleSaveIngredients = (chosenIngredients) => {
    setIngredients(chosenIngredients);
  };

  const handleSaveKeywords = (chosenKeywords) => {
    setKeywords(chosenKeywords);
  };

  const handleSaveRecipeName = (chosenRecipeName) => {
    setRecipeName(chosenRecipeName);
  };

  const handleSaveAmounts = (chosenAmounts) => {
    setAmounts(chosenAmounts);
  };

  const handleSaveDescription = (chosenDescription) => {
    setDescription(chosenDescription);
  };

  return (
    <div className="center">
      {currentStep === "ingredients" && (
        <AddIngredients
          onChangeStep={handleCurrentStep}
          onSaveIngredients={handleSaveIngredients}
          onSaveKeywords={handleSaveKeywords}
        />
      )}
      {currentStep === "amounts" && (
        <AddAmounts
          ingredients={ingredients}
          onChangeStep={handleCurrentStep}
          onSaveRecipeName={handleSaveRecipeName}
          onSaveAmounts={handleSaveAmounts}
          onDescription={handleSaveDescription}
        />
      )}
      {currentStep === "keywords" && (
        <div>
          <AddKeywords
            oldKeywords={keywords}
            onChangeStep={handleCurrentStep}
          />
          <span>
            <button onClick={() => handleCurrentStep("amounts")}>zurück</button>
            <SaveRecipe recipe={recipe} onChangeStep={handleCurrentStep} />
          </span>
        </div>
      )}
      {currentStep === "recipeAdded" && (
        <RecipeAdded onChangeStep={handleCurrentStep} />
      )}
      {currentStep === "recipeNotAdded" && (
        <RecipeNotAdded onChangeStep={handleCurrentStep} />
      )}
    </div>
  );
}

export default AddRecipe;
