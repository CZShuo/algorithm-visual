import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "../index.css";
import Graph from "./graph.jsx";
import Home from "./home.jsx";
import Bubble from "./algoBubble.jsx";
import Insertion from "./algoInsert.jsx";
import Selection from "./algoSelect.jsx";
import Merge from "./algoMerge.jsx";
import Quick from "./algoQuick.jsx";
import Control from "./control.jsx";
import LeftBar from "./leftBar.jsx";
import Header from "./header.jsx";
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

    const [colorSet, changeColor] = useState({
        com: "#228b22",
        null: "#2e6ea6",
        sorted: "#ffa500",
        after: "#ff7f00",
        big: "#ffa500",
        small: "#ffffff",
        key: "#0000ff",
        min: "#0000ff",
    });

    const newColor = (array, status) => {
        let colorList = [];
        for (let i = 0; i < array.length; i++) {
            colorList.push(colorSet[status[i]]);
            // let col = "";
            // if (status[i] == "sorted") {
            //     col = "#ffa500";
            // } else if (status[i] == "com") {
            //     col = "#228b22";
            // } else if (status[i] == "null") {
            //     col = "#2e6ea6";
            // } else if (status[i] == "big") {
            //     col = "#ff7f00";
            // } else if (status[i] == "small") {
            //     col = "#228b22";
            // } else if (status[i] == "after") {
            //     col = "#ff7f00";
            // } else if (status[i] == "key") {
            //     col = "#0000ff";
            // } else if (status[i] == "min") {
            //     col = "#0000ff";
            // }
            // colorList.push(col);
        }
        return colorList;
    };
    const [color, setColor] = useState(newColor(array, status));
    useEffect(() => {
        setColor(newColor(array, status));
    }, [colorSet]);

    const newPosition = (array) => {
        let result = [];
        for (let i = 0; i < array.length; i++) {
            let temp = 130 - array[i];
            let tempx = (900 - array.length * 50) / 2;

            result.push({
                x: i * 50 + tempx,
                y: temp,
            });
        }
        return result;
    };
    const [position, setPosition] = useState(newPosition(array));
    const stopInterval = () => {
        clearInterval(window.ani);
    };
    const [doing, changeDoing] = useState(false);
    const [firstTime, changeFirstTime] = useState(true);

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
        stopInterval,
        doing,
        changeDoing,
        firstTime,
        changeFirstTime,
    };
    const controlData = {
        setArray,
        setTime,
        setColor,
        colorSet,
        changeColor,
        setPosition,
        newColor,
        newPosition,
        status,
        stopInterval,
        doing,
        changeDoing,
        firstTime,
        changeFirstTime,
    };

    return (
        <Router>
            <Header />
            <div className="array">
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route
                    path="/tutorial"
                    render={() => (
                        <>
                            <LeftBar />
                            <div className="main-part">
                                <Switch>
                                    <Route
                                        exact
                                        path="/tutorial"
                                        render={() => (
                                            <div>
                                                <div className="sort">
                                                    Choose Sort
                                                </div>
                                                <svg id="svg"></svg>
                                            </div>
                                        )}
                                    />
                                    <Route
                                        path="/tutorial/bubblesort"
                                        render={() => <Bubble data={data} />}
                                    />
                                    <Route
                                        path="/tutorial/insertionsort"
                                        render={() => <Insertion data={data} />}
                                    />
                                    <Route
                                        path="/tutorial/selectionsort"
                                        render={() => <Selection data={data} />}
                                    />
                                    <Route
                                        path="/tutorial/mergesort"
                                        render={() => <Merge data={data} />}
                                    />
                                    <Route
                                        path="/tutorial/quicksort"
                                        render={() => <Quick data={data} />}
                                    />
                                </Switch>
                                <Control controlData={controlData} />
                            </div>
                        </>
                    )}
                ></Route>
            </div>
        </Router>
    );
};

ReactDOM.render(<Main />, document.getElementById("root"));

//1. 點home可以到首頁'./'
//2. code塊
//3. speed & pause & play
