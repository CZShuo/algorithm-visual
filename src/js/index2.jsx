import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Main = () => {
    const [array, setArray] = useState([45,72,17,55,90,32,48,23,66,99,12,62,34,84,10,70]);
    const [position, setPosition] = useState(newPosition(array));
    const newPosition = (array)=>{
        let result = [];
        array.forEach((ele,index)=>{
            result.push({
                x: index*50 + 50,
                y:130-ele
            });
        })
        return result;
    }
    const bubbleSort = (array) =>{
        let arr = [...array];
        let times = arr.length;
        let swap = false;
        let ani = [];
        do{
            swap = false;
            times--;
            for (let i = 0; i < times; i++) {
                ani.push(['com',i,i+1]);
                if(arr[i]> arr[i + 1]){
                    ani.push(['push',i,i+1]);
                    [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                    swap = true;
                }
            }
        }while(times > 0 && swap);
        return ani;
    }
    const doAni = (animat,array)=>{
        let arr = [...array];
        animat.forEach((ele, index)=>{
            if(ele[0]=='com'){
                setTimeout(() => {
                    let com = [ele[1],ele[2]];
                    setCompare(com);
                },10*index);
            }else if (ele[0]=='push'){
                setTimeout(() => {
                    [arr[ele[1]],arr[ele[2]]]=[arr[ele[1]],arr[ele[2]]];
                    setArrays(arr);
                    newPosition(arr);
                },10*index);
            }
        })
    }
}



window.ani = setInterval(() => {
    let ele = animationArray[window.index];
    if (ele[0] == "com") {
        let statusTemp = [...status];
        for (let i = 0; i < ele[1]; i++) {
            statusTemp[i] = "null";
        }
        statusTemp[ele[1]] = "com";
        statusTemp[ele[2]] = "com";
        
        text = `比較 ${arr[ele[1]]} 與 ${arr[ele[2]]}。`;
        setContent(text);
        
        let colorTemp = [...colorCode];
        for (let i = 0; i < code.length; i++) {
            colorTemp[i] = "#000000";
        }
        colorTemp[1] = "#ff0000";
        setCurrentCode(colorTemp);
        
        if (window.index > 1) {
            if (ele[2] < animationArray[window.index - 1][2]) {
                statusTemp[animationArray[window.index - 1][1]] = "null";
                statusTemp[animationArray[window.index - 1][2]] = "sorted";
            }
        }
        
        setStatus(statusTemp);
        setColor(newColor(arr, statusTemp));
    } else if (ele[0] == "push") {
        text = `${arr[ele[1]]} 與 ${arr[ele[2]]}互換。`;
        setContent(text);
        
        let statusTemp = [...status];
        statusTemp[ele[1]] = "null";
        statusTemp[ele[2]] = "sorted";
        setStatus(statusTemp);
        
        [arr[ele[1]], arr[ele[2]]] = [arr[ele[2]], arr[ele[1]]];
        setArray(arr);
        
        let colorTemp = [...colorCode];
        for (let i = 0; i < code.length; i++) {
            colorTemp[i] = "#000000";
        }
        colorTemp[2] = "#ff0000";
        setCurrentCode(colorTemp);

        setOldPosition(position);
        setPosition(newPosition(arr));
        setColor(newColor(arr, statusTemp));
    } else if (ele[0] == "big") {
        let statusTemp = [...status];
        statusTemp[ele[1]] = "big";
        statusTemp[ele[2]] = "small";
        setStatus(statusTemp);

        text = `${arr[ele[1]]} 大於 ${arr[ele[2]]}，因此將兩者互換。`;
        setContent(text);

        let colorTemp = [...colorCode];
        for (let i = 0; i < code.length; i++) {
            colorTemp[i] = "#000000";
        }
        colorTemp[1] = "#ff0000";
        setCurrentCode(colorTemp);

        setColor(newColor(arr, statusTemp));
    } else if (ele[0] == "sorted") {
        let statusTemp = [...status];
        for (let i = 0; i < arr.length; i++) {
            statusTemp[i] = "sorted";
        }
        setStatus(statusTemp);
        setColor(newColor(arr, statusTemp));
    }
    window.index++;

    if (window.index >= animationArray.length) {
        let statusTemp = [...status];
        for (let i = 0; i < arr.length; i++) {
            statusTemp[i] = "sorted";
        }
        setColor(newColor(arr, statusTemp));
        
        let colorTemp = [...colorCode];
        for (let i = 0; i < code.length; i++) {
            colorTemp[i] = "#000000";
        }
        setCurrentCode(colorTemp);
        
        setContent("排序完成。");
        clearInterval(window.ani);
    }
}, time);