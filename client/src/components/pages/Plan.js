import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

import Loader from "../ui/Loader";
import DayCard from "../plan/DayCard";

function Plan() {
    const [plan, setPlan] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [dailyMR, setDailyMR] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("/api/plans/" + id)
            .then((res) => {
                if (res.data) {
                    setPlan(res.data);
                    axios
                        .get("/api/dailymr")
                        .then((res) => {
                            if (res.data) {
                                setDailyMR(res.data);
                                setIsLoading(false);
                            }
                        })
                        .catch((err) => console.log(err));
                }
            })
            .catch((err) => console.log(err));
    }, [id, plan]);

    // handle delete food
    const handleDelete = () => {
        axios
            .delete("/api/plan", {
                data: {
                    plan_id: plan._id,
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            })
            .then((response) => {
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    if (isLoading) {
        return <Loader />;
    }
    return (
        <>
            <Container>
                <Row className="mt-3">
                    <Row className="justify-content-md-center">
                        <Col>
                            <h1>{plan.name}</h1>
                        </Col>
                        <Col className="d-flex flex-row-reverse">
                            <Button
                                variant="danger"
                                size="md"
                                onClick={handleDelete}
                            >
                                Удалить план
                            </Button>
                        </Col>
                    </Row>
                    {Object.keys(dailyMR).length === 0 && (
                        <Row>
                            <Alert
                                key="warning"
                                variant="warning"
                                className="ms-2"
                            >
                                Суточная потребность в макроэлементах еще не
                                рассчитана! Пройдите тест!
                            </Alert>
                        </Row>
                    )}
                    {Object.keys(dailyMR).length !== 0 && (
                        <>
                            <h4>Цель:</h4>
                            <p>
                                Калории: {dailyMR.calories} | Белки:{" "}
                                {dailyMR.protein} | Жиры: {dailyMR.fats} |
                                Углеводы: {dailyMR.carbs}
                            </p>
                        </>
                    )}
                </Row>
                <Row>
                    {Object.keys(plan).length !== 0 &&
                        plan.dayPlans.map((day) => {
                            return (
                                <DayCard
                                    key={day._id}
                                    dayPlan={day}
                                    dailyMR={dailyMR}
                                    setPlan={setPlan}
                                />
                            );
                        })}
                </Row>
            </Container>
        </>
    );
}

export default Plan;
