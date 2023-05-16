import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function MealEditModal(props) {
    const { show, handleClose, handleSubmit, handleDelete, meal } = props;
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Изменение приема пищи "{meal.name}"</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Название</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="name"
                            defaultValue={meal.name}
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
                        <Button
                            variant="danger"
                            onClick={handleDelete}
                            className="ms-2"
                        >
                            Удалить
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

export default MealEditModal;
