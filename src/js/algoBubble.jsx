import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";
import Graph from "./graph.jsx";
import Code from "./code.jsx";
import AniControl from "./animationControl.jsx";

const Bubble = (props) => {
    let {
        array,
        setArray,
        content,
        setContent,
        animationArray,
        setAnimationArray,
        initialArray,
        // setInitialArray,
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

    const bubbleSort = (array, a, b) => {
        let arr = [...array];
        let times = arr.length;
        let swap = false;
        // let animationArray = [];
        do {
            swap = false;
            times--;
            for (let i = 0; i < times; i++) {
                animationArray.push(["com", i, i + 1]);
                if (arr[i] > arr[i + 1]) {
                    animationArray.push(["big", i, i + 1]);
                    animationArray.push(["push", i, i + 1]);
                    [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                    swap = true;
                }
            }
            if (!swap && times > 1) {
                animationArray.push(["sorted", times]);
            }
        } while (times > 0 && swap == true);
        // return animationArray;
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
            // console.log(newColor(status));
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

                setColor(newColor(status));
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

                setPosition(newPosition(arr));
                setColor(newColor(status));
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

                setColor(newColor(status));
            } else if (ele[0] == "sorted") {
                for (let i = 0; i < arr.length; i++) {
                    status[i] = "sorted";
                }
                setColor(newColor(status));
            }
            window.index++;

            if (window.index >= animationArray.length) {
                for (let i = 0; i < arr.length; i++) {
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
                window.index++;
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
        setColor(newColor(statusTemp));
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

                setColor(newColor(statusTemp));
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

                setPosition(newPosition(arr));
                setColor(newColor(statusTemp));
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

                setColor(newColor(statusTemp));
            } else if (ele[0] == "sorted") {
                for (let i = 0; i < arr.length; i++) {
                    statusTemp[i] = "sorted";
                }
                setColor(newColor(statusTemp));
            }
        }
        if (index == animationArray.length + 1) {
            for (let i = 0; i < arr.length; i++) {
                statusTemp[i] = "sorted";
            }
            setColor(newColor(statusTemp));

            let temp = [...colorCode];
            for (let i = 0; i < code.length; i++) {
                temp[i] = "#000000";
            }
            setCurrentCode(temp);
            setContent("排序完成。");
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
                control={control}
                sort={bubbleSort}
                doAni={doAniBub}
                stepAni={stepAniBub}
            />
        </div>
    );
};

export default Bubble;
