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

    const [range, setRange] = useState([]);
    const [middle, setMid] = useState([]);
    const positionMerge = (array) => {
        let result = [];
        for (let i = 0; i < array.length; i++) {
            let temp = 130 - array[i];
            // for (let j = range.length - 1; j > 0; j--) {
            //     if (i >= range[j][0] && i < range[j][1]) {
            //         temp += (j - 1) * 10;
            //     }
            // }

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

    const doAniMer = (animationArray, array) => {
        let arr = [...array];
        let index = 0;
        let text;
        for (let i = 0; i < arr.length; i++) {
            status[i] = "null";
        }
        let ani = setInterval(() => {
            let ele = animationArray[index];
            if (ele[0] == "range") {
                let temp = [...range];
                temp.push([ele[1], ele[2]]);
                setRange(temp);
                if(index!=0){
                    let pos = [...position];
                    for (let i = ele[1]; i <=ele[2];i++) {
                        pos[i].y+=130;
                    }
                    setPosition(pos);
                }
                
                // setPosition(positionMerge(array));
            } else if (ele[0] == "mid") {
                // let temp = [ele[1], ele[2]];
                // setMid(temp);
                // setPosition(positionMerge(array));
            } else if (ele[0] == "small") {
                status[ele[1]] = "small";
                setColor(newColor(arr, status));
                // setPosition(positionMerge(array));
            } else if (ele[0] == "back") {
                let temp = [...range];
                temp.pop();
                setRange(temp);
                let temp2 = [...position];
                for(let i = ele[1]; i <=ele[2]; i++){
                    temp2[i].y-=130;
                }
                setPosition(temp2);
                // setPosition(positionMerge(array));
            } else if (ele[0] == "com") {
                status[ele[1]] = "com";
                status[ele[2]] = "com";
                // setPosition(positionMerge(array));
                setColor(newColor(arr, status));
            } else if (ele[0] == "push") {
                let temp = [...position];
                // [temp[ele[1]],temp[ele[2]]]=[temp[ele[2]], temp[ele[1]]]
                temp[ele[1]].x = ele[2] * 50 + (900 - array.length * 50) / 2;
                temp[ele[1]].y += 130;
                [arr[ele[1]][1], arr[ele[2]][1]]=[arr[ele[2]][1], arr[ele[1]][1]];
                
                console.log(arr);
                console.log(ele);
                setPosition(temp);
                // [arr[ele[1]], arr[ele[2]]] = [arr[ele[2]], arr[ele[1]]];
                // setArray(arr);
            }

            // if (ele[0] == "range") {
            //     let temp = [ele[1], ele[2]];
            //     setRange(temp);
            //     setPosition(positionInsert(array));
            // } else if (ele[0] == "min") {
            //     status[ele[1]] = "min";
            //     if (index > 1 && animationArray[index - 1][0] != "push") {
            //         status[animationArray[index - 1][1]] = "null";
            //     }

            //     text = `最小值為 ${arr[ele[1]]}`;
            //     setContent(text);
            //     setColor(newColor(arr, status));
            // } else if (ele[0] == "com") {
            //     status[ele[1]] = "min";
            //     status[ele[2]] = "com";

            //     for (let i = ele[1] + 1; i < ele[2]; i++) {
            //         status[i] = "null";
            //     }
            //     text = `比較 [${ele[1]}] ${arr[ele[1]]} 與 [${ele[2]}] ${
            //         arr[ele[2]]
            //     }。`;
            //     setContent(text);

            //     setColor(newColor(arr, status));
            // } else if (ele[0] == "push") {
            //     for (let i = 0; i <= ele[1]; i++) {
            //         status[i] = "after";
            //     }
            //     for (let i = ele[1] + 1; i < arr.length; i++) {
            //         status[i] = "null";
            //     }

            //     if (index == animationArray.length - 1) {
            //         for (let i = 0; i < array.length; i++) {
            //             status[i] = "after";
            //         }
            //     }
            //     setColor(newColor(arr, status));

            //     if (ele[1] == ele[2]) {
            //         text = `[${ele[1]}] ${arr[ele[1]]} 位置不變。`;
            //     } else {
            //         text = `[${ele[1]}] ${arr[ele[1]]} 與 [${ele[2]}] ${
            //             arr[ele[2]]
            //         }互換。`;
            //     }
            //     setContent(text);
            //     [arr[ele[1]], arr[ele[2]]] = [arr[ele[2]], arr[ele[1]]];
            //     setArray(arr);
            //     setPosition(newPosition(arr));
            //     // let color1 = "#000000";
            //     // let color2 = "#ff0000";
            //     // s1(color1);
            //     // s2(color2);
            // }
            index++;

            if (index >= animationArray.length-1) {
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
        range,
        middle,
    };
    return (
        <div>
            <div
                className="sort"
                onClick={() => {
                    const createArrayIndex = () =>{
                        let arrayIndex = [];
                        for (let i = 0; i < array.length; i++) {
                            arrayIndex.push([i, array[i]]);
                        }
                        console.log('ai');
                        console.log(arrayIndex)
                        console.log('ai');
                        return arrayIndex;
                    }
                    const arrayIndex = createArrayIndex();
                    console.log(arrayIndex);
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
