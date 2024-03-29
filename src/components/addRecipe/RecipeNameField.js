import React from "react";

const RecipeNameField = ({
  recipe,
  setRecipe,
  recipeNameFieldRef,
  recipeNameFieldStyle,
  validationOutput,
}) => {
  const editRecipeName = (updatedRecipeName) => {
    setRecipe({ ...recipe, name: updatedRecipeName });
  };

  const recipeNameField = (
    <div className="container recipe-name-field">
      Name des Rezepts
      <br />
      <input
        type="text"
        value={recipe.name}
        ref={recipeNameFieldRef}
        onChange={(e) => editRecipeName(e.target.value)}
        style={recipeNameFieldStyle}
      />
      <div className="output">{validationOutput}</div>
    </div>
  );

  return recipeNameField;
};

export default RecipeNameField;
