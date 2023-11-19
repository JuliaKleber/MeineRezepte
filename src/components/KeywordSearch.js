import React, { useState, useEffect } from "react";

function KeywordSearch(props) {
  const { onRecipeSelection, searchTerm, recipes } = props;
  const [contentSearchField, setContentSearchField] = useState(searchTerm);
  const [recipesFound, setRecipesFound] = useState([]);
  const [output, setOutput] = useState("");
  const [searchResultsAreShown, setSearchResultsAreShown] = useState(false);

  // Wenn die Komponente montiert wird,
  // wird automatisch die Suche mit "searchTerm" durchgeführt,
  // falls dieser nicht leer ist.
  useEffect(() => {
    if (searchTerm !== "") {
      setContentSearchField(searchTerm);
      handleSearch();
    }
  }, [searchTerm]);

  // Die Benutzereingabe im Suchfeld wird ausgelesen.
  const handleSearchFieldInput = (event) => {
    setContentSearchField(event.target.value);
  };

  // Die Schlagwörter und der Rezeptname werden auf
  // Übereinstimmungen mit den Suchbegriffen untersucht
  const handleSearch = () => {
    setOutput("Keine Rezepte gefunden");
    // Fehlermeldung, wenn ",", "+", "&" enthalten sind.
    if (
      contentSearchField.includes(",") ||
      contentSearchField.includes("+") ||
      contentSearchField.includes("&")
    ) {
      setOutput("Als Verknüpfungen sind nur 'und' oder 'oder' erlaubt.");
      // Die Suche kann durch die Eingabe löschen gelöscht werden.
    } else if (contentSearchField === "löschen") {
      setRecipesFound([]);
      setContentSearchField("");
      setOutput("");
      // Zeigt alle Rezepte an.
    } else if (contentSearchField === "" || contentSearchField === "*") {
      setRecipesFound([...recipes]);
    }
    // Zeigt alle Rezepte an, in deren Schlagwörtern
    // mindestens eins der eingegebenen Wörter enthalten ist.
    else if (contentSearchField.includes("oder")) {
      const searchWords = contentSearchField
        .split("oder")
        .map((word) => word.trim());
      const newRecipesFound = [];
      searchWords.forEach((word) => {
        recipes.forEach((recipe) => {
          if (recipe.keywords.includes(word)) {
            newRecipesFound.push(recipe);
          }
          if (recipe.recipeName.toLowerCase().includes(contentSearchField)) {
            newRecipesFound.push(recipe);
          }
        });
      });
      const setOfRecipes = new Set(newRecipesFound);
      setRecipesFound([...setOfRecipes]);
    }
    // Zeigt nur Rezepte an, wenn alle Wörter aus der Suche
    // in den Schlagwörtern enthalten sind.
    else if (contentSearchField.includes("und")) {
      const searchWords = contentSearchField
        .split("und")
        .map((word) => word.trim());
      const newRecipesFound = [];
      recipes.forEach((recipe) => {
        let recipeSelected = true;
        searchWords.forEach((word) => {
          if (!recipe.keywords.includes(word)) {
            recipeSelected = false;
          }
        });
        if (recipeSelected) {newRecipesFound.push(recipe)};
      });
      setRecipesFound(newRecipesFound);
    } else {
      const newRecipesFound = [];
      recipes.forEach((recipe) => {
        if (recipe.keywords.includes(contentSearchField))
          {newRecipesFound.push(recipe)};
        if (recipe.recipeName.toLowerCase().includes(contentSearchField))
          {newRecipesFound.push(recipe)};
      });
      const recipesSet = new Set(newRecipesFound);
      setRecipesFound([...recipesSet]);
    }
    setSearchResultsAreShown(true);
  };

  // Die Anzeige des ausgewählten Rezepts wird vorbereitet.
  const handleRecipeSelection = (recipe) => {
    onRecipeSelection(recipe, contentSearchField);
  };

  return (
    <div className="container">
      <span>
        <input
          type="text"
          onChange={handleSearchFieldInput}
          value={contentSearchField}
          id="search-field"
        />
        <button onClick={handleSearch}>Suchen</button>
      </span>
      {searchResultsAreShown &&
        recipesFound &&
        recipesFound.map((recipe, index) => (
          <div key={index}>
            <button
              className="white"
              onClick={() => handleRecipeSelection(recipe)}
            >
              {recipe.recipeName}
            </button>
          </div>
        ))}
      {searchResultsAreShown && recipesFound.length === 0 && (
        <div>
          <p className="center">{output}</p>
        </div>
      )}
    </div>
  );
}

export default KeywordSearch;