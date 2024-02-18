const express = require('express');
const router = express.Router();
const databaseMiddleware = require('../middlewares/recipesCollection');
const recipesService = require('../services/recipesService');

router.use(databaseMiddleware.connectToDatabase);

router.get('/loadRecipes', async (req, res) => {
  const userId = req.query.userId;
  try {
    await recipesService.connectToDatabase();
    const recipes = await recipesService.loadRecipes(userId);
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).send('Fehler beim Laden der Rezepte: ', error);
  } finally {
    await recipesService.closeDatabaseConnection();
  }
});

router.get('/loadRecipeById', async (req, res) => {
  const recipeId = req.query.id;
  try {
    await recipesService.connectToDatabase();
    const recipe = await recipesService.loadRecipeById(recipeId);
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).send('Fehler beim Laden des Rezepts: ', error);
  } finally {
    await recipesService.closeDatabaseConnection();
  }
});

router.post('/saveRecipe', async (req, res) => {
  const recipe = req.body;
  try {
    await recipesService.connectToDatabase();
    await recipesService.saveRecipe(recipe);
    res.status(200).send('Rezept erfolgreich gespeichert');
  } catch (error) {
    res.status(500).send('Fehler beim Speichern des Rezepts: ', error);
  } finally {
    await recipesService.closeDatabaseConnection();
  }
});

router.post('/updateRecipe', async (req, res) => {
  const recipe = req.body;
  const recipeId = req.query.id;
  try {
    await recipesService.connectToDatabase();
    await recipesService.updateRecipe(recipeId, recipe);
    res.status(200).send('Rezept erfolgreich aktualisiert');
  } catch (error) {
    res.status(500).send('Fehler beim Aktualisieren des Rezepts: ', error);
  } finally {
    await recipesService.closeDatabaseConnection();
  }
});

router.delete('/deleteRecipe', async (req, res) => {
  const recipeId = req.query.id;
  try {
    await recipesService.connectToDatabase();
    await recipesService.deleteRecipe(recipeId);
    res.status(200).send('Rezept erfolgreich gelöscht');
  } catch (error) {
    res.status(500).send('Fehler beim Löschen des Rezepts: ', error);
  } finally {
    await recipesService.closeDatabaseConnection();
  }
});

module.exports = router;
