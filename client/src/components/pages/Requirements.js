import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";

import Loader from "../ui/Loader";
import MRForm from "../dailyMR/MRForm";

function Requirements() {
    const [dailyMR, setDailyMR] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        console.log(data);
        axios
            .post(
                "/api/dailymr",
                {
                    gender: data.gender,
                    weight: data.weight,
                    height: data.height,
                    age: data.age,
                    activity: data.activity,
                    goal: data.goal,
                },
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            )
            .then((response) => {
                setDailyMR(response.data);
                setShow(false);
            })
            .catch((err) => {
                console.log(err);
                setShow(false);
            });
    };

    useEffect(() => {
        axios
            .get("/api/dailymr")
            .then((res) => {
                if (res.data) {
                    setDailyMR(res.data);
                    setIsLoading(false);
                }
            })
            .catch((err) => console.log(err));
    }, [dailyMR]);

    if (isLoading) {
        return <Loader />;
    }
    return (
        <>
            <Container className="mt-4 justify-content-md-center">
                {Object.keys(dailyMR).length === 0 && (
                    <Row md={2}>
                        <Alert key="warning" variant="warning">
                            Daily macronutrient requirements wasn't calculated
                            yet! Take a test!
                        </Alert>
                    </Row>
                )}
                <Row md={2}>
                    <Button variant="primary" size="lg" onClick={handleShow}>
                        Пройти тест
                    </Button>
                </Row>
                {Object.keys(dailyMR).length !== 0 && (
                    <Row md={2} className="mt-4">
                        <ListGroup as="ul">
                            <ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start"
                            >
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">Калории</div>
                                    {dailyMR.calories} калории
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start"
                            >
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">Белки</div>
                                    {dailyMR.protein} грамм
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start"
                            >
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">Жиры</div>
                                    {dailyMR.fats} грамм
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start"
                            >
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">Углеводы</div>
                                    {dailyMR.carbs} грамм
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                    </Row>
                )}
                {/* // TODO display dailyMR */}
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <MRForm
                        handleClose={handleClose}
                        handleSubmit={handleSubmit}
                    />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Requirements;
