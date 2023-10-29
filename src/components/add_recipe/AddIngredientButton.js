import React from "react";

function AddIngredientButton({ buttonClass, buttonText, onAddIngredient }) {
  const addIngredientButton = (
    <button className={buttonClass} onClick={onAddIngredient}>
      {buttonText}
    </button>
  );

  return addIngredientButton;
}

export default AddIngredientButton;
