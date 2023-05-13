import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Loader from "../ui/Loader";

function Requirements() {
    const [dailyMR, setDailyMR] = useState({});
    const [isLoading, setIsLoading] = useState(true);

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
    }, []);

    if (isLoading) {
        return <Loader />;
    }
    // if (dailyMR !== {}) {
    //     console.log("mr is no more");
    // }
    return (
        <Container>
            <Row md={2}>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Row>
        </Container>
    );
}

export default Requirements;
