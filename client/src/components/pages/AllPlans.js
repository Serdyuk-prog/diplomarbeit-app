import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function AllPlans() {
    const [plans, setPlans] = useState([{}]);

    // useEffect(() => {
    //     axios
    //         .get("/api/plans")
    //         .then((res) => {
    //             if (res.data) {
    //                 console.log(res.data);
    //                 setPlans(res.data);
    //             }
    //         })
    //         .catch((err) => console.log(err));
    // });
    return <div>Hello AllPlans</div>;
}

export default AllPlans;
