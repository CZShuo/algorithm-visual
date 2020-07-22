import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";
import Graph from "./graph.jsx";

const Bubble = (props) => {
    let data = props.data;
    let {
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
    } = data;

    const bubbleSort = (array) => {
        let arr = [...array];
        let times = arr.length;
        let swap = false;
        let ani = [];
        do {
            swap = false;
            times--;
            for (let i = 0; i < times; i++) {
                ani.push(["com", i, i + 1]);
                if (arr[i] > arr[i + 1]) {
                    ani.push(["big", i, i + 1]);
                    ani.push(["push", i, i + 1]);
                    [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                    swap = true;
                }
            }
            if (!swap && times > 1) {
                ani.push(["sorted", times]);
            }
        } while (times > 0 && swap == true);
        return ani;
    };

    const code = [
        "從第一個數字開始\nfor i from 0 to array's length",
        "\t與下一個數字比較大小，找出大的數字\n\tif array[i] > array[i+1]",
        "\t\t大的數字向後移動\n\t\tswap array[i] and array[i+1]",
    ];
    let colorCode = [];
    for (let i = 0; i < code.length; i++) {
        colorCode.push("#000000");
    }
    const [currentCode, setCurrentCode] = useState(colorCode);
    const [animationArray, setAnimationArray] = useState([]);

    const doAniBub = (animationArray, array, index) => {
        let arr = [...array];
        window.index = index;
        let text;

        window.ani = setInterval(() => {
            let ele = animationArray[window.index];
            if (ele[0] == "com") {
                for (let i = 0; i < ele[1]; i++) {
                    status[i] = "null";
                }
                status[ele[1]] = "com";
                status[ele[2]] = "com";
                text = `比較 [${ele[1]}] ${arr[ele[1]]} 與 [${ele[2]}] ${
                    arr[ele[2]]
                }。`;

                setContent(text);

                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                temp[1] = "#ff0000";
                setCurrentCode(temp);

                if (window.index > 1) {
                    if (ele[2] < animationArray[window.index - 1][2]) {
                        status[animationArray[window.index - 1][1]] = "null";
                        status[animationArray[window.index - 1][2]] = "sorted";
                    }
                }

                setColor(newColor(arr, status));
            } else if (ele[0] == "push") {
                text = `[${ele[1]}] ${arr[ele[1]]} 與 [${ele[2]}] ${
                    arr[ele[2]]
                }互換。`;
                setContent(text);
                [arr[ele[1]], arr[ele[2]]] = [arr[ele[2]], arr[ele[1]]];
                status[ele[1]] = "null";
                status[ele[2]] = "sorted";
                setArray(arr);

                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                temp[2] = "#ff0000";
                setCurrentCode(temp);

                setPosition(newPosition(arr));
                setColor(newColor(arr, status));
            } else if (ele[0] == "big") {
                status[ele[1]] = "big";
                status[ele[2]] = "small";
                text = `[${ele[1]}] ${arr[ele[1]]} 大於 [${ele[2]}] ${
                    arr[ele[2]]
                }，因此將兩者互換。`;
                setContent(text);

                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                temp[1] = "#ff0000";
                setCurrentCode(temp);

                setColor(newColor(arr, status));
            } else if (ele[0] == "sorted") {
                for (let i = 0; i < arr.length; i++) {
                    status[i] = "sorted";
                }
                setColor(newColor(arr, status));
            }
            window.index++;

            if (window.index >= animationArray.length) {
                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                setCurrentCode(temp);
                setContent("排序完成。");
                clearInterval(ani);
            }
        }, time);
    };

    

    const graph = {
        array,
        position,
        color,
        content,
        code,
        currentCode,
    };
    

    return (
        <div>
            <div
                className="sort"
                onClick={() => {
                    if (doing == false && firstTime) {
                        changeDoing(true);
                        changeFirstTime(false);
                        let ani = bubbleSort(array);
                        setAnimationArray(ani);
                        for (let i = 0; i < array.length; i++) {
                            status[i] = "null";
                        }
                        console.log(bubbleSort(array));
                        doAniBub(ani, array, 0);
                    }
                }}
            >
                Bubble Sort
            </div>
            {/* <div
                onClick={() => {
                    if (doing == true) {
                        changeDoing(false);
                        stopInterval();
                    }
                }}
            >
                Stop
            </div>
            <div
                onClick={() => {
                    if (doing == false) {
                        changeDoing(true);
                        doAniBub(animationArray, array, window.index);
                    }
                }}
            >
                Start
            </div> */}
            <Graph
                graph={graph}
                // colorCode1={colorCode1}
                // colorCode2={colorCode2}
            />
        </div>
    );
};

export default Bubble;
