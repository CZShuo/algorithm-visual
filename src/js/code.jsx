import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Code = props => {
    return (
        <svg>
            <text x="360" y="330" fontSize="20px">
                for i from 0 to array's length
            </text>
            <text x="380" y="360" fontSize="20px">
                if array[i] > array[i+1]
            </text>
            <text x="400" y="390" fontSize="20px">
                swap array[i] and array[i+1]
            </text>
        </svg>
    )
}
export default Code;