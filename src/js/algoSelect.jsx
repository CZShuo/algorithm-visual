import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";
import Graph from "./graph.jsx";
import Code from "./code.jsx";

const Select = (props) => {
    let {
        array,
        setArray,
        content,
        setContent,
        animationArray,
        setAnimationArray,
        initialArray,
        setInitialArray,
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
    } = props.data;

    const selectionSort = (array) => {
        let arr = [...array];
        let ani = [];
        for (let i = 0; i < array.length - 1; i++) {
            let min = arr[i];
            let minIndex = i;
            ani.push(["min", i]);
            for (let j = i + 1; j < array.length; j++) {
                ani.push(["com", minIndex, j]);
                if (arr[j] < min) {
                    ani.push(["min", j]);
                    min = arr[j];
                    minIndex = j;
                }
            }

            ani.push(["push", i, minIndex]);
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }

        return ani;
    };

    const code = [
        "從第一個數字開始\nfor i from 0 to array's length",
        "\t未排序區第一個數字令為臨時最小值\n\tmin = array[i]",
        "\t向未排序區尋找未排序的最小值\n\tfor j from i+1 to array's length\n\t\tif array[j] < array[i]",
        "\t\t\tmin= array[j]",
        "\t將最小值與未排序區第一個數字交換\n\tswap min(array[j]) and array[i]",
    ];
    let colorCode = [];
    for (let i = 0; i < code.length; i++) {
        colorCode.push("#000000");
    }
    const [currentCode, setCurrentCode] = useState(colorCode);

    const doAniSel = (animationArray, array, index) => {
        let arr = [...array];
        window.index = index;
        let text;

        window.ani = setInterval(() => {
            let ele = animationArray[window.index];
            if (ele[0] == "min") {
                status[ele[1]] = "min";
                if (
                    window.index > 1 &&
                    animationArray[window.index - 1][0] != "push"
                ) {
                    status[animationArray[window.index - 1][1]] = "null";
                    let temp = [...colorCode];
                    for (let i = 0; i < code.length; i++) {
                        temp[i] = "#000000";
                    }
                    temp[0] = "#ff0000";
                    temp[1] = "ff0000";
                    setCurrentCode(temp);
                } else {
                    let temp = [...colorCode];
                    for (let i = 0; i < code.length; i++) {
                        temp[i] = "#000000";
                    }
                    temp[3] = "#ff0000";
                    setCurrentCode(temp);
                }

                text = `最小值為 ${arr[ele[1]]}`;
                setContent(text);
                setColor(newColor(arr, status));
            } else if (ele[0] == "com") {
                status[ele[1]] = "min";
                status[ele[2]] = "com";

                for (let i = ele[1] + 1; i < ele[2]; i++) {
                    status[i] = "null";
                }
                text = `比較 ${arr[ele[1]]} 與 ${arr[ele[2]]}。`;
                setContent(text);

                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                temp[2] = "#ff0000";
                setCurrentCode(temp);

                setColor(newColor(arr, status));
            } else if (ele[0] == "push") {
                for (let i = 0; i <= ele[1]; i++) {
                    status[i] = "after";
                }
                for (let i = ele[1] + 1; i < arr.length; i++) {
                    status[i] = "null";
                }

                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                temp[4] = "#ff0000";
                setCurrentCode(temp);

                if (index == animationArray.length - 1) {
                    for (let i = 0; i < array.length; i++) {
                        status[i] = "after";
                    }
                }
                setColor(newColor(arr, status));

                if (ele[1] == ele[2]) {
                    text = `${arr[ele[1]]} 位置不變。`;
                } else {
                    text = `${arr[ele[1]]} 與 ${arr[ele[2]]}互換。`;
                }
                setContent(text);
                [arr[ele[1]], arr[ele[2]]] = [arr[ele[2]], arr[ele[1]]];
                setArray(arr);
                setOldPosition(position);
                setPosition(newPosition(arr));
            }
            window.index++;

            if (window.index >= animationArray.length) {
                for (let i = 0; i < array.length; i++) {
                    status[i] = "after";
                }
                setColor(newColor(arr, status));

                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                setCurrentCode(temp);
                setContent("排序完成。");
                clearInterval(window.ani);
            }
        }, time);
    };

    const stepAniSel = (animationArray, array, index) => {
        let text;
        let arr = [...initialArray];
        setArray(arr);
        setPosition(newPosition(arr));

        let statusTemp = [];
        for (let i = 0; i < array.length; i++) {
            statusTemp.push("null");
        }
        setColor(newColor(arr, statusTemp));
        setContent("Click Start!");

        let final = index;
        if (final == animationArray.length + 1) {
            final = animationArray.length;
        }

        for (let stepIndex = 0; stepIndex < final; stepIndex++) {
            let ele = animationArray[stepIndex];
            if (ele[0] == "min") {
                statusTemp[ele[1]] = "min";
                if (
                    stepIndex > 1 &&
                    animationArray[stepIndex - 1][0] != "push"
                ) {
                    statusTemp[animationArray[stepIndex - 1][1]] = "null";
                    let temp = [...colorCode];
                    for (let i = 0; i < code.length; i++) {
                        temp[i] = "#000000";
                    }
                    temp[0] = "#ff0000";
                    temp[1] = "ff0000";
                    setCurrentCode(temp);
                } else {
                    let temp = [...colorCode];
                    for (let i = 0; i < code.length; i++) {
                        temp[i] = "#000000";
                    }
                    temp[3] = "#ff0000";
                    setCurrentCode(temp);
                }

                text = `最小值為 ${arr[ele[1]]}`;
                setContent(text);
                setColor(newColor(arr, statusTemp));
            } else if (ele[0] == "com") {
                statusTemp[ele[1]] = "min";
                statusTemp[ele[2]] = "com";

                for (let i = ele[1] + 1; i < ele[2]; i++) {
                    statusTemp[i] = "null";
                }
                text = `比較 ${arr[ele[1]]} 與 ${arr[ele[2]]}。`;
                setContent(text);

                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                temp[2] = "#ff0000";
                setCurrentCode(temp);

                setColor(newColor(arr, statusTemp));
            } else if (ele[0] == "push") {
                for (let i = 0; i <= ele[1]; i++) {
                    statusTemp[i] = "after";
                }
                for (let i = ele[1] + 1; i < arr.length; i++) {
                    statusTemp[i] = "null";
                }

                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                temp[4] = "#ff0000";
                setCurrentCode(temp);

                if (index == animationArray.length - 1) {
                    for (let i = 0; i < array.length; i++) {
                        statusTemp[i] = "after";
                    }
                }
                setColor(newColor(arr, statusTemp));

                if (ele[1] == ele[2]) {
                    text = `${arr[ele[1]]} 位置不變。`;
                } else {
                    text = `${arr[ele[1]]} 與 ${arr[ele[2]]}互換。`;
                }
                setContent(text);
                [arr[ele[1]], arr[ele[2]]] = [arr[ele[2]], arr[ele[1]]];
                setArray(arr);
                setOldPosition(position);
                setPosition(newPosition(arr));
            }
        }
        if (index == animationArray.length + 1) {
            for (let i = 0; i < arr.length; i++) {
                statusTemp[i] = "after";
            }

            let temp = [...colorCode];
            for (let i = 0; i < code.length; i++) {
                temp[i] = "#000000";
            }
            setCurrentCode(temp);

            setColor(newColor(arr, statusTemp));
            setContent("排序完成。");
            setOldPosition(position);
            setPosition(newPosition(arr));
        }
        setStatus(statusTemp);
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
        <div className="main">
            <div className="graph-code">
                <Graph graph={graph} />
                <Code code={code} currentCode={currentCode} />
            </div>
            <div className="animation-control">
                <div
                    onClick={() => {
                        if (doing == false && firstTime) {
                            changeDoing(true);
                            changeFirstTime(false);
                            let ani = selectionSort(array);
                            setAnimationArray(ani);
                            for (let i = 0; i < array.length; i++) {
                                status[i] = "null";
                            }
                            doAniSel(ani, array, 0);
                        } else if (doing == false) {
                            changeDoing(true);
                            doAniSel(animationArray, array, window.index);
                            //pause後開始position會有問題
                            //pause後開始key會變undefined
                        }
                    }}
                >
                    Start
                </div>
                <div
                    onClick={() => {
                        if (doing == true) {
                            changeDoing(false);
                            stopInterval();
                        }
                    }}
                >
                    Pause
                </div>
                <div
                    onClick={() => {
                        changeDoing(false);
                        changeFirstTime(true);
                        stopInterval();
                        window.index = 0;
                        stepAniSel(animationArray, array, window.index);
                    }}
                >
                    Reset
                </div>
                <div
                    onClick={() => {
                        window.index--;
                        if (window.index < 0) {
                            window.index = 0;
                        }
                        stepAniSel(animationArray, array, window.index);
                    }}
                >
                    Previous
                </div>
                <div
                    onClick={() => {
                        window.index++;
                        if (window.index > animationArray.length) {
                            window.index = animationArray.length + 1;
                        }
                        stepAniSel(animationArray, array, window.index);
                    }}
                >
                    Next
                </div>
                <div>Speed</div>
            </div>
            <div className="control-button">
                <div
                    className="sort"
                    onClick={() => {
                        if (doing == true) {
                            changeDoing(false);
                            stopInterval();
                        }
                    }}
                >
                    Pause
                </div>
                <div
                    className="sort"
                    onClick={() => {
                        if (doing == false && firstTime) {
                            changeDoing(true);
                            changeFirstTime(false);
                            let ani = selectionSort(array);
                            setAnimationArray(ani);
                            for (let i = 0; i < array.length; i++) {
                                status[i] = "null";
                            }
                            doAniSel(ani, array, 0);
                        } else if (doing == false) {
                            changeDoing(true);
                            doAniSel(animationArray, array, window.index);
                            //pause後開始position會有問題
                        }
                    }}
                >
                    Start
                </div>
            </div>
        </div>
    );
};

export default Select;
