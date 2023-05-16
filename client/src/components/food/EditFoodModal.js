import React from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function EditFoodModal(props) {
    const { show, handleClose, handleSubmit, food } = props;
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Изменение блюда "{food.name}"</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Название</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="name"
                            defaultValue={food.name}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formSize">
                        <Form.Label>Размер порции в граммах</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            name="servingSize"
                            defaultValue={food.servingSize}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formCalories">
                        <Form.Label>Калории на 100 грамм</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            name="calories"
                            defaultValue={food.calories}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formProtein">
                        <Form.Label>Протеин на 100 грамм</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            name="protein"
                            defaultValue={food.protein}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formFats">
                        <Form.Label>Жиры на 100 грамм</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            name="fats"
                            defaultValue={food.fats}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formCarbs">
                        <Form.Label>Углеводы на 100 грамм</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            name="carbs"
                            defaultValue={food.carbs}
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
    );
}

export default EditFoodModal;
