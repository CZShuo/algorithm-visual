import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";
import Graph from "./graph.jsx";
import Code from "./code.jsx";
import AniControl from "./animationControl.jsx";

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
        stopInterval,
        doing,
        changeDoing,
        firstTime,
        changeFirstTime,
        dragElement,
        setTime,
        resetEverything,
        resetArray,
        displayOn,
        displayOff,
    } = props.data;

    const {
        refDrag,
        refStart,
        refPause,
        refPreviousImg,
        refPreviousUnclick,
        refNextImg,
        refNextUnclick,
        refStartUnclick,
        refStartClick,
    } = props.refs;

    const selectionSort = (array, a, b) => {
        let arr = [...array];
        for (let i = 0; i < array.length - 1; i++) {
            let min = arr[i];
            let minIndex = i;
            animationArray.push(["min", i]);
            for (let j = i + 1; j < array.length; j++) {
                animationArray.push(["com", minIndex, j]);
                if (arr[j] < min) {
                    animationArray.push(["min", j]);
                    min = arr[j];
                    minIndex = j;
                }
            }

            animationArray.push(["push", i, minIndex]);
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }

        // return animationArray;
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
                status[ele[1]] = "small";
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
                setColor(newColor(status));
            } else if (ele[0] == "com") {
                status[ele[1]] = "small";
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

                setColor(newColor(status));
            } else if (ele[0] == "push") {
                for (let i = 0; i <= ele[1]; i++) {
                    status[i] = "sorted";
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
                        status[i] = "sorted";
                    }
                }
                setColor(newColor(status));

                if (ele[1] == ele[2]) {
                    text = `${arr[ele[1]]} 位置不變。`;
                } else {
                    text = `${arr[ele[1]]} 與 ${arr[ele[2]]}互換。`;
                }
                setContent(text);
                [arr[ele[1]], arr[ele[2]]] = [arr[ele[2]], arr[ele[1]]];
                setArray(arr);
                setPosition(newPosition(arr));
            }
            window.index++;

            if (window.index >= animationArray.length) {
                for (let i = 0; i < array.length; i++) {
                    status[i] = "sorted";
                }
                setColor(newColor(status));

                let temp = [...colorCode];
                for (let i = 0; i < code.length; i++) {
                    temp[i] = "#000000";
                }
                setCurrentCode(temp);
                setContent("排序完成。");
                clearInterval(window.ani);
                changeDoing(false);
                displayOff([
                    refPause,
                    refStartClick,
                    refPreviousUnclick,
                    refNextImg,
                ]);
                displayOn([
                    refStart,
                    refStartClick,
                    refPreviousImg,
                    refNextUnclick,
                ]);
            }
        }, time);
    };

    useEffect(() => {
        if (doing) {
            stopInterval();
            doAniSel(animationArray, array, window.index);
        }
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
        setColor(newColor(statusTemp));
        setContent("Click Start!");

        let final = index;
        if (final == animationArray.length + 1) {
            final = animationArray.length;
        }

        for (let stepIndex = 0; stepIndex < final; stepIndex++) {
            let ele = animationArray[stepIndex];
            if (ele[0] == "min") {
                statusTemp[ele[1]] = "small";
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
                setColor(newColor(statusTemp));
            } else if (ele[0] == "com") {
                statusTemp[ele[1]] = "small";
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

                setColor(newColor(statusTemp));
            } else if (ele[0] == "push") {
                for (let i = 0; i <= ele[1]; i++) {
                    statusTemp[i] = "sorted";
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
                        statusTemp[i] = "sorted";
                    }
                }
                setColor(newColor(statusTemp));

                if (ele[1] == ele[2]) {
                    text = `${arr[ele[1]]} 位置不變。`;
                } else {
                    text = `${arr[ele[1]]} 與 ${arr[ele[2]]}互換。`;
                }
                setContent(text);
                [arr[ele[1]], arr[ele[2]]] = [arr[ele[2]], arr[ele[1]]];
                setArray(arr);
                setPosition(newPosition(arr));
            }
        }
        if (index == animationArray.length + 1) {
            for (let i = 0; i < arr.length; i++) {
                statusTemp[i] = "sorted";
            }

            let temp = [...colorCode];
            for (let i = 0; i < code.length; i++) {
                temp[i] = "#000000";
            }
            setCurrentCode(temp);

            setColor(newColor(statusTemp));
            setContent("排序完成。");
            setPosition(newPosition(arr));
            displayOff([
                refPause,
                refStartClick,
                refPreviousUnclick,
                refNextImg,
            ]);
            displayOn([
                refStart,
                refStartClick,
                refPreviousImg,
                refNextUnclick,
            ]);
        }
        setStatus(statusTemp);
    };

    const graph = {
        array,
        position,
        color,
        content,
        code,
        currentCode,
    };
    const control = {
        array,
        setArray,
        animationArray,
        setAnimationArray,
        initialArray,
        colorCode,
        status,
        doing,
        changeDoing,
        firstTime,
        changeFirstTime,
        stopInterval,
        setCurrentCode,
        setTime,
        dragElement,
        resetEverything,
        resetArray,
        displayOn,
        displayOff,
    };

    return (
        <div className="main">
            <div className="graph-code">
                <Graph graph={graph} />
                <Code code={code} currentCode={currentCode} />
            </div>
            <AniControl
                refs={props.refs}
                control={control}
                sort={selectionSort}
                doAni={doAniSel}
                stepAni={stepAniSel}
            />
        </div>
    );
};

export default Select;
