import React from 'react';
import { AiFillDelete } from 'react-icons/ai';

const AmountsAndIngredientsFields = ({ recipe, setRecipe }) => {
  const handleAmountChange = (value, index) => {
    const newAmounts = [...recipe.amounts];
    newAmounts[index] = value;
    setRecipe({ ...recipe, amounts: newAmounts });
  };

  const handleIngredientChange = (value, index) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = value;
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const handleDeleteIngredient = (index) => {
    const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
    const newAmounts = recipe.amounts.filter((_, i) => i !== index);
    setRecipe({ ...recipe, amounts: newAmounts, ingredients: newIngredients });
  };

  const amountsAndIngredientsFields = (
    <div className='amounts-and-ingredients-fields'>
      <p>Zutaten pro Person</p>
      <table>
        <tbody>
          {recipe.ingredients.map((_, index) => (
            <tr key={index}>
              <td>
                <input
                  type='text'
                  value={recipe.amounts[index]}
                  onChange={(e) => handleAmountChange(e.target.value, index)}
                  className='enter-amounts-fields'
                />
              </td>
              <td className='left'>
                <input
                  type='text'
                  value={recipe.ingredients[index]}
                  onChange={(e) =>
                    handleIngredientChange(e.target.value, index)
                  }
                  className='enter-ingredients-fields'
                />
              </td>
              <td>
                <AiFillDelete
                  className='delete-button'
                  onClick={(e) => handleDeleteIngredient(index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return amountsAndIngredientsFields;
}

export default AmountsAndIngredientsFields;
