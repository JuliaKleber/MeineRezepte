const { ObjectId } = require("mongodb");
const { recipesCollection } = require("../middlewares/recipesDatabase");

const loadRecipes = async (userId) => {
  try {
    const recipes = await recipesCollection.find({ userId: userId }).toArray();
    return recipes;
  } catch (error) {
    console.log("Fehler beim Laden der Rezepte: ", error);
    throw error;
  }
}

const saveRecipe = async (recipe) => {
  try {
    const savedRecipe = await recipesCollection.insertOne(recipe);
    return savedRecipe.insertedId.toString();
  } catch (error) {
    console.log("Fehler beim Speichern des Rezepts: ", error);
  }
}

const updateRecipe = async (recipeId, updatedRecipe) => {
  try {
    await recipesCollection.replaceOne(
      { _id: new ObjectId(recipeId) },
      updatedRecipe
    );
  } catch (error) {
    console.log("Fehler beim Aktualisieren des Rezepts: ", error);
    throw error;
  }
}

const deleteRecipe = async (id) => {
  try {
    await recipesCollection.deleteOne({ _id: new ObjectId(id) });
  } catch (error) {
    console.log("Fehler beim Löschen des Rezepts: ", error);
    throw error;
  }
}

const deleteAllRecipes = async (userId) => {
  try {
    await recipesCollection.deleteMany({ userId: userId });
  } catch (error) {
    console.log("Fehler beim Löschen der Rezepte: ", error);
    throw error;
  }
}

module.exports = {
  loadRecipes,
  saveRecipe,
  updateRecipe,
  deleteRecipe,
  deleteAllRecipes,
};
