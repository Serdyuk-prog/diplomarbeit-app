import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// gender, weight, height, age, activity, goal
function MRForm(props) {
    return (
        <Form onSubmit={props.handleSubmit}>
            <Form.Group className="mb-3" controlId="formGender">
                <Form.Label>Пол</Form.Label>
                <Form.Select name="gender" required>
                    <option value="m">Мужской</option>
                    <option value="f">Женский</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formWeight">
                <Form.Label>Вес в кг</Form.Label>
                <Form.Control required type="number" name="weight" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formHeight">
                <Form.Label>Рост в см</Form.Label>
                <Form.Control required type="number" name="height" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAge">
                <Form.Label>Возраст</Form.Label>
                <Form.Control required type="number" name="age" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formActivity">
                <Form.Label>Уровень активности</Form.Label>
                <Form.Select name="activity" required>
                    <option value="sedentary">
                        Сидячий образ жизни (мало упражнений или нет)
                    </option>
                    <option value="light">
                        Легкая активность (легкие упражнения 1–3 дня в неделю)
                    </option>
                    <option value="moderate">
                        Умеренно активный (умеренные физические нагрузки 3–5
                        дней в неделю)
                    </option>
                    <option value="very">
                        Очень активный (тяжелые упражнения 6-7 дней в неделю)
                    </option>
                    <option value="extra">
                        Сверхактивный (очень тяжелые упражнения или физическая
                        работа)
                    </option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGoal">
                <Form.Label>Цель</Form.Label>
                <Form.Select name="goal" required>
                    <option value="loss">Потеря веса</option>
                    <option value="gain">Набор мышечной массы</option>
                    <option value="training">
                        Занятие интенсивными тренировками на выносливость
                    </option>
                    <option value="maintenance">Поддержка текущего веса</option>
                </Form.Select>
            </Form.Group>

            <Button variant="secondary" onClick={props.handleClose}>
                Close
            </Button>
            <Button variant="primary" type="submit">
                Save Changes
            </Button>
        </Form>
    );
}

export default MRForm;
