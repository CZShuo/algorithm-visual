import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Graph = (props) => {
    const array = props.array;
    const position = props.position;
    const color = props.color;
    const content = props.content;
    const colorCode1 = props.colorCode1;
    const colorCode2 = props.colorCode2;
    
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
            <rect
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
            <text x="360" y="330" fontSize="20px">
                for i from 0 to array's length
            </text>
            <text x="380" y="360" fontSize="20px" fill={colorCode1}>
                if array[i] > array[i+1]
            </text>
            <text x="400" y="390" fontSize="20px" fill={colorCode2}>
                swap array[i] and array[i+1]
            </text>
        </svg>
    );
};

export default Graph;
