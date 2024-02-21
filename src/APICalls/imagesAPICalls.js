// Image is loaded
export const loadImage = async (recipeId) => {
  try {
    const response = await fetch(
      `http://localhost:3001/recipeImages/load/${recipeId}`
    );
    const data = await response.json();
    const imageUrl = `data:image/png;base64,${data.image}`;
    return imageUrl;
  } catch (error) {
    console.error("Fehler beim Laden des Bildes: ", error);
  }
};

// Image is saved
export const saveImage = async (file, recipeId) => {
  try {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("recipeId", recipeId);
    await fetch(`http://localhost:3001/recipeImages/save`, {
      method: "POST",
      body: formData,
    });
  } catch (error) {
    console.error("Fehler beim Speichern des Bildes: ", error);
  }
};

// Image is deleted
export const deleteImage = async (recipeId) => {
  fetch(`http://localhost:3001/recipeImages/delete/${recipeId}`, {
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
