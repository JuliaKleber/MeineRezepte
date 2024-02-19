// Image is saved
export const saveImage = async (file, name) => {
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

export default saveImage;
