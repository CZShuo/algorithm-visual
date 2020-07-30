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
    const [time, setTime] = useState(1500 / 7);
    const [page, setPage] = useState("");
    const [custom, setCustom] = useState(false);

    useEffect(() => {
        if (custom && animationArray.length === 0) {
            changeFirstTime(true);
            changeDoing(false);
            stopInterval();
        } else {
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
        let svgWidth = window.innerWidth * 0.85 * 0.7 - 2;
        if (array.length * barSpace + 100 > svgWidth) {
            barSpace = (svgWidth * 0.9) / array.length;
            barWidth = barSpace * 0.65;
        }
        let result = [];
        for (let i = 0; i < array.length; i++) {
            let temp = 130 - array[i];
            let xOuter = (svgWidth - array.length * barSpace) / 2;

            result.push({
                x: i * barSpace + xOuter + (barSpace - barWidth) / 2,
                y: temp,
            });
        }
        result.push(barWidth);
        return result;
    };
    const [position, setPosition] = useState(newPosition(array));
    const [oldPosition, setOldPosition] = useState(newPosition(array));
    const [animationArray, setAnimationArray] = useState([]);
    const [initialArray, setInitialArray] = useState(array);
    const [initialArrayIndex, setInitialArrayIndex] = useState(arrayIndex);

    const stopInterval = () => {
        clearInterval(window.ani);
    };
    const [doing, changeDoing] = useState(false);
    const [firstTime, changeFirstTime] = useState(true);

    const [top, setTop] = useState("");
    const [left, setLeft] = useState("");

    const dragElement = (element) => {
        if (top != "") {
            element.style.top = top;
            element.style.left = left;
        } else {
            element.style.top = "40%";
            setTop("40%");
            element.style.left = "25%";
            setLeft("25%");
        }
        //W3Schools - How TO - Create a Draggable HTML Element
        //Todo : Use useRef
        let posX1 = 0,
            posY1 = 0,
            posX2 = 0,
            posY2 = 0;
        if (document.getElementById(element.id + "header")) {
            // if present, the header is where you move the DIV from:
            document.getElementById(
                element.id + "header"
            ).onmousedown = dragMouseDown;
        } else {
            // otherwise, move the DIV from anywhere inside the DIV:
            element.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            posX1 = e.clientX;
            posY1 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            posX2 = posX1 - e.clientX;
            posY2 = posY1 - e.clientY;
            posX1 = e.clientX;
            posY1 = e.clientY;
            // set the element's new position:
            let newTop = 0;
            if (element.offsetTop - posY2 < 50) {
                newTop = 50;
            } else if (element.offsetTop - posY2 > window.innerHeight - 80) {
                newTop = window.innerHeight - 80;
            } else {
                newTop = element.offsetTop - posY2;
            }
            element.style.top = newTop + "px";
            setTop(newTop + "px");

            let newLeft = 0;
            if (element.offsetLeft - posX2 < 0) {
                newLeft = 0;
            } else if (element.offsetLeft - posX2 > window.innerWidth - 300) {
                newLeft = window.innerWidth - 300;
            } else {
                newLeft = element.offsetLeft - posX2;
            }
            element.style.left = newLeft + "px";
            setLeft(newLeft + "px");
        }

        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        }
    };

    const data = {
        array,
        setArray,
        content,
        setContent,
        animationArray,
        setAnimationArray,
        initialArray,
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
        dragElement,
        setTime,
    };
    const mergeData = {
        arrayIndex,
        setArrayIndex,
        initialArrayIndex,
        setInitialArrayIndex,
    };
    const controlData = {
        setArray,
        setArrayIndex,
        initialArray,
        setInitialArray,
        initialArrayIndex,
        setInitialArrayIndex,
        setTime,
        setColor,
        colorSet,
        changeColor,
        setPosition,
        setOldPosition,
        newColor,
        newPosition,
        status,
        stopInterval,
        doing,
        changeDoing,
        firstTime,
        changeFirstTime,
        setAnimationArray,
        setCustom,
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
                                                        &#8678;  Choose A Sort
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
                                        render={() => (
                                            <Merge
                                                data={data}
                                                mergeData={mergeData}
                                            />
                                        )}
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
