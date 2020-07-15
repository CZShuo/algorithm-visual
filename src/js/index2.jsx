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