import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const AddIngredientButton = ({ buttonClass, onAddIngredient }) => {
  const addIngredientButton = (
    <button className={buttonClass} onClick={onAddIngredient} style={{fontSize: '17px'}}>
      <FontAwesomeIcon icon={faPlus} /> Zutat
    </button>
  );

  return addIngredientButton;
}

export default AddIngredientButton;
