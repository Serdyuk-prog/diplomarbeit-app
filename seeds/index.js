const mongoose = require("mongoose");
const Plan = require("../models/plan");
const DayPlan = require("../models/dayPlan");
const Meal = require("../models/meal");
const DailyMR = require("../models/dailyMR");
const FoodItem = require("../models/foodItem");
const Recipe = require("../models/recipe");

mongoose
    .connect("mongodb://localhost:27017/diplomarbeit")
    .then(() => {
        console.log("MONGO CONNECTION OPEN!");
    })
    .catch((ERR) => {
        console.log("MONGO CONNECTION ERROR!", ERR);
    });

// const seedDB = async () => {
//     await Plan.deleteMany({});
//     for (let i = 0; i < 5; i++) {
//         const plan = new Plan({
//             title: `Plan #${i}`,
//         });
//         await plan.save();
//     }
// };

const seedDB = async () => {
    await Recipe.deleteMany({});
    await FoodItem.deleteMany({});
    await DailyMR.deleteMany({});
    await Meal.deleteMany({});
    await DayPlan.deleteMany({});
    await Plan.deleteMany({});

    const dailyMR = new DailyMR({
        calories: 2000,
        protein: 1000,
        fats: 500,
        carbs: 500,
    });

    await dailyMR.save();

    const plan = new Plan({
        name: "Plan #1",
        numOfDays: 7,
    });

    await plan.save();

    for (let i = 0; i < plan.numOfDays; i++) {
        const dayPlan = new DayPlan({
            dayNumber: i,
        });
        for (let j = 0; j < 3; j++) {
            const meal = new Meal({ name: `Meal #${j}` });
            for (let f = 0; f < 2; f++) {
                let foodItem = new FoodItem({
                    name: `foodName${i}${j}${f}`,
                    servingSize: 300,
                    calories: 300,
                    protein: 100,
                    fats: 100,
                    carbs: 100,
                    recipe: null,
                });
                const recipe = new Recipe({
                    ingredients: "String",
                    preparationTime: "String",
                    instructions: "String",
                });
                if (f != 0) {
                    foodItem.recipe = recipe;
                }
                await recipe.save();

                meal.dishes.push(foodItem);
                await foodItem.save();
            }
            dayPlan.meals.push(meal);
            await meal.save();
        }
        plan.dayPlans.push(dayPlan);
        await dayPlan.save();
    }

    await plan.save();
};

seedDB().then(() => {
    mongoose.connection.close();
});
