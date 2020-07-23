import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";

const Control = (props) => {
    let {
        setArray,
        setTime,
        setColor,
        colorSet,
        changeColor,
        setPosition,
        newColor,
        newPosition,
        status,
        stopInterval,
        doing,
        changeDoing,
        firstTime,
        changeFirstTime,
    } = props.controlData;
    let color = Object.assign({}, colorSet);
    const inputRef = useRef(null);
    const randomRef = useRef(null);
// BUG : 建立新array並跑完一次sort之後，再建立新array不能sort
    return (
        <div className="control">
            <div className="set-array">
                <div>Set your array: </div>
                <input type="text" id="array-input" ref={inputRef} />
                <div
                    id="send-array"
                    onClick={() => {
                        let input = inputRef.current.value;
                        // console.log(input);
                        let arr = input.replace(/\s/g, "").split(",");
                        arr = arr.map((element, index) => [Number(element)]);
                        for (let i = 0; i < arr.length; i++) {
                            status[i] = "null";
                        }
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
                <input id="number-input" type="number" ref={randomRef} />
                <div
                    id="send-number"
                    onClick={() => {
                        let num = randomRef.current;
                        if (num.value > 20) {
                            num.value = 20;
                            alert("Can't be more than 20 numbers !");
                        }
                        if (num.value < 5) {
                            num.value = 5;
                            alert("Can't be less than 5 numbers !");
                        }
                        let arr = [];
                        for (let i = 0; i < num.value; i++) {
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
                        if (doing == false) {
                            changeDoing(true);
                            doAniBub(animationArray, array, window.index);
                        }
                    }}
                >
                    Start
                </div>
            </div>
            <div
                className="color-pick"
                onChange={(e) => {
                    color[e.target.name] = e.target.value;
                    changeColor(color);
                }}
            >
                <label htmlFor="color-null">Default: </label>
                <input
                    type="color"
                    defaultValue={color.null}
                    name="null"
                    id="color-null"
                ></input>
                <label htmlFor="color-com">Comparing: </label>
                <input
                    type="color"
                    defaultValue={color.com}
                    name="com"
                    id="color-com"
                ></input>
                <label htmlFor="color-sorted">Sorted: </label>
                <input
                    type="color"
                    defaultValue={color.sorted}
                    name="sorted"
                    id="color-sorted"
                ></input>
                <label htmlFor="color-big">Bigger: </label>
                <input
                    type="color"
                    defaultValue={color.big}
                    name="big"
                    id="color-big"
                ></input>
                <label htmlFor="color-small">Smaller: </label>
                <input
                    type="color"
                    defaultValue={color.small}
                    name="small"
                    id="color-small"
                ></input>
                {/* {window.location.pathname=='/insertionsort'? <input type="color" defaultValue={color.key}></input> : } */}
            </div>
        </div>
    );
};

export default Control;
