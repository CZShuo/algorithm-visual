import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PropTypes from "prop-types";

const LeftBar = (props) => {
    let {page, setPage} = props;
    return (
        <div className="left-bar">
            <Link to='/tutorial/bubblesort' onClick={() =>{setPage('Bub')}}>
                <div>Bubble Sort</div>
            </Link>
            <Link to='/tutorial/insertionsort' onClick={() =>{setPage('Ins')}}>
                <div>Insertion Sort</div>
            </Link>
            <Link to='/tutorial/selectionsort' onClick={() =>{setPage('Sel')}}>
                <div>Selection Sort</div>
            </Link>
            <Link to='/tutorial/mergesort' onClick={() =>{setPage('Mer')}}>
                <div>Merge Sort</div>
            </Link>
            <Link to='/tutorial/quicksort' onClick={() =>{setPage('Qui')}}>
                <div>Quick Sort</div>
            </Link>
        </div>
    );
};

export default LeftBar;
