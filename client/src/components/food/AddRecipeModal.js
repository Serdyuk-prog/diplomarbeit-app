import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function AddRecipeModal(props) {
    const { show, handleClose, handleSubmit, food } = props;
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Рецепт для блюда "{food.name}"</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formIngredients">
                        <Form.Label>Ингредиенты</Form.Label>
                        <Form.Control
                            required
                            as="textarea"
                            name="ingredients"
                        />
                    </Form.Group>

                    <Form.Group
                        className="mb-3"
                        controlId="formPreparationTime"
                    >
                        <Form.Label>Время приготовления</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="preparationTime"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formInstructions">
                        <Form.Label>Инструкция по приготовлению</Form.Label>
                        <Form.Control
                            required
                            as="textarea"
                            name="instructions"
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

export default AddRecipeModal;
