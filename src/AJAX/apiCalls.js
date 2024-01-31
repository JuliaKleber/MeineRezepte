import useRecipeStore from '../stores/recipeStore';

// The recipes are loaded from the json file
export const getRecipes = async () => {
  try {
    const response = await fetch("http://localhost:3001/loadRecipes");
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      console.error("Fehler beim Abrufen der Rezepte");
    }
  } catch (error) {
    console.error("Fehler beim Abrufen der Rezepte:", error);
  }
};

// The recipes are saved to the json file
export const saveRecipes = async (recipes) => {
  fetch(`http://localhost:3001/saveRecipes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipes),
  })
    .then((response) => response.text())
    .then((message) => {
      console.log("Antwort vom Server:", message);
      useRecipeStore.setState({ recipes: recipes, message: 'Die Rezeptdaten wurden aktualisiert.' });
    })
    .catch((error) => {
      console.error("Fehler beim Speichern der Rezepte:", error);
      useRecipeStore.setState({ message: 'Die Rezeptdaten konnten nicht aktualisiert werden.' });
    });
};

// Image is saved
export const saveImage = async (file, name) => {
  const formData = new FormData();
  formData.append("image", file, name);
  fetch(`http://localhost:3001/saveFile`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((imageMessage) => {
      console.log("Bild hochgeladen:", imageMessage);
    })
    .catch((imageError) => {
      console.error("Fehler beim Speichern des Bildes:", imageError);
    });
};

// Image is deleted
export const deleteImage = async (name) => {
  fetch(`http://localhost:3001/deleteFile/${name}`, {
    method: "DELETE",
  })
    .then((response) => response.text())
    .then((message) => {
      console.log("Antwort vom Server:", message);
    })
    .catch((error) => {
      console.error("Fehler beim Löschen des Bildes:", error);
    });
};
