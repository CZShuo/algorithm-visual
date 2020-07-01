import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./index.css";
import {
    bubbleSort,
    insertionSort,
    selectionSort,
    mergeSort,
    quickSort,
    heapSort,
    librarySort
} from "./sorting-algorithms";
// const Algo = require("./sorting-algorithms.js");

const Main = (props) => {
    const [array, setArray] = useState([[0,9], [1,23], [2,1], [3,5], [4,90], [5,32]]);
    console.log(mergeSort(array));
    return (
        <div className="array">
            {array.map((element, index) => {
                return (
                    <div key={index} className="element">
                        <div
                            className="bar"
                            style={{ height: element[1] + "px" }}
                        ></div>
                        <div className="value">
                            {element[1]}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

ReactDOM.render(<Main />, document.getElementById("root"));
