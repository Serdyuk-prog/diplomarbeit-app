import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

import { useNavigate } from "react-router-dom";

function PlanListItem(props) {
    const navigate = useNavigate();

    const onNavigate = () => {
        navigate(`/plan/${props.plan._id}`);
    };
    return (
        <ListGroup.Item action onClick={onNavigate}>
            {props.plan.name}
        </ListGroup.Item>
    );
}

export default PlanListItem;
