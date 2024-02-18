const mongoose = require('mongoose');  // Object data modeling library for MongoDB

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  numberOfPersons: {
    type: Number,
    required: true,
  },
  amounts: {
    type: [String],
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  keywords: {
    type: [String],
    required: true,
  },
  imageName: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
