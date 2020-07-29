import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";
import Graph from "./graph.jsx";
import Code from "./code.jsx";

const Insertion = (props) => {
    let {
        array,
        setArray,
        content,
        setContent,
        animationArray,
        setAnimationArray,
        initialArray,
        setInitialArray,
        time,
        status,
        setStatus,
        color,
        setColor,
        newColor,
        position,
        setPosition,
        newPosition,
        oldPosition,
        setOldPosition,
        stopInterval,
        doing,
        changeDoing,
        firstTime,
        changeFirstTime,
    } = props.data;
    // let {major,setMajor}= props;
    // const [major, setMajor]= useState(-1);

    const positionInsert = (array) => {
        let barSpace = 50;
        let barWidth = 25;
        let svgWidth = window.innerWidth * 0.85 * 0.7 - 2;
        if (array.length * barSpace + 100 > svgWidth) {
            barSpace = (svgWidth * 0.9) / array.length;
            barWidth = barSpace * 0.65;
        }
        let result = [];
        for (let i = 0; i < array.length; i++) {
            let temp = 130 - array[i];
            let xOuter = (svgWidth - array.length * barSpace) / 2;
            if (i == window.major) {
                temp = 230 - array[i];
            }
            result.push({
                x: i * barSpace + xOuter + (barSpace - barWidth) / 2,
                y: temp,
            });
        }
        result.push(barWidth);
        return result;
    };

    // useEffect(() => {
    //     console.log(major)
    //     setPosition(positionInsert(array));
    // }, [major]);

    const code = [
        "從第二個數字開始當主要Key\nfor i from 0 to array's length (Key)",
        "\t向前依序比較，找尋適當位置\n\tfor j from i-1 to 0 (Compare)",
        "\t\t若Key小於前一個數，向前移動\n\t\tif Key < Compare\n\t\t\tSwap Key and Compare",
        "\t\tKey大於前一個數，放置於此\n\t\telse if Key > Compare\n\t\t\tBreak",
    ];
    let colorCode = [];
    for (let i = 0; i < code.length; i++) {
        colorCode.push("#000000");
    }
    const [currentCode, setCurrentCode] = useState(colorCode);

    const insertionSort = (array) => {
        let arr = [...array];
        let ani = [];
        for (let i = 1; i < arr.length; i++) {
            ani.push(["major", i]);
            for (let j = i - 1; j >= 0; j--) {
                //Compare key and elements before key
                ani.push(["com", j, j + 1]);
                if (arr[j] > arr[j + 1]) {
                    ani.push(["push", j, j + 1]);
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                } else {
                    ani.push(["stop", j, j + 1]);
                    break;
                }
                if (j == 0) {
                    ani.push(["min", j]);
                }
                // ani.push(["stop", j, j + 1]);
            }
        }
        return ani;
    };
    
    const doAniIns = (animationArray, array, index) => {
        let arr = [...array];
        window.index = index;
        let text;
        // for (let i = 0; i < arr.length; i++) {
        //     status[i] = "null";
        // }
        window.ani = setInterval(() => {
            let ele = animationArray[window.index];

            if (ele[0] == "com") {
                //key & elements before key until find its position
                for (let i = 0; i < ele[1]; i++) {
                    status[i] = "after";
                }
                status[ele[1]] = "com";
                status[ele[2]] = "com";
                text = `${arr[window.major]} 為 key。比較 ${arr[ele[1]]} 與 ${arr[ele[2]]}。`;
                setContent(text);
                if (window.index > 1) {
                    if (ele[2] < animationArray[window.index - 1][2]) {
                        status[animationArray[window.index - 1][1]] = "com";
                        status[animationArray[window.index - 1][2]] = "after";
                    }
                }

                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                temp[1] = "#ff0000";
                setCurrentCode(temp);
                setOldPosition(position);
                setPosition(positionInsert(arr));
                setColor(newColor(arr, status));
            } else if (ele[0] == "push") {
                //left one should wait for next compare
                //right one should be after
                text = `${arr[window.major]} 為 key ，${arr[ele[1]]} < ${arr[ele[2]]}，將 ${
                    arr[ele[1]]
                } 與 ${arr[ele[2]]} 互換。`;
                setContent(text);
                window.major -= 1;
                [arr[ele[1]], arr[ele[2]]] = [arr[ele[2]], arr[ele[1]]];
                setOldPosition(position);
                setPosition(positionInsert(arr));

                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                temp[2] = "#ff0000";
                setCurrentCode(temp);

                status[ele[1]] = "com";
                status[ele[2]] = "after";
                setArray(arr);
                setColor(newColor(arr, status));
            } else if (ele[0] == "major") {
                //key highlight
                for (let i = 0; i < ele[1]; i++) {
                    status[i] = "after";
                }
                status[ele[1]] = "key";

                window.major = ele[1];
                text = `${arr[window.major]} 為 key。`;
                setContent(text);

                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                temp[0] = "#ff0000";
                setCurrentCode(temp);

                setPosition(positionInsert(arr));
                setColor(newColor(arr, status));
            } else if (ele[0] == "stop") {
                text = `${arr[window.major]} 為 key 。 ${arr[ele[2]]} > ${arr[ele[1]]}，放回陣列。`;
                setContent(text);

                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                temp[3] = "#ff0000";
                setCurrentCode(temp);

                window.major = -1;
                setOldPosition(position);
                setPosition(positionInsert(arr));
            } else if (ele[0] == "min") {
                text = `${arr[window.major]} 為 key 。 ${arr[ele[1]]} 為最小值，放回陣列。`;
                setContent(text);

                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                temp[3] = "#ff0000";
                setCurrentCode(temp);

                window.major = -1;
                setOldPosition(position);
                setPosition(positionInsert(arr));
            }
            window.index++;

            if (window.index == animationArray.length) {
                clearInterval(ani);
                for (let i = 0; i < arr.length; i++) {
                    status[i] = "after";
                }

                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                setCurrentCode(temp);

                setColor(newColor(arr, status));
                setContent("排序完成。");
                setOldPosition(position);
                setPosition(positionInsert(arr));
            }
        }, time);
    };

    const stepAniIns = (animationArray, array, index) => {
        let text;
        let arr = [...initialArray];
        setArray(arr);
        setPosition(newPosition(arr));

        let statusTemp = [];
        for (let i = 0; i < array.length; i++) {
            statusTemp.push("null");
        }
        setColor(newColor(arr, statusTemp));
        setContent("Click Start!");

        let final = index;
        if (final == animationArray.length + 1) {
            final = animationArray.length;
        }

        for (let stepIndex = 0; stepIndex < final; stepIndex++) {
            let ele = animationArray[stepIndex];
            if (ele[0] == "com") {
                //key & elements before key until find its position
                for (let i = 0; i < ele[1]; i++) {
                    statusTemp[i] = "after";
                }
                statusTemp[ele[1]] = "com";
                statusTemp[ele[2]] = "com";
                text = `${arr[window.major]} 為 key 。比較 ${arr[ele[1]]} 與 ${arr[ele[2]]}。`;
                setContent(text);

                if (stepIndex > 1) {
                    if (ele[2] < animationArray[stepIndex - 1][2]) {
                        statusTemp[animationArray[stepIndex - 1][1]] = "com";
                        statusTemp[animationArray[stepIndex - 1][2]] = "after";
                    }
                }

                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                temp[1] = "#ff0000";
                setCurrentCode(temp);

                setOldPosition(position);
                setPosition(positionInsert(arr));
                setColor(newColor(arr, statusTemp));
            } else if (ele[0] == "push") {
                //left one should wait for next compare
                //right one should be after
                window.major -= 1;
                
                [arr[ele[1]], arr[ele[2]]] = [arr[ele[2]], arr[ele[1]]];
                setArray(arr);

                text = `${arr[window.major]} 為 key 。 ${arr[ele[1]]} < ${arr[ele[2]]}，將 ${
                    arr[ele[1]]
                } 與 ${arr[ele[2]]} 互換。`;
                setContent(text);


                setOldPosition(position);
                setPosition(positionInsert(arr));

                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                temp[2] = "#ff0000";
                setCurrentCode(temp);

                statusTemp[ele[1]] = "com";
                statusTemp[ele[2]] = "after";
                setColor(newColor(arr, statusTemp));
            } else if (ele[0] == "major") {
                //key highlight
                for (let i = 0; i < ele[1]; i++) {
                    statusTemp[i] = "after";
                }
                statusTemp[ele[1]] = "key";

                window.major = ele[1];
                text = `${arr[window.major]} 為 key。`;
                setContent(text);

                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                temp[0] = "#ff0000";
                setCurrentCode(temp);

                setColor(newColor(arr, statusTemp));
            } else if (ele[0] == "stop") {
                text = `${arr[window.major]} 為 key 。 ${arr[ele[2]]} > ${arr[ele[1]]}，放回陣列。`;
                setContent(text);

                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                temp[3] = "#ff0000";
                setCurrentCode(temp);

                window.major = -1;
                setOldPosition(position);
                setPosition(positionInsert(arr));
            } else if (ele[0] == "min") {
                text = `${arr[window.major]} 為 key 。 ${arr[ele[1]]} 為最小值，放回陣列。`;
                setContent(text);

                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                temp[3] = "#ff0000";
                setCurrentCode(temp);

                window.major = -1;
                setOldPosition(position);
                setPosition(positionInsert(arr));
            }
        }

        if (index == animationArray.length + 1) {
            for (let i = 0; i < arr.length; i++) {
                statusTemp[i] = "after";
            }

            let temp = [...colorCode];
            for (let i = 0; i < code.length; i++) {
                temp[i] = "#000000";
            }
            setCurrentCode(temp);

            setColor(newColor(arr, statusTemp));
            setContent("排序完成。");
            setOldPosition(position);
            setPosition(positionInsert(arr));
        }
        setStatus(statusTemp);
    };

    const graph = {
        array,
        position,
        oldPosition,
        color,
        content,
        code,
        currentCode,
    };

    return (
        <div className="main">
            <div className="graph-code">
                <Graph graph={graph} />
                <Code code={code} currentCode={currentCode} />
            </div>
            <div className="animation-control">
                <div
                    onClick={() => {
                        if (doing == false && firstTime) {
                            changeDoing(true);
                            changeFirstTime(false);
                            let ani = insertionSort(array);
                            setAnimationArray(ani);
                            for (let i = 0; i < array.length; i++) {
                                status[i] = "null";
                            }
                            doAniIns(ani, array, 0);
                        } else if (doing == false) {
                            changeDoing(true);
                            doAniIns(animationArray, array, window.index);
                            //pause後開始position會有問題
                            //pause後開始key會變undefined
                        }
                    }}
                >
                    Start
                </div>
                <div
                    onClick={() => {
                        if (doing == true) {
                            changeDoing(false);
                            stopInterval();
                        }
                    }}
                >
                    Pause
                </div>
                <div
                    onClick={() => {
                        changeDoing(false);
                        changeFirstTime(true);
                        stopInterval();
                        window.index = 0;
                        stepAniIns(animationArray, array, window.index);
                    }}
                >
                    Reset
                </div>
                <div
                    onClick={() => {
                        window.index--;
                        if (window.index < 0) {
                            window.index = 0;
                        }
                        stepAniIns(animationArray, array, window.index);
                    }}
                >
                    Previous
                </div>
                <div
                    onClick={() => {
                        window.index++;
                        if (window.index > animationArray.length) {
                            window.index = animationArray.length + 1;
                        }
                        stepAniIns(animationArray, array, window.index);
                    }}
                >
                    Next
                </div>
                <div>Speed</div>
            </div>
            <div className="control-button">
                <div
                    className="sort"
                    onClick={() => {
                        if (doing == true) {
                            changeDoing(false);
                            stopInterval();
                        }
                    }}
                >
                    Pause
                </div>
                <div
                    className="sort"
                    onClick={() => {
                        if (doing == false && firstTime) {
                            changeDoing(true);
                            changeFirstTime(false);
                            let ani = insertionSort(array);
                            setAnimationArray(ani);
                            for (let i = 0; i < array.length; i++) {
                                status[i] = "null";
                            }
                            doAniIns(ani, array, 0);
                        } else if (doing == false) {
                            changeDoing(true);
                            doAniIns(animationArray, array, window.index);
                            //pause後開始position會有問題
                        }
                    }}
                >
                    Start
                </div>
            </div>
        </div>
    );
};

export default Insertion;
