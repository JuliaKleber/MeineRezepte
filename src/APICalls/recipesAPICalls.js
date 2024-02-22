import useRecipeStore from "../stores/recipeStore";
import useUserStore from "../stores/userStore";
import { saveImage, deleteImage } from "./imagesAPICalls";

// The recipes are loaded from the database
export const getRecipes = async (userId) => {
  try {
    const response = await fetch(
      `http://localhost:3001/recipes/loadRecipes/${userId}`
    );
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

// A recipe is added to the database
export const addRecipe = async (recipe, file) => {
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
      currentRecipe: { ...recipe, _id: recipeId },
      recipes: [
        ...useRecipeStore.getState().recipes,
        { ...recipe, _id: recipeId },
      ],
    });
    if (file) {
      saveImage(file, recipeId);
    }
  } catch (error) {
    console.error("Fehler beim Hinzufügen des Rezepts:", error);
    useRecipeStore.setState({ currentRecipe: null });
  }
};

// A recipe is updated in the database
export const updateRecipe = async (recipe, file) => {
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
          userId: useUserStore.getState().currentUserId,
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
    if (file) saveImage(file, recipe._id);
  } catch (error) {
    console.error("Fehler beim Aktualisieren des Rezepts:", error);
    useRecipeStore.setState({
      message: "Das Rezept konnte nicht aktualisiert werden",
    });
  }
};

// A recipe is deleted from the database
export const deleteRecipe = async (recipe) => {
  try {
    const response = await fetch(
      `http://localhost:3001/recipes/delete/${recipe._id}`,
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
    if (recipe.imageUploaded) deleteImage(recipe._id);
  } catch (error) {
    console.error("Fehler beim Speichern der Rezepte:", error);
    useRecipeStore.setState({
      message: "Das Rezept konnte nicht gelöscht werden.",
    });
  }
};

// A recipe is deleted from the database
export const deleteAllRecipes = async () => {
  const userId = useUserStore.getState().currentUserId;
  try {
    await fetch(
      `http://localhost:3001/recipes/deleteAll/${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId }),
      }
    );
    useRecipeStore.getState().recipes.forEach((recipe) => {
      if (recipe.imageUploaded) deleteImage(recipe._id);
    });
    useRecipeStore.setState({
      currentRecipe: null,
      message: "",
      recipes: [],
    });
  } catch (error) {
    console.error("Fehler beim Speichern der Rezepte:", error);
    useRecipeStore.setState({
      message: "Die Rezepte konnten nicht gelöscht werden.",
    });
  }
};
