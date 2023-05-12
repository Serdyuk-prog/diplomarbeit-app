const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");

const Plan = require("./models/plan");
const DayPlan = require("./models/dayPlan");
const Meal = require("./models/meal");
const DailyMR = require("./models/dailyMR");
const FoodItem = require("./models/foodItem");
const Recipe = require("./models/recipe");

mongoose
    .connect("mongodb://localhost:27017/diplomarbeit")
    .then(() => {
        console.log("MONGO CONNECTION OPEN!");
    })
    .catch((ERR) => {
        console.log("MONGO CONNECTION ERROR!", ERR);
    });

const db = mongoose.connection;
const app = express();

app.use(express.urlencoded({ extended: true }));

// get all plans
app.get(
    "/api/plans",
    catchAsync(async (req, res) => {
        const plans = await Plan.find({});
        res.send(plans);
    })
);

// get a single plan
app.get(
    "/api/plans/:id",
    catchAsync(async (req, res) => {
        const plan = await Plan.findById(req.params.id).populate({
            path: "dayPlans",
            populate: {
                path: "meals",
                populate: {
                    path: "dishes",
                },
            },
        });
        res.send(plan);
    })
);

// get all food-items
app.get(
    "/api/food-items",
    catchAsync(async (req, res) => {
        const food_items = await FoodItem.find({});
        res.send(food_items);
    })
);

// get a single food-item
app.get(
    "/api/food-items/:id",
    catchAsync(async (req, res) => {
        const food_item = await FoodItem.findById(req.params.id).populate(
            "recipe"
        );
        res.send(food_item);
    })
);

// get dailymr
app.get(
    "/api/dailymr",
    catchAsync(async (req, res) => {
        const dailymr = await DailyMR.findOne({});
        res.send(dailymr);
    })
);

// create a new blank plan
app.post(
    "/api/plan",
    catchAsync(async (req, res) => {
        const { name, period } = req.body;
        const plan = new Plan({
            name: name,
            numOfDays: period,
        });
        for (let i = 0; i < plan.numOfDays; i++) {
            const dayPlan = new DayPlan({
                dayNumber: i,
            });
            plan.dayPlans.push(dayPlan);
            await dayPlan.save();
        }
        await plan.save();
        res.send(plan);
    })
);

// add meal to a plan
app.post(
    "/api/add-meal",
    catchAsync(async (req, res) => {
        const { name, day_id } = req.body;
        const dayPlan = await DayPlan.findById(day_id);
        const meal = new Meal({ name: name });
        dayPlan.meals.push(meal);
        await meal.save();
        await dayPlan.save();
        res.send(meal);
    })
);

// add food item to a meal
app.post(
    "/api/add-food",
    catchAsync(async (req, res) => {
        const { meal_id, food_id } = req.body;
        const meal = await Meal.findById(meal_id);
        const foodItem = await FoodItem.findById(food_id);
        meal.dishes.push(foodItem);
        await meal.save();
        res.send(meal);
    })
);

// add food item to the db
app.post(
    "/api/food-item",
    catchAsync(async (req, res) => {
        const { name, servingSize, calories, protein, fats, carbs } = req.body;
        const food_item = new FoodItem({
            name: name,
            servingSize: servingSize,
            calories: calories,
            protein: protein,
            fats: fats,
            carbs: carbs,
            recipe: null,
        });
        await food_item.save();
        res.send(food_item);
    })
);

// add recipe to a food item
app.post(
    "/api/add-recipe",
    catchAsync(async (req, res) => {
        const { food_id, ingredients, preparationTime, instructions } =
            req.body;
        const recipe = new Recipe({
            ingredients: ingredients,
            preparationTime: preparationTime,
            instructions: instructions,
        });
        let foodItem = await FoodItem.findById(food_id);
        foodItem.recipe = recipe;
        await foodItem.save();
        await recipe.save();
        res.send(foodItem);
    })
);

//calculate and save dailyMR
// TODO

// edit food item data (needs testing)
app.put(
    "/api/food-item",
    catchAsync(async (req, res) => {
        const { food_id, name, servingSize, calories, protein, fats, carbs } =
            req.body;
        const new_data = {
            name: name,
            servingSize: servingSize,
            calories: calories,
            protein: protein,
            fats: fats,
            carbs: carbs,
        };

        const food_item = await FoodItem.findByIdAndUpdate(food_id, {
            ...new_data,
        });
        await food_item.save();
        res.send(await FoodItem.findById(food_id));
    })
);

// edit recipe
app.put(
    "/api/recipe",
    catchAsync(async (req, res) => {
        const { recipe_id, ingredients, preparationTime, instructions } =
            req.body;
        const new_data = {
            ingredients: ingredients,
            preparationTime: preparationTime,
            instructions: instructions,
        };
        const recipe = await Recipe.findByIdAndUpdate(recipe_id, {
            ...new_data,
        });
        await recipe.save();
        res.send(await Recipe.findById(recipe_id));
    })
);

// delete plan
app.delete(
    "/api/plan",
    catchAsync(async (req, res) => {
        const { plan_id } = req.body;
        await Plan.findByIdAndDelete(plan_id);
        res.send(200);
    })
);

// delete food item in a meal
app.delete(
    "/api/meal/food-item",
    catchAsync(async (req, res) => {
        const { meal_id, food_id } = req.body;
        const meal = await Meal.findById(meal_id);
        await meal.dishes.pull({ _id: food_id });
        await meal.save();
        res.send(200);
    })
);

// delete meal
app.delete(
    "/api/meal",
    catchAsync(async (req, res) => {
        const { meal_id } = req.body;
        await Meal.findByIdAndDelete(meal_id);
        res.send(200);
    })
);

// delete food item in a bd
app.delete(
    "/api/food-item",
    catchAsync(async (req, res) => {
        const { food_id } = req.body;
        await FoodItem.findByIdAndDelete(food_id);
        res.send(200);
    })
);

// delete recipe
app.delete(
    "/api/recipe",
    catchAsync(async (req, res) => {
        const { recipe_id } = req.body;
        await Recipe.findByIdAndDelete(recipe_id);
        res.send(200);
    })
);

// delete dailyMR

app.all("*", (req, res, next) => {
    next(new ExpressError("Page Not Found!", 404));
});

app.use((err, req, res, next) => {
    if (!err.message) err.message = "Something went wrong!";
    if (!err.status) err.status = 500;
    const { status } = err;
    res.send(err);
});

app.listen(5000, () => {
    console.log("Listening оn port 5000");
});