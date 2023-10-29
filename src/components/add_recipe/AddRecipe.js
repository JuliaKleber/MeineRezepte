import React, { useState, useRef } from "react";
import AddIngredientsStep from "./AddIngredientsStep";
import AddNameAmountsAndDescriptionStep from "./AddNameAmountsAndDescriptionStep";
import AddKeywordsStep from "./AddKeywordsStep";
import RecipeAdded from "./RecipeAdded";
import RecipeNotAdded from "./RecipeNotAdded";
import Navigation from "./Navigation";

function AddRecipe({ onReturnHome }) {
  const [currentStep, setCurrentStep] = useState("ingredients");
  const [recipe, setRecipe] = useState({
    recipeName: "",
    amounts: [],
    ingredients: [],
    description: "",
    keywords: [],
  });
  const steps = [
    "home",
    "addIngredientsStep",
    "addNameAmountsDecriptionStep",
    "addKeywordsStep",
    "recipeAdded",
    "recipeNotAdded",
  ];
  const recipeNameFieldRef = useRef(null);
  const serverUrl = "http://localhost:3001";

  const handleCurrentStep = (nextStep) => {
    if (nextStep === "home") {
      onReturnHome(true);
    } else if (
      recipe.recipeName === "" &&
      currentStep === "addNameAmountsDecriptionStep"
    ) {
      recipeNameFieldRef.current.focus();
      recipeNameFieldRef.current.style.borderColor = "red";
    } else if (currentStep === "addKeywordsStep") {
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
        setCurrentStep("recipeAdded");
      })
      .catch((error) => {
        // Fehlerbehandlung
        console.error("Fehler beim Senden der Daten:", error);
        setCurrentStep("recipeNotAdded");
      });
  };

  const stepsBeforeSave = ["ingredients", "amounts", "keywords"].includes(
    currentStep
  );

  return (
    <div className="align-center">
      {currentStep === "addIngredientsStep" && (
        <AddIngredientsStep recipe={recipe} setRecipe={setRecipe} />
      )}
      {currentStep === "addNameAmountsDecriptionStep" && (
        <AddNameAmountsAndDescriptionStep
          recipe={recipe}
          setRecipe={setRecipe}
          recipeNameFieldRef={recipeNameFieldRef}
        />
      )}
      {currentStep === "addKeywordsStep" && (
        <AddKeywordsStep recipe={recipe} setRecipe={setRecipe} />
      )}
      {currentStep === "recipeAdded" && (
        <RecipeAdded onChangeStep={handleCurrentStep} />
      )}
      {currentStep === "recipeNotAdded" && (
        <RecipeNotAdded onChangeStep={handleCurrentStep} />
      )}
      {stepsBeforeSave && (
        <Navigation
          onChangeStep={handleCurrentStep}
          steps={steps}
          indexOfPreviousStep={steps.indexOf(currentStep) - 1}
          indexOfNextStep={steps.indexOf(currentStep) + 1}
        />
      )}
    </div>
  );
}

export default AddRecipe;
