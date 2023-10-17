import React from "./RecipeAdded";

function RecipeAdded({ onChangeStep }) {
  const handleGoToStartMenu = () => {
    onChangeStep("none");
  };

  const handleGoToIngredients = () => {
    onChangeStep("ingredients");
  };

  return (
    <div className="container">
      <p>Das Rezept wurde der Datenbank hinzugefügt.</p>
      <button onClick={handleGoToIngredients}>
        weiteres Rezept hinzufügen
      </button>
      <button onClick={handleGoToStartMenu}>zum Startmenü</button>
    </div>
  );
}

export default RecipeAdded;
