const express = require("express");
const router = express.Router();

const recipesService = require("../services/recipesService");
const recipeImagesService = require("../services/recipeImagesService");

router.get("/loadRecipes/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const recipes = await recipesService.loadRecipes(userId);
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).send("Fehler beim Laden der Rezepte: ", error);
  }
});

router.post("/saveRecipe", async (req, res) => {
  const recipe = req.body;
  try {
    const recipeId = await recipesService.saveRecipe(recipe);
    res.status(200).json(recipeId);
  } catch (error) {
    res.status(500).send("Fehler beim Speichern des Rezepts: ", error);
  }
});

router.put("/update/:id", async (req, res) => {
  const recipe = req.body;
  const recipeId = req.params.id;
  try {
    await recipesService.updateRecipe(recipeId, recipe);
    res.status(200).send("Rezept erfolgreich aktualisiert");
  } catch (error) {
    res.status(500).send("Fehler beim Aktualisieren des Rezepts: ", error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  const recipeId = req.params.id;
  try {
    await recipesService.deleteRecipe(recipeId);
    res.status(200).send("Rezept erfolgreich gelöscht");
  } catch (error) {
    res.status(500).send("Fehler beim Löschen des Rezepts: ", error);
  }
});

router.delete("/deleteAll/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    await recipesService.deleteAllRecipes(userId);
    await recipeImagesService.deleteAllImages(userId);
    res.status(200).send("Rezepte erfolgreich gelöscht");
  } catch (error) {
    res.status(500).send("Fehler beim Löschen der Rezepte: ", error);
  }
});

module.exports = router;
