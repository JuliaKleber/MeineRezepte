import useRecipeStore from "../stores/recipeStore";
import deleteImage from "./deleteImage";

// The recipes are saved to the json file
const deleteRecipe = async (recipe) => {
  try {
    const response = await fetch(
      `http://localhost:3001/recipes/deleteRecipe/${recipe._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: recipe._id }),
      }
    );
    const message = await response.text();
    console.log("Antwort vom Server:", message);
    useRecipeStore.setState({
      currentRecipe: null,
      message: "Das Rezept wurde erfolgreich gelöscht.",
      recipes: useRecipeStore
        .getState()
        .recipes.filter((r) => r._id !== recipe._id),
    });
    if (recipe.imageName !== null) deleteImage(recipe._id);
  } catch (error) {
    console.error("Fehler beim Speichern der Rezepte:", error);
    useRecipeStore.setState({
      message: "Das Rezept konnte nicht gelöscht werden.",
    });
  }
};

export default deleteRecipe;
