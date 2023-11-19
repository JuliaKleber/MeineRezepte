import React from "./RecipeAdded";

function RecipeAdded({ onChangeStep, recipe }) {
  recipe.recipeName = "";
  recipe.amounts = [];
  recipe.ingredients = [];
  recipe.description = "";
  recipe.keywords = [];

  const handleGoToStartMenu = () => {
    onChangeStep("home");
  };

  const handleAddOtherRecipe = () => {
    onChangeStep("addIngredientsStep");
  };

  return (
    <div className="container">
      <p className="align-center">
        Das Rezept wurde der Datenbank hinzugefügt.
      </p>
      <button onClick={handleAddOtherRecipe}>weiteres Rezept hinzufügen</button>
      <button onClick={handleGoToStartMenu}>zum Startmenü</button>
    </div>
  );
}

export default RecipeAdded;
