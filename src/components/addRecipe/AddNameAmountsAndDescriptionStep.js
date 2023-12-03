import React from 'react';
import RecipeNameField from './RecipeNameField';
import AmountsAndIngredientsFields from './AmountsAndIngredientsFields';
import AddIngredientButton from './AddIngredientButton';
import DescriptionField from './DescriptionField';
import ImageUpload from './ImageUpload';

const AddNameAmountsAndDescriptionStep = ({
  recipe,
  setRecipe,
  recipeNameFieldRef,
}) => {
  const handleAddIngredient = () => {
    setRecipe({
      ...recipe,
      amounts: [...recipe.amounts, ''],
      ingredients: [...recipe.ingredients, ''],
    });
  };

  return (
    <div className='container'>
      <RecipeNameField
        recipe={recipe}
        setRecipe={setRecipe}
        recipeNameFieldRef={recipeNameFieldRef}
      />
      <AmountsAndIngredientsFields recipe={recipe} setRecipe={setRecipe} />
      <AddIngredientButton
        buttonClass='reverse-colored-button'
        onAddIngredient={handleAddIngredient}
      />
      <DescriptionField recipe={recipe} setRecipe={setRecipe} />
      <ImageUpload />
    </div>
  );
}

export default AddNameAmountsAndDescriptionStep;
