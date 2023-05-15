import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function NewFoodModal(props) {
    const { show, handleClose, handleSubmit } = props;
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Новое блюдо</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Название</Form.Label>
                        <Form.Control required type="text" name="name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formSize">
                        <Form.Label>Размер порции в граммах</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            name="servingSize"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formCalories">
                        <Form.Label>Калории на 100 грамм</Form.Label>
                        <Form.Control required type="number" name="calories" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formProtein">
                        <Form.Label>Протеин на 100 грамм</Form.Label>
                        <Form.Control required type="number" name="protein" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formFats">
                        <Form.Label>Жиры на 100 грамм</Form.Label>
                        <Form.Control required type="number" name="fats" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formCarbs">
                        <Form.Label>Углеводы на 100 грамм</Form.Label>
                        <Form.Control required type="number" name="carbs" />
                    </Form.Group>

                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary" type="submit">
                        Сохранить
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default NewFoodModal;
