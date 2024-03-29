import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function FoodModal(props) {
    const { show, handleClose, handleDelete, food } = props;
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
                {food.recipe && (
                    <div>
                        <h3>Рецепт</h3>
                        <p>
                            <b>Ингредиенты:</b>
                        </p>
                        <p>{food.recipe.ingredients}</p>
                        <p>
                            <b>Время готовки:</b> {food.recipe.preparationTime}
                        </p>
                        <p>
                            <b>Инструкция по приготовлению:</b>
                        </p>
                        <p>{food.recipe.instructions}</p>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleDelete}>
                    Удалить
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default FoodModal;
