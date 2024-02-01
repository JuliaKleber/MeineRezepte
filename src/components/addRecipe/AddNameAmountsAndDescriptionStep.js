import React from "react";
import RecipeNameField from "./RecipeNameField";
import AmountsAndIngredientsFields from "./AmountsAndIngredientsFields";
import AddIngredientButton from "./AddIngredientButton";
import DescriptionField from "./DescriptionField";
import ImageUpload from "../shared/ImageUpload";

const AddNameAmountsAndDescriptionStep = ({
  recipe,
  setRecipe,
  recipeNameFieldRef,
  uploadedFile,
  setUploadedFile,
  recipeNameFieldStyle,
  validationOutput,
}) => {
  // A new ingredient with the name '' and the amount '' is added to the recipe.
  const handleAddIngredient = () => {
    setRecipe({
      ...recipe,
      amounts: [...recipe.amounts, ""],
      ingredients: [...recipe.ingredients, ""],
    });
  };

  return (
    <div className="container primary-color">
      <RecipeNameField
        recipe={recipe}
        setRecipe={setRecipe}
        recipeNameFieldRef={recipeNameFieldRef}
        recipeNameFieldStyle={recipeNameFieldStyle}
        validationOutput={validationOutput}
      />
      <AmountsAndIngredientsFields recipe={recipe} setRecipe={setRecipe} />
      <AddIngredientButton
        buttonClass="reverse-colored-button"
        onAddIngredient={handleAddIngredient}
      />
      <DescriptionField recipe={recipe} setRecipe={setRecipe} />
      <ImageUpload
        uploadedFile={uploadedFile}
        setUploadedFile={setUploadedFile}
        text="Klicke, um eine Bilddatei auszuwählen oder ziehe die Datei hierhin."
      />
    </div>
  );
};

export default AddNameAmountsAndDescriptionStep;
