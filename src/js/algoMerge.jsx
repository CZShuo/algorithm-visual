import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";
import Graph from "./graphMerge.jsx";
import Code from "./code.jsx";

const Merge = (props) => {
    let {
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
    } = props.data;
    let {arrayIndex,setArrayIndex} = props;

    const [range, setRange] = useState([0, 16]);
    const [mid, setMid] = useState([]);
    const positionMerge = (array) => {
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


    //push,原本index,新index
    const mergeSort = (array, startIndex) => {
        let arr = [...array];
        if (animationArray.length != 0) {
            animationArray.push(["range", startIndex, startIndex + arr.length - 1]);
        }
        if (arr.length < 2) {
            animationArray.push(["back", startIndex, startIndex + arr.length - 1]);
            return arr;
        }
        let index = startIndex;
        let mid = Math.floor(arr.length / 2);
        animationArray.push(["mid", startIndex, mid]);
        let left = mergeSort(arr.slice(0, mid), index);
        let right = mergeSort(arr.slice(mid), mid + index);

        let result = [];
        while (left.length > 0 && right.length > 0) {
            animationArray.push(["com", left[0][0], right[0][0]]);
            if (right[0][1] < left[0][1]) {
                animationArray.push(["small", right[0][0], left[0][0]]);
                let temp = [index, right[0][1]];
                result.push(temp);
                animationArray.push(["push", right[0][0], index]);
                right.shift();
            } else {
                animationArray.push(["small", left[0][0], right[0][0]]);
                let temp = [index, left[0][1]];
                result.push(temp);
                animationArray.push(["push", left[0][0], index]);
                left.shift();
            }
            index++;
        }
        if (left.length > 0) {
            left.forEach((element) => {
                let temp = [index, element[1]];
                result.push(temp);
                animationArray.push(["push", element[0], index]);
                index++;
            });
            animationArray.push(["back", startIndex, startIndex + arr.length - 1]);
        } else if (right.length > 0) {
            right.forEach((element) => {
                let temp = [index, element[1]];
                result.push(temp);
                animationArray.push(["push", element[0], index]);
                index++;
            });
            animationArray.push(["back", startIndex, startIndex + arr.length - 1]);
        } else {
            animationArray.push(["back", startIndex, startIndex + arr.length - 1]);
        }
        return result;
    };

    const code = [
        "從中間將陣列分成兩半，分別為 Left 及 Right\nmid = array.length/2",
        "各自進行 Merge Sort ，直到陣列只有一個數字\nleft = mergeSort(array[0~mid-1])\nright = mergeSort(array[mid~])",
        "\t比較 Left 及 Right 的第一個數字\n\tcompare left[0] & right[0]",
        "\t\t將小的數字從 Left(Right) 移至 Result\n\t\tresult.push(smaller)",
        "\t將這次 Merge Sort 的 Result 回傳\n\treturn result",
    ];
    let colorCode = [];
    for (let i = 0; i < code.length; i++) {
        colorCode.push("#000000");
    }
    const [currentCode, setCurrentCode] = useState(colorCode);

    const reSort = (arrIndex) => {
        let arr = [...arrIndex];
        arr = arrIndex.sort((a, b) => a[0] - b[0]);
        return arr;
    };

    const doAniMer = (animationArray, arrayIndex, index) => {
        let arr = [...arrayIndex];
        window.index = index;
        let text;
        for (let i = 0; i < arr.length; i++) {
            status[i] = "null";
        }
        window.ani = setInterval(() => {
            let ele = animationArray[window.index];
            if (ele[0] == "range") {
                let pos = [...position];
                for (let i = ele[1]; i <= ele[2]; i++) {
                    pos[i].y += 130;
                }
                setOldPosition(position);
                setPosition(pos);
                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                setCurrentCode(temp);
            } else if (ele[0] == "mid") {
                setMid([ele[1], ele[2]]);
                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                temp[0] = "#ff0000";
                setCurrentCode(temp);
            } else if (ele[0] == "small") {
                status[ele[1]] = "small";
                status[ele[2]] = "big";
                setColor(newColor(arr, status));
                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                temp[3] = "#ff0000";
                setCurrentCode(temp);
            } else if (ele[0] == "back") {
                arr = reSort(arr);
                setArrayIndex(arr);

                let pos = [...position];

                for (let i = 0; i < array.length; i++) {
                    pos[i].x = i * 50 + (900 - array.length * 50) / 2;
                    if (i >= ele[1] && i <= ele[2]) {
                        pos[i].y -= 130;
                        if (
                            animationArray[window.index - 1][0] != "range" &&
                            window.index != animationArray.length - 1
                        ) {
                            pos[i].y -= 130;
                        }
                    }
                    pos[i].y =
                        Math.floor(pos[i].y / 130) * 130 + 130 - arr[i][1];
                }
                setOldPosition(position);
                setPosition(pos);

                for (let i = 0; i < arr.length; i++) {
                    status[i] = "null";
                }
                setColor(newColor(arr, status));
                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                temp[4] = "#ff0000";
                setCurrentCode(temp);
            } else if (ele[0] == "com") {
                for (let i = 0; i < arr.length; i++) {
                    status[i] = "null";
                }
                status[ele[1]] = "com";
                status[ele[2]] = "com";
                setColor(newColor(arr, status));
                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                temp[2] = "#ff0000";
                setCurrentCode(temp);
            } else if (ele[0] == "push") {
                arr[ele[1]][0] = ele[2];
                setArrayIndex(arr);

                let pos = [...position];
                pos[ele[1]].x = ele[2] * 50 + (900 - array.length * 50) / 2;
                pos[ele[1]].y += 130;
                setOldPosition(position);
                setPosition(pos);
                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                temp[3] = "#ff0000";
                setCurrentCode(temp);
            }

            window.index++;

            if (window.index >= animationArray.length) {
                for (let i = 0; i < arr.length; i++) {
                    status[i] = "sorted";
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

    const graph = {
        arrayIndex,
        position,
        oldPosition,
        color,
        content,
        code,
        currentCode,
        range,
        mid,
    };
    return (
        <div className="main">
            <div className="graph-code">
                <Graph graph={graph} />
                <Code code={code} currentCode={currentCode} />
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
                            mergeSort(arrayIndex,0);

                            for (let i = 0; i < array.length; i++) {
                                status[i] = "null";
                            }
                            doAniMer(animationArray, arrayIndex, 0);
                        } else if (doing == false) {
                            changeDoing(true);
                            doAniMer(animationArray, arrayIndex, window.index);
                        }
                    }}
                >
                    Start
                </div>
            </div>
        </div>
    );
};

export default Merge;
