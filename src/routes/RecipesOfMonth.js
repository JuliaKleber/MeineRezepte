import React from "react";
import useRecipeStore from "../stores/recipeStore";
import RecipeCard from "../components/RecipeCard";

// The recipes that are in season are shown.
const RecipesOfMonth = () => {
  const { recipes, message } = useRecipeStore();
  const currentMonth =
    new Intl.DateTimeFormat("de-DE", { month: "long" }).format(new Date()) ||
    "undefined";
  const header =
    currentMonth !== "undefined" ? "Rezepte des Monats" : "Meine Rezepte";
  let recipesOfMonth = recipes;

  if (currentMonth !== "undefined") {
    recipesOfMonth = recipes.filter((recipe) => {
      return recipe.keywords.includes(currentMonth);
    });
  }
  
  return (
    <div className="container">
      <div className="message">{message}</div>
      <h2>{header}</h2>
      <div className="container-flex-wrap">
        {recipesOfMonth.map((recipe, index) => (
          <RecipeCard recipe={recipe} key={index} />
        ))}
      </div>
    </div>
  );
};

export default RecipesOfMonth;
