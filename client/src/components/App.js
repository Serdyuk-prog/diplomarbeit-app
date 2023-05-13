import React from "react";
import { Routes, Route } from "react-router-dom";
import AllPlans from "./pages/AllPlans";
import FoodItems from "./pages/FoodItems";
import Plan from "./pages/Plan";
import Requirements from "./pages/Requirements";
import Layout from "./layout/Layout";

function App() {
    return (
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
