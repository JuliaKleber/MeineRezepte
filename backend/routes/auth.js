const express = require("express");
const authService = require("../services/authService");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
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
    const user = await authService.getUserByUsername(username);
    if (!user || !authService.comparePassword(password, user.password)) {
      return res
        .status(401)
        .json({ message: "Ungültige Anmeldeinformationen" });
    }

    const token = authService.generateToken(user);
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
