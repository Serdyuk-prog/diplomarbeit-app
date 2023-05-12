const mongoose = require("mongoose");
const Meal = require("./meal");
const Schema = mongoose.Schema;

const DayPlanSchema = new Schema({
    dayNumber: Number,
    meals: [
        {
            type: Schema.Types.ObjectId,
            ref: "Meal",
        },
    ],
});

DayPlanSchema.post("findOneAndDelete", async function (doc) {
    if (doc) {
        await Meal.deleteMany({
            _id: {
                $in: doc.meals,
            },
        });
    }
});


module.exports = mongoose.model("DayPlan", DayPlanSchema);
