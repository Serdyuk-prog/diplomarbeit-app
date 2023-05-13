import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Loader from "../ui/Loader";

function Plan() {
    const [plan, setPlan] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        axios
            .get("/api/plans/" + id)
            .then((res) => {
                if (res.data) {
                    setPlan(res.data);
                    setIsLoading(false);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    if (isLoading) {
        return <Loader />;
    }
    return <div>Hello plan</div>;
}

export default Plan;
