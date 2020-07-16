import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";
import Graph from "./graph.jsx";

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

    const [ani, setAni] = useState([]);
    const mergeSort = (array, startIndex) => {
        let arr = [...array];
        // ani.push(['range', arr]);
        if (arr.length < 2) return arr;
        let index = startIndex;
        let mid = Math.floor(arr.length / 2);
        // ani.push(['getmid', mid]);
        let left = mergeSort(arr.slice(0, mid), index);
        let right = mergeSort(arr.slice(mid), mid + index);

        let result = [];
        while (left.length > 0 && right.length > 0) {
            ani.push(["com", [...left[0]], [...right[0]]]);
            if (right[0][1] < left[0][1]) {
                // console.log('r'+right+' '+left);
                // [aniArray[index][1],right[0][1]]=[right[0][1],aniArray[index][1]];
                let temp = [index, right[0][1]];
                result.push(temp);
                ani.push(["push", [...right[0]], temp]);
                right.shift();
            } else {
                // console.log('l'+left[0]+' '+right[0]);
                // [aniArray[index][1],left[0][1]]=[left[0][1],aniArray[index][1]];
                let temp = [index, left[0][1]];
                result.push(temp);
                ani.push(["push", [...left[0]], temp]);
                left.shift();
            }
            index++;
        }
        if (left.length > 0) {
            left.forEach((element) => {
                // console.log('ll'+element);
                let temp = [index, element[1]];
                result.push(temp);
                ani.push(["push", [...element], temp]);
                index++;
            });
        } else if (right.length > 0) {
            right.forEach((element) => {
                // console.log('rr'+element);
                let temp = [index, element[1]];
                result.push(temp);
                ani.push(["push", [...element], temp]);
                index++;
            });
        }
        merge = true;
        return result;
    };

    const doAniMer = (animationArray, array) => {};

    const graph = {
        array,
        position,
        color,
        content,
    };
    return (
        <div>
            <div
                className='sort'
                onClick={() => {
                    console.log(mergeSort(array));
                    doAniMer(mergeSort(array), array);
                }}>
                Selection Sort
            </div>
            <Graph
                graph={graph}
                // colorCode1={colorCode1}
                // colorCode2={colorCode2}
            />
        </div>
    );
};

export default Merge;
