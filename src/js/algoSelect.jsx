import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";
import Graph from "./graph.jsx";

const Select = (props) => {
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

    const doAniSel = (animationArray, array) => {
        let arr = [...array];
        let index = 0;
        let text;
        for (let i = 0; i < arr.length; i++) {
            status[i] = "null";
        }
        let ani = setInterval(() => {
            
            let ele = animationArray[index];
            if (ele[0] == "min") {
                status[ele[1]] = "min";
                if (index > 1 && animationArray[index - 1][0]!='push') {
                    status[animationArray[index - 1][1]] = "null";
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
                text = `比較 [${ele[1]}] ${arr[ele[1]]} 與 [${ele[2]}] ${
                    arr[ele[2]]
                }。`;
                setContent(text);

                setColor(newColor(arr, status));
            } else if (ele[0] == "push") {
                for (let i = 0; i <= ele[1]; i++) {
                    status[i] = "after";
                }
                for (let i = ele[1] + 1; i < arr.length; i++) {
                    status[i] = "null";
                }

                if(index == animationArray.length-1){
                    for (let i = 0; i < array.length; i++) {
                        status[i] = "after";
                    }
                }
                setColor(newColor(arr, status));
                
                if(ele[1]==ele[2]){
                    text = `[${ele[1]}] ${arr[ele[1]]} 位置不變。`
                }else{
                    text = `[${ele[1]}] ${arr[ele[1]]} 與 [${ele[2]}] ${
                        arr[ele[2]]
                    }互換。`;
                }
                setContent(text);
                [arr[ele[1]], arr[ele[2]]] = [arr[ele[2]], arr[ele[1]]];
                setArray(arr);
                setPosition(newPosition(arr));
                // let color1 = "#000000";
                // let color2 = "#ff0000";
                // s1(color1);
                // s2(color2);
            }
            index++;
            
            if (index >= animationArray.length) {    
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
    };

    return (
        <div>
            <div
                className="sort"
                onClick={() => {
                    console.log(selectionSort(array));
                    doAniSel(selectionSort(array), array);
                }}
            >
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

export default Select;
