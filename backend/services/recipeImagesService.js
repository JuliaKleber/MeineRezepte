const { Binary } = require("mongodb");
const { recipeImagesCollection } = require("../middlewares/recipesDatabase");

const saveImage = async (buffer, recipeId, userId) => {
  try {
    const result = await recipeImagesCollection.insertOne({
      recipeId: recipeId,
      userId: userId,
      image: new Binary(buffer),
    });
    return result;
  } catch (error) {
    console.error("Fehler beim Speichern der Datei: ", error);
  }
};

const loadImage = async (recipeId) => {
  try {
    const result = await recipeImagesCollection.findOne({
      recipeId: recipeId,
    });
    return result;
  } catch (error) {
    console.error("Fehler beim Laden der Datei: ", error);
  }
};

const deleteImage = async (recipeId) => {
  try {
    await recipeImagesCollection.deleteOne({ recipeId: recipeId });
    return true;
  } catch (error) {
    console.error("Fehler beim Löschen der Datei: ", error);
    return false;
  }
};

const deleteAllImages = async (userId) => {
  try {
    await recipeImagesCollection.deleteMany({ userId: userId });
    return true;
  } catch (error) {
    console.error("Fehler beim Löschen der Dateien: ", error);
    return false;
  }
}

module.exports = {
  saveImage,
  loadImage,
  deleteImage,
  deleteAllImages,
};
