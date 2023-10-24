import React from "react";

function RecipeNameField({ recipeName, onRecipeNameChange, recipeNameFieldRef }) {
  const recipeNameField = (
    <div className="container">
      Name des Rezepts
      <br />
      <input
        type="text"
        value={recipeName}
        ref={recipeNameFieldRef}
        onChange={(e) => onRecipeNameChange(e.target.value)}
      />
    </div>
  );

  return recipeNameField;
}

export default RecipeNameField;
