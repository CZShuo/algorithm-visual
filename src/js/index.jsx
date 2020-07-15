import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "../index.css";
import Graph from "./graph.jsx";
import Bubble from "./algoBubble.jsx";
import Insertion from "./algoInsert.jsx";
import Control from "./control.jsx";
import LeftBar from "./leftBar.jsx";
import {
    get,
    getClass,
    bubbleSort2,
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
} from "../sorting-algorithms";
// const Algo = require("./sorting-algorithms.js");

const Main = (props) => {
    const [array, setArray] = useState([
        45,
        72,
        17,
        55,
        90,
        32,
        48,
        23,
        66,
        99,
        12,
        62,
        34,
        84,
        10,
        70,
    ]);
    const [major, setMajor] = useState(-1);
    // useEffect((array) => {
    //     setPosition(newPosition(array));
    // },[major]);

    //Set position and set major priority
    const newPosition = (array) => {
        let result = [];
        for (let i = 0; i < array.length; i++) {
            let temp = 130 - array[i];
            let tempx = (1000 - array.length * 50) / 2;
            if (i == major) {
                temp = 230 - array[i - 1];
            }
            result.push({
                x: i * 50 + tempx,
                y: temp,
            });
        }
        return result;
    };

    const initial = (array) => {
        let sta = [];
        for (let i = 0; i < array.length; i++) {
            sta.push("null");
        }
        return sta;
    };
    const [sorted, setSorted] = useState([]);
    const [status, setStatus] = useState(initial(array));
    const [content, setContent] = useState("Click algorithm to start!");
    const newColor = (array, status) => {
        let colorList = [];
        for (let i = 0; i < array.length; i++) {
            let col = "";
            if (status[i] == "sorted") {
                col = "#ffa500";
            } else if (status[i] == "com") {
                col = "#228b22";
            } else if (status[i] == "null") {
                col = "#2e6ea6";
            } else if (status[i] == "big") {
                col = "#ff7f00";
            } else if (status[i] == "small") {
                col = "#228b22";
            } else if (status[i] == "after") {
                col = "#ff7f00";
            } else if (status[i] == "key") {
                col = "#0000ff";
            }
            colorList.push(col);
        }
        return colorList;
    };
    const [position, setPosition] = useState(newPosition(array));
    const [color, setColor] = useState(newColor(array, status));

    const [time, setTime] = useState(100);

    const [colorCode1, s1] = useState("#000000");
    const [colorCode2, s2] = useState("#000000");

    return (
        <div className='array'>
            <Control setArray={setArray} />
            <Router>
                <LeftBar />
                <Switch>
                    <Route
                        path='/bubblesort'
                        render={() => (
                            <Bubble
                                array={array}
                                position={position}
                                color={color}
                                content={content}
                                colorCode1={colorCode1}
                                colorCode2={colorCode2}
                                status={status}
                                time={time}
                            />
                        )}
                    />
                    <Route
                        path='/insertionsort'
                        render={() => (
                            <Insertion
                                array={array}
                                position={position}
                                color={color}
                                content={content}
                                time={time}
                                status={status}
                            />
                        )}
                    />
                </Switch>
            </Router>
        </div>
    );
};

ReactDOM.render(<Main />, document.getElementById("root"));
