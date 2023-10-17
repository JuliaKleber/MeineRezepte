import React, { useState } from "react";
import deleteSymbol from "../../pictures/delete.jpeg";

function AddAmounts({
  ingredients,
  onChangeStep,
  onSaveRecipeName,
  onSaveAmounts,
  onDescription,
}) {
  const [recipeName, setRecipeName] = useState("");
  const [amounts, setAmounts] = useState(Array(ingredients.length).fill(""));
  const [updatedIngredients, setUpdatedIngredients] = useState(ingredients);
  const [description, setDescription] = useState("");
  const [selectedIngredientsNumber, setSelectedIngredientsNumber] = useState(
    ingredients.length
  );

  const recipeNameField = (
    <div className="container">
      Name des Rezepts
      <br />
      <input
        type="text"
        value={recipeName}
        onChange={(e) => setRecipeName(e.target.value)}
      />
    </div>
  );

  const handleAmountChange = (value, index) => {
    let newAmounts = [...amounts];
    newAmounts[index] = value;
    setAmounts(newAmounts);
  };

  const handleIngredientChange = (value, index) => {
    let newIngredients = [...updatedIngredients];
    newIngredients[index] = value;
    setUpdatedIngredients(newIngredients);
  };

  const handleDeleteIngredient = (index) => {
    let newIngredients = [...updatedIngredients];
    newIngredients.splice(index, 1);
    setUpdatedIngredients(newIngredients);
    let newAmounts = [...amounts];
    newAmounts.splice(index, 1);
    setAmounts(newAmounts);
    index < selectedIngredientsNumber &&
      setSelectedIngredientsNumber(selectedIngredientsNumber - 1);
  };

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
                  onChange={(e) => handleAmountChange(e.target.value, index)}
                  className="enter-amount-fields"
                />
              </td>
              <td className="left">
                {index < selectedIngredientsNumber ? (
                  ingredient
                ) : (
                  <input
                    type="text"
                    value={updatedIngredients[index]}
                    onChange={(e) =>
                      handleIngredientChange(e.target.value, index)
                    }
                    className="enter-amount-fields"
                  />
                )}
              </td>
              <td>
                <button
                  onClick={(e) => handleDeleteIngredient(index)}
                  className="delete-button"
                >
                  <img
                    src={deleteSymbol}
                    alt="Zutat löschen"
                    className="delete-symbol"
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const handleAddIngredient = () => {
    let newAmounts = [...amounts];
    let newIngredients = [...updatedIngredients];
    newAmounts.push("");
    newIngredients.push("");
    setAmounts(newAmounts);
    setUpdatedIngredients(newIngredients);
  };

  const addIngredientButton = (
    <button
      className="add-recipe"
      id="add-ingredient-button"
      onClick={handleAddIngredient}
    >
      Zutat hinzufügen
    </button>
  );

  const descriptionField = (
    <div className="container">
      <p className="center">Zubereitung</p>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        id="description-entry-field"
      ></textarea>
    </div>
  );

  const navigation = (
    <span>
      <button onClick={() => onChangeStep("ingredients")}>zurück</button>
      <button
        onClick={() => {
          onChangeStep("keywords");
          onSaveRecipeName(recipeName);
          onSaveAmounts(amounts);
          onDescription(description);
        }}
      >
        weiter
      </button>
    </span>
  );

  return (
    <div className="container">
      {recipeNameField}
      {amountsAndIngredientsFields}
      {addIngredientButton}
      {descriptionField}
      {navigation}
    </div>
  );
}

export default AddAmounts;
