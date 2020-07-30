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

const Select = (props) => {
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

    const code = [
        "從第一個數字開始\nfor i from 0 to array's length",
        "\t未排序區第一個數字令為臨時最小值\n\tmin = array[i]",
        "\t向未排序區尋找未排序的最小值\n\tfor j from i+1 to array's length\n\t\tif array[j] < array[i]",
        "\t\t\tmin= array[j]",
        "\t將最小值與未排序區第一個數字交換\n\tswap min(array[j]) and array[i]",
    ];
    let colorCode = [];
    for (let i = 0; i < code.length; i++) {
        colorCode.push("#000000");
    }
    const [currentCode, setCurrentCode] = useState(colorCode);

    const doAniSel = (animationArray, array, index) => {
        let arr = [...array];
        window.index = index;
        let text;

        window.ani = setInterval(() => {
            let ele = animationArray[window.index];
            if (ele[0] == "min") {
                status[ele[1]] = "min";
                if (
                    window.index > 1 &&
                    animationArray[window.index - 1][0] != "push"
                ) {
                    status[animationArray[window.index - 1][1]] = "null";
                    let temp = [...colorCode];
                    for (let i = 0; i < code.length; i++) {
                        temp[i] = "#000000";
                    }
                    temp[0] = "#ff0000";
                    temp[1] = "ff0000";
                    setCurrentCode(temp);
                } else {
                    let temp = [...colorCode];
                    for (let i = 0; i < code.length; i++) {
                        temp[i] = "#000000";
                    }
                    temp[3] = "#ff0000";
                    setCurrentCode(temp);
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
                text = `比較 ${arr[ele[1]]} 與 ${arr[ele[2]]}。`;
                setContent(text);

                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                temp[2] = "#ff0000";
                setCurrentCode(temp);

                setColor(newColor(arr, status));
            } else if (ele[0] == "push") {
                for (let i = 0; i <= ele[1]; i++) {
                    status[i] = "after";
                }
                for (let i = ele[1] + 1; i < arr.length; i++) {
                    status[i] = "null";
                }

                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                temp[4] = "#ff0000";
                setCurrentCode(temp);

                if (index == animationArray.length - 1) {
                    for (let i = 0; i < array.length; i++) {
                        status[i] = "after";
                    }
                }
                setColor(newColor(arr, status));

                if (ele[1] == ele[2]) {
                    text = `${arr[ele[1]]} 位置不變。`;
                } else {
                    text = `${arr[ele[1]]} 與 ${arr[ele[2]]}互換。`;
                }
                setContent(text);
                [arr[ele[1]], arr[ele[2]]] = [arr[ele[2]], arr[ele[1]]];
                setArray(arr);
                setOldPosition(position);
                setPosition(newPosition(arr));
            }
            window.index++;

            if (window.index >= animationArray.length) {
                for (let i = 0; i < array.length; i++) {
                    status[i] = "after";
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
    };

    useEffect(() => {
        stopInterval();
        doAniSel(animationArray, array, window.index);
    }, [time]);

    const stepAniSel = (animationArray, array, index) => {
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
            if (ele[0] == "min") {
                statusTemp[ele[1]] = "min";
                if (
                    stepIndex > 1 &&
                    animationArray[stepIndex - 1][0] != "push"
                ) {
                    statusTemp[animationArray[stepIndex - 1][1]] = "null";
                    let temp = [...colorCode];
                    for (let i = 0; i < code.length; i++) {
                        temp[i] = "#000000";
                    }
                    temp[0] = "#ff0000";
                    temp[1] = "ff0000";
                    setCurrentCode(temp);
                } else {
                    let temp = [...colorCode];
                    for (let i = 0; i < code.length; i++) {
                        temp[i] = "#000000";
                    }
                    temp[3] = "#ff0000";
                    setCurrentCode(temp);
                }

                text = `最小值為 ${arr[ele[1]]}`;
                setContent(text);
                setColor(newColor(arr, statusTemp));
            } else if (ele[0] == "com") {
                statusTemp[ele[1]] = "min";
                statusTemp[ele[2]] = "com";

                for (let i = ele[1] + 1; i < ele[2]; i++) {
                    statusTemp[i] = "null";
                }
                text = `比較 ${arr[ele[1]]} 與 ${arr[ele[2]]}。`;
                setContent(text);

                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                temp[2] = "#ff0000";
                setCurrentCode(temp);

                setColor(newColor(arr, statusTemp));
            } else if (ele[0] == "push") {
                for (let i = 0; i <= ele[1]; i++) {
                    statusTemp[i] = "after";
                }
                for (let i = ele[1] + 1; i < arr.length; i++) {
                    statusTemp[i] = "null";
                }

                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                temp[4] = "#ff0000";
                setCurrentCode(temp);

                if (index == animationArray.length - 1) {
                    for (let i = 0; i < array.length; i++) {
                        statusTemp[i] = "after";
                    }
                }
                setColor(newColor(arr, statusTemp));

                if (ele[1] == ele[2]) {
                    text = `${arr[ele[1]]} 位置不變。`;
                } else {
                    text = `${arr[ele[1]]} 與 ${arr[ele[2]]}互換。`;
                }
                setContent(text);
                [arr[ele[1]], arr[ele[2]]] = [arr[ele[2]], arr[ele[1]]];
                setArray(arr);
                setOldPosition(position);
                setPosition(newPosition(arr));
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
            setPosition(newPosition(arr));
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
                            stepAniSel(animationArray, array, window.index);
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
                                stepAniSel(animationArray, array, window.index);
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
                                    let ani = selectionSort(array);
                                    setAnimationArray(ani);
                                    for (let i = 0; i < array.length; i++) {
                                        status[i] = "null";
                                    }
                                    doAniSel(ani, array, 0);
                                } else if (doing == false) {
                                    changeDoing(true);
                                    doAniSel(
                                        animationArray,
                                        array,
                                        window.index
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
                                    let ani = insertionSort(array);
                                    setAnimationArray(ani);
                                }
                                stepAniSel(animationArray, array, window.index);
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

export default Select;
