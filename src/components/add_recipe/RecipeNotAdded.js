import React from "./RecipeAdded";

function RecipeNotAdded(props) {
  // Geht zum Start Menü
  const goToStartMenu = () => {
    props.onChangeStep("none");
  };

  return (
    <div className="container">
      <p>Das Rezept konnte nicht gespeichert werden.</p>
      <button onClick={goToStartMenu}>zum Startmenü</button>
    </div>
  );
}

export default RecipeNotAdded;
