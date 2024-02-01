const express = require("express");
const fs = require("fs"); // fs = file system
const cors = require("cors");
const multer = require("multer"); // needed for file upload
const path = require("path");
const filePath = path.join(__dirname, "recipes.json");
const app = express(); // Create new express 'app'
const PORT = 3001;

const corsOptions = {
  origin: ["http://localhost:3000"],
  methods: "GET, POST, DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.send("Willkommen!");
});

app.get("/loadRecipes", (req, res) => {
  fs.readFile(filePath, (error, data) => {
    if (error) {
      console.error("Fehler beim Lesen der Datei: ", error);
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

app.post("/saveRecipes", (req, res) => {
  // Daten, die vom Client gesendet werden
  const newData = req.body;
  // Schreibe die neuen Daten zurück in die JSON-Datei (komplett ersetzen)
  fs.writeFile(filePath, JSON.stringify(newData, null, 2), (error) => {
    if (error) {
      console.error("Fehler beim Schreiben der Datei: ", error);
      return res.status(500).send("Interner Serverfehler");
    }
    res.status(200).send("Daten erfolgreich aktualisiert");
  });
});

app.get("/getFile/:file(*)", (req, res) => {
  const file = req.params.file;
  const fileLocation = path.join(__dirname, "images", file);
  res.sendFile(fileLocation);
});

app.post("/saveFile", upload.single("image"), (req, res) => {
  const uploadedFile = req.file;
  const imagePath = path.join(__dirname, "images", uploadedFile.originalname);
  fs.writeFile(imagePath, uploadedFile.buffer, (error) => {
    if (error) {
      console.error("Fehler beim Speichern des Bildes: ", error);
      return res.status(500).send("Interner Serverfehler");
    }
    res.status(200).send("Bild erfolgreich gespeichert");
  });
});

app.delete("/deleteFile/:file(*)", (req, res) => {
  const fileName = req.params.file;
  const imagePath = path.join(__dirname, "images", fileName);
  fs.unlink(imagePath, (error) => {
    if (error) {
      console.error("Fehler beim Löschen des Bildes: ", error);
      return res.status(500).send("Interner Serverfehler");
    }
    return res.status(200).send("Bild erfolgreich gelöscht");
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
