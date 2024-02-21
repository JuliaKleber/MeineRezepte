const express = require("express");
const usersService = require("../services/usersService");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  console.log('Email: ', email);
  try {
    let user = await usersService.getUserByUsername(username);
    if (user) {
      return res
        .status(400)
        .json({ message: "Benutzername existiert bereits" });
    }
    user = await usersService.getUserByEmail(email);
    if (user) {
      return res
        .status(400)
        .json({ message: "E-Mail Adresse existiert bereits" });
    }
    user = await usersService.createUser(username, password, email);
    res.json({
      message: "Benutzer erfolgreich registriert",
      userId: user.insertedId.toString(),
    });
  } catch (error) {
    console.error("Fehler beim Registrieren des Nutzers: ", error);
    res.status(500).json({ message: "Interner Serverfehler" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("Benutzername: ", username);
  console.log("Password: ", password);
  try {
    const user = await usersService.getUserByUsername(username);
    if (!user || !usersService.comparePassword(password, user.password)) {
      return res
        .status(401)
        .json({ message: "Ungültige Anmeldeinformationen" });
    }

    const token = usersService.generateToken(user);
    res.json({ token });
  } catch (error) {
    console.error(
      "Fehler beim Abrufen des Benutzers aus der Datenbank: ",
      error
    );
    res.status(500).json({ message: "Interner Serverfehler" });
  }
});

module.exports = router;
