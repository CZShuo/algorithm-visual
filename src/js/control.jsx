import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";

const Control = (props) => {
    const setArray= props.setArray;
    const inputRef = useRef(null);
    const randomRef = useRef(null);
    return (
        <>
            <div className="set-array">
                <div>Set your array: </div>
                <input type="text" id="array-input" ref={inputRef} />
                <div
                    id="send-array"
                    onClick={() => {
                        let input = inputRef.current.value;
                        console.log(input);
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
                <div>Pause</div>
                <div>Start</div>
            </div>
        </>
    );
};

export default Control;
