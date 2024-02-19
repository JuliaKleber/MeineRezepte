import { create } from "zustand";
import getRecipes from "../APICalls/getRecipes";
import addRecipe from "../APICalls/addRecipe";
import updateRecipe from "../APICalls/updateRecipe";
// import deleteRecipe from "../APICalls/deleteRecipe";

const useRecipeStore = create((set) => ({
  recipes: [],
  currentRecipe: null,
  message: "",
  searchTerm: "",
  lastLocation: "/",
  loadRecipes: async () => {
    getRecipes();
  },
  addRecipe: async (recipe, file) => {
    addRecipe(recipe, file);
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
