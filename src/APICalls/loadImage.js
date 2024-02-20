const loadImage = async (recipeId) => {
  try {
    const response = await fetch(
      `http://localhost:3001/recipeImages/load/${recipeId}`
    );
    const data = await response.json();
    const imageBuffer = new Uint8Array(data.image);
    const imageUrl = `data:image/png;base64,${btoa(
      String.fromCharCode.apply(null, imageBuffer)
    )}`;
    return imageUrl;
  } catch (error) {
    console.error("Fehler beim Laden des Bildes: ", error);
  }
};

export default loadImage;
