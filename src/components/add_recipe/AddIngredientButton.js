import React from "react";

function AddIngredientButton({ onHandleAddIngredient }) {


  const addIngredientButton = (
    <button className="white-button" onClick={onHandleAddIngredient}>
      Zutat hinzufügen
    </button>
  );

  return addIngredientButton
}

export default AddIngredientButton;
