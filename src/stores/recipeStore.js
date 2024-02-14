import { create } from "zustand";
import { getRecipes, saveRecipes } from '../APICalls/APICalls'

const useRecipeStore = create((set) => ({
  recipes: [],
  currentRecipe: null,
  message: "",
  searchTerm: "",
  lastLocation: "/",
  loadRecipes: async () => {
    getRecipes();
  },
  addRecipe: async (recipes, recipe, file) => {
    const updatedRecipes = [...recipes, recipe];
    saveRecipes(updatedRecipes, "add", recipe, file);
  },
  updateRecipe: async (recipes, recipe, file, oldFileName) => {
    saveRecipes(recipes, "update", recipe, file, oldFileName);
  },
  deleteRecipe: async (recipes, recipe) => {
    const index = recipes.indexOf(recipe);
    let updatedRecipes = [...recipes];
    updatedRecipes.splice(index, 1);
    saveRecipes(updatedRecipes, "delete", recipe);
  },
  setCurrentRecipe: (recipe) => {
    set((state) => ({ currentRecipe: recipe }));
  },
  resetMessage: () => {
    set({ message: "" });
  },
  setSearchTerm: (term) => {
    set((state) => ({ searchTerm: term }));
  },
  setLastLocation: (location) => {
    set((state) => ({ lastLocation: location }));
  },
}));

export default useRecipeStore;
