import React from "react";
import { AiFillDelete } from "react-icons/ai";

const AmountsAndIngredientsFields = ({ recipe, setRecipe }) => {
  // The amount of an ingredient is edited in the recipe object.
  const editAmount = (value, index) => {
    const newAmounts = [...recipe.amounts];
    newAmounts[index] = value;
    setRecipe({ ...recipe, amounts: newAmounts });
  };

  // The name of an ingredient is edited in the recipe object.
  const editIngredient = (value, index) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = value;
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  // An ingredient and its corresponding amount is deleted from the recipe
  const deleteIngredient = (index) => {
    const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
    const newAmounts = recipe.amounts.filter((_, i) => i !== index);
    setRecipe({ ...recipe, amounts: newAmounts, ingredients: newIngredients });
  };

  const numberOfPersonsLine = (
    <p>
      Anzahl Personen:
      <input
        type="text"
        value={recipe.numberOfPersons}
        onChange={(e) =>
          setRecipe({ ...recipe, numberOfPersons: e.target.value })
        }
        className="number-persons-field"
      />
    </p>
  );

  const amountsAndIngredientsTable = (
    <table>
      <tbody>
        {recipe.ingredients.map((_, index) => (
          <tr key={index}>
            <td>
              <input
                type="text"
                value={recipe.amounts[index]}
                onChange={(e) => editAmount(e.target.value, index)}
                className="enter-amounts-fields"
              />
            </td>
            <td className="align-left">
              <input
                type="text"
                value={recipe.ingredients[index]}
                onChange={(e) => editIngredient(e.target.value, index)}
                className="enter-ingredients-fields"
              />
            </td>
            <td>
              <AiFillDelete
                className="delete-button"
                onClick={(e) => deleteIngredient(index)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="amounts-and-ingredients-fields">
      {numberOfPersonsLine}
      <span>Zutaten</span>
      {amountsAndIngredientsTable}
    </div>
  );
};

export default AmountsAndIngredientsFields;
