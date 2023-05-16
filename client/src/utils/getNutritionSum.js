export function getNutritionSum(dayPlan) {
    let nutritionSum = {
        calories: 0,
        protein: 0,
        fats: 0,
        carbs: 0,
    };
    for (let meal of dayPlan.meals) {
        for (let food of meal.dishes) {
            const ratio = parseInt(food.servingSize) / 100;
            nutritionSum.calories += parseInt(food.calories) * ratio;
            nutritionSum.protein += parseInt(food.protein) * ratio;
            nutritionSum.fats += parseInt(food.fats) * ratio;
            nutritionSum.carbs += parseInt(food.carbs) * ratio;
        }
    }
    return nutritionSum;
}
