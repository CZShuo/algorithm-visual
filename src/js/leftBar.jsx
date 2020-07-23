import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PropTypes from "prop-types";

const LeftBar = (props) => {
    return (
        <div className="left-bar">
            <Link to='/tutorial/bubblesort'>
                <div>Bubble Sort</div>
            </Link>
            <Link to='/tutorial/insertionsort'>
                <div>Insertion Sort</div>
            </Link>
            <Link to='/tutorial/selectionsort'>
                <div>Selection Sort</div>
            </Link>
            <Link to='/tutorial/mergesort'>
                <div>Merge Sort</div>
            </Link>
            <Link to='/tutorial/quicksort'>
                <div>Quick Sort</div>
            </Link>
        </div>
    );
};

export default LeftBar;
