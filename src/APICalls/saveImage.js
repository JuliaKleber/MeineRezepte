// Image is saved
export const saveImage = async (file, recipeId) => {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("recipeId", recipeId);
  fetch(`http://localhost:3001/recipeImages/save`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((message) => {
      console.log(message);
    })
    .catch((error) => {
      console.error("Fehler beim Speichern des Bildes: ", error);
    });
};

export default saveImage;
