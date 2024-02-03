import React, { useState, useEffect } from "react";
import useRecipeStore from "../stores/recipeStore";
import Fuse from "fuse.js";
import RecipeCard from "../components/RecipeCard";

const Search = () => {
  const { recipes, searchTerm } = useRecipeStore();
  const [contentSearchField, setContentSearchField] = useState(searchTerm);
  const [recipesFound, setRecipesFound] = useState([]);
  const fuseOptions = {
    isCaseSentitive: false,
    threshold: 0.2,
    keys: ["keywords", "name"],
  };
  const searcher = new Fuse(recipes, fuseOptions);

  // When the component is mounted, the search is performed with the searchTerm.
  // If the searchTerm is empty, all recipes are shown.
  useEffect(() => {
    setRecipesFound(searcher.search(searchTerm).map((e) => e.item));
    if (searchTerm === "") setRecipesFound(recipes);
  }, []);

  // When the search button is clicked, the search is performed and the searchTerm
  // is saved in the store so that when the component is mounted again, the last search
  // is automatically shown.
  const search = () => {
    setRecipesFound(searcher.search(contentSearchField).map((e) => e.item));
    useRecipeStore.setState({ searchTerm: contentSearchField });
  };

  return (
    <div className="container keyword-search">
      <span>
        <input
          type="text"
          onChange={(event) => setContentSearchField(event.target.value)}
          value={contentSearchField}
          id="search-field"
        />
        <button onClick={() => search()}>Suchen</button>
      </span>

      <div className="container-flex-wrap">
        {recipesFound &&
          recipesFound.map((recipe, index) => (
            <RecipeCard
              recipe={recipe}
              key={index}
              onClick={() => useRecipeStore.setState({ currentRecipe: recipe })}
            />
          ))}
      </div>

      {recipesFound.length === 0 && (
        <div>
          <p className="center">Keine Rezepte gefunden</p>
        </div>
      )}
    </div>
  );
};

export default Search;
