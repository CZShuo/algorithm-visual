import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";
import Graph from "./graph.jsx";
import Code from "./code.jsx";

import Start from "../img/start.png";
import StartHover from "../img/startHover.png";
import StartUnclick from "../img/startUnclick.png";
import Pause from "../img/pause.png";
import PauseHover from "../img/pauseHover.png";
import Reset from "../img/reset.png";
import ResetHover from "../img/resetHover.png";
import Next from "../img/next.png";
import NextHover from "../img/nextHover.png";
import NextUnclick from "../img/nextUnclick.png";
import Previous from "../img/previous.png";
import PreviousHover from "../img/previousHover.png";
import PreviousUnclick from "../img/previousUnclick.png";

const Bubble = (props) => {
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
        dragElement,
        setTime,
    } = props.data;

    const bubbleSort = (array) => {
        let arr = [...array];
        let times = arr.length;
        let swap = false;
        let ani = [];
        do {
            swap = false;
            times--;
            for (let i = 0; i < times; i++) {
                ani.push(["com", i, i + 1]);
                if (arr[i] > arr[i + 1]) {
                    ani.push(["big", i, i + 1]);
                    ani.push(["push", i, i + 1]);
                    [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                    swap = true;
                }
            }
            if (!swap && times > 1) {
                ani.push(["sorted", times]);
            }
        } while (times > 0 && swap == true);
        return ani;
    };

    const code = [
        "從第一個數字開始\nfor i from 0 to array's length",
        "\t與下一個數字比較大小，找出大的數字\n\tif array[i] > array[i+1]",
        "\t\t大的數字向後移動\n\t\tswap array[i] and array[i+1]",
    ];
    let colorCode = [];
    for (let i = 0; i < code.length; i++) {
        colorCode.push("#000000");
    }
    const [currentCode, setCurrentCode] = useState(colorCode);

    const doAniBub = (animationArray, array, index) => {
        let arr = [...array];
        window.index = index;
        let text;

        window.ani = setInterval(() => {
            let ele = animationArray[window.index];
            if (ele[0] == "com") {
                for (let i = 0; i < ele[1]; i++) {
                    status[i] = "null";
                }
                status[ele[1]] = "com";
                status[ele[2]] = "com";
                if (window.index > 1) {
                    if (ele[2] < animationArray[window.index - 1][2]) {
                        status[animationArray[window.index - 1][1]] = "null";
                        status[animationArray[window.index - 1][2]] = "sorted";
                    }
                }

                text = `比較 ${arr[ele[1]]} 與 ${arr[ele[2]]}。`;
                setContent(text);

                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                temp[1] = "#ff0000";
                setCurrentCode(temp);

                setColor(newColor(arr, status));
            } else if (ele[0] == "push") {
                text = `${arr[ele[1]]} 與 ${arr[ele[2]]}互換。`;
                setContent(text);

                status[ele[1]] = "null";
                status[ele[2]] = "sorted";

                [arr[ele[1]], arr[ele[2]]] = [arr[ele[2]], arr[ele[1]]];
                setArray(arr);

                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                temp[2] = "#ff0000";
                setCurrentCode(temp);

                setOldPosition(position);
                setPosition(newPosition(arr));
                setColor(newColor(arr, status));
            } else if (ele[0] == "big") {
                status[ele[1]] = "big";
                status[ele[2]] = "small";
                text = `${arr[ele[1]]} 大於 ${arr[ele[2]]}，因此將兩者互換。`;
                setContent(text);

                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                temp[1] = "#ff0000";
                setCurrentCode(temp);

                setColor(newColor(arr, status));
            } else if (ele[0] == "sorted") {
                for (let i = 0; i < arr.length; i++) {
                    status[i] = "sorted";
                }
                setColor(newColor(arr, status));
            }
            window.index++;

            if (window.index >= animationArray.length) {
                for (let i = 0; i < arr.length; i++) {
                    status[i] = "sorted";
                }
                setColor(newColor(arr, status));
                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                setCurrentCode(temp);
                setContent("排序完成。");
                clearInterval(window.ani);
                changeDoing(false);
                window.index++;
                refPause.current.style.display = "none";
                refStart.current.style.display = "block";
                refStartClick.current.style.display = "none";
                refStartUnclick.current.style.display = "block";
                refPreviousUnclick.current.style.display = "none";
                refPreviousImg.current.style.display = "block";
                refNextImg.current.style.display = "none";
                refNextUnclick.current.style.display = "block";
            }
        }, time);
        {
            // Can't work because of status state
            // window.ani = setInterval(() => {
            //     let ele = animationArray[window.index];
            //     if (ele[0] == "com") {
            //         let statusTemp = [...status];
            //         for (let i = 0; i < ele[1]; i++) {
            //             statusTemp[i] = "null";
            //         }
            //         statusTemp[ele[1]] = "com";
            //         statusTemp[ele[2]] = "com";
            //         text = `比較 ${arr[ele[1]]} 與 ${arr[ele[2]]}。`;
            //         setContent(text);
            //         let colorTemp = [...colorCode];
            //         for (let i = 0; i < code.length; i++) {
            //             colorTemp[i] = "#000000";
            //         }
            //         colorTemp[1] = "#ff0000";
            //         setCurrentCode(colorTemp);
            //         if (window.index > 1) {
            //             if (ele[2] < animationArray[window.index - 1][2]) {
            //                 statusTemp[animationArray[window.index - 1][1]] = "null";
            //                 statusTemp[animationArray[window.index - 1][2]] = "sorted";
            //             }
            //         }
            //         setStatus(statusTemp);
            //         setColor(newColor(arr, statusTemp));
            //     } else if (ele[0] == "push") {
            //         text = `${arr[ele[1]]} 與 ${arr[ele[2]]}互換。`;
            //         setContent(text);
            //         let statusTemp = [...status];
            //         statusTemp[ele[1]] = "null";
            //         statusTemp[ele[2]] = "sorted";
            //         setStatus(statusTemp);
            //         [arr[ele[1]], arr[ele[2]]] = [arr[ele[2]], arr[ele[1]]];
            //         setArray(arr);
            //         let colorTemp = [...colorCode];
            //         for (let i = 0; i < code.length; i++) {
            //             colorTemp[i] = "#000000";
            //         }
            //         colorTemp[2] = "#ff0000";
            //         setCurrentCode(colorTemp);
            //         setOldPosition(position);
            //         setPosition(newPosition(arr));
            //         setColor(newColor(arr, statusTemp));
            //     } else if (ele[0] == "big") {
            //         let statusTemp = [...status];
            //         statusTemp[ele[1]] = "big";
            //         statusTemp[ele[2]] = "small";
            //         setStatus(statusTemp);
            //         text = `${arr[ele[1]]} 大於 ${arr[ele[2]]}，因此將兩者互換。`;
            //         setContent(text);
            //         let colorTemp = [...colorCode];
            //         for (let i = 0; i < code.length; i++) {
            //             colorTemp[i] = "#000000";
            //         }
            //         colorTemp[1] = "#ff0000";
            //         setCurrentCode(colorTemp);
            //         setColor(newColor(arr, statusTemp));
            //     } else if (ele[0] == "sorted") {
            //         let statusTemp = [...status];
            //         for (let i = 0; i < arr.length; i++) {
            //             statusTemp[i] = "sorted";
            //         }
            //         setStatus(statusTemp);
            //         setColor(newColor(arr, statusTemp));
            //     }
            //     window.index++;
            //     if (window.index >= animationArray.length) {
            //         let statusTemp = [...status];
            //         for (let i = 0; i < arr.length; i++) {
            //             statusTemp[i] = "sorted";
            //         }
            //         setColor(newColor(arr, statusTemp));
            //         let colorTemp = [...colorCode];
            //         for (let i = 0; i < code.length; i++) {
            //             colorTemp[i] = "#000000";
            //         }
            //         setCurrentCode(colorTemp);
            //         setContent("排序完成。");
            //         clearInterval(window.ani);
            //     }
            // }, time);
        }
    };

    useEffect(() => {
        if(doing){
            stopInterval();
            doAniBub(animationArray, array, window.index);
        }
    }, [time]);

    const stepAniBub = (animationArray, array, index) => {
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
                for (let i = 0; i < ele[1]; i++) {
                    statusTemp[i] = "null";
                }
                statusTemp[ele[1]] = "com";
                statusTemp[ele[2]] = "com";
                if (stepIndex > 1) {
                    if (ele[2] < animationArray[stepIndex - 1][2]) {
                        statusTemp[animationArray[stepIndex - 1][1]] = "null";
                        statusTemp[animationArray[stepIndex - 1][2]] = "sorted";
                    }
                }

                text = `比較 ${arr[ele[1]]} 與 ${arr[ele[2]]}。`;
                setContent(text);

                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                temp[1] = "#ff0000";
                setCurrentCode(temp);

                setColor(newColor(arr, statusTemp));
            } else if (ele[0] == "push") {
                text = `${arr[ele[1]]} 與 ${arr[ele[2]]}互換。`;
                setContent(text);

                statusTemp[ele[1]] = "null";
                statusTemp[ele[2]] = "sorted";

                [arr[ele[1]], arr[ele[2]]] = [arr[ele[2]], arr[ele[1]]];
                setArray(arr);

                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                temp[2] = "#ff0000";
                setCurrentCode(temp);

                setOldPosition(position);
                setPosition(newPosition(arr));
                setColor(newColor(arr, statusTemp));
            } else if (ele[0] == "big") {
                statusTemp[ele[1]] = "big";
                statusTemp[ele[2]] = "small";

                text = `${arr[ele[1]]} 大於 ${arr[ele[2]]}，因此將兩者互換。`;
                setContent(text);

                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                temp[1] = "#ff0000";
                setCurrentCode(temp);

                setColor(newColor(arr, statusTemp));
            } else if (ele[0] == "sorted") {
                for (let i = 0; i < arr.length; i++) {
                    statusTemp[i] = "sorted";
                }
                setColor(newColor(arr, statusTemp));
            }
        }
        if (index == animationArray.length + 1) {
            for (let i = 0; i < arr.length; i++) {
                statusTemp[i] = "sorted";
            }
            setColor(newColor(arr, statusTemp));

            let temp = [...colorCode];
            for (let i = 0; i < code.length; i++) {
                temp[i] = "#000000";
            }
            setCurrentCode(temp);
            setContent("排序完成。");
            refPause.current.style.display = "none";
            refStart.current.style.display = "block";
            refStartClick.current.style.display = "none";
            refStartUnclick.current.style.display = "block";
            refPreviousUnclick.current.style.display = "none";
            refPreviousImg.current.style.display = "block";
            refNextImg.current.style.display = "none";
            refNextUnclick.current.style.display = "block";
        }
        setStatus(statusTemp);
    };

    useEffect(() => {
        dragElement(refDrag.current);
        refPause.current.style.display = "none";
        refStartUnclick.current.style.display = "none";
        refNextUnclick.current.style.display = "none";
        refPreviousImg.current.style.display = "none";
        refPreviousUnclick.current.style.display = "block";
    }, []);

    const refStart = useRef(null);
    const refPause = useRef(null);
    const refDrag = useRef(null);
    const refPreviousUnclick = useRef(null);
    const refPreviousImg = useRef(null);
    const refNextImg = useRef(null);
    const refNextUnclick = useRef(null);
    const refStartUnclick = useRef(null);
    const refStartClick = useRef(null);

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
            <div className="animation-control" id="drag" ref={refDrag}>
                <div id="dragheader">Drag Me!</div>
                <div id="dragbody">
                    <div
                        id="reset"
                        title="Reset"
                        onClick={() => {
                            changeDoing(false);
                            changeFirstTime(true);
                            if (window.ani) {
                                stopInterval();
                            }
                            setAnimationArray([]);
                            let temp = [...colorCode];
                            for (let i = 0; i < code.length; i++) {
                                temp[i] = "#000000";
                            }
                            setCurrentCode(temp);
                            window.index = 0;
                            stepAniBub(animationArray, array, window.index);
                            refPause.current.style.display = "none";
                            refStart.current.style.display = "block";
                            refStartUnclick.current.style.display = "none";
                            refStartClick.current.style.display = "block";
                            refPause.current.style.display = "none";
                            refStart.current.style.display = "block";
                            refPreviousImg.current.style.display = "none";
                            refPreviousUnclick.current.style.display = "block";
                            refNextImg.current.style.display = "block";
                            refNextUnclick.current.style.display = "none";
                        }}
                    >
                        <img
                            src={"/" + Reset}
                            onMouseEnter={(e) =>
                                (e.target.src = "/" + ResetHover)
                            }
                            onMouseLeave={(e) => (e.target.src = "/" + Reset)}
                        />
                    </div>

                    <div id="previous" title="Previous Step">
                        <img
                            ref={refPreviousUnclick}
                            src={"/" + PreviousUnclick}
                        />
                        <img
                            ref={refPreviousImg}
                            src={"/" + Previous}
                            onMouseEnter={(e) =>
                                (e.target.src = "/" + PreviousHover)
                            }
                            onMouseLeave={(e) =>
                                (e.target.src = "/" + Previous)
                            }
                            onClick={() => {
                                window.index--;
                                if (window.index < 0) {
                                    window.index = 0;
                                }
                                stepAniBub(animationArray, array, window.index);
                                refStartUnclick.current.style.display = "none";
                                refStartClick.current.style.display = "block";
                                refNextUnclick.current.style.display = "none";
                                refNextImg.current.style.display = "block";
                            }}
                        />
                    </div>

                    <div ref={refStart} id="start" title="Start">
                        <img ref={refStartUnclick} src={"/" + StartUnclick} />
                        <img
                            ref={refStartClick}
                            src={"/" + Start}
                            onMouseEnter={(e) =>
                                (e.target.src = "/" + StartHover)
                            }
                            onMouseLeave={(e) => (e.target.src = "/" + Start)}
                            onClick={() => {
                                if (doing == false && firstTime) {
                                    changeDoing(true);
                                    changeFirstTime(false);
                                    let ani = bubbleSort(array);
                                    setAnimationArray(ani);
                                    for (let i = 0; i < array.length; i++) {
                                        status[i] = "null";
                                    }
                                    doAniBub(ani, array, 0);
                                } else if (doing == false) {
                                    changeDoing(true);
                                    if (window.index == animationArray.length) {
                                        window.index--;
                                    }
                                    doAniBub(
                                        animationArray,
                                        array,
                                        window.index--
                                    );
                                }
                                refStart.current.style.display = "none";
                                refPause.current.style.display = "block";
                                refNextImg.current.style.display = "none";
                                refPreviousImg.current.style.display = "none";
                                refNextUnclick.current.style.display = "block";
                                refNextUnclick.current.style.cursor =
                                    "not-allowed";
                                refPreviousUnclick.current.style.display =
                                    "block";
                                refPreviousUnclick.current.style.cursor =
                                    "not-allowed";
                            }}
                        />
                    </div>

                    <div
                        ref={refPause}
                        id="pause"
                        title="Pause"
                        onClick={() => {
                            if (doing == true) {
                                changeDoing(false);
                                stopInterval();
                            }
                            refPause.current.style.display = "none";
                            refStart.current.style.display = "block";
                            refNextImg.current.style.display = "block";
                            refPreviousImg.current.style.display = "block";
                            refNextUnclick.current.style.display = "none";
                            refPreviousUnclick.current.style.display = "none";
                        }}
                    >
                        <img
                            src={"/" + Pause}
                            onMouseEnter={(e) =>
                                (e.target.src = "/" + PauseHover)
                            }
                            onMouseLeave={(e) => (e.target.src = "/" + Pause)}
                        />
                    </div>

                    <div id="next" title="Next Step">
                        <img ref={refNextUnclick} src={"/" + NextUnclick} />
                        <img
                            ref={refNextImg}
                            src={"/" + Next}
                            onMouseEnter={(e) =>
                                (e.target.src = "/" + NextHover)
                            }
                            onMouseLeave={(e) => (e.target.src = "/" + Next)}
                            onClick={() => {
                                window.index++;
                                if (window.index > animationArray.length) {
                                    window.index = animationArray.length + 1;
                                }
                                if (animationArray.length == 0) {
                                    let ani = bubbleSort(array);
                                    setAnimationArray(ani);
                                }
                                stepAniBub(animationArray, array, window.index);
                            }}
                        />
                    </div>
                </div>
                <div id="speed-control">
                    <div>Speed : </div>
                    <input
                        type="range"
                        min="1"
                        max="15"
                        defaultValue="7"
                        step="1"
                        onChange={(e) => {
                            setTime(1500 / e.target.value);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Bubble;
