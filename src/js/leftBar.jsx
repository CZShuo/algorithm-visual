import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PropTypes from "prop-types";

const LeftBar = (props) => {
    return (
        <>
            <Link to='/bubblesort'>
                <div>Bubble Sort</div>
            </Link>
            <Link to='/insertionsort'>
                <div>Insertion Sort</div>
            </Link>
            <Link to='/selectionsort'>
                <div>Selection Sort</div>
            </Link>
            <Link to='/mergesort'>
                <div>Merge Sort</div>
            </Link>
            <Link to='/quicksort'>
                <div>Quick Sort</div>
            </Link>
        </>
    );
};

export default LeftBar;
