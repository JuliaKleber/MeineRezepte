const { Binary } = require('mongodb');
const { recipeImagesCollection } = require('../middlewares/recipesDatabase');

const saveImageToMongoDB = async (buffer, recipeId) => {
  const result = await recipeImagesCollection.insertOne({
    recipeId: recipeId,
    image: new Binary(buffer),
  });
  return result;
}

const loadImageFromMongoDB = async (recipeId) => {
  try {
    const result = await recipeImagesCollection.findOne({
      recipeId: recipeId
    });
    return result;
  } catch (error) {
    console.log('Fehler beim Laden der Datei: ', error);
  }
}

const deleteImageFromMongoDB = async (recipeId) => {
  await recipeImagesCollection.deleteOne({ recipeId: recipeId });
  return true;
}

module.exports = {
  saveImageToMongoDB,
  loadImageFromMongoDB,
  deleteImageFromMongoDB,
};
