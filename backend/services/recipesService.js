const mongoDB = require('mongodb');
const url = 'mongodb://root:example@localhost:27017/';
const client = new mongoDB.MongoClient(url);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Verbunden mit der Datenbank');
  } catch (error) {
    console.log('Fehler beim Verbinden mit der Datenbank: ', error);
    throw error;
  }
}

async function loadRecipes(userId) {
  try {
    const recipesCollection = client.db('MeineRezepte').collection('recipes');
    const recipes = await recipesCollection.find({ userId: userId }).toArray();
    return recipes;
  } catch (error) {
    console.log('Fehler beim Laden der Rezepte: ', error);
    throw error;
  }
}

async function loadRecipeById(recipeId) {
  try {
    const recipesCollection = client.db('MeineRezepte').collection('recipes');
    const recipe = await recipesCollection.findOne({ _id: mongoDB.ObjectId(recipeId) });
    return recipe;
  } catch (error) {
    console.log('Fehler beim Laden des Rezepts: ', error);
    throw error;
  }
}

async function saveRecipe(recipe) {
  try {
    console.log('Rezept im Service:', recipe);
    const recipesCollection = client.db('MeineRezepte').collection('recipes');
    await recipesCollection.insertOne(recipe);
  } catch (error) {
    console.log('Fehler beim Speichern des Rezepts: ', error);
    throw error;
  }
}

async function updateRecipe(recipeId, updatedRecipe) {
  try {
    const recipesCollection = client.db('MeineRezepte').collection('recipes');
    await recipesCollection.replaceOne({ _id: new mongoDB.ObjectId(recipeId) }, updatedRecipe);
  } catch (error) {
    console.log('Fehler beim Aktualisieren des Rezepts: ', error);
    throw error;
  }
}

async function deleteRecipe(id) {
  try {
    const recipesCollection = client.db('MeineRezepte').collection('recipes');
    await recipesCollection.deleteOne({ _id: new mongoDB.ObjectId(id) });
  } catch (error) {
    console.log('Fehler beim Löschen des Rezepts: ', error);
    throw error;
  }
}

async function closeDatabaseConnection() {
  try {
    await client.close();
    console.log('Datenbankverbindung geschlossen');
  } catch (error) {
    console.log('Fehler beim Schließen der Datenbankverbindung: ', error);
    throw error;
  }
}

module.exports = {
  connectToDatabase,
  loadRecipes,
  loadRecipeById,
  saveRecipe,
  updateRecipe,
  deleteRecipe,
  closeDatabaseConnection,
};
