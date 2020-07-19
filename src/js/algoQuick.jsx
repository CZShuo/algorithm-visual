import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";
import Graph from "./graph.jsx";

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
    } = props.data;

    const quickSort =(array) => {

    }
    const doAniQui = (animat, array)=>{
        
    }

    const graph = {
        array,
        position,
        color,
        content,
    };

    return (
        <div>
            <div
                className='sort'
                onClick={() => {
                    console.log(quickSort(array));
                    doAniIns(quickSort(array), array);
                }}>
                Quick Sort
            </div>
            <Graph
                graph={graph}
                // colorCode1={colorCode1}
                // colorCode2={colorCode2}
            />
        </div>
    )
}

export default Quick;