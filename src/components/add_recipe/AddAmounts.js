import React from "react";
import RecipeNameField from "./RecipeNameField";
import AmountsAndIngredientsFields from "./AmountsAndIngredientsFields";
import AddIngredientButton from "./AddIngredientButton";
import DescriptionField from "./DescriptionField";

function AddRecipeNameAndAmountAndDescriptions({
  recipe,
  recipeNameFieldRef,
  onSaveRecipeName,
  onSaveAmounts,
  onSaveIngredients,
  onSaveDescription,
}) {

  const handleRecipeNameChange = (updatedRecipeName) => {
    onSaveRecipeName(updatedRecipeName);
  };

  const handleAmountChange = (value, index) => {
    let newAmounts = [...recipe.amounts];
    newAmounts[index] = value;
    onSaveAmounts(newAmounts);
  };

  const handleIngredientChange = (value, index) => {
    let newIngredients = [...recipe.ingredients];
    newIngredients[index] = value;
    onSaveIngredients(newIngredients);
  };

  const handleDeleteIngredient = (index) => {
    const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
    const newAmounts = recipe.amounts.filter((_, i) => i !== index);
    onSaveIngredients(newIngredients);
    onSaveAmounts(newAmounts);
  };

  const handleAddIngredient = () => {
    let newAmounts = [...recipe.amounts];
    let newIngredients = [...recipe.ingredients];
    newAmounts.push("");
    newIngredients.push("");
    onSaveAmounts(newAmounts);
    onSaveIngredients(newIngredients);
  };

  const handleDescriptionChange = (updatedDescription) => {
    onSaveDescription(updatedDescription);
  };

  return (
    <div className="container">
      <RecipeNameField
        recipeName={recipe.recipeName}
        onRecipeNameChange={handleRecipeNameChange}
        recipeNameFieldRef={recipeNameFieldRef}
      />
      <AmountsAndIngredientsFields
        amounts={recipe.amounts}
        ingredients={recipe.ingredients}
        onAmountChange={handleAmountChange}
        onIngredientChange={handleIngredientChange}
        onDeleteIngredient={handleDeleteIngredient}
      />
      <AddIngredientButton buttonClass="white" buttonText="Zutat hinzufügen" onAddIngredient={handleAddIngredient} />
      <DescriptionField
        description={recipe.description}
        onDescriptionChange={handleDescriptionChange}
      />
    </div>
  );
}

export default AddRecipeNameAndAmountAndDescriptions;
