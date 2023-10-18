import React from "react";
import { AiFillDelete } from "react-icons/ai";

function AmountsAndIngredientsFields({
  amounts,
  updatedIngredients,
  onHandleAmountChange,
  onHandleIngredientChange,
  onHandleDeleteIngredient
}) {

  const amountsAndIngredientsFields = (
    <div>
      <p>Zutaten pro Person</p>
      <table>
        <tbody>
          {updatedIngredients.map((ingredient, index) => (
            <tr key={`${ingredient}_${index}`}>
              <td>
                <input
                  type="text"
                  value={amounts[index]}
                  onChange={(e) => onHandleAmountChange(e.target.value, index)}
                  className="enter-amount-fields"
                />
              </td>
              <td className="left">
                <input
                  type="text"
                  value={updatedIngredients[index]}
                  onChange={(e) =>
                    onHandleIngredientChange(e.target.value, index)
                  }
                  className="enter-amount-fields"
                />
              </td>
              <td>
                <AiFillDelete
                  className="delete-button"
                  onClick={(e) => onHandleDeleteIngredient(index)}
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
