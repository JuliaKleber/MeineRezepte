const mongoDB = require("mongodb");
const url = "mongodb://root:example@localhost:27017/";
const client = new mongoDB.MongoClient(url);
const dbName = "recipes";

const usersCollection = client.db("recipes").collection("users");
const recipesCollection = client.db("recipes").collection("recipes");
const recipeImagesCollection = client.db("recipes").collection("recipeImages");

const connectToDatabase = async (req, res, next) => {
  try {
    await client.connect();
    console.log("Verbunden mit der Datenbank");
    // req.db = client.db(dbName);
    // next(); // to next middleware or route handler
  } catch (error) {
    console.error("Fehler beim Verbinden mit der Datenbank: ", error);
    res.status(500).send("Fehler beim Verbinden mit der Datenbank");
  }
};

const closeDatabaseConnection = async () => {
  try {
    await client.close();
    console.log("Datenbankverbindung geschlossen");
  } catch (error) {
    console.error("Fehler beim Schließen der Datenbankverbindung: ", error);
  }
};

module.exports = {
  connectToDatabase,
  closeDatabaseConnection,
  usersCollection,
  recipesCollection,
  recipeImagesCollection,
};
