import React, { useState, useEffect } from "react";

// Die Rezepte des aktuellen Monats werden angezeigt.
const RecipesOfMonth = ({ recipes, onRecipeSelection }) => {
  const [recipesOfMonth, setRecipesOfMonth] = useState([]);
  const [header, setHeader] = useState("");
  const options = { month: "long" };
  const currentMonth = new Intl.DateTimeFormat("de-DE", options).format(new Date()) || 'undefined';

  // Die Rezepte des aktuellen Monats werden gefiltert.
  const filterRecipesByMonth = () => {
    if (currentMonth === 'undefined') {
      setRecipesOfMonth([recipes]);
      setHeader("Meine Rezepte");
    }
    else {
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
    onRecipeSelection(recipe, currentMonth);
  };

  return (
    <div class="container">
      <h2>{header}</h2>
      <ul class="container">
        {recipesOfMonth.map((recipe, index) => (
          <li key={index}>
            <button
              className="reverse-colored-button search-results"
              onClick={() => handleRecipeSelection(recipe)}
            >
              { recipe.recipeName }
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipesOfMonth;
