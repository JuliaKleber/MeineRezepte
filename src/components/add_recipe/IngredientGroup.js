import React, { useState } from "react";

function IngredientGroup(props) {
  // Überbegriff der Kategorie von Zutaten
  const ingredientsCategory = props.ingredientsCategory;
  // Zutaten aus der Kategorie
  const choiceOfIngredients = props.choiceOfIngredients;
  // true, wenn alle Zutaten der Kategorie angezeigt werden.
  // false, wenn nur die markierten Zutaten der Kategorie angezeigt werden.
  const [listIsShown, setListIsShown] = useState(false);
  // Speichert, welche Zutat aus der Kategorie vom Nutzer angeklickt wurde.
  const [ingredientIsSelected, setIngredientIsSelected] = useState(
    Array(choiceOfIngredients.length).fill(false)
  );
  // Speichert welche Zutaten angezeigt werden.
  const [visibleIngredients, setVisibleIngredients] = useState(
    Array(choiceOfIngredients.length).fill(false)
  );
  const ingredients = choiceOfIngredients.map(
    (ingredient, index) =>
      visibleIngredients[index] && (
        <button
          key={ingredient}
          onClick={() => handleIngredientClick(index)}
          className={ingredientIsSelected[index] ? "is-chosen" : "not-chosen"}
        >
          {ingredient}
        </button>
      )
  );

  // Wenn die Kategorie angeklickt wird,
  // werden entweder alle Zutaten in der Kategorie angezeigt,
  // falls sie vorher nicht angezeigt worden sind oder
  // es werden nur noch die vom Nutzer ausgewählten Zutaten angezeigt.
  function handleCategoryClick() {
    const newVisibleIngredients = Array(choiceOfIngredients.length).fill(
      !listIsShown
    );
    for (let i = 0; i < choiceOfIngredients.length; i++) {
      if (ingredientIsSelected[i]) {
        newVisibleIngredients[i] = true;
      }
    }
    setVisibleIngredients(newVisibleIngredients);
    setListIsShown((prevListIsShown) => !prevListIsShown);
  }

  function handleIngredientClick(index) {
    // Erstellt eine Kopie des Arrays ingredientIsSelected.
    const newIngredientIsSelected = [...ingredientIsSelected];
    // Wenn eine Zutat angeklickt wird, wird sie entweder ausgewählt,
    // wenn sie noch nicht ausgewählt war, oder sie wird abgewählt,
    // wenn sie schon ausgewählt war.
    ingredientIsSelected[index]
      ? (newIngredientIsSelected[index] = false)
      : (newIngredientIsSelected[index] = true);
    // Die Liste der Zutaten wird im Elternteil aktualisiert
    ingredientIsSelected[index]
      ? props.onIngredientDeselected(choiceOfIngredients[index])
      : props.onIngredientSelected(choiceOfIngredients[index]);
    setIngredientIsSelected(newIngredientIsSelected);
  }

  return (
    <div className="ingredient-sub-group container">
      <button className="category" onClick={handleCategoryClick}>
        {ingredientsCategory}
      </button>
      {ingredients}
    </div>
  );
}

export default IngredientGroup;
