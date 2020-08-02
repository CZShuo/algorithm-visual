import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Code from "./code.jsx";

const Graph = (props) => {
    let { array, position, oldPosition, color, content } = props.graph;

    return (
        <svg id="svg">
            {array.map((element, index) => {
                return (
                    <g key={index}>
                        <rect
                            x={position[index].x}
                            y={position[index].y}
                            height={element}
                            width={position[position.length-1]}
                            fill={color[index]}
                        >
                            {/* <animate attributeName='x' from={oldPosition[index].x} to={position[index].x} dur='.1s' repeatCount='1' />
                            <animate attributeName='y' from={oldPosition[index].y} to={position[index].y} dur='.1s' repeatCount='1' /> */}
                        </rect>
                        <text x={position[index].x + 5} y={130 + 15}>
                            {element}
                            {/* <animate attributeName='x' to={position[index].x} dur={100} repeatCount="1" /> */}
                        </text>
                    </g>
                );
            })}
            <text x="300" y="300" fontSize="24px">
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
