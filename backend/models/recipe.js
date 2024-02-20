const mongoose = require('mongoose');  // Object data modeling library for MongoDB

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  numberOfPersons: {
    type: Number,
  },
  amounts: {
    type: [String],
  },
  ingredients: {
    type: [String],
  },
  description: {
    type: String,
  },
  keywords: {
    type: [String],
  },
  imageUploaded: {
    type: Boolean,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
