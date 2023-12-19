import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShowIngredients from './ShowIngredients';
import EditRecipe from './EditRecipe';
import DeleteRecipe from './DeleteRecipe';
import pastaImage from '../images/pasta.jpg';

const ShowRecipe = ({ recipe, setRecipe, recipes, setRecipes, searchTerm, onBackToSearch }) => {
  const [currentStep, setCurrentStep] = useState('recipeIsShown');
  const [output, setOutput] = useState('');
  const navigate = useNavigate();

  const handleRecipeEditingOn = () => {
    setCurrentStep('recipeIsEdited');
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
          <img src={pastaImage} alt='recipe_picture' width='300px' />
          <h2 className='align-center'>{recipe.recipeName}</h2>
          <ShowIngredients recipe={recipe} />
          <p className={recipe.description === '' ? 'display-none' : 'recipe-card center'} id='recipe-description'>
            {recipe.description}
          </p>
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
      {currentStep === 'recipeIsShown' && (
          <p className='align-center'>{output}</p>
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
        <p className='align-center'>{output}</p>
      )}

      {currentStep === 'recipeWasRemoved' && (
        <div className='align-center'>
          <p>{output}</p>
            <button onClick={() => navigate('/')}>zum Startmenü</button>
        </div>
      )}
    </div>
  );
}

export default ShowRecipe;
