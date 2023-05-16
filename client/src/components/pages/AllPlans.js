import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import PlanListItem from "../plan/PlanListItem";
import Loader from "../ui/Loader";

import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function AllPlans() {
    const [plans, setPlans] = useState([{}]);
    const [isLoading, setIsLoading] = useState(true);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        axios
            .post("/api/plan", data, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            })
            .then((response) => {
                setPlans([response.data]);
                handleClose();
            })
            .catch((err) => {
                console.log(err);
                handleClose();
            });
    };

    useEffect(() => {
        axios
            .get("/api/plans")
            .then((res) => {
                if (res.data) {
                    setPlans(res.data);
                    setIsLoading(false);
                }
            })
            .catch((err) => console.log(err));
    }, [plans]);

    if (isLoading) {
        return <Loader />;
    }
    return (
        <>
            <Container className="mt-4">
                <Row className="justify-content-md-center">
                    <Col>
                        <h1>All plans</h1>
                    </Col>
                    <Col className="d-flex flex-row-reverse">
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={handleShow}
                        >
                            Create plan
                        </Button>
                    </Col>
                </Row>

                <Row className="mt-3 justify-content-md-center" md={2}>
                    <ListGroup md={4}>
                        {plans.map((plan) => {
                            return <PlanListItem key={plan._id} plan={plan} />;
                        })}
                    </ListGroup>
                </Row>
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Новый план питания</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Название</Form.Label>
                            <Form.Control required type="text" name="name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPeriod">
                            <Form.Label>Количество дней</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                name="period"
                            />
                        </Form.Group>
                        <div className="d-flex flex-row-reverse">
                            <Button
                                variant="secondary"
                                onClick={handleClose}
                                className="ms-2"
                            >
                                Закрыть
                            </Button>
                            <Button variant="primary" type="submit">
                                Сохранить
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AllPlans;
