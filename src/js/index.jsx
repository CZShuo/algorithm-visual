import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "../index.css";
import Graph from "./graph.jsx";
import Bubble from "./algoBubble.jsx";
import Insertion from "./algoInsert.jsx";
import Selection from "./algoSelect.jsx";
import Merge from "./algoMerge.jsx";
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
    const [content, setContent] = useState("Click algorithm to start!");
    const [time, setTime] = useState(100);

    const initialStatus = (array) => {
        let sta = [];
        for (let i = 0; i < array.length; i++) {
            sta.push("null");
        }
        return sta;
    };
    const [status, setStatus] = useState(initialStatus(array));

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
            } else if (status[i] == "min") {
                col = "#0000ff";
            }
            colorList.push(col);
        }
        return colorList;
    };
    const [color, setColor] = useState(newColor(array, status));

    const newPosition = (array) => {
        let result = [];
        for (let i = 0; i < array.length; i++) {
            let temp = 130 - array[i];
            let tempx = (1000 - array.length * 50) / 2;

            result.push({
                x: i * 50 + tempx,
                y: temp,
            });
        }
        return result;
    };
    const [position, setPosition] = useState(newPosition(array));

    // const [major, setMajor] = useState(-1);
    // useEffect((array) => {
    //     setPosition(newPosition(array));
    // },[major]);

    //Set position and set major priority

    // const [sorted, setSorted] = useState([]);

    const data = {
        array,
        setArray,
        content,
        setContent,
        time,
        status,
        setStatus,
        color,
        setColor,
        newColor,
        position,
        setPosition,
        newPosition,
    };
    const controlData = {
        setArray,
        setTime,
        setColor,
        setPosition,
        newColor,
        newPosition,
        status,
    };

    const [colorCode1, s1] = useState("#000000");
    const [colorCode2, s2] = useState("#000000");

    return (
        <div className='array'>
            <Control controlData={controlData} />
            <Router>
                <LeftBar />
                <Switch>
                    <Route
                        path='/bubblesort'
                        render={() => <Bubble data={data} />}
                    />
                    <Route
                        path='/insertionsort'
                        render={() => <Insertion data={data} />}
                    />
                    <Route
                        path='/selectionsort'
                        render={() => <Selection data={data} />}
                    />
                    <Route
                        path='/mergesort'
                        render={() => <Merge data={data} />}
                    />
                </Switch>
            </Router>
        </div>
    );
};

ReactDOM.render(<Main />, document.getElementById("root"));