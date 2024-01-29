import React, { useState, useRef } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import AddIngredientsStep from "../components/addRecipe/AddIngredientsStep";
import AddNameAmountsAndDescriptionStep from "../components/addRecipe/AddNameAmountsAndDescriptionStep";
import AddKeywordsStep from "../components/addRecipe/AddKeywordsStep";
import RecipeAdded from "../components/addRecipe/RecipeAdded";
import RecipeNotAdded from "../components/addRecipe/RecipeNotAdded";
import Navigation from "../components/addRecipe/Navigation";
import { getRecipes } from '../fetchData/apiCalls';

export const loader = async () => {
  const recipes = await getRecipes();
  return recipes;
}

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

const AddRecipe = () => {
  const [recipes, setRecipes] = useState(useLoaderData());
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(steps.addIngredientsStep);
  const [recipe, setRecipe] = useState({
    name: "",
    numberOfPersons: 1,
    amounts: [],
    ingredients: [],
    description: "",
    keywords: [],
    imageName: null,
  });
  const [uploadedFile, setUploadedFile] = useState(null);
  const recipeNameFieldRef = useRef(null);
  const serverUrl = "http://localhost:3001";

  const handleCurrentStep = (nextStep) => {
    if (nextStep === steps.homeStep) {
      navigate("/");
    } else if (recipe.name === "" && nextStep === steps.addKeywordsStep) {
      recipeNameFieldRef.current.focus();
      recipeNameFieldRef.current.style.borderColor = "mediumorchid";
    } else if (nextStep === steps.recipeAddedStep) {
      handleSaveRecipe();
    } else setCurrentStep(nextStep);
  };

  const cleanUpRecipe = () => {
    let newRecipe = { ...recipe };
    if (recipe.amounts.length === 0) {
      recipe.ingredients.forEach(() => {
        newRecipe.amounts.push("");
      });
    }
    newRecipe.amounts.forEach((amount) => {
      if (amount === null || amount === undefined) {
        amount = "";
      }
    });
    setRecipe(newRecipe);
    return newRecipe;
  };

  const handleSaveRecipe = () => {
    let newRecipe = cleanUpRecipe();
    if (uploadedFile !== null) {
      const recipeName = newRecipe.name
        .toLowerCase()
        .replace(/ä/g, "ae")
        .replace(/ö/g, "oe")
        .replace(/ü/g, "ue")
        .replace(/ß/g, "ss")
        .replace(/\s+/g, "-");
      const imageName = `${recipeName}.jpg`;
      newRecipe = { ...newRecipe, imageName: imageName };
      setRecipe(newRecipe);
    }
    // const imagePath = `${serverUrl}/images/${imageName}`;
    fetch(`${serverUrl}/addRecipe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecipe),
    })
      .then((response) => response.text())
      .then((message) => {
        console.log("Antwort vom Server:", message);
        // Speichert das Bild auf dem Server im images-Ordner
        if (uploadedFile !== null) {
          const formData = new FormData();
          const imageName = newRecipe.imageName;
          formData.append("image", uploadedFile, imageName);
          fetch(`${serverUrl}/addRecipeImage`, {
            method: "POST",
            body: formData,
          })
            .then((response) => response.text())
            .then((imageMessage) => {
              console.log("Bild hochgeladen:", imageMessage);
            })
            .catch((imageError) => {
              console.error("Fehler beim Hochladen des Bildes:", imageError);
            });
        }
        setRecipes([...recipes, newRecipe]);
        setCurrentStep(steps.recipeAddedStep);
      })
      .catch((error) => {
        console.error("Fehler beim Senden der Daten:", error);
        setCurrentStep(steps.recipeNotAddedStep);
      });
  };

  const stepsBeforeSave = [
    steps.addIngredientsStep,
    steps.addNameAmountsDescriptionStep,
    steps.addKeywordsStep,
  ].includes(currentStep);

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
          uploadedFile={uploadedFile}
          setUploadedFile={setUploadedFile}
        />
      )}
      {currentStep === steps.addKeywordsStep && (
        <AddKeywordsStep recipe={recipe} setRecipe={setRecipe} />
      )}
      {currentStep === steps.recipeAddedStep && (
        <RecipeAdded onChangeStep={handleCurrentStep} setRecipe={setRecipe} />
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
};

export default AddRecipe;
