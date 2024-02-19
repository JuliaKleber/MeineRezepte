import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useRecipeStore from "../stores/recipeStore";
import AddIngredientsStep from "../components/addRecipe/AddIngredientsStep";
import AddNameAmountsAndDescriptionStep from "../components/addRecipe/AddNameAmountsAndDescriptionStep";
import AddKeywordsStep from "../components/shared/AddKeywordsStep";
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
  const recipes = useRecipeStore((state) => state.recipes);
  const addRecipe = useRecipeStore((state) => state.addRecipe);
  const lastLocation = useRecipeStore((state) => state.lastLocation);
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
  const [validationOutput, setValidationOutput] = useState("");
  let isNameUnique = true;

  const withinStepsBeforeSave = [
    steps.addIngredientsStep,
    steps.addNameAmountsDescriptionStep,
    steps.addKeywordsStep,
  ].includes(currentStep);

  // Checks if the name of the new recipe is already in use.
  const checkNameforUniqueness = () => {
    const recipesWithSameName = recipes.filter((savedRecipe) => {
      return (
        recipe.name.replaceAll(" ", "-").toLowerCase() ===
        savedRecipe.name.replaceAll(" ", "-").toLowerCase()
      );
    });
    if (recipesWithSameName.length !== 0) {
      isNameUnique = false;
    }
  };

  // Validation output for the recipe name field.
  const outputValidationMessages = () => {
    if (!isNameUnique) {
      setValidationOutput("Der Rezeptname ist schon vergeben");
      isNameUnique = true;
    } else {
      setValidationOutput("Bitte gib einen Namen für das Rezept ein");
    }
    recipeNameFieldRef.current.focus();
    setRecipeNameFieldStyle({ backgroundColor: "lightblue" });
  };

  // Handles the navigaton in the add recipe component.
  const handleCurrentStep = (nextStep) => {
    checkNameforUniqueness();
    if (nextStep === steps.homeStep) {
      navigate(lastLocation);
    } else if (
      (recipe.name === "" || !isNameUnique) &&
      nextStep === steps.addKeywordsStep
    ) {
      outputValidationMessages();
    } else if (nextStep === steps.addKeywordsStep) {
      setRecipeNameFieldStyle({});
      setCurrentStep(nextStep);
    } else if (nextStep === steps.recipeAddedStep) {
      saveRecipe();
    } else setCurrentStep(nextStep);
  };

  // The amounts array is cleaned up.
  const cleanUpAmountsArray = () => {
    let newRecipe = { ...recipe };
    if (recipe.amounts.length === 0) {
      newRecipe.amounts = recipe.ingredients.map(() => "");
    }
    newRecipe.amounts.forEach((amount) => {
      if (amount === null || amount === undefined) {
        amount = "";
      }
    });
    const lengthDifference =
      newRecipe.ingredients.length - newRecipe.amounts.length;
    if (lengthDifference > 0)
      for (let i = 0; i < lengthDifference; i++) {
        newRecipe.amounts.push("");
      }
    setRecipe(newRecipe);
    return newRecipe;
  };

  // If an image was provided, the image name is created.
  const createImageName = (newRecipe) => {
    const recipeName = newRecipe.name
      .toLowerCase()
      .replace(/ä/g, "ae")
      .replace(/ö/g, "oe")
      .replace(/ü/g, "ue")
      .replace(/ß/g, "ss")
      .replace(/\s+/g, "-");
    return `${recipeName}.jpg`;
  };

  // The recipe is saved to the database.
  const saveRecipe = async () => {
    let newRecipe = cleanUpAmountsArray();
    if (uploadedFile) {
      newRecipe = { ...newRecipe, imageName: createImageName(newRecipe) };
    }
    addRecipe(newRecipe, uploadedFile);
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
          validationOutput={validationOutput}
        />
      )}
      {currentStep === steps.addKeywordsStep && (
        <AddKeywordsStep recipe={recipe} setRecipe={setRecipe} />
      )}
      {currentStep === steps.recipeAddedStep && (
        <AfterRecipeSave
          onChangeStep={handleCurrentStep}
          setRecipe={setRecipe}
          setUploadedFile={setUploadedFile}
          isNameUnique={isNameUnique}
        />
      )}
      {withinStepsBeforeSave && (
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
