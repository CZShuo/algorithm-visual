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
    let {arrayIndex} = props;

    const [range, setRange] = useState([]);
    const [middle, setMid] = useState([]);
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
        ani.push(["range", startIndex, startIndex + arr.length - 1]);
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
            // ani.push(["com", [...left[0]], [...right[0]]]);
            ani.push(["com", left[0][0], right[0][0]]);
            if (right[0][1] < left[0][1]) {
                ani.push(["small", right[0][0], left[0][0]]);
                // console.log('r'+right+' '+left);
                // [aniArray[index][1],right[0][1]]=[right[0][1],aniArray[index][1]];
                let temp = [index, right[0][1]];
                result.push(temp);
                // ani.push(["push", [...right[0]], temp]);
                ani.push(["push", right[0][0], index]);
                right.shift();
            } else {
                ani.push(["small", left[0][0], right[0][0]]);
                // console.log('l'+left[0]+' '+right[0]);
                // [aniArray[index][1],left[0][1]]=[left[0][1],aniArray[index][1]];
                let temp = [index, left[0][1]];
                result.push(temp);
                // ani.push(["push", [...left[0]], temp]);
                ani.push(["push", left[0][0], index]);
                left.shift();
            }
            index++;
        }
        if (left.length > 0) {
            left.forEach((element) => {
                // console.log('ll'+element);
                let temp = [index, element[1]];
                result.push(temp);
                // ani.push(["push", [...element], temp]);
                ani.push(["push", element[0], index]);
                index++;
            });
            ani.push(["back", startIndex, startIndex + array.length - 1]);
        } else if (right.length > 0) {
            right.forEach((element) => {
                // console.log('rr'+element);
                let temp = [index, element[1]];
                result.push(temp);
                // ani.push(["push", [...element], temp]);
                ani.push(["push", element[0], index]);
                index++;
            });
            ani.push(["back", startIndex, startIndex + array.length - 1]);
        }
        ani.push(["back", startIndex, startIndex + array.length - 1]);
        // merge = true;
        return result;
    };

    const code = [
        "for i from 0 to array's length",
        "\tif array[i] > array[i+1]",
        "\t\tswap array[i] and array[i+1]",
    ];
    let colorCode = [];
    for (let i = 0; i < code.length; i++) {
        colorCode.push("#000000");
    }
    const [currentCode, setCurrentCode] = useState(colorCode);

    const rePosition = (arrIndex) => {
        arrIndex = arrIndex.sort((a, b) => 
            a[0] - b[0]
        );
        return arrIndex;
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
                
            } else if (ele[0] == "mid") {
            } else if (ele[0] == "small") {
            } else if (ele[0] == "back") {
                rePosition(arr);
                
            } else if (ele[0] == "com") {
            } else if (ele[0] == "push") {
                arr[ele[1]][0]=ele[2];
                let pos = [...position];
                pos[ele[1]].x = ele[2]*50 +(900-array.length *50)/2;
                pos[ele[1]].y +=130;
                setPosition(pos);
            }

            index++;

            if (index >= animationArray.length - 1) {
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
        middle,
    };
    return (
        <div>
            <div
                className="sort"
                onClick={() => {
                    console.log(mergeSort(arrayIndex, 0));
                    console.log(ani);
                    doAniMer(ani, arrayIndex);
                }}
            >
                Merge Sort
            </div>
            <Graph graph={graph} />
        </div>
    );
};

export default Merge;
