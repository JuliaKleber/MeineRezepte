const express = require("express");
const fs = require("fs"); // fs = file system
const cors = require("cors");
const multer = require("multer"); // needed for file upload
const path = require("path");
const app = express(); // Create new express 'app'
const PORT = 3001;

const authRoutes = require('./routes/auth');
const recipesRoutes = require('./routes/recipes');
const recipesService = require('./services/recipesService');

const corsOptions = {
  origin: ["http://localhost:3000"],
  methods: "GET, POST, PATCH, DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/recipes', recipesRoutes);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.send("Willkommen!");
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

recipesService.connectToDatabase();

process.on('SIGINT', () => {
  recipesService.closeDatabaseConnection();
  process.exit();
});

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
