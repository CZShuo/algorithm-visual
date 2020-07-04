import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./index.css";
import {
    get,
    getClass,
    bubbleSort,
    insertionSort,
    selectionSort,
    mergeSort,
    quickSort,
    heapSort,
    librarySort,
    animation,
    doAnimation,
    clearAnimation,
} from "./sorting-algorithms";
// const Algo = require("./sorting-algorithms.js");

const Main = (props) => {
    const [array, setArray] = useState([
        [0, 45],
        [1, 72],
        [2, 17],
        [3, 55],
        [4, 90],
        [5, 32],
        [6, 48],
        [7, 23],
        [8, 66],
        [9, 99],
        [10, 12],
        [11, 62],
        [12, 34],
        [13, 84],
        [14, 10],
        [15, 70],
    ]);

    // console.log(mergeSort(array, 0));
    // console.log(array);
    return (
        <div className="array">
            <div className="bars">
                {array.map((element, index) => {
                    return (
                        <div key={index} className="element">
                            <div
                                className="bar"
                                style={{
                                    height: element[1] + "px",
                                }}
                            ></div>
                            <div className="value">{element[1]}</div>
                        </div>
                    );
                })}
            </div>
            <div
                onClick={() => {
                    let newArr = mergeSort(array, 0);
                    doAnimation(animation, setArray, newArr);
                }}
            >
                Merge Sort
            </div>
            <div
                onClick={() => {
                    let newArr = bubbleSort(array, 0);
                    doAnimation(animation, setArray, newArr);
                }}
            >
                Bubble Sort
            </div>
            <div className="bars">
                {array.map((element, index) => {
                    return (
                        <div
                            key={`${index}sort`}
                            className="element element-sort"
                        >
                            <div
                                className="bar-sort"
                                style={{
                                    height: element[1] + "px",
                                }}
                            ></div>
                            {/* <div className="value"> {element[1]} </div> */}
                        </div>
                    );
                })}
            </div>
            <svg id="svg">
                {array.map((element, index) => {
                    return (
                        <g key={index}>
                            <rect
                                x={index * 50 + 50}
                                y={30 + 100 - element[1]}
                                height={element[1]}
                                width="25"
                                fill="#2e6ea6"
                            ></rect>
                            <text x={index * 50 + 50+5} y={130+15}>
                                {element[1]}
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
};

ReactDOM.render(<Main />, document.getElementById("root"));
