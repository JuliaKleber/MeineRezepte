import React from 'react';

const RecipeNameField = ({ recipe, setRecipe, recipeNameFieldRef }) => {
  const handleRecipeNameChange = (updatedRecipeName) => {
    setRecipe({ ...recipe, name: updatedRecipeName });
  };

  const recipeNameField = (
    <div className='container'>
      Name des Rezepts
      <br />
      <input
        type='text'
        value={recipe.name}
        ref={recipeNameFieldRef}
        onChange={(e) => handleRecipeNameChange(e.target.value)}
      />
    </div>
  );

  return recipeNameField;
}

export default RecipeNameField;
