import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";

export const loader = async () => {
  try {
    const response = await fetch("http://localhost:3001/loadRecipes");
    if (response.status === 200) {
      const data = await response.json();
      return { recipes: data };
    } else {
      console.error("Fehler beim Abrufen der Daten");
    }
  } catch (error) {
    console.error("Fehler beim Senden der Anfrage:", error);
  }
};

// Die Rezepte des aktuellen Monats werden angezeigt.
const RecipesOfMonth = ({ onRecipeSelection }) => {
  const { recipes } = useLoaderData();
  const [recipesOfMonth, setRecipesOfMonth] = useState([]);
  const [header, setHeader] = useState("");
  const currentMonth =
    new Intl.DateTimeFormat("de-DE", { month: "long" }).format(new Date()) ||
    "undefined";

  // Die Rezepte des aktuellen Monats werden gefiltert.
  const filterRecipesByMonth = () => {
    if (currentMonth === "undefined") {
      setRecipesOfMonth([recipes]);
      setHeader("Meine Rezepte");
    } else {
      const recipesOfMonth = recipes.filter((recipe) => {
        return recipe.keywords.includes(currentMonth);
      });
      setRecipesOfMonth(recipesOfMonth);
      setHeader("Rezepte des Monats");
    }
  };

  // Die Rezepte des aktuellen Monats werden gefiltert, sobald die Rezepte geladen wurden.
  useEffect(() => {
    filterRecipesByMonth();
  }, [recipes]);

  // Das selektierte Rezept wird an die App-Komponente weitergegeben.
  const handleRecipeSelection = (recipe) => {
    onRecipeSelection(recipe, "fromHome");
  };

  return (
    <div className="container">
      <h2>{header}</h2>
      <div className="container-flex-wrap">
        {recipesOfMonth.map((recipe, index) => (
          <RecipeCard
            recipe={recipe}
            onRecipeSelection={handleRecipeSelection}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default RecipesOfMonth;
