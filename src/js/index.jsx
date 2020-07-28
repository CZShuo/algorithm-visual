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
    const [arrayIndex, setArrayIndex] = useState([
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
    const [content, setContent] = useState("Click Start!");
    const [time, setTime] = useState(100);
    const [page, setPage] = useState("");
    const [custom, setCustom] = useState(false);
    useEffect(() => {
        if(custom) {
            setAnimationArray([]);
            changeFirstTime(true);
            changeDoing(false);
            stopInterval();
        }else{
            let arr = [
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
            ];
            setArray(arr);
            let arrInd = [
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
            ];
            setArrayIndex(arrInd);
            setPosition(newPosition(arr));
            let sta = [];
            const initialStatus = () => {
                for (let i = 0; i < arr.length; i++) {
                    sta.push("null");
                }
                return sta;
            };
            setAnimationArray([]);
            setStatus(initialStatus(arr));
            setColor(newColor(arr, sta));
            changeFirstTime(true);
            changeDoing(false);
            stopInterval();
        }
    }, [page]);

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
        small: "#000000",
        key: "#0000ff",
        min: "#90cebc",
    });

    const newColor = (array, status) => {
        let colorList = [];
        for (let i = 0; i < array.length; i++) {
            colorList.push(colorSet[status[i]]);
        }
        return colorList;
    };
    const [color, setColor] = useState(newColor(array, status));
    useEffect(() => {
        setColor(newColor(array, status));
    }, [colorSet]);

    const newPosition = (array) => {
        let barSpace = 50;
        let barWidth = 25;
        let svgWidth =window.innerWidth*0.85*0.7;
        if(array.length*barSpace+100 > svgWidth){
            barSpace = (svgWidth*0.9)/array.length;
            barWidth = barSpace*0.75;
        }
        let result = [];
        for (let i = 0; i < array.length; i++) {
            let temp = 130 - array[i];
            let tempx = (svgWidth - array.length * 50) / 2;

            result.push({
                x: i * barSpace + tempx+12.5,
                y: temp,
            });
        }
        return result;
    };
    const [position, setPosition] = useState(newPosition(array));
    const [oldPosition, setOldPosition] = useState(position);
    const [animationArray, setAnimationArray] = useState([]);

    const stopInterval = () => {
        clearInterval(window.ani);
    };
    const [doing, changeDoing] = useState(false);
    const [firstTime, changeFirstTime] = useState(true);

    const data = {
        array,
        setArray,
        content,
        setContent,
        animationArray,
        setAnimationArray,
        time,
        status,
        setStatus,
        color,
        setColor,
        newColor,
        position,
        setPosition,
        newPosition,
        oldPosition,
        setOldPosition,
        stopInterval,
        doing,
        changeDoing,
        firstTime,
        changeFirstTime,
    };
    const controlData = {
        setArray,
        setArrayIndex,
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
        setAnimationArray
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
                        <div className="tutorial-main">
                            <LeftBar page={page} setPage={setPage} />
                            <div className="main-part">
                                <Switch>
                                    <Route
                                        exact
                                        path="/tutorial"
                                        render={() => (
                                            <div>
                                                <svg id="svg">
                                                    <text x="50" y="50">
                                                        Choose A Sort
                                                        Algorithm...
                                                    </text>
                                                </svg>
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
                                        render={() => <Merge data={data} arrayIndex={arrayIndex} setArrayIndex={setArrayIndex} />}
                                    />
                                    <Route
                                        path="/tutorial/quicksort"
                                        render={() => <Quick data={data} />}
                                    />
                                </Switch>
                                <Control controlData={controlData} />
                            </div>
                        </div>
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
