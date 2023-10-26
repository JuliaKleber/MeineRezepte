import React from "react";
import RecipeNameField from "./RecipeNameField";
import AmountsAndIngredientsFields from "./AmountsAndIngredientsFields";
import AddIngredientButton from "./AddIngredientButton";
import DescriptionField from "./DescriptionField";

function AddRecipeNameAndAmountAndDescriptions({
  recipe,
  setRecipe,
  recipeNameFieldRef,
}) {

  const handleRecipeNameChange = (updatedRecipeName) => {
    setRecipe({...recipe, recipeName: updatedRecipeName});
  };

  const handleAmountChange = (value, index) => {
    const newAmounts = [...recipe.amounts];
    newAmounts[index] = value;
    setRecipe({...recipe, amounts: newAmounts});
  };

  const handleIngredientChange = (value, index) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = value;
    setRecipe({...recipe, ingredients: newIngredients});
  };

  const handleDeleteIngredient = (index) => {
    const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
    const newAmounts = recipe.amounts.filter((_, i) => i !== index);
    setRecipe({...recipe, amounts: newAmounts, ingredients: newIngredients});
  };

  const handleAddIngredient = () => {
    const newAmounts = [...recipe.amounts];
    const newIngredients = [...recipe.ingredients];
    newAmounts.push("");
    newIngredients.push("");
    setRecipe({...recipe, amounts: newAmounts, ingredients: newIngredients});
  };

  const handleDescriptionChange = (updatedDescription) => {
    setRecipe({...recipe, description: updatedDescription});
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
