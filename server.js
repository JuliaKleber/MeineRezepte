const express = require("express"); // Import express
const fs = require("fs"); // fs = file system
const cors = require("cors");
const multer = require("multer");
const app = express(); // Create new express "app"
const path = require("path");
const filePath = path.join(__dirname, "backend", "recipes.json");
const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: ['https://meine-rezepte-f4bd3ffb1898.herokuapp.com', 'http://localhost:3000'],
  methods: 'GET, POST',
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

app.get('/fetchImage/:file(*)', (req, res) => {
  const file = req.params.file;
  const fileLocation = path.join(__dirname, 'backend', 'images', file);
  res.sendFile(fileLocation)
})

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
  const imagePath = path.join(__dirname, "backend", "images", uploadedFile.originalname);
  console.log(imagePath);
  fs.writeFile(imagePath, uploadedFile.buffer, (err) => {
    if (err) {
      console.error("Fehler beim Speichern des Bildes: ", err);
      return res.status(500).send("Interner Serverfehler");
    }
    res.status(200).send("Bild erfolgreich gespeichert");
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
