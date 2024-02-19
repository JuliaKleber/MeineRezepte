import useRecipeStore from "../stores/recipeStore";
import saveImage from "./saveImage";

const addRecipe = async (recipe, file) => {
  console.log(recipe);
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
        imageName: recipe.imageName,
      }),
    });
    const message = await response.text();
    console.log("Antwort vom Server:", message);
    useRecipeStore.setState({
      currentRecipe: recipe,
      message: "Das Rezept wurde der Datenbank hinzugefügt.",
    });
    useRecipeStore.setState({
      recipes: [...useRecipeStore.getState().recipes, recipe],
    });
    if (file) {
      saveImage(file, recipe._id);
    }
  } catch (error) {
    console.error("Fehler beim Hinzufügen des Rezepts:", error);
    useRecipeStore.setState({ currentRecipe: null });
  }
};

export default addRecipe;
