import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

function App() {
    const [recipes, setRecipes] = useState([{}]);

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
        <div></div>
    );
}

export default App;
