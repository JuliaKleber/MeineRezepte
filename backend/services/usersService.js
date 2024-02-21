const bcrypt = require("bcrypt");
require("dotenv").config();
const { usersCollection } = require("../middlewares/recipesDatabase");

const createSaltedPassword = (password) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const saltedPassword = bcrypt.hashSync(password, salt);
  return saltedPassword;
};

const createUser = async (username, password, email) => {
  try {
    const hashedPassword = createSaltedPassword(password);
    const user = await usersCollection.insertOne({
      username: username,
      password: hashedPassword,
      email: email,
    });
    if (user) {
      console.log("Nutzer wurde erstellt: ", user);
      console.log(user);
      return user;
    } else {
      throw new Error ("Nutzer konnte nicht erstellt werden.");
    }
  } catch (error) {
    console.error("Fehler beim Verbinden mit der Datenbank oder bei der Validierung: ", error);
  }
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
  comparePassword,
  getUserByUsername,
  getUserByEmail,
};
