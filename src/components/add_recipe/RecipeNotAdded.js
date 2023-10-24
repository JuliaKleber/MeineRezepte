import React from "./RecipeAdded";

function RecipeNotAdded( {onChangeStep} ) {

  const goToStartMenu = () => {
    onChangeStep("home");
  };

  return (
    <div className="container">
      <p>Das Rezept konnte nicht gespeichert werden.</p>
      <button onClick={goToStartMenu}>zum Startmenü</button>
    </div>
  );
}

export default RecipeNotAdded;
