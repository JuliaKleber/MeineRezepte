import React from "react";
import { useLoaderData } from "react-router-dom";
import { getRecipes } from "../AJAX/apiCalls";
import RecipeCard from "../components/RecipeCard";

// The recipes are loaded and filtered,
// so that only the recipes with ingredients which are in season are shown
export const loader = async () => {
  const currentMonth =
    new Intl.DateTimeFormat("de-DE", { month: "long" }).format(new Date()) ||
    "undefined";
  let recipes = await getRecipes();
  if (currentMonth !== "undefined") {
    recipes = recipes.filter((recipe) => {
      return recipe.keywords.includes(currentMonth);
    });
  }
  return { recipes };
};

// Die Rezepte des aktuellen Monats werden angezeigt.
const RecipesOfMonth = () => {
  const { recipes, isLoading } = useLoaderData();
  const currentMonth =
    new Intl.DateTimeFormat("de-DE", { month: "long" }).format(new Date()) ||
    "undefined";
  const header =
    currentMonth !== "undefined" ? "Rezepte des Monats" : "Meine Rezepte";

  return (
    <div className="container">
      {isLoading ? (
        <p>isLoading...</p>
      ) : (
        <>
          <h2>{header}</h2>
          <div className="container-flex-wrap">
            {recipes.map((recipe, index) => (
              <RecipeCard recipe={recipe} key={index} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RecipesOfMonth;
