import React from "react";

function RecipeNameField({ recipeName, onRecipeNameChange }) {
  const recipeNameField = (
    <div className="container">
      Name des Rezepts
      <br />
      <input
        type="text"
        value={recipeName}
        onChange={(e) => onRecipeNameChange(e.target.value)}
      />
    </div>
  );

  return recipeNameField;
}

export default RecipeNameField;
