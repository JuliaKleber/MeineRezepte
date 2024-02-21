import { create } from "zustand";

const useRecipeStore = create((set) => ({
  recipes: [],
  currentRecipe: null,
  message: "",
  searchTerm: "",
  lastLocation: "/",
  setRecipes: (recipes) => {
    set((state) => ({ recipes: recipes }));
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
