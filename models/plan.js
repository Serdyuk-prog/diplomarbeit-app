const mongoose = require("mongoose");
const DayPlan = require("./dayPlan");
const Schema = mongoose.Schema;

const PlanSchema = new Schema({
    name: String,
    numOfDays: Number,
    dayPlans: [
        {
            type: Schema.Types.ObjectId,
            ref: "DayPlan",
        },
    ],
});

// PlanSchema.post("findOneAndDelete", async function (doc) {
//     if (doc) {
//         await DayPlan.deleteMany({
//             _id: {
//                 $in: doc.dayPlans,
//             },
//         });
//     }
// });


module.exports = mongoose.model("Plan", PlanSchema);
