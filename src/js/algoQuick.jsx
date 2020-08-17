import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";
import Graph from "./graph.jsx";
import Code from "./code.jsx";
import AniControl from "./animationControl.jsx";

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
    }=props.refs;

    const quickSort = (array, left, right) => {
        let arr = [...array];
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
        "假設未排序的第一個數為 pivot\nfor each unsorted element\npivot = first element",
        "\tpivot 之後直到下一個已排序數字\n\tfor i from pivot+1 to rightIndex",
        "\t\tpivot 與每一個數字比較\n\t\tcompare array[pivot] and array[i]",
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
                setColor(newColor(status));
                text = `比較 pivot ${arr[ele[1]]} 與 ${arr[ele[2]]}`;
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
                text = `${arr[ele[2]]} < pivot ${arr[ele[1]]}`;
                setContent(text);
                status[ele[1]] = "key";
                status[ele[2]] = "small";
                setColor(newColor(status));
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
                setColor(newColor(status));
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
                setColor(newColor(status));
                setPosition(newPosition(arr));
            } else if (ele[0] == "pivot") {
                for (let i = 0; i < arr.length; i++) {
                    if (status[i] != "sorted") {
                        status[i] = "null";
                    }
                }
                status[ele[1]] = "sorted";
                setColor(newColor(status));

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
                setColor(newColor(status));

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
            doAniQui(animationArray, array, window.index);
        }
    }, [time]);

    const stepAniQui = (animationArray, array, index) => {
        let text;
        let arr = [...initialArray];

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
                //pivot, i
                for (let i = ele[1]; i < ele[2]; i++) {
                    if (statusTemp[i] != "sorted") {
                        statusTemp[i] = "com";
                    }
                }
                statusTemp[ele[1]] = "key";
                statusTemp[ele[2]] = "com";
                setColor(newColor(statusTemp));
                text = `比較 pivot ${arr[ele[1]]} 與 ${arr[ele[2]]}`;
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
                statusTemp[ele[2]] = "small";
                setColor(newColor(statusTemp));
                text = `${arr[ele[2]]} < pivot ${arr[ele[1]]}`;
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
                setColor(newColor(statusTemp));
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
                setColor(newColor(statusTemp));
                setPosition(newPosition(arr));
            } else if (ele[0] == "pivot") {
                for (let i = 0; i < arr.length; i++) {
                    if (statusTemp[i] != "sorted") {
                        statusTemp[i] = "null";
                    }
                }
                statusTemp[ele[1]] = "sorted";
                setColor(newColor(statusTemp));
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
            setColor(newColor(statusTemp));

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
                sort={quickSort}
                doAni={doAniQui}
                stepAni={stepAniQui}
            />
        </div>
    );
};

export default Quick;
