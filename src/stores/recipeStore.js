import { create } from "zustand";
import { persist } from "zustand/middleware";

const useRecipeStore = create(
  persist(
    (set) => ({
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
    }),
    { name: "recipe-store" }
  )
);

export default useRecipeStore;
