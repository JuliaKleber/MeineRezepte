import React from "./RecipeAdded";

function RecipeAdded({ onChangeStep }) {
  const handleGoToStartMenu = () => {
    onChangeStep("home");
  };

  const handleAddOtherRecipe = () => {
    onChangeStep("ingredients");
  };

  return (
    <div className="container">
      <p className="align-center">Das Rezept wurde der Datenbank hinzugefügt.</p>
      <button onClick={handleAddOtherRecipe}>
        weiteres Rezept hinzufügen
      </button>
      <button onClick={handleGoToStartMenu}>zum Startmenü</button>
    </div>
  );
}

export default RecipeAdded;
