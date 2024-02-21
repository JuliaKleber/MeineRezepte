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

export default saveImage;
