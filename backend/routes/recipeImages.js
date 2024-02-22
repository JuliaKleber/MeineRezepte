const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const recipeImagesService = require("../services/recipeImagesService");

router.post("/save", upload.single("image"), async (req, res) => {
  try {
    const recipeId = req.body.recipeId;
    const userId = req.body.userId;
    const imageBuffer = req.file.buffer;
    const result = await recipeImagesService.saveImage(
      imageBuffer,
      recipeId,
      userId
    );
    res.status(200).json({
      fileId: result.insertedId,
      message: "Datei erfolgreich hochgeladen",
    });
  } catch (error) {
    console.error("Fehler beim Hochladen der Datei: ", error);
    res.status(500).send("Interner Serverfehler");
  }
});

router.get("/load/:recipeId", async (req, res) => {
  const recipeId = req.params.recipeId;
  try {
    const file = await recipeImagesService.loadImage(recipeId);
    res.status(200).send(file);
  } catch (error) {
    console.error("Fehler beim Laden der Datei: ", error);
    res.status(500).send("Interner Serverfehler");
  }
});

router.delete("/delete/:recipeId", async (req, res) => {
  try {
    const success = await recipeImagesService.deleteImage(req.params.recipeId);
    if (success) {
      res.status(200).send("Datei erfolgreich gelöscht");
    } else {
      res.status(500).send("Interner Serverfehler");
    }
  } catch (error) {
    console.error("Fehler beim Löschen der Datei: ", error);
    res.status(500).send("Interner Serverfehler");
  }
});

module.exports = router;
