import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./foodItems.css";

import FoodInfoModal from "../food/FoodInfoModal";
import NewFoodModal from "../food/NewFoodModal";

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

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        console.log(data);
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
                                            <Button variant="outline-primary">
                                                Рецепт
                                            </Button>
                                        )}
                                        {!food.recipe && (
                                            <Button variant="outline-danger">
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
            />
            <NewFoodModal
                show={showNew}
                handleClose={handleCloseNew}
                handleSubmit={handleSubmit}
            />
        </>
    );
}

export default FoodItems;
