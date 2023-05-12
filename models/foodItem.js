const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Recipe = require("./recipe");

const FoodItemSchema = new Schema({
    name: String,
    servingSize: Number,
    calories: Number,
    protein: Number,
    fats: Number,
    carbs: Number,
    recipe: {
        type: Schema.Types.ObjectId,
        ref: "Recipe",
    },
});

FoodItemSchema.post("findOneAndDelete", async function (doc) {
    if (doc) {
        await Recipe.deleteOne({
            _id: {
                $in: doc.recipe,
            },
        });
    }
});

module.exports = mongoose.model("FoodItem", FoodItemSchema);