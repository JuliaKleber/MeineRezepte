const express = require("express");
const router = express.Router();

const usersService = require("../services/usersService");
const recipesService = require("../services/recipesService");

router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  try {
    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ message: "Nutzername, Passwort und E-Mail sind erforderlich" });
    }
    let user = await usersService.getUserByUsername(username);
    if (user) {
      return res.status(400).json({ message: "Nutzername existiert bereits" });
    }
    user = await usersService.getUserByEmail(email);
    if (user) {
      return res
        .status(400)
        .json({ message: "E-Mail Adresse existiert bereits" });
    }
    user = await usersService.createUser(username, password, email);
    if (user.acknowledged) {
      res.json({
        message: "Benutzer erfolgreich registriert",
        userId: user.insertedId.toString(),
      });
    } else {
      throw new Error("Fehler beim Registrieren des Nutzers");
    }
  } catch (error) {
    console.error("Fehler beim Registrieren des Nutzers: ", error);
    res.status(500).json({ message: "Interner Serverfehler" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await usersService.getUserByUsername(username);
    if (!user || !usersService.comparePassword(password, user.password)) {
      return res
        .status(401)
        .json({ message: "Ungültige Anmeldeinformationen" });
    }
    res.json({ userId: user._id.toString() });
  } catch (error) {
    console.error(
      "Fehler beim Abrufen des Benutzers aus der Datenbank: ",
      error
    );
    res.status(500).json({ message: "Interner Serverfehler" });
  }
});

router.delete("/deleteByUsername/:username", async (req, res) => {
  const username = req.params.username;
  try {
    const user = await usersService.getUserByUsername(username);
    if (!user) {
      return res.status(404).json({ message: "Nutzer nicht gefunden" });
    }
    const message = await usersService.deleteUser(user._id);
    if (message.acknowledged)
      recipesService.deleteAllRecipes(user._id.toString());
    res.json({ message: "Nutzer und zughörige Rezepte erfolgreich gelöscht" });
  } catch (error) {
    console.error("Fehler beim Löschen des Benutzers: ", error);
    res.status(500).json({ message: "Interner Serverfehler" });
  }
});

module.exports = router;
