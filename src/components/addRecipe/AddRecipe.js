import React, { useState, useRef } from "react";
import AddIngredientsStep from "./AddIngredientsStep";
import AddNameAmountsAndDescriptionStep from "./AddNameAmountsAndDescriptionStep";
import AddKeywordsStep from "./AddKeywordsStep";
import RecipeAdded from "./RecipeAdded";
import RecipeNotAdded from "./RecipeNotAdded";
import Navigation from "./Navigation";

const steps = {
  homeStep: "homeStep",
  addIngredientsStep: "addIngredientsStep",
  addNameAmountsDescriptionStep: "addNameAmountsDecriptionStep",
  addKeywordsStep: "addKeywordsStep",
  recipeAddedStep: "recipeAddedStep",
  recipeNotAddedStep: "recipeNotAddedStep",
};

const stepsArray = [
  steps.homeStep,
  steps.addIngredientsStep,
  steps.addNameAmountsDescriptionStep,
  steps.addKeywordsStep,
  steps.recipeAddedStep,
  steps.recipeNotAddedStep,
];

const AddRecipe = ({ onReturnHome }) => {
  const [currentStep, setCurrentStep] = useState(steps.addIngredientsStep);
  const [recipe, setRecipe] = useState({
    recipeName: "",
    amounts: [],
    ingredients: [],
    description: "",
    keywords: [],
  });
  const recipeNameFieldRef = useRef(null);
  const serverUrl = "http://localhost:3001";

  const handleCurrentStep = (nextStep) => {
    if (nextStep === steps.homeStep) {
      onReturnHome(true);
    } else if (
      recipe.recipeName === "" &&
      currentStep === steps.addNameAmountsDescriptionStep
    ) {
      recipeNameFieldRef.current.focus();
      recipeNameFieldRef.current.style.borderColor = "red";
    } else if (currentStep === steps.addKeywordsStep && nextStep === steps.recipeAddedStep) {
      handleSaveRecipe();
    } else setCurrentStep(nextStep);
  };

  // Speichert das Rezept ab
  const handleSaveRecipe = () => {
    // Es wird die Funktion fetch() verwendet, um Daten an einen Server zu senden.
    // serverUrl ist die Adresse des Servers, an den die Daten gesendet werden sollen.
    // addData ist der Endpunkt, der auf dem Server genutzt wird.
    fetch(`${serverUrl}/addData`, {
      // Es wird die HTTP-Methode POST verwendet, um Daten an den Server zu senden.
      method: "POST",
      // Es wird angegeben, dass die Daten im JSON-Format gesendet werden.
      headers: {
        "Content-Type": "application/json",
      },
      // Es wird das Rezept-Objekt in JSON-Format umgewandelt und als Datenkörper gesendet.
      body: JSON.stringify(recipe),
    })
      // Promises
      .then((response) => response.text())
      .then((message) => {
        // Es wird die Nachricht aus der Server-Antwort in der Konsole ausgegeben.
        console.log("Antwort vom Server:", message);
        setCurrentStep(steps.recipeAddedStep);
      })
      .catch((error) => {
        // Fehlerbehandlung
        console.error("Fehler beim Senden der Daten:", error);
        setCurrentStep(steps.recipeNotAddedStep);
      });
  };

  const stepsBeforeSave = [steps.addIngredientsStep, steps.addNameAmountsDescriptionStep, steps.addKeywordsStep].includes(
    currentStep
  );

  return (
    <div className="align-center">
      {currentStep === steps.addIngredientsStep && (
        <AddIngredientsStep recipe={recipe} setRecipe={setRecipe} />
      )}
      {currentStep === steps.addNameAmountsDescriptionStep && (
        <AddNameAmountsAndDescriptionStep
          recipe={recipe}
          setRecipe={setRecipe}
          recipeNameFieldRef={recipeNameFieldRef}
        />
      )}
      {currentStep === steps.addKeywordsStep && (
        <AddKeywordsStep recipe={recipe} setRecipe={setRecipe} />
      )}
      {currentStep === steps.recipeAddedStep && (
        <RecipeAdded onChangeStep={handleCurrentStep} recipe={recipe}/>
      )}
      {currentStep === steps.recipeNotAddedStep && (
        <RecipeNotAdded onChangeStep={handleCurrentStep} />
      )}
      {stepsBeforeSave && (
        <Navigation
          onChangeStep={handleCurrentStep}
          steps={stepsArray}
          indexOfPreviousStep={stepsArray.indexOf(currentStep) - 1}
          indexOfNextStep={stepsArray.indexOf(currentStep) + 1}
        />
      )}
    </div>
  );
}

export default AddRecipe;
