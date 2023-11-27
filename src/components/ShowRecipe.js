import React, { useState } from 'react';
import ShowIngredients from './ShowIngredients';
import EditRecipe from './EditRecipe';
import DeleteRecipe from './DeleteRecipe';
import pastaImage from '../images/pasta.jpg';

const ShowRecipe = ({ recipe, onBackToSearchResults, recipes }) => {
  const [currentStep, setCurrentStep] = useState('recipeIsShown');
  const [currentRecipe, setCurrentRecipe] = useState(recipe);
  const [output, setOutput] = useState('');

  const handleRecipeChangeOn = () => {
    setCurrentStep('recipeIsChanged');
  };
  // Die Frage, ob das Rezept wirklich gelöscht werden soll,
  // wird nicht mehr angezeigt
  const handleRecipeChangeOff = (newOutput, newRecipe) => {
    setOutput(newOutput);
    setCurrentRecipe(newRecipe);
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
          <h2 className='recipe-card align-center'>{recipe.recipeName}</h2>
          <img src={pastaImage} alt='recipe_picture' width='300px' />
          <ShowIngredients recipe={recipe} />
          <p className={recipe.description === '' ? 'display-none' : 'recipe-card center'} id='recipe-description'>
            {recipe.description}
          </p>
          <span>
            <button className='show-recipe-button white' onClick={handleRecipeChangeOn}>
              Rezept ändern
            </button>
            <button className='show-recipe-button white' onClick={handleRecipeDeletionOn}>
              Rezept löschen
            </button>
          </span>
          <button onClick={() => onBackToSearchResults()}>zurück</button>
          <p className='align-center'>{output}</p>
        </div>
      )}

      {currentStep === 'recipeIsChanged' && (
        <EditRecipe recipe={recipe} recipes={recipes} onReturn={handleRecipeChangeOff} />
      )}

      {currentStep === 'deletionInitiated' && (
        <DeleteRecipe
          recipes={recipes}
          recipe={recipe}
          onReturn={handleRecipeDeletionOff}
        />
      )}

      {currentStep === 'deletionNotPerformed' && (
        <p className='align-center'>{output}</p>
      )}

      {currentStep === 'recipeWasRemoved' && (
        <div className='align-center'>
          <p>{output}</p>
          <button onClick={() => onBackToSearchResults()}>zurück</button>
        </div>
      )}
    </div>
  );
}

export default ShowRecipe;
