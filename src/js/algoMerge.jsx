import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";
import Graph from "./graphMerge.jsx";

const Merge = (props) => {
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
    } = props.data;

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

    const [range, setRange] = useState([0,16]);
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

    const [ani, setAni] = useState([]);

    //push,原本index,新index
    const mergeSort = (array, startIndex) => {
        let arr = [...array];
        if(ani.length!=0) {
            ani.push(["range", startIndex, startIndex + arr.length - 1]);
        }
        if (arr.length < 2) {
            ani.push(["back", startIndex, startIndex + arr.length - 1]);
            return arr;
        }
        let index = startIndex;
        let mid = Math.floor(arr.length / 2);
        ani.push(["mid", startIndex, mid]);
        let left = mergeSort(arr.slice(0, mid), index);
        let right = mergeSort(arr.slice(mid), mid + index);

        let result = [];
        while (left.length > 0 && right.length > 0) {
            ani.push(["com", left[0][0], right[0][0]]);
            if (right[0][1] < left[0][1]) {
                ani.push(["small", right[0][0], left[0][0]]);
                let temp = [index, right[0][1]];
                result.push(temp);
                ani.push(["push", right[0][0], index]);
                right.shift();
            } else {
                ani.push(["small", left[0][0], right[0][0]]);
                let temp = [index, left[0][1]];
                result.push(temp);
                ani.push(["push", left[0][0], index]);
                left.shift();
            }
            index++;
        }
        if (left.length > 0) {
            left.forEach((element) => {
                let temp = [index, element[1]];
                result.push(temp);
                ani.push(["push", element[0], index]);
                index++;
            });
            ani.push(["back", startIndex, startIndex + arr.length - 1]);
        } else if (right.length > 0) {
            right.forEach((element) => {
                let temp = [index, element[1]];
                result.push(temp);
                ani.push(["push", element[0], index]);
                index++;
            });
            ani.push(["back", startIndex, startIndex + arr.length - 1]);
        }else{
            ani.push(["back", startIndex, startIndex + arr.length - 1]);
        }
        return result;
    };

    const code = [
        "從中間將陣列分成兩半，分別為 Left 及 Right\nmid = array.length/2",
        "各自進行 Merge Sort ，直到陣列只有一個數字\nleft = mergeSort(array[0~mid-1])\nright = mergeSort(array[mid~])",
        "\t比較 Left 及 Right 的第一個數字\n\tcompare left[0] & right[0]",
        "\t\t將小的數字從 Left(Right) 移至 Result\n\t\tresult.push(smaller)",
        "\t將這次 Merge Sort 的 Result 回傳\n\treturn result"
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

    const doAniMer = (animationArray, arrayIndex) => {
        let arr = [...arrayIndex];
        let index = 0;
        let text;
        for (let i = 0; i < arr.length; i++) {
            status[i] = "null";
        }
        let ani = setInterval(() => {
            let ele = animationArray[index];
            if (ele[0] == "range") {
                // let rangeNew = [...range];
                // rangeNew.push([ele[1], ele[2]]);
                // setRange(rangeNew);
                let pos = [...position];
                for (let i = ele[1]; i <=ele[2];i++) {
                    pos[i].y += 130;
                }
                setPosition(pos);
                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                setCurrentCode(temp);
                // setArrayIndex(arr);
            } else if (ele[0] == "mid") {
                setMid([ele[1], ele[2]]);let temp = [...colorCode];
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
                // let rangeNew = [...range];
                // rangeNew.pop();
                // setRange(rangeNew);

                arr = reSort(arr);
                setArrayIndex(arr);

                let pos = [...position];

                for (let i = 0; i < array.length; i++) {
                    pos[i].x = i * 50 + (900 - array.length * 50) / 2;
                    if(i>=ele[1] && i<=ele[2]){
                        pos[i].y-=130;
                        if(animationArray[index-1][0]!="range" && index!=animationArray.length-1){
                            pos[i].y-=130;
                        }
                    }
                    pos[i].y = Math.floor((pos[i].y)/130)*130+130-arr[i][1];
                }
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
                setPosition(pos);
                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                temp[3] = "#ff0000";
                setCurrentCode(temp);
            }

            index++;

            if (index >= animationArray.length) {
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
        arrayIndex,
        position,
        color,
        content,
        code,
        currentCode,
        range,
        mid,
    };
    return (
        <div>
            <div
                className="sort"
                onClick={() => {
                    console.log(arrayIndex);
                    console.log(mergeSort(arrayIndex, 0));
                    console.log(ani);
                    doAniMer(ani, arrayIndex);
                    console.log(arrayIndex);
                }}
            >
                Merge Sort
            </div>
            <Graph graph={graph} />
        </div>
    );
};

export default Merge;
