import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Loader from "../ui/Loader";
import DayCard from "../plan/DayCard";

function Plan() {
    const [plan, setPlan] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [dailyMR, setDailyMR] = useState({});
    const { id } = useParams();

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

    if (isLoading) {
        return <Loader />;
    }
    return (
        <>
            <Container>
                <Row className="mt-2">
                    <h1>{plan.name}</h1>
                    <h4>Цель:</h4>
                    <p>
                        Калории: {dailyMR.calories} | Белки: {dailyMR.protein} |{" "}
                        Жиры: {dailyMR.fats} | Углеводы: {dailyMR.carbs}
                    </p>
                </Row>
                <Row>
                    {plan.dayPlans.map((day) => {
                        return (
                            <DayCard
                                key={day._id}
                                dayPlan={day}
                                dailyMR={dailyMR}
                            />
                        );
                    })}
                </Row>
            </Container>
        </>
    );
}

export default Plan;
