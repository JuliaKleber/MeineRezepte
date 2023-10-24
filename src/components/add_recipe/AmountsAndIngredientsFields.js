import React from "react";
import { AiFillDelete } from "react-icons/ai";

function AmountsAndIngredientsFields({
  amounts,
  ingredients,
  onAmountChange,
  onIngredientChange,
  onDeleteIngredient
}) {

  const amountsAndIngredientsFields = (
    <div>
      <p>Zutaten pro Person</p>
      <table>
        <tbody>
          {ingredients.map((ingredient, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={amounts[index]}
                  onChange={(e) => onAmountChange(e.target.value, index)}
                  className="enter-amounts-fields"
                />
              </td>
              <td className="left">
                <input
                  type="text"
                  value={ingredients[index]}
                  onChange={(e) =>
                    onIngredientChange(e.target.value, index)
                  }
                  className="enter-ingredients-fields"
                />
              </td>
              <td>
                <AiFillDelete
                  className="delete-button"
                  onClick={(e) => onDeleteIngredient(index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return amountsAndIngredientsFields
}

export default AmountsAndIngredientsFields;
