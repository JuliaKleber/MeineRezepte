import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useRecipeStore from "../stores/recipeStore";
import AddIngredientsStep from "../components/addRecipe/AddIngredientsStep";
import AddNameAmountsAndDescriptionStep from "../components/addRecipe/AddNameAmountsAndDescriptionStep";
import AddKeywordsStep from "../components/addRecipe/AddKeywordsStep";
import AfterRecipeSave from "../components/addRecipe/AfterRecipeSave";
import Navigation from "../components/addRecipe/Navigation";

const steps = {
  homeStep: "homeStep",
  addIngredientsStep: "addIngredientsStep",
  addNameAmountsDescriptionStep: "addNameAmountsDescriptionStep",
  addKeywordsStep: "addKeywordsStep",
  recipeAddedStep: "recipeAddedStep",
};

const stepsArray = [
  steps.homeStep,
  steps.addIngredientsStep,
  steps.addNameAmountsDescriptionStep,
  steps.addKeywordsStep,
  steps.recipeAddedStep,
];

const AddRecipe = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(steps.addIngredientsStep);
  const { recipes, addRecipe } = useRecipeStore();
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
  const [recipeNameFieldStyle, setRecipeNameFieldStyle] = useState({});
  const recipeNameFieldRef = useRef(null);
  let isNameUnique = true;
  const [output, setOutput] = useState("");

  const stepsBeforeSave = [
    steps.addIngredientsStep,
    steps.addNameAmountsDescriptionStep,
    steps.addKeywordsStep,
  ].includes(currentStep);

  const checkNameforUniqueness = () => {
    const recipesWithSameName = recipes.filter((savedRecipe) => {
      return recipe.name === savedRecipe.name;
    });
    if (recipesWithSameName.length !== 0) {
      isNameUnique = false;
    }
  };

  const handleCurrentStep = (nextStep) => {
    checkNameforUniqueness();
    if (nextStep === steps.homeStep) {
      navigate("/");
    } else if (
      (recipe.name === "" || !isNameUnique) &&
      nextStep === steps.addKeywordsStep
    ) {
      if (!isNameUnique) {
        setOutput("Der Rezeptname ist schon vergeben");
        isNameUnique = true;
      } else {
        setOutput("Bitte gib einen Namen für das Rezept ein");
      }
      recipeNameFieldRef.current.focus();
      setRecipeNameFieldStyle({ backgroundColor: "lightblue" });
    } else if (nextStep === steps.addKeywordsStep) {
      setRecipeNameFieldStyle({});
      setCurrentStep(nextStep);
    } else if (nextStep === steps.recipeAddedStep) {
      saveRecipe();
    } else setCurrentStep(nextStep);
  };

  const cleanUpRecipe = () => {
    let newRecipe = { ...recipe };
    if (recipe.amounts.length === 0) {
      newRecipe.amounts = recipe.ingredients.map(() => "");
    }
    newRecipe.amounts.forEach((amount) => {
      if (amount === null || amount === undefined) {
        amount = "";
      }
    });
    setRecipe(newRecipe);
    return newRecipe;
  };

  const saveRecipe = async () => {
    let newRecipe = cleanUpRecipe();
    if (uploadedFile) {
      const recipeName = newRecipe.name
        .toLowerCase()
        .replace(/ä/g, "ae")
        .replace(/ö/g, "oe")
        .replace(/ü/g, "ue")
        .replace(/ß/g, "ss")
        .replace(/\s+/g, "-");
      const imageName = `${recipeName}.jpg`;
      newRecipe = { ...newRecipe, imageName: imageName };
    }
    addRecipe(recipes, newRecipe, uploadedFile);
    setCurrentStep(steps.recipeAddedStep);
  };

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
          recipeNameFieldStyle={recipeNameFieldStyle}
          output={output}
        />
      )}
      {currentStep === steps.addKeywordsStep && (
        <AddKeywordsStep recipe={recipe} setRecipe={setRecipe} />
      )}
      {currentStep === steps.recipeAddedStep && (
        <AfterRecipeSave onChangeStep={handleCurrentStep} setRecipe={setRecipe} setUploadedFile={setUploadedFile} />
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
