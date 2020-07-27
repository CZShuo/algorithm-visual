import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Code from "./code.jsx";

const Graph = (props) => {
    let {
        arrayIndex,
        position,
        color,
        content,
        code,
        currentCode,
        range,
        mid,
    } = props.graph;

    return (
        <svg id="svg">
            {arrayIndex.map((element, index) => {
                return (
                    <g key={index}>
                        <rect
                            x={position[index].x}
                            y={position[index].y}
                            height={element[1]}
                            width="25"
                            fill={color[index]}
                        ></rect>
                        <text
                            x={position[index].x + 5}
                            y={15 + position[index].y + arrayIndex[index][1]}
                        >
                            {element[1]}
                        </text>
                    </g>
                );
            })}
            {/* {range.map((element, index) => {
                    return (
                        <rect
                            key={index}
                            x={element[0] * 50 + 35}
                            y={25+130*index}
                            width={(element[1] - element[0] + 1) * 50}
                            height={130}
                            fillOpacity="0"
                            stroke="brown"
                            strokeWidth="2"
                            rx="10"
                            ry="10"
                        ></rect>
                    );
                })} */}
            {/* <text x={(mid[1] + mid[0]) * 50 + 25} y={20}>
                    mid={mid[1]}
                </text> */}
            {/* <text x="250" y="250" fontSize="24px">
                    {content}
                </text> */}
        </svg>
    );
};

export default Graph;
