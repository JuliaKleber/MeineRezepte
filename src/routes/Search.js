import React, { useState, useEffect, useMemo } from "react";
import useRecipeStore from "../stores/recipeStore";
import Fuse from "fuse.js";
import RecipeCard from "../components/RecipeCard";

const Search = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const setCurrentRecipe = useRecipeStore((state) => state.setCurrentRecipe);
  const searchTerm = useRecipeStore((state) => state.searchTerm);
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);
  const [contentSearchField, setContentSearchField] = useState(searchTerm);
  const [recipesFound, setRecipesFound] = useState([]);
  
  const searcher = useMemo(() => {
    const fuseOptions = {
      threshold: 0.2,
      useExtendedSearch: true,
      keys: ["keywords", "name", "description"],
    };
    return new Fuse(recipes, fuseOptions);
  }, [recipes]);

  // When the component is mounted, the search is performed with the searchTerm.
  // If the searchTerm is empty, all recipes are shown.
  useEffect(() => {
    searchTerm === ""
      ? setRecipesFound(recipes)
      : setRecipesFound(
          searcher.search(searchTerm).map((result) => result.item)
        );
  }, [recipes, searchTerm, searcher]);

  // When the search button is clicked, the search is performed and the searchTerm
  // is saved in the store so that when the component is mounted again, the last search
  // is automatically shown.
  const search = () => {
    setRecipesFound(searcher.search(contentSearchField).map((e) => e.item));
    setSearchTerm(contentSearchField);
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
              onClick={() => setCurrentRecipe(recipe)}
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
