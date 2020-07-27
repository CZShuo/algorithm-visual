import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Code from "./code.jsx";

const Graph = (props) => {
    let { array, position, color, content } = props.graph;

    return (
        <svg id="svg">
            {array.map((element, index) => {
                return (
                    <g key={index}>
                        <rect
                            x={position[index].x}
                            y={position[index].y}
                            height={element}
                            width="25"
                            fill={color[index]}
                        ></rect>
                        <text x={position[index].x + 5} y={130 + 15}>
                            {element}
                        </text>
                    </g>
                );
            })}
            <text x="250" y="250" fontSize="24px">
                {content}
            </text>
            {/* <rect
                x="350"
                y="300"
                width="300"
                height="300"
                fillOpacity="0"
                stroke="brown"
                strokeWidth="2"
                rx="10"
                ry="10"
            ></rect>
            <Code /> */}
        </svg>
    );
};

export default Graph;
