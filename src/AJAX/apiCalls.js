// The recipes are loaded from the json file
export const getRecipes = async () => {
  try {
    const response = await fetch("http://localhost:3001/loadRecipes");
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      console.error("Fehler beim Abrufen der Daten");
    }
  } catch (error) {
    console.error("Fehler beim Senden der Anfrage:", error);
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
      return true;
    })
    .catch((error) => {
      console.error("Fehler beim Senden der Daten:", error);
      return false;
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
      console.error("Fehler beim Hochladen des Bildes:", imageError);
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
      console.error("Fehler beim Senden der Daten:", error);
    });
};
