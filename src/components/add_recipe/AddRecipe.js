import React, { useState, useRef } from "react";
import AddIngredients from "./AddIngredients";
import AddAmounts from "./AddAmounts";
import AddKeywords from "./AddKeywords";
import RecipeAdded from "./RecipeAdded";
import RecipeNotAdded from "./RecipeNotAdded";
import Navigation from "./Navigation";

function AddRecipe({ onReturnHome }) {
  const [currentStep, setCurrentStep] = useState("ingredients");
  const [recipeName, setRecipeName] = useState("");
  const [amounts, setAmounts] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState([]);
  const recipe = {
    recipeName,
    amounts,
    ingredients,
    description,
    keywords,
  };
  const steps = [
    "home",
    "ingredients",
    "amounts",
    "keywords",
    "recipeAdded",
    "recipeNotAdded",
  ];
  const serverUrl = "http://localhost:3001";
  const recipeNameFieldRef = useRef(null);

  const handleCurrentStep = (nextStep) => {
    nextStep === "home" && onReturnHome(true);
    if (recipeName === "" && currentStep === "amounts") {
      recipeNameFieldRef.current.focus();
      recipeNameFieldRef.current.style.borderColor = "red";
    }
    else if (currentStep === "keywords") {
      handleSaveRecipe();
    }
    else setCurrentStep(nextStep);
  };

  const handleSaveRecipeName = (chosenRecipeName) => {
    setRecipeName(chosenRecipeName);
  };

  const handleSaveAmounts = (chosenAmounts) => {
    setAmounts(chosenAmounts);
  };

  const handleSaveIngredients = (chosenIngredients) => {
    setIngredients(chosenIngredients);
  };

  const handleSaveDescription = (chosenDescription) => {
    setDescription(chosenDescription);
  };

  const handleSaveKeywords = (chosenKeywords) => {
    setKeywords(chosenKeywords);
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
  }

  return (
    <div className="align-center">
      {currentStep === "ingredients" && (
        <div>
          <AddIngredients
            recipe={recipe}
            onSaveIngredients={handleSaveIngredients}
            onSaveKeywords={handleSaveKeywords}
          />
        </div>
      )}
      {currentStep === "amounts" && (
        <div>
          <AddAmounts
            recipe={recipe}
            recipeNameFieldRef={recipeNameFieldRef}
            onSaveRecipeName={handleSaveRecipeName}
            onSaveAmounts={handleSaveAmounts}
            onSaveIngredients={handleSaveIngredients}
            onSaveDescription={handleSaveDescription}
          />
        </div>
      )}
      {currentStep === "keywords" && (
        <div>
          <AddKeywords recipe={recipe} onSaveKeywords={handleSaveKeywords} />
        </div>
      )}
      {currentStep === "recipeAdded" && (
        <div>
          <RecipeAdded onChangeStep={handleCurrentStep} />
        </div>
      )}
      {currentStep === "recipeNotAdded" && (
        <div>
          <RecipeNotAdded onChangeStep={handleCurrentStep} />
        </div>
      )}
      {["ingredients", "amounts", "keywords"].includes(currentStep) && (
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
