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
                        </rect>
                        <text x={position[index].x + 5} y={130 + 15}>
                            {element}
                        </text>
                    </g>
                );
            })}
            <text x="300" y="300" fontSize="24px">
                {content}
            </text>
        </svg>
    );
};

export default Graph;
