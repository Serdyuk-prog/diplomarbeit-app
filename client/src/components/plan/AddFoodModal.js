import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";

function AddFoodModal(props) {
    const { show, handleClose, meal, setPlan } = props;
    const [searchTerm, setSearchTerm] = useState("");
    const [foods, setFoods] = useState([{}]);
    const meal_id = meal._id;

    useEffect(() => {
        axios
            .get("/api/food-items")
            .then((res) => {
                if (res.data) {
                    setFoods(res.data);
                }
            })
            .catch((err) => console.log(err));
    }, [foods]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    let filteredData = [];
    if (Object.keys(foods[0]).length !== 0) {
        filteredData = foods
            .filter((item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .slice(0, 10);
    }

    const handleAdd = (food_id) => {
        axios
            .post(
                "/api/add-food",
                {
                    meal_id: meal_id,
                    food_id: food_id,
                },
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            )
            .then((response) => {
                setPlan({});
                handleClose();
            })
            .catch((err) => {
                console.log(err);
                handleClose();
            });
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Добавление блюда в план</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input
                    type="text"
                    class="form-control"
                    placeholder="Поиск по названию"
                    value={searchTerm}
                    onChange={handleSearch}
                />

                <ListGroup className="mt-2">
                    {filteredData.map((item) => (
                        <ListGroup.Item
                            action
                            key={item._id}
                            onClick={() => {
                                handleAdd(item._id);
                            }}
                        >
                            {item.name}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Modal.Body>
        </Modal>
    );
}

export default AddFoodModal;
