import React, { useState, useEffect } from "react";

function IngredientGroup(props) {
  // Überbegriff der Kategorie von Zutaten
  const ingredientsCategory = props.ingredientsCategory;
  // Zutaten aus der Kategorie
  const ingredients = props.ingredients;
  // true, wenn alle Zutaten der Kategorie angezeigt werden.
  // false, wenn nur die markierten Zutaten der Kategorie angezeigt werden.
  const [listIsShown, setListIsShown] = useState(false);
  // Wenn eine Zutat aus der Kategorie ausgewählt wurde, wird der Name der Kategorie gekennzeichnet.
  // const [categoryIsSelected, setCategoryIsSelected] = useState(false);
  // Speichert ab, welche Zutat aus der Kategorie vom Nutzer angeklickt wurde.
  const [ingredientIsSelected, setIngredientIsSelected] = useState(
    Array(ingredients.length).fill(false)
  );
  const [visibleIngredients, setVisibleIngredients] = useState(
    Array(ingredients.length).fill(false)
  );

  // Wenn die Kategorie angeklickt wird,
  // werden entweder alle Zutaten in der Kategorie angezeigt,
  // falls sie vorher nicht angezeigt worden sind oder
  // es werden nur noch die vom Nutzer ausgewählten Zutaten angezeigt.
  function handleCategoryClick() {
    let newVisibleIngredients = Array(ingredients.length).fill(!listIsShown);
    for (let i = 0; i < ingredients.length; i++) {
      ingredientIsSelected[i] && (newVisibleIngredients[i] = true);
    }
    setVisibleIngredients(newVisibleIngredients);
    setListIsShown((prevListIsShown) => !prevListIsShown);
  }

  // Wenn eine Zutat angeklickt wird, wird sie entweder ausgewählt,
  // wenn sie noch nicht ausgewählt war, oder sie wird abgewählt,
  // wenn sie schon ausgewählt war.
  function handleIngredientClick(index) {
    // Erstellt eine Kopie des Arrays ingredientIsSelected.
    const newIngredientIsSelected = [...ingredientIsSelected];
    // siehe oben (über function)
    ingredientIsSelected[index]
      ? (newIngredientIsSelected[index] = false)
      : (newIngredientIsSelected[index] = true);
    /*
    // Wenn eine Zutat aus der Kategorie ausgewählt wurde,
    // wird der Name der Kategorie gekennzeichnet.
    setCategoryIsSelected(false);
    for (let i = 0; i <= newIngredientIsSelected.length; i++) {
      newIngredientIsSelected[i] && setCategoryIsSelected(true);
    }*/
    setIngredientIsSelected(newIngredientIsSelected);
  }

  // gibt, wenn der "fertig"-Button im Elternteil geklickt wird,
  // an Elternteil weiter, welche Zutaten der Nutzer aus der Kategorie gewählt hat.
  useEffect(() => {
    if (props.allIngredientsChosen) {
      let chosenIngredients = [];
      for (let i = 0; i < ingredientIsSelected.length; i++) {
        ingredientIsSelected[i] && chosenIngredients.push(ingredients[i]);
      }
      console.log("useEffect" + chosenIngredients);
      props.onIngredientsChosen(chosenIngredients);
    }
  }, [props.allIngredientsChosen, ingredientIsSelected, ingredients, props]);

  return (
    <div className="ingredient-sub-group">
      <input
        className="category"
        type="button"
        value={ingredientsCategory}
        onClick={handleCategoryClick}
      />
      {ingredients.map(
        (ingredient, index) =>
          visibleIngredients[index] && (
            <input
              type="button"
              value={ingredient}
              key={ingredient}
              onClick={() => handleIngredientClick(index)}
              className={ingredientIsSelected[index] ? "is-chosen" : ""}
            />
          )
      )}
    </div>
  );
}

export default IngredientGroup;
