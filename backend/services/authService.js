const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;
const { usersCollection } = require("../middlewares/usersDatabase");

const mongoDB = require("mongodb");
const url = "mongodb://root:example@localhost:27017/";
const client = new mongoDB.MongoClient(url);

const createUser = async (username, password) => {
  try {
    await client.connect();
  } catch (error) {
    console.error("Fehler beim Verbinden mit der Datenbank: ", error);
  }
};

const generateToken = (user) => {
  const payload = {
    userId: user.id,
    username: user.username,
  };
  const options = {
    expiresIn: "1h",
  };
  return jwt.sign(payload, secretKey, options);
};

const comparePassword = (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};

const getUserByUsername = async (username) => {
  try {
    await client.connect();
    const user = await usersCollection.findOne({ username: username });
    return user;
  } catch (error) {
    console.error("Nutzerdaten konnten nicht abgerufen werden: ", error);
  } finally {
    await client.close();
  }
};

module.exports = {
  createUser,
  generateToken,
  comparePassword,
  getUserByUsername,
};
