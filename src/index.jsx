import React, { useState } from "react";
import ReactDOM from "react-dom";
import useStateWithCallback from "use-state-with-callback";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./index.css";
import {
    get,
    getClass,
    bubbleSort2,
    insertionSort,
    selectionSort,
    mergeSort,
    quickSort,
    heapSort,
    librarySort,
    animation,
    doAnimation,
    clearAnimation,
    setTime,
} from "./sorting-algorithms";
// const Algo = require("./sorting-algorithms.js");

const Main = (props) => {
    // const [array, setArray] = useState([
    //     [0, 45],
    //     [1, 72],
    //     [2, 17],
    //     [3, 55],
    //     [4, 90],
    //     [5, 32],
    //     [6, 48],
    //     [7, 23],
    //     [8, 66],
    //     [9, 99],
    //     [10, 12],
    //     [11, 62],
    //     [12, 34],
    //     [13, 84],
    //     [14, 10],
    //     [15, 70],
    // ]);
    // const [arrays, setArrays] = useState([45,72,17,55,90,32,48,23,66,99,12,62,34,84,10,70]);
    // // const [animationArray, setAnimation] = useState(array);

    // const newPosition = (array) => {
    //     let barPosition = [];
    //     for (let i = 0; i < array.length; i++) {
    //         barPosition.push({
    //             x: i * 50 + 50,
    //             y: 130 - array[i],
    //         });
    //     }
    //     return barPosition;
    // };
    // const [position, setPosition] = useState(newPosition(array));
    // const [level, setLevel] = useState([]);
    // const [range, setRange] = useState([0, 2]);
    // const [mid, setMid] = useState(7);
    // const [compare, setCompare] = useState([]);
    // const [sorted, setSorted] = useState([]);

    // const newColor = (array) => {
    //     let colorList = [];
    //     for (let i = 0; i < array.length; i++) {
    //         let col = "";
    //         if (sorted.indexOf(i) != -1) {
    //             col = "#ff7f00";
    //         } else if (i == compare[0] || i == compare[1]) {
    //             col = "#ffffff";
    //         } else {
    //             col = "#2e6ea6";
    //         }
    //         colorList.push(col);
    //     }
    //     return colorList;
    // };
    // const [animat,setAnimations] = useState([]);
    // const [color, setColor] = useState(newColor(array));
    // const bubbleSort = (array) =>{
    //     let arr = [...array];
    //     let times = arr.length;
    //     let swap = false;
    //     let animat = [];
    //     do{
    //         swap = false;
    //         times--;
    //         for (let i = 0; i < times; i++) {
    //             animat.push(['com',i,i+1]);
    //             if(arr[i]>arr[i + 1]){
    //                 animat.push(['push',i,i+1]);
    //                 [arr[i],arr[i + 1]] = [arr[i + 1], arr[i]];
    //                 swap = true;
    //             }
    //         }
    //     }while (times > 0 && swap);

    //     return animat;
    // }
    // const doAnimat = (animat,array) => {
    //     let arr = [...array];
    //     animat.forEach((ele, index)=>{
    //         if(ele[0]=='com'){
    //             setTimeout(() => {
    //                 let com = [ele[1],ele[2]];
    //                 setCompare(com);
    //             },10*index);
    //         }else if (ele[0]=='push'){
    //             setTimeout(() => {
    //                 [arr[ele[1]],arr[ele[2]]]=[arr[ele[1]],arr[ele[2]]];
    //                 setArrays(arr);
    //                 newPosition(arr);
    //             },10*index);
    //         }
    //     })
    // }

    const [array, setArray] = useState([
        45,
        72,
        17,
        55,
        90,
        32,
        48,
        23,
        66,
        99,
        12,
        62,
        34,
        84,
        10,
        70,
    ]);
    const [major, setMajor] = useStateWithCallback(-1, (major) => {
        if (major != -1) {
            {
                (array) => {
                    setPosition(newPosition(array));
                };
            }
        }
    });
    //Set position and set major priority
    const newPosition = (array) => {
        let result = [];
        for (let i = 0; i < array.length; i++) {
            let temp = 130 - array[i];
            let tempx = (1000 - array.length * 50) / 2;
            if (i == major) {
                temp = 230 - array[i+1];
            }
            result.push({
                x: i * 50 + tempx,
                y: temp,
            });
        }
        return result;
    };

    const initial = (array) => {
        let sta = [];
        for (let i = 0; i < array.length; i++) {
            sta.push("null");
        }
        return sta;
    };
    const [sorted, setSorted] = useState([]);
    const [compare, setCompare] = useState([]);
    const [status, setStatus] = useState(initial(array));
    const [content, setContent] = useState("Click algorithm to start!");
    const newColor = (array, status) => {
        let colorList = [];
        for (let i = 0; i < array.length; i++) {
            let col = "";
            if (status[i] == "sorted") {
                col = "#ffa500";
            } else if (status[i] == "com") {
                col = "#228b22";
            } else if (status[i] == "null") {
                col = "#2e6ea6";
            } else if (status[i] == "big") {
                col = "#ff7f00";
            } else if (status[i] == "small") {
                col = "#228b22";
            } else if (status[i] == "after") {
                col = "#ff7f00";
            } else if (status[i] == "key") {
                col = '#0000ff';
            }
            colorList.push(col);
        }
        return colorList;
    };
    const [position, setPosition] = useState(newPosition(array));
    const [color, setColor] = useState(newColor(array, status));
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
    const insertionSort = (array) => {
        let arr = [...array];
        let ani = [];
        for (let i = 1; i < arr.length; i++) {
            ani.push(["major", i]);
            for (let j = i - 1; j >= 0; j--) {
                //Compare key and elements before key
                ani.push(["com", j, j+1]);
                if (arr[j] > arr[j + 1]) {
                    ani.push(["big", j+1, j]);
                    ani.push(["push", j, j + 1]);
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                }else{
                    break;
                }
            }
        }
        return ani;
    };

    let time = 100;
    const setTime = (t) => {
        time = t;
    };
    const [colorCode1, s1] = useState("#000000");
    const [colorCode2, s2] = useState("#000000");

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
                setContent('排序完成。');
                clearInterval(ani);
            }
        }, time);
    };

    const doAniIns = (animat, array) => {
        let arr = [...array];
        let index = 0;
        let text;
        for (let i = 0; i < arr.length; i++) {
            status[i] = "null";
        }
        let m;
        let mNum;
        let minIndex;
        let ani = setInterval(() => {
            let ele = animat[index];

            if (ele[0] == "com") {
                //key & elements before key until find its position
                for (let i = 0; i < ele[1]; i++) {
                    status[i] = "null";
                }
                status[ele[1]] = "com";
                status[ele[2]] = "com";
                text = `${m} 比較 ${arr[ele[1]]} 與 ${arr[ele[2]]}。`;
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
                }
                setPosition(newPosition(arr));
                setColor(newColor(arr, status));
            } else if (ele[0] == "push") {
                //left one should wait for next compare
                //right one should be after
                text = `${m} 將 ${arr[ele[1]]} 與 ${arr[ele[2]]} 互換。`;
                setContent(text);
                [arr[ele[1]], arr[ele[2]]] = [arr[ele[2]], arr[ele[1]]];
                status[ele[1]] = "null";
                status[ele[2]] = "after";
                setArray(arr);
                // let temp=major-1;
                // setMajor(temp);
                setColor(newColor(arr, status));
            } else if (ele[0] == "big") {
                status[ele[1]] = "small";
                status[ele[2]] = "big";
                text = `${m} ${arr[ele[2]]} > ${arr[ele[1]]}，互換。`;
                setContent(text);
                setColor(newColor(arr, status));
            } else if (ele[0] == "major") {
                //key highlight
                status[ele[1]]='key';
                setMajor(ele[1]);
                m = `${arr[ele[1]]} 為 key。`;
                mNum = arr[ele[1]];
                minIndex = ele[1];
                setContent(m);
                setColor(newColor(arr, status));
                // setPosition(newPosition(arr));
            }
            index++;

            if (index >= animat.length) {
                clearInterval(ani);
                for (let i = 0; i < arr.length; i++) {
                    status[i] = "after";
                }
                setColor(newColor(arr, status));
                setContent('排序完成。');
                setMajor(-1);
            }
        }, time);
    };

    return (
        <div className="array">
            <div
                className="sort"
                onClick={() => {
                    console.log(bubbleSort(array));
                    doAniBub(bubbleSort(array), array);
                }}
            >
                Bubble Sort
            </div>
            <div
                className="sort"
                onClick={() => {
                    console.log(insertionSort(array));
                    doAniIns(insertionSort(array), array);
                }}
            >
                Insertion Sort
            </div>

            <div className="set-array">
                <div>Set your array: </div>
                <input type="text" id="array-input" />
                <div
                    id="send-array"
                    onClick={() => {
                        let input = document.getElementById("array-input")
                            .value;
                        let arr = input.replace(/\s/g, "").split(",");
                        arr = arr.map((element, index) => [Number(element)]);
                        setPosition(newPosition(arr));
                        setColor(newColor(arr, status));
                        setArray(arr);
                    }}
                >
                    Set
                </div>
            </div>
            <div className="set-array">
                <div>Number of elements: </div>
                <input id="number-input" type="number" />
                <div
                    id="send-number"
                    onClick={() => {
                        let num = document.getElementById("number-input").value;
                        if (num > 20) {
                            num = 20;
                            alert("Can't be more than 20 numbers !");
                            document.getElementById("number-input").value = 50;
                        }
                        if (num < 5) {
                            num = 5;
                            alert("Can't be less than 5 numbers !");
                            document.getElementById("number-input").value = 5;
                        }
                        let arr = [];
                        for (let i = 0; i < num; i++) {
                            arr.push(Math.floor(Math.random() * 100) + 1);
                            status[i] = "null";
                        }
                        setPosition(newPosition(arr));
                        setColor(newColor(arr, status));
                        setArray(arr);
                    }}
                >
                    Random
                </div>
            </div>
            <div className="set-array">
                <div>Speed: </div>
                <select
                    defaultValue="100"
                    onChange={(e) => {
                        setTime(e.target.value);
                    }}
                >
                    <option value="1000">新手</option>
                    <option value="800">0.5</option>
                    <option value="400">1.0</option>
                    <option value="200">1.5</option>
                    <option value="100">專業</option>
                </select>
            </div>
            <div className="set-array">
                <div>Pause</div>
                <div>Start</div>
            </div>
            <svg id="svg">
                {array.map((element, index) => {
                    return (
                        <g key={index}>
                            <rect
                                x={position[index].x}
                                y={position[index].y}
                                height={element}
                                width="25"
                                fill={color[index]}
                            ></rect>
                            <text x={position[index].x + 5} y={130 + 15}>
                                {element}
                            </text>
                        </g>
                    );
                })}
                <text x="250" y="250" fontSize="24px">
                    {content}
                </text>
                <rect
                    x="350"
                    y="300"
                    width="300"
                    height="300"
                    fillOpacity="0"
                    stroke="brown"
                    strokeWidth="2"
                    rx="10"
                    ry="10"
                ></rect>
                <text x="360" y="330" fontSize="20px">
                    for i from 0 to array's length
                </text>
                <text x="380" y="360" fontSize="20px" fill={colorCode1}>
                    if array[i] > array[i+1]
                </text>
                <text x="400" y="390" fontSize="20px" fill={colorCode2}>
                    swap array[i] and array[i+1]
                </text>
            </svg>
        </div>
    );
};

ReactDOM.render(<Main />, document.getElementById("root"));
