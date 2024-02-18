const mongoDB = require('mongodb');
const url = 'mongodb://root:example@localhost:27017/';
const client = new mongoDB.MongoClient(url);

async function connectToUsersDatabase(req, res, next) {
  try {
    await client.connect();
    console.log('Verbunden mit der Datenbank');
    req.db = client.db('users');
    next();  // to next middleware or route handler
  } catch (error) {
    console.log('Fehler beim Verbinden mit der Datenbank: ', error);
    res.status(500).send('Fehler beim Verbinden mit der Datenbank');
  }
}

async function closeUsersCollectionConnection() {
  try {
    await client.close();
    console.log('Datenbankverbindung geschlossen');
  } catch (error) {
    console.log('Fehler beim Schließen der Datenbankverbindung: ', error);
  }
}

module.exports = {
  connectToDatabase: connectToUsersDatabase,
  closeDatabaseConnection: closeUsersCollectionConnection,
};
