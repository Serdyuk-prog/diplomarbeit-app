import axios from "axios";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AllPlans from "./pages/AllPlans";
import FoodItems from "./pages/FoodItems";
import Plan from "./pages/Plan";
import Requirements from "./pages/Requirements";
import Layout from "./layout/Layout";

function App() {
    // const [recipes, setRecipes] = useState([{}]);

    // useEffect(() => {
    //     axios
    //         .get("/api/")
    //         .then((res) => {
    //             if (res.data) {
    //                 console.log(res.data);
    //                 setRecipes(res.data);
    //             }
    //         })
    //         .catch((err) => console.log(err));
    // });

    return (
        // <div className="App">
        //   <header className="App-header">
        //     <img src={logo} className="App-logo" alt="logo" />
        //     <p>
        //       Edit <code>src/App.js</code> and save to reload.
        //     </p>
        //     <a
        //       className="App-link"
        //       href="https://reactjs.org"
        //       target="_blank"
        //       rel="noopener noreferrer"
        //     >
        //       Learn React
        //     </a>
        //   </header>
        // </div>
        // <div>{recipes[0].name}</div>
        <Layout>
            <Routes>
                <Route path="/" element={<AllPlans />} />
                <Route path="/plan/:id" element={<Plan />} />
                <Route path="/requirements" element={<Requirements />} />
                <Route path="/foods" element={<FoodItems />} />
            </Routes>
        </Layout>
    );
}

export default App;
