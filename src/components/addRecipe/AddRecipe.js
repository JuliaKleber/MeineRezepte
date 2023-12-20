import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AddIngredientsStep from './AddIngredientsStep';
import AddNameAmountsAndDescriptionStep from './AddNameAmountsAndDescriptionStep';
import AddKeywordsStep from './AddKeywordsStep';
import RecipeAdded from './RecipeAdded';
import RecipeNotAdded from './RecipeNotAdded';
import Navigation from './Navigation';

const steps = {
  homeStep: 'homeStep',
  addIngredientsStep: 'addIngredientsStep',
  addNameAmountsDescriptionStep: 'addNameAmountsDecriptionStep',
  addKeywordsStep: 'addKeywordsStep',
  recipeAddedStep: 'recipeAddedStep',
  recipeNotAddedStep: 'recipeNotAddedStep',
};

const stepsArray = [
  steps.homeStep,
  steps.addIngredientsStep,
  steps.addNameAmountsDescriptionStep,
  steps.addKeywordsStep,
  steps.recipeAddedStep,
  steps.recipeNotAddedStep,
];

const AddRecipe = ({ recipes, setRecipes }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(steps.addIngredientsStep);
  const [recipe, setRecipe] = useState({
    recipeName: '',
    amounts: [],
    ingredients: [],
    description: '',
    keywords: [],
    image: null,
  });
  const [uploadedFile, setUploadedFile] = useState(null);
  const recipeNameFieldRef = useRef(null);
  const serverUrl = 'http://localhost:3001';

  const handleCurrentStep = (nextStep) => {
    if (nextStep === steps.homeStep) {
      navigate('/');
    } else if (
      recipe.recipeName === '' &&
      nextStep === steps.addKeywordsStep
    ) {
      recipeNameFieldRef.current.focus();
      recipeNameFieldRef.current.style.borderColor = 'mediumorchid';
    } else if (nextStep === steps.recipeAddedStep) {
      handleSaveRecipe();
    } else setCurrentStep(nextStep);
  };

  const handleSaveRecipe = () => {
    let newRecipe = { ...recipe };
    if (recipe.amounts.length === 0) {
      recipe.ingredients.forEach(() => {
        newRecipe.amounts.push('');
      });
      setRecipe(newRecipe);
    }
    const imageName = `${newRecipe.recipeName.toLowerCase().replace(/\s+/g, '-')}.jpg`;
    const imagePath = `${serverUrl}/images/${imageName}`;

    fetch(`${serverUrl}/addRecipe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...newRecipe, image: imageName }),
    })
      .then((response) => response.text())
      .then((message) => {
        console.log('Antwort vom Server:', message);
        // Speichere das Bild auf dem Server im images-Ordner
        fetch(imagePath, {
          method: 'POST',
          headers: {
            'Content-Type': 'image/jpeg',
          },
          body: uploadedFile,
        })
          .then((response) => response.text())
          .then((imageMessage) => {
            console.log('Bild hochgeladen:', imageMessage);
          })
          .catch((imageError) => {
            console.error('Fehler beim Hochladen des Bildes:', imageError);
          });
        setRecipes([...recipes, newRecipe]);
        setCurrentStep(steps.recipeAddedStep);
      })
      .catch((error) => {
        console.error('Fehler beim Senden der Daten:', error);
        setCurrentStep(steps.recipeNotAddedStep);
      });
  };

  const stepsBeforeSave = [steps.addIngredientsStep, steps.addNameAmountsDescriptionStep, steps.addKeywordsStep].includes(
    currentStep
  );

  return (
    <div className='align-center'>
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
        <RecipeAdded onChangeStep={handleCurrentStep} setRecipe={setRecipe}/>
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
