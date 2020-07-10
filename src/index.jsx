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
    setTime,
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

    // const [animationArray, setAnimation] = useState(array);

    const newPosition = (array) => {
        let barPosition = [];
        for (let i = 0; i < array.length; i++) {
            barPosition.push({
                x: i * 50 + 50,
                y: 130 - array[i][1],
            });
        }
        return barPosition;
    };
    const [position, setPosition] = useState(newPosition(array));
    const [level, setLevel] = useState([]);
    const [range, setRange] = useState([0, 2]);
    const [mid, setMid] = useState(7);
    const [compare, setCompare] = useState([]);
    const [sorted, setSorted] = useState([]);

    const newColor = (array) => {
        let colorList = [];
        for (let i = 0; i < array.length; i++) {
            let col = "";
            if (sorted.indexOf(i) != -1) {
                col = "#ff7f00";
            } else if (i == compare[0] || i == compare[1]) {
                col = "#ffffff";
            } else {
                col = "#2e6ea6";
            }
            colorList.push(col);
        }
        return colorList;
    };
    const [color, setColor] = useState(newColor(array));
    // console.log(animationArray);
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
                className="sort"
                onClick={() => {
                    let newArr = mergeSort(array, 0);
                    doAnimation(animation, setArray, newArr);
                }}
            >
                Merge Sort
            </div>
            <div
                className="sort"
                onClick={() => {
                    let newArr = bubbleSort(array, 0);
                    doAnimation(animation, setArray, newArr);
                }}
            >
                Bubble Sort
            </div>
            <div
                className="sort"
                onClick={() => {
                    let newArr = insertionSort(array);
                    // console.log(newArr);
                    doAnimation(animation, setArray, newArr);
                }}
            >
                Insertion Sort
            </div>
            <div
                className="sort"
                onClick={() => {
                    let newArr = selectionSort(array);
                    // console.log(newArr);
                    doAnimation(animation, setArray, newArr);
                }}
            >
                Selection Sort
            </div>
            <div
                className="sort"
                onClick={() => {
                    let newArr = quickSort(array, 0, array.length - 1);
                    // console.log(newArr);
                    doAnimation(animation, setArray, newArr);
                }}
            >
                Quick Sort
            </div>
            <div className="set-array">
                <div>Set your array: </div>
                <input type="text" id="array-input" />
                <div
                    id="send-array"
                    onClick={() => {
                        let input = document.getElementById("array-input")
                            .value;
                        let arr = input.replace(/\s/g, "").split(",");
                        arr = arr.map((element, index) => [
                            index,
                            Number(element),
                        ]);
                        setPosition(newPosition(arr));
                        setColor(newColor(arr));
                        setArray(arr);
                    }}
                >
                    Set
                </div>
            </div>
            <div className="set-array">
                <div>Number of elements: </div>
                <input id="number-input" type="number" />
                <div
                    id="send-number"
                    onClick={() => {
                        let num = document.getElementById("number-input").value;
                        if (num > 50) {
                            num = 50;
                            alert("Can't be more than 50 numbers !");
                            document.getElementById("number-input").value = 50;
                        }
                        if (num < 5) {
                            num = 5;
                            alert("Can't be less than 5 numbers !");
                            document.getElementById("number-input").value = 5;
                        }
                        let arr = [];
                        for (let i = 0; i < num; i++) {
                            arr.push([i, Math.floor(Math.random() * 100) + 1]);
                        }
                        setPosition(newPosition(arr));
                        setColor(newColor(arr));
                        setArray(arr);
                    }}
                >
                    Random
                </div>
            </div>
            <div className="set-array">
                <div>Speed: </div>
                <select
                    defaultValue="100"
                    onChange={(e) => {
                        setTime(e.target.value);
                    }}
                >
                    <option value="400">0.5</option>
                    <option value="200">1.0</option>
                    <option value="133">1.5</option>
                    <option value="100">2.0</option>
                </select>
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
                <rect
                    x={range[0] * 50 + 35}
                    y={range[0] * 50 + 30}
                    rx="10"
                    ry="10"
                    width={(range[1] - range[0]) * 50}
                    height="120"
                    fill="#fff"
                    fillOpacity="0"
                    stroke="black"
                    strokeWidth="3"
                ></rect>
                {array.map((element, index) => {
                    return (
                        <g key={index}>
                            <rect
                                x={position[index].x}
                                y={position[index].y}
                                height={element[1]}
                                width="25"
                                fill={color[index]}
                            ></rect>
                            <text x={index * 50 + 50 + 5} y={130 + 15}>
                                {element[1]}
                            </text>
                        </g>
                    );
                })}
                <text x="150" y="100">
                    mid={mid}
                </text>
            </svg>
        </div>
    );
};

ReactDOM.render(<Main />, document.getElementById("root"));
