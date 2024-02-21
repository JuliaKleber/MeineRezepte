const { ObjectId } = require("mongodb");
const { recipesCollection } = require("../middlewares/recipesDatabase");

async function loadRecipes(userId) {
  try {
    const recipes = await recipesCollection.find({ userId: userId }).toArray();
    return recipes;
  } catch (error) {
    console.log("Fehler beim Laden der Rezepte: ", error);
    throw error;
  }
}

async function loadRecipeById(recipeId) {
  try {
    const recipe = await recipesCollection.findOne({
      _id: mongoDB.ObjectId(recipeId),
    });
    return recipe;
  } catch (error) {
    console.log("Fehler beim Laden des Rezepts: ", error);
    throw error;
  }
}

async function saveRecipe(recipe) {
  try {
    const savedRecipe = await recipesCollection.insertOne(recipe);
    return savedRecipe.insertedId.toString();
  } catch (error) {
    console.log("Fehler beim Speichern des Rezepts: ", error);
    throw error;
  }
}

async function updateRecipe(recipeId, updatedRecipe) {
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

async function deleteRecipe(id) {
  try {
    await recipesCollection.deleteOne({ _id: new ObjectId(id) });
  } catch (error) {
    console.log("Fehler beim Löschen des Rezepts: ", error);
    throw error;
  }
}

module.exports = {
  loadRecipes,
  loadRecipeById,
  saveRecipe,
  updateRecipe,
  deleteRecipe,
};
