const express = require("express"); // Import express
const fs = require("fs"); // fs = file system
const cors = require("cors");
const multer = require("multer");
const app = express(); // Create new express "app"
const path = require("path");
//Pfad zur json-Datei
const filePath = path.join(__dirname, "datenbank", "recipes.json");

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST",
    credentials: true,
  })
);

app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.send("Willkommen!");
});

app.get("/loadRecipes", (req, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error("Fehler beim Lesen der Datei: ", err);
      return res.status(500).send("Interner Serverfehler");
    }
    try {
      const jsonData = JSON.parse(data);
      res.status(200).json(jsonData);
      console.log("Laden der Daten erfolgreich!");
    } catch (error) {
      console.error("Fehler beim Parsen der JSON-Datei: ", error);
      return res.status(500).send("Interner Serverfehler");
    }
  });
});

app.post("/addRecipe", (req, res) => {
  const newData = req.body;
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error("Fehler beim Lesen der Datei: ", err);
      return res.status(500).send("Interner Serverfehler");
    }
    let jsonData = [];
    if (data.length > 0) {
      try {
        jsonData = JSON.parse(data);
      } catch (error) {
        console.error("Fehler beim Parsen der JSON-Datei: ", error);
        return res.status(500).send("Interner Serverfehler");
      }
    }
    jsonData.push({ ...newData });
    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        console.error("Fehler beim Schreiben der Datei: ", err);
        return res.status(500).send("Interner Serverfehler");
      }
      res.status(200).send("Daten erfolgreich gespeichert");
    });
  });
});

app.post("/updateRecipe", (req, res) => {
  // Daten, die vom Client gesendet werden
  const newData = req.body;
  // Schreibe die neuen Daten zurück in die JSON-Datei (komplett ersetzen)
  fs.writeFile(filePath, JSON.stringify(newData, null, 2), (err) => {
    if (err) {
      console.error("Fehler beim Schreiben der Datei: ", err);
      return res.status(500).send("Interner Serverfehler");
    }
    res.status(200).send("Daten erfolgreich gespeichert");
  });
});

app.post("/addRecipeImage", upload.single("image"), (req, res) => {
  const uploadedFile = req.file;
  const imagePath = path.join(__dirname, "datenbank", "images", uploadedFile.originalname);
  fs.writeFile(imagePath, uploadedFile.buffer, (err) => {
    if (err) {
      console.error("Fehler beim Speichern des Bildes: ", err);
      return res.status(500).send("Interner Serverfehler");
    }
    res.status(200).send("Bild erfolgreich gespeichert");
  });
});

app.listen(3001);
