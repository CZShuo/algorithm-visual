import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";
import Graph from "./graph.jsx";
import Code from "./code.jsx";

const Quick = (props) => {
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

    const quickSort = (arr, left, right) => {
        if (left >= right) {
            animationArray.push(["pivot", left]);
            return null;
        }
        let pivot = left;
        for (let i = left + 1; i <= right; i++) {
            animationArray.push(["com", pivot, i]);
            if (arr[i] < arr[pivot]) {
                animationArray.push(["min", pivot, i]);
                animationArray.push(["push1", pivot, i]);
                [arr[i], arr[pivot]] = [arr[pivot], arr[i]];

                animationArray.push(["push2", i, pivot + 1]);
                [arr[i], arr[pivot + 1]] = [arr[pivot + 1], arr[i]];
                pivot++;
            }
        }
        animationArray.push(["pivot", pivot]);

        quickSort(arr, left, pivot - 1);
        quickSort(arr, pivot + 1, right);
        return arr;
    };

    const code = [
        "假設第一個數開始為 pivot\nfor each unsorted element\npivot = first element",
        "\t與 pivot 之後直到下一個已排序數字\n\tfor i from pivot+1 to rightIndex",
        "\t\t每一個數字比較\t\tcompare array[pivot] and array[i]",
        "\t\t\t若小於 pivot 未完成．．．"
    ];
    let colorCode = [];
    for (let i = 0; i < code.length; i++) {
        colorCode.push("#000000");
    }
    const [currentCode, setCurrentCode] = useState(colorCode);

    const doAniQui = (animationArray, array, index) => {
        let arr = [...array];
        window.index = index;

        window.ani = setInterval(() => {
            let ele = animationArray[window.index];
            if (ele[0] == "com") {
                //pivot, i
                for (let i =ele[1];i<ele[2];i++) {
                    if(status[i]!='sorted'){
                        status[i]='com';
                    }
                }
                status[ele[1]] = "key";
                status[ele[2]] = "com";
                setColor(newColor(arr, status));
            } else if (ele[0] == "min") {
                // for (let i =0;i<arr.length;i++) {
                //     if(status[i]!='sorted'){
                //         status[i]='null';
                //     }
                // }
                status[ele[1]] = "key";
                status[ele[2]] = "min";
                setColor(newColor(arr, status));
            } else if (ele[0] == "push1") {
                //pivot ,i
                for (let i =ele[1];i<ele[2];i++) {
                    if(status[i]!='sorted'){
                        status[i]='com';
                    }
                }
                status[ele[2]] = "key";
                for (let i = 0; i <ele[1];i++) {
                    if(status[i]!='sorted'){
                        status[i]='com';
                    }
                }
                status[ele[1]] = "com";
                
                [arr[ele[1]], arr[ele[2]]] = [arr[ele[2]], arr[ele[1]]];
                setArray(arr);
                
                setColor(newColor(arr, status));
                setPosition(newPosition(arr));
            } else if (ele[0] == "push2") {
                //pivot ,i
                for (let i =0;i<ele[2];i++) {
                    if(status[i]!='sorted'){
                        status[i]='com';
                    }
                }
                status[ele[1]] = 'com';
                status[ele[2]] = "key";
                
                [arr[ele[1]], arr[ele[2]]] = [arr[ele[2]], arr[ele[1]]];
                setArray(arr);
                
                setColor(newColor(arr, status));
                setPosition(newPosition(arr));
            } else if (ele[0] == "pivot") {
                for (let i =0;i<arr.length;i++) {
                    if(status[i]!='sorted'){
                        status[i]='null';
                    }
                }
                status[ele[1]] = "sorted";
                setColor(newColor(arr, status));

            }
            window.index++;
            if (window.index >= animationArray.length-1) {
                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                setCurrentCode(temp);
                for (let i = 0; i < array.length; i++) {
                    status[i] = "sorted";
                }
                setColor(newColor(arr, status));

                setContent("排序完成。");
                clearInterval(window.ani);
            }
        }, time);
    };

    const stepAniQui = (animationArray, array, index) => {
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
            if (ele[0] == "com") {
                //pivot, i
                for (let i =ele[1];i<ele[2];i++) {
                    if(statusTemp[i]!='sorted'){
                        statusTemp[i]='com';
                    }
                }
                statusTemp[ele[1]] = "key";
                statusTemp[ele[2]] = "com";
                setColor(newColor(arr, statusTemp));
            } else if (ele[0] == "min") {
                // for (let i =0;i<arr.length;i++) {
                //     if(statusTemp[i]!='sorted'){
                //         statusTemp[i]='null';
                //     }
                // }
                statusTemp[ele[1]] = "key";
                statusTemp[ele[2]] = "min";
                setColor(newColor(arr, statusTemp));
            } else if (ele[0] == "push1") {
                //pivot ,i
                for (let i =ele[1];i<ele[2];i++) {
                    if(statusTemp[i]!='sorted'){
                        statusTemp[i]='com';
                    }
                }
                statusTemp[ele[2]] = "key";
                for (let i = 0; i <ele[1];i++) {
                    if(statusTemp[i]!='sorted'){
                        statusTemp[i]='com';
                    }
                }
                statusTemp[ele[1]] = "com";
                
                [arr[ele[1]], arr[ele[2]]] = [arr[ele[2]], arr[ele[1]]];
                setArray(arr);
                
                setColor(newColor(arr, statusTemp));
                setPosition(newPosition(arr));
            } else if (ele[0] == "push2") {
                //pivot ,i
                for (let i =0;i<ele[2];i++) {
                    if(statusTemp[i]!='sorted'){
                        statusTemp[i]='com';
                    }
                }
                statusTemp[ele[1]] = 'com';
                statusTemp[ele[2]] = "key";
                
                [arr[ele[1]], arr[ele[2]]] = [arr[ele[2]], arr[ele[1]]];
                setArray(arr);
                
                setColor(newColor(arr, statusTemp));
                setPosition(newPosition(arr));
            } else if (ele[0] == "pivot") {
                for (let i =0;i<arr.length;i++) {
                    if(statusTemp[i]!='sorted'){
                        statusTemp[i]='null';
                    }
                }
                statusTemp[ele[1]] = "sorted";
                setColor(newColor(arr, statusTemp));
            }
        }
        if (index >= animationArray.length-1) {
            let temp = [...colorCode];
            for (let i = 0; i < code.length; i++) {
                temp[i] = "#000000";
            }
            setCurrentCode(temp);
            for (let i = 0; i < array.length; i++) {
                statusTemp[i] = "sorted";
            }
            setColor(newColor(arr, statusTemp));

            setContent("排序完成。");
        }
        setStatus(statusTemp);
    }

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
                            let arr1 = [...array];
                            quickSort(arr1, 0, array.length - 1);

                            for (let i = 0; i < array.length; i++) {
                                status[i] = "null";
                            }
                            doAniQui(animationArray, array, 0);
                        } else if (doing == false) {
                            changeDoing(true);
                            doAniQui(animationArray, array, window.index);
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
                        stepAniQui(animationArray, array, window.index);
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
                        stepAniQui(animationArray, array, window.index);
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
                        stepAniQui(animationArray, array, window.index);
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
                            let arr1 = [...array];
                            quickSort(arr1, 0, array.length - 1);

                            for (let i = 0; i < array.length; i++) {
                                status[i] = "null";
                            }
                            doAniQui(animationArray, array, 0);
                        } else if (doing == false) {
                            changeDoing(true);
                            doAniQui(animationArray, array, window.index);
                        }
                    }}
                >
                    Start
                </div>
            </div>
        </div>
    );
};

export default Quick;
