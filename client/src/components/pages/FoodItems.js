import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./foodItems.css";

import FoodInfoModal from "../food/FoodInfoModal";
import NewFoodModal from "../food/NewFoodModal";
import RecipeModal from "../food/RecipeModal";
import AddRecipeModal from "../food/AddRecipeModal";
import EditFoodModal from "../food/EditFoodModal";
import EditRecipeModal from "../food/EditRecipeModal";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import Loader from "../ui/Loader";

function FoodItems() {
    const [foods, setFoods] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [selectedFood, setSelectedFood] = useState({});

    const [showInfo, setShowInfo] = useState(false);
    const handleCloseInfo = () => setShowInfo(false);
    const handleShowInfo = (food) => {
        setShowInfo(true);
        setSelectedFood(food);
    };

    const [showNew, setShowNew] = useState(false);
    const handleCloseNew = () => setShowNew(false);
    const handleShowNew = () => setShowNew(true);

    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    const [showRecipe, setShowRecipe] = useState(false);
    const handleCloseRecipe = () => setShowRecipe(false);
    const handleShowRecipe = () => setShowRecipe(true);

    const [showAddRecipe, setShowAddRecipe] = useState(false);
    const handleCloseAddRecipe = () => setShowAddRecipe(false);
    const handleShowAddRecipe = () => setShowAddRecipe(true);

    const [showEditRecipe, setShowEditRecipe] = useState(false);
    const handleCloseEditRecipe = () => setShowEditRecipe(false);
    const handleShowEditRecipe = () => setShowEditRecipe(true);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        axios
            .post("/api/food-item", data, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            })
            .then((response) => {
                setFoods([response.data]);
                handleCloseNew();
            })
            .catch((err) => {
                console.log(err);
                handleCloseNew();
            });
    };

    const handleSubmitRecipe = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        axios
            .post(
                "/api/add-recipe",
                {
                    food_id: selectedFood._id,
                    ingredients: data.ingredients,
                    preparationTime: data.preparationTime,
                    instructions: data.instructions,
                },
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            )
            .then((response) => {
                setFoods([response.data]);
                handleCloseAddRecipe();
            })
            .catch((err) => {
                console.log(err);
                handleCloseAddRecipe();
            });
    };

    const handleSubmitEditFood = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        const { name, servingSize, calories, protein, fats, carbs } = data;
        axios
            .put(
                "/api/food-item",
                {
                    food_id: selectedFood._id,
                    name,
                    servingSize,
                    calories,
                    protein,
                    fats,
                    carbs,
                },
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            )
            .then((response) => {
                setFoods([response.data]);
                handleCloseEdit();
            })
            .catch((err) => {
                console.log(err);
                handleCloseEdit();
            });
    };

    // handle EDit recipe
    const handleSubmitEditRecipe = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        const { ingredients, preparationTime, instructions } = data;
        axios
            .put(
                "/api/recipe",
                {
                    recipe_id: selectedFood.recipe._id,
                    ingredients,
                    preparationTime,
                    instructions,
                },
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            )
            .then((response) => {
                setFoods([response.data]);
                handleCloseEditRecipe();
            })
            .catch((err) => {
                console.log(err);
                handleCloseEditRecipe();
            });
    };

    // handle delete recipe
    const handleDeleteRecipe = () => {
        console.log(selectedFood.recipe._id);
        axios
            .delete("/api/recipe", {
                data: {
                    recipe_id: selectedFood.recipe._id,
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            })
            .then((response) => {
                setFoods([]);
                handleCloseRecipe();
            })
            .catch((err) => {
                console.log(err);
                handleCloseRecipe();
            });
    };

    // handle delete food
    const handleDeleteFood = () => {
        axios
            .delete("/api/food-item", {
                data: {
                    food_id: selectedFood._id,
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            })
            .then((response) => {
                setFoods([]);
                handleCloseInfo();
            })
            .catch((err) => {
                console.log(err);
                handleCloseInfo();
            });
    };

    useEffect(() => {
        axios
            .get("/api/food-items")
            .then((res) => {
                if (res.data) {
                    setFoods(res.data);
                    setIsLoading(false);
                }
            })
            .catch((err) => console.log(err));
    }, [foods]);

    if (isLoading) {
        return <Loader />;
    }
    return (
        <>
            <Container className="mt-4">
                <Row className="justify-content-md-center">
                    <Col>
                        <h1>Ваши блюда</h1>
                    </Col>
                    <Col className="d-flex flex-row-reverse">
                        <Button
                            variant="primary"
                            size="md"
                            onClick={handleShowNew}
                        >
                            Добавить блюдо
                        </Button>
                    </Col>
                </Row>
                <Row className="mt-3 justify-content-md-center" md={3}>
                    {foods.map((food) => {
                        return (
                            <Card
                                className="m-1 Hover"
                                onClick={() => handleShowInfo(food)}
                                key={food._id}
                            >
                                <Card.Body>
                                    <Card.Title>{food.name}</Card.Title>
                                    <div className="d-flex justify-content-between">
                                        Калории: {food.calories}
                                        {food.recipe && (
                                            <Button
                                                variant="outline-primary"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedFood(food);
                                                    handleShowRecipe();
                                                }}
                                            >
                                                Рецепт
                                            </Button>
                                        )}
                                        {!food.recipe && (
                                            <Button
                                                variant="outline-danger"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedFood(food);
                                                    handleShowAddRecipe();
                                                }}
                                            >
                                                Добавить рецепт
                                            </Button>
                                        )}
                                    </div>
                                </Card.Body>
                            </Card>
                        );
                    })}
                </Row>
            </Container>
            <FoodInfoModal
                show={showInfo}
                handleClose={handleCloseInfo}
                food={selectedFood}
                handleEdit={handleShowEdit}
                handleDelete={handleDeleteFood}
            />
            <NewFoodModal
                show={showNew}
                handleClose={handleCloseNew}
                handleSubmit={handleSubmit}
            />
            <RecipeModal
                show={showRecipe}
                handleClose={handleCloseRecipe}
                food={selectedFood}
                handleEdit={handleShowEditRecipe}
                handleDelete={handleDeleteRecipe}
            />
            <AddRecipeModal
                show={showAddRecipe}
                handleClose={handleCloseAddRecipe}
                food={selectedFood}
                handleSubmit={handleSubmitRecipe}
            />
            <EditFoodModal
                show={showEdit}
                handleClose={handleCloseEdit}
                food={selectedFood}
                handleSubmit={handleSubmitEditFood}
            />
            <EditRecipeModal
                show={showEditRecipe}
                handleClose={handleCloseEditRecipe}
                food={selectedFood}
                handleSubmit={handleSubmitEditRecipe}
            />
        </>
    );
}

export default FoodItems;
