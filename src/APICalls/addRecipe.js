import useRecipeStore from "../stores/recipeStore";
import useUserStore from "../stores/userStore";
import saveImage from "./saveImage";

const addRecipe = async (recipe, file) => {
  try {
    const response = await fetch(`http://localhost:3001/recipes/saveRecipe`, {
      method: "POST",
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
        userId: useUserStore.getState().currentUserId,
      }),
    });
    const recipeId = await response.json();
    useRecipeStore.setState({
      currentRecipe: recipe,
      message: "Das Rezept wurde der Datenbank hinzugefügt.",
    });
    useRecipeStore.setState({
      currentRecipe: {...recipe, _id: recipeId},
      recipes: [...useRecipeStore.getState().recipes, {...recipe, _id: recipeId}],
    });
    if (file) {
      saveImage(file, recipeId);
    }
  } catch (error) {
    console.error("Fehler beim Hinzufügen des Rezepts:", error);
    useRecipeStore.setState({ currentRecipe: null });
  }
};

export default addRecipe;
