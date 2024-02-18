const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;

const mongoDB = require('mongodb');
const url = 'mongodb://root:example@localhost:27017/';
const client = new mongoDB.MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

function generateToken(user) {
  const payload = {
    userId: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: "1h",
  };

  return jwt.sign(payload, secretKey, options);
}

function comparePassword(plainPassword, hashedPassword) {
  return bcrypt.compareSync(plainPassword, hashedPassword);
}

async function getUserByUsername(username) {
  try {
    await client.connect();
    const usersCollection = client.db('MeineRezepte').collection("users");
    const user = await usersCollection.findOne({ username: username });
    return user;
  } finally {
    await client.close();
  }
}

module.exports = { generateToken, comparePassword, getUserByUsername };
