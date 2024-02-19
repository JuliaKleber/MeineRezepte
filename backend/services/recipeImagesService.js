const { mongoDB, GridFSBucket, ObjectId } = require('mongodb');
const url = 'mongodb://root:example@localhost:27017/';
const client = new mongoDB.MongoClient(url);

async function uploadFileToGridFS(buffer, filename) {
  const bucket = new GridFSBucket(client.db('MeineRezepte'), {
    bucketName: 'recipeImages',
  });
  const uploadStream = bucket.openUploadStream(filename);
  const fileId = uploadStream.id;
  await new Promise((resolve, reject) => {
    const stream = uploadStream.end(buffer);
    stream.on('finish', resolve);
    stream.on('error', reject);
  });
  return fileId;
}

async function loadFileFromGridFS(fileId) {
  const bucket = new GridFSBucket(client.db('MeineRezepte'), {
    bucketName: 'recipeImages',
  });
  const downloadStream = bucket.openDownloadStream(ObjectId(fileId));
  return downloadStream.read();
}

async function deleteFileFromGridFS(client, fileId) {
  const bucket = new GridFSBucket(client.db('MeineRezepte'), {
    bucketName: 'recipeImages',
  });
  await bucket.delete(ObjectId(fileId));
}

module.exports = {
  uploadFileToGridFS,
  loadFileFromGridFS,
  deleteFileFromGridFS,
};
