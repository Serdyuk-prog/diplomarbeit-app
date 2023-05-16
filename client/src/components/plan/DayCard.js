import React from "react";
import { useState, useEffect } from "react";

import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { getNutritionSum } from "../../utils/getNutritionSum";

function DayCard(props) {
    const { dayPlan, plan, dailyMR } = props;
    const [nutritionSum, setNutritionSum] = useState({});
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

    useEffect(() => {
        setNutritionSum(getNutritionSum(dayPlan));
        let temp = {};
        for (let param in colors) {
            temp[param] = getColor(nutritionSum[param], dailyMR[param]);
        }
        setColors(temp);
    }, [colors, dailyMR, dayPlan, nutritionSum, plan]);

    return (
        <Card style={{ width: "22rem" }} className="m-2 mt-2">
            <Card.Body>
                <Card.Title>День №{dayPlan.dayNumber + 1}</Card.Title>
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
            </Card.Body>
            <Card.Body>
                <ListGroup>
                    {dayPlan.meals.map((meal) => {
                        return (
                            <ListGroup.Item action>
                                {meal.name}
                                <Col>
                                    <Row sm={2}>
                                        {meal.dishes.map((food) => {
                                            return (
                                                <Button
                                                    variant="outline-secondary"
                                                    size="sm"
                                                    className="m-1 ms-2"
                                                >
                                                    {food.name}
                                                </Button>
                                            );
                                        })}
                                        <Button
                                            variant="outline-primary"
                                            size="sm"
                                            className="m-1 ms-2"
                                        >
                                            Добавить блюдо
                                        </Button>
                                    </Row>
                                </Col>
                            </ListGroup.Item>
                        );
                    })}
                    <ListGroup.Item className="d-grid gap-2">
                        <Button variant="primary" size="sm">
                            Добавить прием пищи
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    );
}

export default DayCard;
