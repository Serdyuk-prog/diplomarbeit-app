const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MealSchema = new Schema({
    name: String,
    dishes: [
        {
            type: Schema.Types.ObjectId,
            ref: "FoodItem",
        },
    ],
});

module.exports = mongoose.model("Meal", MealSchema);
