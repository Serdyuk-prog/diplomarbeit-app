const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DailyMRSchema = new Schema({
    calories: Number,
    protein: Number,
    fats: Number,
    carbs: Number,
});

module.exports = mongoose.model("DailyMR", DailyMRSchema);
