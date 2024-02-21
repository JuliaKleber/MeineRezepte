const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;
const { usersCollection } = require("../middlewares/recipesDatabase");

const createUser = async (username, password, email) => {
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await usersCollection.insertOne({
      username: username,
      password: hashedPassword,
      email: email,
    });
    return user;
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
    const user = await usersCollection.findOne({ username: username });
    return user;
  } catch (error) {
    console.error("Nutzerdaten konnten nicht abgerufen werden: ", error);
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await usersCollection.findOne({ email: email });
    return user;
  } catch (error) {
    console.error("Nutzerdaten konnten nicht abgerufen werden: ", error);
  }
}

module.exports = {
  createUser,
  generateToken,
  comparePassword,
  getUserByUsername,
  getUserByEmail,
};
