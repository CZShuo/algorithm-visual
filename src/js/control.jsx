import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";

const Control = (props) => {
    let {
        setArray,
        setArrayIndex,
        initialArray,
        setInitialArray,
        customArray,
        setCustomArray,
        setInitialArrayIndex,
        setTime,
        setColor,
        colorSet,
        changeColor,
        setPosition,
        newColor,
        newPosition,
        status,
        setStatus,
        stopInterval,
        doing,
        changeDoing,
        firstTime,
        changeFirstTime,
        setAnimationArray,
        setCustom,
        resetEverything,
        resetArray
    } = props.controlData;
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
    const displayOn=props.displayOn;
    const displayOff=props.displayOff;
    let color = Object.assign({}, colorSet);
    const inputRef = useRef(null);
    const randomRef = useRef(null);
    const controlRef = useRef(null);
    // BUG : 建立新array並跑完一次sort之後，再建立新array不能sort
    return (
        <>
            <div
                className="hide-control"
                onClick={(e) => {
                    if (controlRef.current.style.display == "none") {
                        controlRef.current.style.display = "flex";
                        e.target.style.bottom = "200px";
                        e.target.textContent = "Hide";
                    } else {
                        controlRef.current.style.display = "none";
                        e.target.style.bottom = "0";
                        e.target.textContent = "Open";
                    }
                }}
            >
                Hide
            </div>
            <div className="control" ref={controlRef}>
                <div className="left-control">
                    <div className="control-title">Array</div>
                    <div className="set-array">
                        <div>Set Your Array : </div>
                        <input
                            type="text"
                            id="array-input"
                            placeholder="13,25,17,55,36 (between 1~99)"
                            onFocus={() => {
                                if (!inputRef.current.value) {
                                    inputRef.current.value = "13,25,17,55,36";
                                }
                                inputRef.current.select();
                            }}
                            ref={inputRef}
                        />
                        <div
                            id="send-array"
                            onClick={() => {
                                resetEverything();
                                let input = inputRef.current.value;
                                let arr = input.replace(/\s/g, "").split(",");
                                let arrIndex = [];
                                let sta = [];
                                for (let i = 0; i < arr.length; i++) {
                                    let num = Math.floor(Number(arr[i]));
                                    if (Number.isNaN(num)) {
                                        alert("Input must be number !");
                                        arr = [
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
                                        ];
                                        arrIndex = [
                                            [0, 45],
                                            [1, 72],
                                            [2, 17],
                                            [3, 55],
                                            [4, 90],
                                            [5, 32],
                                            [6, 48],
                                            [7, 23],
                                            [8, 66],
                                            [9, 99],
                                            [10, 12],
                                            [11, 62],
                                            [12, 34],
                                            [13, 84],
                                            [14, 10],
                                            [15, 70],
                                        ];
                                        inputRef.current.value = "";
                                        break;
                                    } else {
                                        if (num >= 100 || num <= 0) {
                                            alert(
                                                "Number must be between 1~99!"
                                            );
                                            arr = [
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
                                            ];
                                            arrIndex = [
                                                [0, 45],
                                                [1, 72],
                                                [2, 17],
                                                [3, 55],
                                                [4, 90],
                                                [5, 32],
                                                [6, 48],
                                                [7, 23],
                                                [8, 66],
                                                [9, 99],
                                                [10, 12],
                                                [11, 62],
                                                [12, 34],
                                                [13, 84],
                                                [14, 10],
                                                [15, 70],
                                            ];
                                            break;
                                        }
                                        arr[i] = num;
                                        arrIndex.push([i, num]);
                                        sta.push('null');
                                    }
                                }

                                setCustom(true);
                                setCustomArray(arr);
                                setArray(arr);
                                setArrayIndex(arrIndex);
                                setInitialArray(arr);
                                setPosition(newPosition(arr));
                                setStatus(sta);
                                setColor(newColor(sta));
                                displayOff([
                                    refPause,
                                    refStartUnclick,
                                    refPreviousImg,
                                    refNextImg,
                                ]);
                                displayOn([
                                    refStart,
                                    refStartClick,
                                    refPreviousUnclick,
                                    refNextUnclick,
                                ]);
                            }}
                        >
                            Set
                        </div>
                    </div>
                    <div className="set-array">
                        <div>Random Array : </div>
                        <input
                            id="number-input"
                            placeholder="5 ~ 20"
                            type="number"
                            min="5"
                            max="20"
                            ref={randomRef}
                            onFocus={() => {
                                randomRef.current.select();
                            }}
                        />
                        <div
                            id="send-number"
                            onClick={() => {
                                resetEverything();
                                let num = randomRef.current;
                                if (num.value > 20) {
                                    num.value = 20;
                                    alert("Can't be more than 20 numbers !");
                                } else if (num.value < 5 || num.value == null) {
                                    num.value = 5;
                                    alert("Can't be less than 5 numbers !");
                                }
                                let arr = [];
                                let arrIndex = [];
                                let sta = [];
                                for (let i = 0; i < num.value; i++) {
                                    let random =
                                        Math.floor(Math.random() * 100) + 1;
                                    arr.push(random);
                                    arrIndex.push([i, random]);
                                    sta.push("null");
                                }

                                setCustom(true);
                                setCustomArray(arr);
                                setArray(arr);
                                setArrayIndex(arrIndex);
                                setInitialArray(arr);
                                setPosition(newPosition(arr));
                                setStatus(sta);
                                setColor(newColor(sta));
                                displayOff([
                                    refPause,
                                    refStartUnclick,
                                    refPreviousImg,
                                    refNextImg,
                                ]);
                                displayOn([
                                    refStart,
                                    refStartClick,
                                    refPreviousUnclick,
                                    refNextUnclick,
                                ]);
                            }}
                        >
                            Random
                        </div>
                    </div>
                </div>

                <div className="right-control">
                    <div
                        className="color-picks"
                        onChange={(e) => {
                            color[e.target.name] = e.target.value;
                            changeColor(color);
                        }}
                    >
                        <div className="control-title">Color</div>
                        <div className="color-pick">
                            <label htmlFor="color-null">Default: </label>
                            <input
                                type="color"
                                defaultValue={color.null}
                                name="null"
                                id="color-null"
                            ></input>
                        </div>
                        <div className="color-pick">
                            <label htmlFor="color-sorted">Key: </label>
                            <input
                                type="color"
                                defaultValue={color.key}
                                name="key"
                                id="color-key"
                            ></input>
                        </div>
                        <div className="color-pick">
                            <label htmlFor="color-sorted">Sorted: </label>
                            <input
                                type="color"
                                defaultValue={color.sorted}
                                name="sorted"
                                id="color-sorted"
                            ></input>
                        </div>
                        <div className="color-pick">
                            <label htmlFor="color-com">Comparing: </label>
                            <input
                                type="color"
                                defaultValue={color.com}
                                name="com"
                                id="color-com"
                            ></input>
                        </div>

                        <div className="color-pick">
                            <label htmlFor="color-big">Bigger: </label>
                            <input
                                type="color"
                                defaultValue={color.big}
                                name="big"
                                id="color-big"
                            ></input>
                        </div>
                        <div className="color-pick">
                            <label htmlFor="color-small">Smaller: </label>
                            <input
                                type="color"
                                defaultValue={color.small}
                                name="small"
                                id="color-small"
                            ></input>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Control;
