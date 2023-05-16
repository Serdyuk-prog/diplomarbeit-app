import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { getNutritionSum } from "../../utils/getNutritionSum";
import AddMealModal from "./AddMealModal";
import MealEditModal from "./MealEditModal";
import AddFoodModal from "./AddFoodModal";
import FoodModal from "./FoodModal";

function DayCard(props) {
    const { dayPlan, plan, dailyMR, setPlan } = props;
    const [nutritionSum, setNutritionSum] = useState({});
    const [meal, setMeal] = useState({});
    const [food, setFood] = useState({});
    const [colors, setColors] = useState({
        calories: "secondary",
        protein: "secondary",
        fats: "secondary",
        carbs: "secondary",
    });

    const getColor = (value, target) => {
        const lowerBound = target - target * 0.05;
        const upperBound = target + target * 0.05;
        return value < lowerBound
            ? "secondary"
            : value > upperBound
            ? "danger"
            : "success";
    };

    const [showMealNew, setShowMealNew] = useState(false);
    const handleCloseMealNew = () => setShowMealNew(false);
    const handleShowMealNew = () => setShowMealNew(true);

    const [showMealEdit, setShowMealEdit] = useState(false);
    const handleCloseMealEdit = () => setShowMealEdit(false);
    const handleShowMealEdit = () => setShowMealEdit(true);

    const [showFood, setShowFood] = useState(false);
    const handleCloseFood = () => setShowFood(false);
    const handleShowFood = () => setShowFood(true);

    const [showFoodAdd, setShowFoodAdd] = useState(false);
    const handleCloseFoodAdd = () => setShowFoodAdd(false);
    const handleShowFoodAdd = () => setShowFoodAdd(true);

    useEffect(() => {
        setNutritionSum(getNutritionSum(dayPlan));
        let temp = {};
        for (let param in colors) {
            temp[param] = getColor(nutritionSum[param], dailyMR[param]);
        }
        setColors(temp);
    }, [colors, dailyMR, dayPlan, nutritionSum, plan]);

    const handleSubmitNewMeal = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        axios
            .post(
                "/api/add-meal",
                {
                    name: data.name,
                    day_id: dayPlan._id,
                },
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            )
            .then((response) => {
                setPlan({});
                handleCloseMealNew();
            })
            .catch((err) => {
                console.log(err);
                handleCloseMealNew();
            });
    };

    const handleSubmitEditMeal = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        const { name } = data;
        axios
            .put(
                "/api/meal",
                {
                    meal_id: meal._id,
                    name,
                },
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            )
            .then((response) => {
                setPlan({});
                handleCloseMealEdit();
            })
            .catch((err) => {
                console.log(err);
                handleCloseMealEdit();
            });
    };

    const handleDeleteFood = () => {
        axios
            .delete("/api/meal/food-item", {
                data: {
                    meal_id: meal._id,
                    food_id: food._id,
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            })
            .then((response) => {
                handleCloseFood();
            })
            .catch((err) => {
                console.log(err);
                handleCloseFood();
            });
    };

    const handleDeleteMeal = () => {
        axios
            .delete("/api/meal", {
                data: {
                    meal_id: meal._id,
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            })
            .then((response) => {
                handleCloseMealEdit();
            })
            .catch((err) => {
                console.log(err);
                handleCloseMealEdit();
            });
    };

    return (
        <>
            <Card style={{ width: "22rem" }} className="m-2 mt-2">
                <Card.Body>
                    <Card.Title>День №{dayPlan.dayNumber + 1}</Card.Title>
                    {Object.keys(dailyMR).length !== 0 && (
                        <Card.Subtitle className="text-muted d-flex justify-content-between mt-1">
                            <Badge pill bg={colors.calories}>
                                К: {nutritionSum.calories}
                            </Badge>
                            <Badge pill bg={colors.protein}>
                                Б: {nutritionSum.protein}
                            </Badge>
                            <Badge pill bg={colors.fats}>
                                Ж: {nutritionSum.fats}
                            </Badge>
                            <Badge pill bg={colors.carbs}>
                                У: {nutritionSum.carbs}
                            </Badge>
                        </Card.Subtitle>
                    )}
                </Card.Body>
                <Card.Body>
                    <ListGroup>
                        {dayPlan.meals.map((meal) => {
                            return (
                                <ListGroup.Item
                                    action
                                    key={meal._id}
                                    onClick={() => {
                                        setMeal(meal);
                                        handleShowMealEdit();
                                    }}
                                >
                                    {meal.name}
                                    <Col>
                                        <Row sm={2}>
                                            {meal.dishes.map((food) => {
                                                return (
                                                    <Button
                                                        variant="outline-secondary"
                                                        size="sm"
                                                        className="m-1 ms-2"
                                                        key={food._id}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setMeal(meal);
                                                            setFood(food);
                                                            handleShowFood();
                                                        }}
                                                    >
                                                        {food.name}
                                                    </Button>
                                                );
                                            })}
                                            <Button
                                                variant="outline-primary"
                                                size="sm"
                                                className="m-1 ms-2"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setMeal(meal);
                                                    handleShowFoodAdd();
                                                }}
                                            >
                                                Добавить блюдо
                                            </Button>
                                        </Row>
                                    </Col>
                                </ListGroup.Item>
                            );
                        })}
                        <ListGroup.Item className="d-grid gap-2">
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={handleShowMealNew}
                            >
                                Добавить прием пищи
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
            <AddMealModal
                show={showMealNew}
                handleClose={handleCloseMealNew}
                handleSubmit={handleSubmitNewMeal}
                dayNumber={dayPlan.dayNumber + 1}
            />
            <MealEditModal
                show={showMealEdit}
                handleClose={handleCloseMealEdit}
                handleSubmit={handleSubmitEditMeal}
                handleDelete={handleDeleteMeal}
                meal={meal}
            />
            <AddFoodModal
                show={showFoodAdd}
                handleClose={handleCloseFoodAdd}
                meal={meal}
                setPlan={setPlan}
            />
            <FoodModal
                show={showFood}
                handleClose={handleCloseFood}
                food={food}
                handleDelete={handleDeleteFood}
            />
        </>
    );
}

export default DayCard;
