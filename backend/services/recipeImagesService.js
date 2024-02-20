const { MongoClient, Binary } = require('mongodb');
const url = 'mongodb://root:example@localhost:27017/';
const client = new MongoClient(url);

const saveImageToMongoDB = async (buffer, recipeId) => {
  const database = client.db('MeineRezepte');
  const collection = database.collection('recipeImages');
  const result = await collection.insertOne({
    recipeId: recipeId,
    image: new Binary(buffer),
  });
  return result;
}

const loadImageFromMongoDB = async (recipeId) => {
  const database = client.db('MeineRezepte');
  const collection = database.collection('recipeImages');
  try {
    const result = await collection.findOne({
      recipeId: recipeId
    });
    return result;
  } catch (error) {
    console.log('Fehler beim Laden der Datei: ', error);
  }
}

const deleteImageFromMongoDB = async (recipeId) => {
  const database = client.db('MeineRezepte');
  const collection = database.collection('recipeImages');
  await collection.deleteOne({ recipeId: recipeId });
  return true;
}

module.exports = {
  saveImageToMongoDB,
  loadImageFromMongoDB,
  deleteImageFromMongoDB,
};
