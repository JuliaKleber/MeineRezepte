import React, { useState } from "react";
import RecipeNameField from "./RecipeNameField";
import AmountsAndIngredientsFields from "./AmountsAndIngredientsFields";
import AddIngredientButton from "./AddIngredientButton";
import DescriptionField from "./DescriptionField";
import Navigation from "./Navigation";

function AddAmounts({
  ingredients,
  onChangeStep,
  onSaveRecipeName,
  onSaveAmounts,
  //onDescription,
}) {
  const [recipeName, setRecipeName] = useState("");
  const [amounts, setAmounts] = useState(Array(ingredients.length).fill(""));
  const [updatedIngredients, setUpdatedIngredients] = useState(ingredients);
  const [description, setDescription] = useState("");

  const onRecipeNameChange = (updatedRecipeName) => {
    setRecipeName(updatedRecipeName);
  };

  const onHandleAmountChange = (value, index) => {
    let newAmounts = [...amounts];
    newAmounts[index] = value;
    setAmounts(newAmounts);
  };

  const onHandleIngredientChange = (value, index) => {
    let newIngredients = [...updatedIngredients];
    newIngredients[index] = value;
    setUpdatedIngredients(newIngredients);
  };

  const onHandleDeleteIngredient = (index) => {
    let newIngredients = [...updatedIngredients];
    newIngredients.splice(index, 1);
    setUpdatedIngredients(newIngredients);
    let newAmounts = [...amounts];
    newAmounts.splice(index, 1);
    setAmounts(newAmounts);
  };

  const onHandleAddIngredient = () => {
    let newAmounts = [...amounts];
    let newIngredients = [...updatedIngredients];
    newAmounts.push("");
    newIngredients.push("");
    setAmounts(newAmounts);
    setUpdatedIngredients(newIngredients);
  };

  const onDescriptionChange = (updatedDescription) => {
    setDescription(updatedDescription);
  };

  const navigation = (
    <span>
      <button onClick={() => onChangeStep("ingredients")}>zurück</button>
      <button
        onClick={() => {
          onChangeStep("keywords");
          onSaveRecipeName(recipeName);
          onSaveAmounts(amounts);
          //onDescription(description);
        }}
      >
        weiter
      </button>
    </span>
  );

  return (
    <div className="container">
      <RecipeNameField
        recipeName={recipeName}
        onRecipeNameChange={onRecipeNameChange}
      />
      <AmountsAndIngredientsFields
        amounts={amounts}
        updatedIngredients={updatedIngredients}
        onHandleAmountChange={onHandleAmountChange}
        onHandleIngredientChange={onHandleIngredientChange}
        onHandleDeleteIngredient={onHandleDeleteIngredient}
      />
      <AddIngredientButton onHandleAddIngredient={onHandleAddIngredient} />
      <DescriptionField
        description={description}
        onDescriptionChange={onDescriptionChange}
      />
      {navigation}
    </div>
  );
}

export default AddAmounts;
