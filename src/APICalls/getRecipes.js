import useRecipeStore from "../stores/recipeStore";

// The recipes are loaded from the json file in the store
const getRecipes = async () => {
  try {
    const response = await fetch("http://localhost:3001/recipes/loadRecipes");
    if (response.status === 200) {
      const data = await response.json();
      useRecipeStore.setState({ recipes: data });
    } else {
      console.error("Fehler beim Abrufen der Rezepte.");
    }
  } catch (error) {
    console.error("Fehler beim Abrufen der Rezepte:", error);
  }
};

export default getRecipes;
