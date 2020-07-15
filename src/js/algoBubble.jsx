import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";
import Graph from "./graph.jsx";

const Bubble = (props) => {
    let array = props.array;
    let status = props.status;
    let time = props.time;

    const bubbleSort = (array) => {
        let arr = [...array];
        let times = arr.length;
        let swap = false;
        let ani = [];
        do {
            // swap = false;
            times--;
            for (let i = 0; i < times; i++) {
                ani.push(["com", i, i + 1]);
                if (arr[i] > arr[i + 1]) {
                    ani.push(["big", i, i + 1]);
                    ani.push(["push", i, i + 1]);
                    [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                    // swap = true;
                }
            }
        } while (times > 0);
        return ani;
    };

    const doAniBub = (animat, array) => {
        let arr = [...array];
        let index = 0;
        let text;
        for (let i = 0; i < arr.length; i++) {
            status[i] = "null";
        }
        let ani = setInterval(() => {
            let ele = animat[index];
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
                if (index > 1) {
                    if (ele[2] < animat[index - 1][2]) {
                        status[animat[index - 1][1]] = "null";
                        status[animat[index - 1][2]] = "after";
                    }
                }
                if (index == animat.length - 1) {
                    status[animat[index][1]] = "after";
                    status[animat[index][2]] = "after";
                    let color1 = "#000000";
                    let color2 = "#000000";
                    s1(color1);
                    s2(color2);
                } else {
                    let color1 = "#ff0000";
                    let color2 = "#000000";
                    s1(color1);
                    s2(color2);
                }

                setColor(newColor(arr, status));
            } else if (ele[0] == "push") {
                text = `[${ele[1]}] ${arr[ele[1]]} 與 [${ele[2]}] ${
                    arr[ele[2]]
                }互換。`;
                setContent(text);
                [arr[ele[1]], arr[ele[2]]] = [arr[ele[2]], arr[ele[1]]];
                status[ele[1]] = "null";
                status[ele[2]] = "after";
                setArray(arr);
                let color1 = "#000000";
                let color2 = "#ff0000";
                s1(color1);
                s2(color2);
                setPosition(newPosition(arr));
                setColor(newColor(arr, status));
            } else if (ele[0] == "big") {
                status[ele[1]] = "big";
                status[ele[2]] = "small";
                text = `[${ele[1]}] ${arr[ele[1]]} 大於 [${ele[2]}] ${
                    arr[ele[2]]
                }，因此將兩者互換。`;
                setContent(text);
                let color1 = "#000000";
                let color2 = "#ff0000";
                s1(color1);
                s2(color2);
                setColor(newColor(arr, status));
            }
            index++;

            if (index >= animat.length) {
                setContent("排序完成。");
                clearInterval(ani);
            }
        }, time);
    };

    return (
        <div>
            <div
                className="sort"
                onClick={() => {
                    console.log(bubbleSort(array));
                    doAniBub(bubbleSort(array), array);
                }}
            >
                Bubble Sort
            </div>
            <Graph
                array={props.array}
                position={props.position}
                color={props.color}
                content={props.content}
                colorCode1={props.colorCode1}
                colorCode2={props.colorCode2}
            />
        </div>
    );
};

export default Bubble;
