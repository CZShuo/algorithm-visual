import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Code = (props) => {
    const { code,currentCode } = props;
    // const code = [
    //     "for i from 0 to array's length",
    //     "\tif array[i] > array[i+1]",
    //     "\t\tswap array[i] and array[i+1]",
    // ];
    return (
        <div className="code-area">
            {code.map((ele,index) => {
                return <pre className="code" key={index} style={{color:currentCode[index]}}>{ele}</pre>;
            })}
        </div>
        // <svg id='code'>
        //     <text x="10" y="10" fontSize="20px">
        //         for i from 0 to array's length
        //     </text>
        //     <text x="30" y="30" fontSize="20px">
        //         if array[i] > array[i+1]
        //     </text>
        //     <text x="50" y="50" fontSize="20px">
        //         swap array[i] and array[i+1]
        //     </text>
        // </svg>
    );
};
export default Code;
