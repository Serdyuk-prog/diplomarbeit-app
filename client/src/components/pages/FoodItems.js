import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import Loader from "../ui/Loader";

function FoodItems() {
    const [foods, setFoods] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios
            .get("/api/food-items")
            .then((res) => {
                if (res.data) {
                    setFoods(res.data);
                    setIsLoading(false);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    if (isLoading) {
        return <Loader />;
    }
    return <div>Hello FoodItems</div>;
}

export default FoodItems;
