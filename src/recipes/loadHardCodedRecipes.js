import recipes from "./recipes.js";
import { addRecipe, deleteAllRecipes } from "../APICalls/recipesAPICalls";

export const loadHardCodedRecipes = async () => {
  await deleteAllRecipes();
  recipes.forEach((recipe) => {
    addRecipe(recipe);
  });
};
