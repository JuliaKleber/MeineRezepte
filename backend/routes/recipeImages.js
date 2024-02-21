const express = require('express');
const multer = require('multer');
const recipeImagesService = require('../services/recipeImagesService');
// const databaseMiddleware = require('../middlewares/recipesCollection');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// router.use(databaseMiddleware.connectToDatabase);

router.get('/load/:recipeId', async (req, res) => {
  const recipeId = req.params.recipeId;
  try {
    const file = await recipeImagesService.loadImageFromMongoDB(recipeId);
    res.status(200).send(file);
  } catch (error) {
    console.error('Fehler beim Laden der Datei: ', error);
    res.status(500).send('Interner Serverfehler');
  }
});

router.post('/save', upload.single('image'), async (req, res) => {
  try {
    const recipeId = req.body.recipeId;
    const imageBuffer = req.file.buffer;
    const result = await recipeImagesService.saveImageToMongoDB(imageBuffer, recipeId);
    res.status(200).json({ fileId: result.insertedId, message: 'Datei erfolgreich hochgeladen' });
  } catch (error) {
    console.error('Fehler beim Hochladen der Datei: ', error);
    res.status(500).send('Interner Serverfehler');
  }
});

router.delete('/delete/:recipeId', async (req, res) => {
  try {
    await recipeImagesService.deleteImageFromMongoDB(req.params.recipeId);
    res.status(200).send('Datei erfolgreich gelöscht');
  } catch (error) {
    console.error('Fehler beim Löschen der Datei: ', error);
    res.status(500).send('Interner Serverfehler');
  }
});

module.exports = router;
