import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function FoodInfoModal(props) {
    const { show, handleClose, handleEdit, handleDelete, food } = props;
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{food.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ul>
                    <li>Калории: {food.calories}</li>
                    <li>Протеин: {food.protein}</li>
                    <li>Жиры: {food.fats}</li>
                    <li>Углеводы: {food.carbs}</li>
                </ul>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="warning"
                    onClick={() => {
                        handleClose();
                        handleEdit();
                    }}
                >
                    Изменить
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Удалить
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default FoodInfoModal;
