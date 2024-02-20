const express = require("express");
const cors = require("cors");

const authRoutes = require('./routes/auth');
const recipesRoutes = require('./routes/recipes');
const recipeImagesRoutes = require('./routes/recipeImages');
const recipesService = require('./services/recipesService');

const app = express(); // Create new express 'app'
const PORT = 3001;

const corsOptions = {
  origin: ["http://localhost:3000"],
  methods: "GET, POST, PUT, DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/recipes', recipesRoutes);
app.use('/recipeImages', recipeImagesRoutes);

recipesService.connectToDatabase();

process.on('SIGINT', () => {
  recipesService.closeDatabaseConnection();
  process.exit();
});

app.get("/", (req, res) => {
  res.send("Willkommen!");
});

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
