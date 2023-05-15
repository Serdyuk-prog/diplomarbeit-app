import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function RecipeModal(props) {
    const { show, handleClose, handleEdit, handleDelete, food } = props;
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{food.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {food.recipe && (
                    <div>
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

export default RecipeModal;
