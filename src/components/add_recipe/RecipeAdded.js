import React from "./RecipeAdded";

function RecipeAdded(props) {
  // Geht zum Start Menü
  const goToStartMenu = () => {
    props.onChangeStep("none");
  };

  // Geht zur Auswahl der Zutaten
  function goToIngredients() {
    props.onChangeStep("ingredients");
  }

  return (
    <div className="container">
      <p>Das Rezept wurde der Datenbank hinzugefügt.</p>
      <button onClick={goToIngredients}>weiteres Rezept hinzufügen</button>
      <button onClick={goToStartMenu}>zum Startmenü</button>
    </div>
  );
}

export default RecipeAdded;
