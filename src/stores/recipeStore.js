import { create } from "zustand";

const getRecipes = async () => {
  try {
    const response = await fetch("http://localhost:3001/loadRecipes");
    if (response.status === 200) {
      const data = await response.json();
      useRecipeStore.setState({ recipes: data });
      return data;
    } else {
      console.error("Fehler beim Abrufen der Rezepte.");
    }
  } catch (error) {
    console.error("Fehler beim Abrufen der Rezepte:", error);
  }
};

// The recipes are saved to the json file
const saveRecipes = async (recipes, action, recipe, file, oldFileName) => {
  try {
    const response = await fetch(`http://localhost:3001/saveRecipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipes),
    });
    const message = await response.text();
    console.log("Antwort vom Server:", message);
    useRecipeStore.setState({
      recipes: recipes,
      message: "Die Rezeptdaten wurden aktualisiert.",
      currentRecipe: recipe,
    });
    if (action === "add" && file) {
      saveImage(file, recipe.imageName);
    }
    if (action === "update" && file !== null) {
      if (recipe.imageName) await deleteImage(oldFileName);
      saveImage(file, recipe.imageName);
    }
    if (action === "delete")
      useRecipeStore.setState({
        currentRecipe: {},
        message: "Das Rezept wurde gelöscht",
      });
    if (action === "delete" && recipe.imageName !== null) {
      deleteImage(recipe.imageName);
    }
  } catch (error) {
    console.error("Fehler beim Speichern der Rezepte:", error);
    if (action === "add") {
      useRecipeStore.setState({
        message: "Das Rezept konnte nicht gespeichert werden.",
      });
    }
    if (action === "update") {
      useRecipeStore.setState({
        message: "Das geänderte Rezept konnte nicht gespeichert werden.",
      });
    }
    if (action === "delete") {
      useRecipeStore.setState({
        message: "Das Rezept konnte nicht gelöscht werden.",
      });
    }
  }
};

// Image is saved
const saveImage = async (file, name) => {
  const formData = new FormData();
  formData.append("image", file, name);
  fetch(`http://localhost:3001/saveFile`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((message) => {
      console.log(message);
    })
    .catch((imageError) => {
      console.error("Fehler beim Speichern des Bildes:", imageError);
    });
};

// Image is deleted
const deleteImage = async (name) => {
  fetch(`http://localhost:3001/deleteFile/${name}`, {
    method: "DELETE",
  })
    .then((response) => response.text())
    .then((message) => {
      console.log(message);
    })
    .catch((error) => {
      console.error("Fehler beim Löschen des Bildes:", error);
    });
};

const useRecipeStore = create((get, set) => ({
  recipes: [],
  message: "",
  currentRecipe: {},
  loadRecipes: async () => {
    getRecipes();
  },
  addRecipe: async (recipes, recipe, file) => {
    const updatedRecipes = [...recipes, recipe];
    saveRecipes(updatedRecipes, "add", recipe, file);
  },
  updateRecipe: async (recipes, recipe, file, oldFileName) => {
    saveRecipes(recipes, "update", recipe, file, oldFileName);
  },
  deleteRecipe: async (recipes, recipe) => {
    const index = recipes.indexOf(recipe);
    let updatedRecipes = [...recipes];
    updatedRecipes.splice(index, 1);
    saveRecipes(updatedRecipes, "delete", recipe);
  },
}));

export default useRecipeStore;
