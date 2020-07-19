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


    const [range,setRange] = useState([]);
    const positionInsert = (array)=>{
        let result = [];
        for (let i = 0; i < array.length; i++) {
            let temp = 130 - array[i];
            let tempx = (1000 - array.length * 50) / 2;
            if(range[0]<i && range[1]>i) {
                temp = 230 - array[i];
            }
            result.push({
                x: i * 50 + tempx,
                y: temp,
            });
        }
        return result;
    };

    const [ani, setAni] = useState([]);
    let arrayIndex=[];
    for (let i = 0; i < array.length;i++){
        arrayIndex.push([i,array[i]]);
    }
    // console.log(arrayIndex);
    const mergeSort = (array, startIndex) => {
        let arr = [...array];
        ani.push(['range', startIndex, startIndex+array.length-1]);
        if (arr.length < 2) return arr;
        let index = startIndex;
        let mid = Math.floor(arr.length / 2);
        ani.push(['mid', mid]);
        let left = mergeSort(arr.slice(0, mid), index);
        let right = mergeSort(arr.slice(mid), mid + index);

        let result = [];
        while (left.length > 0 && right.length > 0) {
            // ani.push(["com", [...left[0]], [...right[0]]]);
            ani.push(["com",left[0][0],right[0][0]]);
            if (right[0][1] < left[0][1]) {
                // console.log('r'+right+' '+left);
                // [aniArray[index][1],right[0][1]]=[right[0][1],aniArray[index][1]];
                let temp = [index, right[0][1]];
                result.push(temp);
                // ani.push(["push", [...right[0]], temp]);
                ani.push(['push',index,right[0][0]]);
                right.shift();
            } else {
                // console.log('l'+left[0]+' '+right[0]);
                // [aniArray[index][1],left[0][1]]=[left[0][1],aniArray[index][1]];
                let temp = [index, left[0][1]];
                result.push(temp);
                // ani.push(["push", [...left[0]], temp]);
                ani.push(['push',index,left[0][0]]);
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
                ani.push(['push',index,element[0]]);
                index++;
            });
        } else if (right.length > 0) {
            right.forEach((element) => {
                // console.log('rr'+element);
                let temp = [index, element[1]];
                result.push(temp);
                // ani.push(["push", [...element], temp]);
                ani.push(['push',index,element[0]]);
                index++;
            });
        }
        // merge = true;
        return result;
    };

    const doAniMer = (animationArray, array) => {
        let arr = [...array];
        let index = 0;
        let text;
        for (let i = 0; i < arr.length; i++) {
            status[i] = "null";
        }
        let ani = setInterval(() => {
            let ele = animationArray[index];
            if (ele[0] == "range"){
                let temp = [ele[1], ele[2]];
                setRange(temp);
                setPosition(positionInsert(array));
            }else if (ele[0] == "min") {
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
                className='sort'
                onClick={() => {
                    console.log(mergeSort(arrayIndex,0));
                    console.log(ani);
                    doAniMer(ani, array);
                }}>
                Merge Sort
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
