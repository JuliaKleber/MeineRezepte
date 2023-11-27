import React, { useState } from 'react';

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
      ? onRemoveIngredient(choiceOfIngredients[index])
      : onAddIngredient(choiceOfIngredients[index]);
  };

  // Zutat wird der Liste der Zutaten hinzugefügt.
  // Die Zutat wird ebenso zu der Liste der Schlagwörter hinzugefügt,
  // damit das Rezept aufgrund der Zutaten gefunden werden kann
  const onAddIngredient = (ingredient) => {
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, ingredient],
      keywords: [...recipe.keywords, ingredient],
    });
  };

  // Zutat wird aus der Liste der Zutaten und Keywords entfernt
  const onRemoveIngredient = (ingredient) => {
    const updatedIngredients = recipe.ingredients.filter(
      (item) => item !== ingredient
    );
    const updatedKeywords = recipe.keywords.filter(
      (item) => item !== ingredient
    );
    setRecipe({
      ...recipe,
      ingredients: updatedIngredients,
      keywords: updatedKeywords,
    });
  };

  const ingredients = choiceOfIngredients.map(
    (ingredient, index) =>
      (areIngredientsSelected[index] || isCompleteListShown) && (
        <button
          key={ingredient}
          onClick={() => handleIngredientClick(index)}
          className={
            areIngredientsSelected[index] ? 'is-chosen' : 'is-not-chosen white-black-button'
          }
        >
          {ingredient}
        </button>
      )
  );

  return (
    <div className='ingredient-group container'>
      <button
        className='ingredient-category-button white-black-button'
        onClick={handleCategoryClick}
      >
        {ingredientsCategory}
      </button>
      {ingredients}
    </div>
  );
}

export default IngredientGroup;
