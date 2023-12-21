import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShowIngredients from './ShowIngredients';
import ShowRecipeDescription from './ShowRecipeDescription';
import EditRecipe from './EditRecipe';
import DeleteRecipe from './DeleteRecipe';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointRight } from '@fortawesome/free-solid-svg-icons';
import { faHandPointLeft } from '@fortawesome/free-solid-svg-icons';

const ShowRecipe = ({ recipe, setRecipe, recipes, setRecipes, searchTerm, onBackToSearch }) => {
  const [currentStep, setCurrentStep] = useState('recipeIsShown');
  const [output, setOutput] = useState('');
  const navigate = useNavigate();

  const handleRecipeEditingOn = () => {
    setCurrentStep('recipeIsEdited');
  };

  // Die Frage, ob das Rezept wirklich gelöscht werden soll,
  // wird nicht mehr angezeigt
  const handleRecipeChangeOff = (output, editedRecipe) => {
    setOutput(output);
    setRecipe(editedRecipe);
    setCurrentStep('recipeIsShown');
  };

  // Die Frage, ob das Rezept wirklich gelöscht werden soll,
  // wird angezeigt
  const handleRecipeDeletionOn = () => {
    setCurrentStep('deletionInitiated');
  };

  // Die Frage, ob das Rezept wirklich gelöscht werden soll,
  // wird nicht mehr angezeigt
  const handleRecipeDeletionOff = (wasRemoved, newOutput) => {
    wasRemoved && setCurrentStep('recipeWasRemoved');
    setOutput(newOutput);
    !wasRemoved && setCurrentStep('recipeIsShown');
  };

  return (
    <div className='container show-recipe'>

      {currentStep === 'recipeIsShown' && (
        <div className='container'>
          <h2 className='align-center'>{recipe.recipeName}</h2>
          <ShowIngredients recipe={recipe} setRecipe={setRecipe} />
          <ShowRecipeDescription recipeDescription={recipe.description} />
          <span>
            <button className='show-recipe-button white' onClick={handleRecipeEditingOn}>
              Rezept ändern
            </button>
            <button className='show-recipe-button white' onClick={handleRecipeDeletionOn}>
              Rezept löschen
            </button>
          </span>
        </div>)}

      {currentStep === 'recipeIsShown' && searchTerm !== 'fromHome' && (
        <button onClick={() => onBackToSearch(searchTerm)}>zurück</button>
      )}

      {currentStep === 'recipeIsShown' && output !== '' && (
        <p className='align-center primary-color'>
          <FontAwesomeIcon icon={faHandPointRight} />
          {output}
          <FontAwesomeIcon icon={faHandPointLeft} />
        </p>
      )}

      {currentStep === 'recipeIsEdited' && (
        <EditRecipe recipe={recipe} setRecipe={setRecipe} recipes={recipes} setRecipes={setRecipes} onReturn={handleRecipeChangeOff} />
      )}

      {currentStep === 'deletionInitiated' && (
        <DeleteRecipe
          recipes={recipes}
          setRecipes={setRecipes}
          recipe={recipe}
          onReturn={handleRecipeDeletionOff}
        />
      )}

      {currentStep === 'deletionNotPerformed' && (
        <p className='align-center'>
          <FontAwesomeIcon icon={faHandPointRight} />
          {output}
          <FontAwesomeIcon icon={faHandPointLeft} />
        </p>
      )}

      {currentStep === 'recipeWasRemoved' && (
        <div className='align-center'>
          <p className='secondary-color'>
            <FontAwesomeIcon icon={faHandPointRight} />
            {output}
            <FontAwesomeIcon icon={faHandPointLeft} />
          </p>
            <button onClick={() => navigate('/')}>zum Startmenü</button>
        </div>
      )}
    </div>
  );
}

export default ShowRecipe;
