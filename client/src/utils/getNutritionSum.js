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
            nutritionSum.calories += Math.round(
                parseInt(food.calories) * ratio
            );
            nutritionSum.protein += Math.round(parseInt(food.protein) * ratio);
            nutritionSum.fats += Math.round(parseInt(food.fats) * ratio);
            nutritionSum.carbs += Math.round(parseInt(food.carbs) * ratio);
        }
    }
    return nutritionSum;
}
