import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";
import Graph from "./graph.jsx";
import Code from "./code.jsx";

const Quick = (props) => {
    let {
        array,
        setArray,
        content,
        setContent,
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
    } = props.data;
    
    const [ani, setAni] = useState([]);

    const quickSort =(array) => {

    }

    const code = [
        "for i from 0 to array's length",
        "\tif array[i] > array[i+1]",
        "\t\tswap array[i] and array[i+1]",
    ];
    let colorCode = [];
    for (let i = 0; i < code.length; i++){
        colorCode.push('#000000');
    }
    const [currentCode, setCurrentCode] = useState(colorCode);

    const doAniQui = (animat, array, index) => {
        
    }

    
    const graph = {
        array,
        position,
        color,
        content,
        code,currentCode 
    };

    return (
        <div className="main">
            <div className="graph-code">
                <Graph graph={graph} />
                <Code code={code} currentCode={currentCode} />
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
                            quickSort(arrayIndex,0);

                            for (let i = 0; i < array.length; i++) {
                                status[i] = "null";
                            }
                            doAniQui(ani, arrayIndex, 0);
                        } else if (doing == false) {
                            changeDoing(true);
                            doAniQui(ani, arrayIndex, window.index);
                        }
                    }}
                >
                    Start
                </div>
            </div>
        </div>
    )
}

export default Quick;