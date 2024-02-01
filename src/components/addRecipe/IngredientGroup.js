import React, { useState } from "react";

const IngredientGroup = ({
  recipe,
  setRecipe,
  ingredientsCategory,
  choiceOfIngredients,
}) => {
  const [isCompleteListShown, setIsCompleteListShown] = useState(false);

  const areIngredientsSelected = choiceOfIngredients.map((ingredient) =>
    recipe.ingredients.includes(ingredient)
  );

  const handleCategoryClick = () => {
    setIsCompleteListShown(
      (prevIsCompleteListShown) => !prevIsCompleteListShown
    );
  };

  const handleIngredientClick = (index) => {
    areIngredientsSelected[index]
      ? removeIngredient(choiceOfIngredients[index])
      : addIngredient(choiceOfIngredients[index]);
  };

  // Ingredient is added to the ingredients array and the keywords array of the recipe
  const addIngredient = (ingredient) => {
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, ingredient],
      keywords: [...recipe.keywords, ingredient],
    });
  };

  // Ingredient is removed from the ingredients array.
  // The ingredient is also removed from the keywords array.
  // If the amounts array is not empty, the corresponding amount is also removed.
  const removeIngredient = (ingredient) => {
    const index = recipe.ingredients.indexOf(ingredient);
    const updatedIngredients = recipe.ingredients.filter(
      (item) => item !== ingredient
    );
    const updatedKeywords = recipe.keywords.filter(
      (item) => item !== ingredient
    );
    const updatedAmounts = [...recipe.amounts];
    if (recipe.amounts.length > 0) updatedAmounts.splice(index, 1);
    setRecipe({
      ...recipe,
      amounts: updatedAmounts,
      ingredients: updatedIngredients,
      keywords: updatedKeywords,
    });
  };

  // If an ingredient has been selected by the user or if all ingredients of a
  // category are shown, the button which belongs to the the ingredient is shown
  const ingredients = choiceOfIngredients.map(
    (ingredient, index) =>
      (areIngredientsSelected[index] || isCompleteListShown) && (
        <button
          key={ingredient}
          onClick={() => handleIngredientClick(index)}
          className={
            areIngredientsSelected[index]
              ? "is-chosen"
              : "is-not-chosen white-black-button"
          }
        >
          {ingredient}
        </button>
      )
  );

  return (
    <div className="ingredient-group container">
      <button
        className="ingredient-category-button white-black-button"
        onClick={handleCategoryClick}
      >
        {ingredientsCategory}
      </button>
      {ingredients}
    </div>
  );
};

export default IngredientGroup;
