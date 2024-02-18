const mongoDB = require('mongodb');
const url = 'mongodb://root:example@localhost:27017/';
const client = new mongoDB.MongoClient(url);

async function connectToRecipesCollection(req, res, next) {
  try {
    await client.connect();
    console.log('Verbunden mit der Datenbank');
    req.db = client.db('MeineRezepte');
    next();  // to next middleware or route handler
  } catch (error) {
    console.log('Fehler beim Verbinden mit der Datenbank: ', error);
    res.status(500).send('Fehler beim Verbinden mit der Datenbank');
  }
}

async function closeRecipesCollectionConnection() {
  try {
    await client.close();
    console.log('Datenbankverbindung geschlossen');
  } catch (error) {
    console.log('Fehler beim Schließen der Datenbankverbindung: ', error);
  }
}

module.exports = {
  connectToDatabase: connectToRecipesCollection,
  closeDatabaseConnection: closeRecipesCollectionConnection,
};
