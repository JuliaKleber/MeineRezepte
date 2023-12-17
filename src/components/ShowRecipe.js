import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ShowIngredients from './ShowIngredients';
import EditRecipe from './EditRecipe';
import DeleteRecipe from './DeleteRecipe';
import pastaImage from '../images/pasta.jpg';

const ShowRecipe = ({ recipe, setRecipe, onBackToSearchResults, recipes, setRecipes }) => {
  const [currentStep, setCurrentStep] = useState('recipeIsShown');
  const [output, setOutput] = useState('');

  const handleRecipeChangeOn = () => {
    setCurrentStep('recipeIsChanged');
  };
  // Die Frage, ob das Rezept wirklich gelöscht werden soll,
  // wird nicht mehr angezeigt
  const handleRecipeChangeOff = (output) => {
    setOutput(output);
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
        <EditRecipe recipe={recipe} setRecipe={setRecipe} recipes={recipes} onReturn={handleRecipeChangeOff} />
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
        <p className='align-center'>{output}</p>
      )}

      {currentStep === 'recipeWasRemoved' && (
        <div className='align-center'>
          <p>{output}</p>
          <NavLink exact to='/'>
            <button>zum Startmenü</button>
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default ShowRecipe;
