const express = require('express');
const multer = require('multer');
const recipeImagesService = require('../services/recipeImagesService');
const databaseMiddleware = require('../middlewares/recipesCollection');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.use(databaseMiddleware.connectToDatabase);

router.get('/load/:recipeId', async (req, res) => {
  try {
    const file = await recipeImagesService.loadFileFromGridFS(req.params.recipeId);
    res.status(200).send(file);
  } catch (error) {
    console.error('Fehler beim Laden der Datei: ', error);
    res.status(500).send('Interner Serverfehler');
  }
});

router.post('/save', upload.single('file'), async (req, res) => {
  try {
    const fileId = await recipeImagesService.uploadFileToGridFS(req.file.buffer, req.file.recipeName);
    res.status(200).json({ fileId, message: 'Datei erfolgreich hochgeladen' });
  } catch (error) {
    console.error('Fehler beim Hochladen der Datei: ', error);
    res.status(500).send('Interner Serverfehler');
  }
});

router.delete('/delete/:recipeId', async (req, res) => {
  try {
    await recipeImagesService.deleteFileFromGridFS(req.params.recipeId);
    res.status(200).send('Datei erfolgreich gelöscht');
  } catch (error) {
    console.error('Fehler beim Löschen der Datei: ', error);
    res.status(500).send('Interner Serverfehler');
  }
});

module.exports = router;
