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

const Quick = (props) => {
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

    const quickSort = (arr, left, right) => {
        if (left >= right) {
            animationArray.push(["pivot", left]);
            return null;
        }
        let pivot = left;
        for (let i = left + 1; i <= right; i++) {
            animationArray.push(["com", pivot, i]);
            if (arr[i] < arr[pivot]) {
                animationArray.push(["min", pivot, i]);
                animationArray.push(["push1", pivot, i]);
                [arr[i], arr[pivot]] = [arr[pivot], arr[i]];

                animationArray.push(["push2", i, pivot + 1]);
                [arr[i], arr[pivot + 1]] = [arr[pivot + 1], arr[i]];
                pivot++;
            }
        }
        animationArray.push(["pivot", pivot]);

        quickSort(arr, left, pivot - 1);
        quickSort(arr, pivot + 1, right);
        return arr;
    };

    const code = [
        "假設第一個數開始為 pivot\nfor each unsorted element\npivot = first element",
        "\t與 pivot 之後直到下一個已排序數字\n\tfor i from pivot+1 to rightIndex",
        "\t\t每一個數字比較\n\t\tcompare array[pivot] and array[i]",
        "\t\t\t若小於 pivot ，移至 pivot 左邊\n\t\t\tswap array[pivot] and array[i]",
        "\t\t\tpivot 向右移動一位\n\t\t\tswap array[i] and array[pivot+1]",
    ];
    let colorCode = [];
    for (let i = 0; i < code.length; i++) {
        colorCode.push("#000000");
    }
    const [currentCode, setCurrentCode] = useState(colorCode);
    

    const doAniQui = (animationArray, array, index) => {
        let arr = [...array];
        window.index = index;
        let text;

        window.ani = setInterval(() => {
            let ele = animationArray[window.index];
            if (ele[0] == "com") {
                //pivot, i
                for (let i = ele[1]; i < ele[2]; i++) {
                    if (status[i] != "sorted") {
                        status[i] = "com";
                    }
                }
                status[ele[1]] = "key";
                status[ele[2]] = "com";
                setColor(newColor(arr, status));
                text=`比較 pivot ${arr[ele[1]]} 與 ${arr[ele[2]]}`;
                setContent(text);
                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                temp[1] = "#ff0000";
                setCurrentCode(temp);
            } else if (ele[0] == "min") {
                // for (let i =0;i<arr.length;i++) {
                //     if(status[i]!='sorted'){
                //         status[i]='null';
                //     }
                // }
                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                temp[2] = "#ff0000";
                setCurrentCode(temp);
                text=`${arr[ele[2]]} < pivot ${arr[ele[1]]}`;
                setContent(text);
                status[ele[1]] = "key";
                status[ele[2]] = "min";
                setColor(newColor(arr, status));
            } else if (ele[0] == "push1") {
                //pivot ,i
                for (let i = ele[1]; i < ele[2]; i++) {
                    if (status[i] != "sorted") {
                        status[i] = "com";
                    }
                }
                status[ele[2]] = "key";
                for (let i = 0; i < ele[1]; i++) {
                    if (status[i] != "sorted") {
                        status[i] = "com";
                    }
                }
                status[ele[1]] = "com";

                [arr[ele[1]], arr[ele[2]]] = [arr[ele[2]], arr[ele[1]]];
                setArray(arr);

                text = `Pivot ${arr[ele[1]]} 與 ${arr[ele[2]]}互換。`;
                setContent(text);
                
                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                temp[3] = "#ff0000";
                setCurrentCode(temp);
                setColor(newColor(arr, status));
                setPosition(newPosition(arr));
            } else if (ele[0] == "push2") {
                //pivot ,i
                for (let i = 0; i < ele[2]; i++) {
                    if (status[i] != "sorted") {
                        status[i] = "com";
                    }
                }
                status[ele[1]] = "com";
                status[ele[2]] = "key";

                [arr[ele[1]], arr[ele[2]]] = [arr[ele[2]], arr[ele[1]]];
                setArray(arr);

                text = `Pivot ${arr[ele[1]]} 與 ${arr[ele[2]]}互換。`;
                setContent(text);

                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                temp[4] = "#ff0000";
                setCurrentCode(temp);
                setColor(newColor(arr, status));
                setPosition(newPosition(arr));
            } else if (ele[0] == "pivot") {
                for (let i = 0; i < arr.length; i++) {
                    if (status[i] != "sorted") {
                        status[i] = "null";
                    }
                }
                status[ele[1]] = "sorted";
                setColor(newColor(arr, status));

                text = `Pivot ${arr[ele[1]]} 排序完成`;
                setContent(text);

                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                temp[0] = "#ff0000";
                setCurrentCode(temp);
            }
            window.index++;
            if (window.index >= animationArray.length - 1) {
                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                setCurrentCode(temp);
                for (let i = 0; i < array.length; i++) {
                    status[i] = "sorted";
                }
                setColor(newColor(arr, status));

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
        if(doing){
            stopInterval();
            doAniQui(animationArray, array, window.index);
        }
    }, [time]);

    const stepAniQui = (animationArray, array, index) => {
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
                //pivot, i
                for (let i = ele[1]; i < ele[2]; i++) {
                    if (statusTemp[i] != "sorted") {
                        statusTemp[i] = "com";
                    }
                }
                statusTemp[ele[1]] = "key";
                statusTemp[ele[2]] = "com";
                setColor(newColor(arr, statusTemp));
                text=`比較 pivot ${arr[ele[1]]} 與 ${arr[ele[2]]}`;
                setContent(text);
                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                temp[1] = "#ff0000";
                setCurrentCode(temp);
            } else if (ele[0] == "min") {
                // for (let i =0;i<arr.length;i++) {
                //     if(statusTemp[i]!='sorted'){
                //         statusTemp[i]='null';
                //     }
                // }
                statusTemp[ele[1]] = "key";
                statusTemp[ele[2]] = "min";
                setColor(newColor(arr, statusTemp));
                text=`${arr[ele[2]]} < pivot ${arr[ele[1]]}`;
                setContent(text);
                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                temp[2] = "#ff0000";
                setCurrentCode(temp);
            } else if (ele[0] == "push1") {
                //pivot ,i
                for (let i = ele[1]; i < ele[2]; i++) {
                    if (statusTemp[i] != "sorted") {
                        statusTemp[i] = "com";
                    }
                }
                statusTemp[ele[2]] = "key";
                for (let i = 0; i < ele[1]; i++) {
                    if (statusTemp[i] != "sorted") {
                        statusTemp[i] = "com";
                    }
                }
                statusTemp[ele[1]] = "com";

                text = `Pivot ${arr[ele[1]]} 與 ${arr[ele[2]]}互換。`;
                setContent(text);

                [arr[ele[1]], arr[ele[2]]] = [arr[ele[2]], arr[ele[1]]];
                setArray(arr);

                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                temp[3] = "#ff0000";
                setCurrentCode(temp);
                setColor(newColor(arr, statusTemp));
                setPosition(newPosition(arr));
            } else if (ele[0] == "push2") {
                //pivot ,i
                for (let i = 0; i < ele[2]; i++) {
                    if (statusTemp[i] != "sorted") {
                        statusTemp[i] = "com";
                    }
                }
                statusTemp[ele[1]] = "com";
                statusTemp[ele[2]] = "key";

                text = `Pivot ${arr[ele[1]]} 與 ${arr[ele[2]]}互換。`;
                setContent(text);

                [arr[ele[1]], arr[ele[2]]] = [arr[ele[2]], arr[ele[1]]];
                setArray(arr);
                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                temp[4] = "#ff0000";
                setCurrentCode(temp);
                setColor(newColor(arr, statusTemp));
                setPosition(newPosition(arr));
            } else if (ele[0] == "pivot") {
                for (let i = 0; i < arr.length; i++) {
                    if (statusTemp[i] != "sorted") {
                        statusTemp[i] = "null";
                    }
                }
                statusTemp[ele[1]] = "sorted";
                setColor(newColor(arr, statusTemp));
                text = `Pivot ${arr[ele[1]]} 排序完成`;
                setContent(text);
                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                temp[0] = "#ff0000";
                setCurrentCode(temp);
            }
        }
        if (index >= animationArray.length - 1 && index != 0) {
            let temp = [...colorCode];
            for (let i = 0; i < code.length; i++) {
                temp[i] = "#000000";
            }
            setCurrentCode(temp);
            for (let i = 0; i < array.length; i++) {
                statusTemp[i] = "sorted";
            }
            setColor(newColor(arr, statusTemp));

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
                    {/* Reset */}
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
                            stepAniQui(animationArray, array, window.index);
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
                    {/* Previous */}
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
                                if (!doing) {
                                    window.index--;
                                    if (window.index < 0) {
                                        window.index = 0;
                                    }
                                    stepAniQui(
                                        animationArray,
                                        array,
                                        window.index
                                    );
                                    refStartUnclick.current.style.display =
                                        "none";
                                    refStartClick.current.style.display =
                                        "block";
                                    refNextUnclick.current.style.display =
                                        "none";
                                    refNextImg.current.style.display = "block";
                                }
                            }}
                        />
                    </div>
                    {/* Start */}
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
                                    let arr1 = [...array];
                                    quickSort(arr1, 0, array.length - 1);

                                    for (let i = 0; i < array.length; i++) {
                                        status[i] = "null";
                                    }
                                    doAniQui(animationArray, array, 0);
                                } else if (doing == false) {
                                    changeDoing(true);
                                    doAniQui(
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
                    {/* Pause */}
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
                    {/* Next */}
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
                                if (!doing) {
                                    window.index++;
                                    if (window.index > animationArray.length) {
                                        window.index =
                                            animationArray.length + 1;
                                    }
                                    if (animationArray.length == 0) {
                                        let arr1 = [...array];
                                        quickSort(arr1, 0, array.length - 1);
                                    }
                                    stepAniQui(
                                        animationArray,
                                        array,
                                        window.index
                                    );
                                }
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

export default Quick;
