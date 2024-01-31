import { create } from 'zustand';
import { getRecipes, saveRecipes, saveImage, deleteImage } from '../AJAX/apiCalls';

const useRecipeStore = create((set, get) => ({
  recipes: [],
  loadRecipes: async () => {
    try {
      const recipes = await getRecipes();
      set({ recipes });
    } catch (error) {
      console.error('Fehler beim Laden der Rezepte', error);
    }
  },
  addRecipe: async (recipe, file) => {
    try {
      const updatedRecipes = [...get().recipes, recipe];
      const success = saveRecipes(updatedRecipes);
      set({ saved: success });
      if (success) set({ recipes: updatedRecipes });
      if (success && file) {
        saveImage(file, recipe.imageName);
      }
    } catch (error) {
      console.error('Fehler beim Speichern des Rezepts', error);
    }
  },
  updateRecipe: async (index, recipe, file) => {
    try {
      const updatedRecipes = [...get().recipes, recipe];
      updatedRecipes.splice(index, 1);
      const success = saveRecipes(updatedRecipes);
      set({ updated: success });
      if (success) set({ recipes: updatedRecipes });
      if (file !== null && success) {
        saveImage(file, recipe.imageName);
      }
    } catch (error) {
      console.error('Fehler beim Aktualisieren des Rezepts', error);
    }
  },
  deleteRecipe: async (recipe) => {
    try {
      const index = get().recipes.indexOf(recipe);
      let updatedRecipes = get().recipes
      updatedRecipes.splice(index, 1);
      const success = saveRecipes(updatedRecipes);
      if (success) set({ recipes: updatedRecipes });
      if (success && recipe.imageName !== null) {
        deleteImage(recipe.imageName);
      }
    } catch (error) {
      console.error('Fehler beim Löschen des Rezepts', error);
    }
  },
}));

export default useRecipeStore;
