import useRecipeStore from "../stores/recipeStore";
import saveImage from "../APICalls/saveImage";
import deleteImage from "../APICalls/deleteImage";

// The recipes are saved to the json file
const updateRecipe = async (recipe, file) => {
  try {
    const response = await fetch(
      `http://localhost:3001/recipes/update/${recipe._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: recipe.name,
          numberOfPersons: recipe.numberOfPersons,
          amounts: recipe.amounts,
          ingredients: recipe.ingredients,
          description: recipe.description,
          keywords: recipe.keywords,
          imageUploaded: recipe.imageUploaded,
        }),
      }
    );
    const message = await response.text();
    console.log("Antwort vom Server:", message);
    useRecipeStore.setState({
      currentRecipe: recipe,
      message: "Das Rezept wurde erfolgreich geändert.",
      recipes: useRecipeStore
        .getState()
        .recipes.map((r) => (r._id === recipe._id ? recipe : r)),
    });
    if (file && recipe.imageUploaded) await deleteImage(recipe._id);
    if (file) saveImage(file, recipe._id);;
  } catch (error) {
    console.error("Fehler beim Aktualisieren des Rezepts:", error);
    useRecipeStore.setState({
      message: "Das Rezept konnte nicht aktualisiert werden",
    });
  }
};

export default updateRecipe;
