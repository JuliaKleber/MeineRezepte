// Image is deleted
export const deleteImage = async (name) => {
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

export default deleteImage;
