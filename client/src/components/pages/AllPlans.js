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

function AllPlans() {
    const [plans, setPlans] = useState([{}]);
    const [isLoading, setIsLoading] = useState(true);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
    }, []);

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
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Woohoo, you are reading this text in a modal!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AllPlans;
