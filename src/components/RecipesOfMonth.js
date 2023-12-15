import React, { useState, useEffect } from "react";

// Die Rezepte des aktuellen Monats werden angezeigt.
const RecipesOfMonth = ({ recipes, onRecipeSelection }) => {
  const [recipesOfMonth, setRecipesOfMonth] = useState([]);
  const monthNumberToName = {
    1: "Januar",
    2: "Februar",
    3: "März",
    4: "April",
    5: "Mai",
    6: "Juni",
    7: "Juli",
    8: "August",
    9: "September",
    10: "Oktober",
    11: "November",
    12: "Dezember",
  };
  const currentMonth = monthNumberToName[new Date().getMonth()] || "März";

  // Die Rezepte des aktuellen Monats werden gefiltert.
  const filterRecipesByMonth = () => {
    const recipesOfMonth = recipes.filter((recipe) => {
      return recipe.keywords.includes(currentMonth);
    });
    setRecipesOfMonth(recipesOfMonth);
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
    <div>
      <h2>Rezepte des Monats</h2>
      <ul>
        {recipesOfMonth.map((recipe, index) => (
          <li key={index}>
            <button
              className="reverse-colored-button search-results"
              onClick={() => handleRecipeSelection(recipe)}
            >
              {recipe.recipeName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipesOfMonth;
