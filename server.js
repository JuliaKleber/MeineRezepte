const express = require("express"); // Import express
const fs = require("fs"); // fs = file system
const cors = require("cors");
const app = express(); // Create new express "app"
const path = require("path");
//Pfad zur json-Datei
const filePath = path.join(__dirname, "datenbank", "recipes.json");

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST", //HEAD,PUT,PATCH,DELETE
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Willkommen!");
});

app.get("/getRecipes", (req, res) => {
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

app.post("/addData", (req, res) => {
  // Daten, die vom Client gesendet werden
  const newData = req.body;
  // Lese die vorhandenen Daten aus der JSON-Datei (falls vorhanden)
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error("Fehler beim Lesen der Datei: ", err);
      return res.status(500).send("Interner Serverfehler");
    }
    let jsonData = [];
    // Falls Daten in der Datei vorhanden sind, deserialisiere sie
    if (data.length > 0) {
      try {
        jsonData = JSON.parse(data);
      } catch (error) {
        console.error("Fehler beim Parsen der JSON-Datei: ", error);
        return res.status(500).send("Interner Serverfehler");
      }
    }
    // Füge die neuen Daten hinzu
    jsonData.push(newData);
    // Schreibe die aktualisierten Daten zurück in die JSON-Datei
    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        console.error("Fehler beim Schreiben der Datei: ", err);
        return res.status(500).send("Interner Serverfehler");
      }
      res.status(200).send("Daten erfolgreich gespeichert");
    });
  });
});

app.post("/overwriteData", (req, res) => {
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

app.listen(3001);
