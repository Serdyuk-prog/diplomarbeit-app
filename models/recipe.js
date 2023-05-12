const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    ingredients: String,
    preparationTime: String,
    instructions: String,
});

module.exports = mongoose.model("Recipe", RecipeSchema);
