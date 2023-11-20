import React from "react";

const AddIngredientButton = ({ buttonClass, buttonText, onAddIngredient }) => {
  const addIngredientButton = (
    <button className={buttonClass} onClick={onAddIngredient}>
      {buttonText}
    </button>
  );

  return addIngredientButton;
}

export default AddIngredientButton;
