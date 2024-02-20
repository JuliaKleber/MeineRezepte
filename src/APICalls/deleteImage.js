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

export default deleteImage;
