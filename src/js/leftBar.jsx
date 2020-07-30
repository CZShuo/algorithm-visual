import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PropTypes from "prop-types";

const LeftBar = (props) => {
    let { page, setPage } = props;
    const titleBub = useRef(null);
    const titleIns = useRef(null);
    const titleSel = useRef(null);
    const titleMer = useRef(null);
    const titleQui = useRef(null);
    const resetTitleColor = () => {
        let tags = [titleBub, titleIns, titleSel, titleMer, titleQui];
        for (let i = 0; i <tags.length; i++){
            if(tags[i].current.id){
                tags[i].current.removeAttribute("id");
                break;
            }
        }
    };
    
    return (
        <div className="left-bar">
            <Link
                to="/tutorial/bubblesort"
                onClick={() => {
                    setPage("Bub");
                    resetTitleColor();
                    titleBub.current.id="current-title";
                }}
            >
                <div ref={titleBub}>Bubble Sort</div>
            </Link>
            <Link
                to="/tutorial/insertionsort"
                onClick={() => {
                    setPage("Ins");
                    resetTitleColor();
                    titleIns.current.id="current-title";
                }}
            >
                <div ref={titleIns}>Insertion Sort</div>
            </Link>
            <Link
                to="/tutorial/selectionsort"
                onClick={() => {
                    setPage("Sel");
                    resetTitleColor();
                    titleSel.current.id="current-title";
                }}
            >
                <div ref={titleSel}>Selection Sort</div>
            </Link>
            <Link
                to="/tutorial/mergesort"
                onClick={() => {
                    setPage("Mer");
                    resetTitleColor();
                    titleMer.current.id="current-title";
                }}
            >
                <div ref={titleMer}>Merge Sort</div>
            </Link>
            <Link
                to="/tutorial/quicksort"
                onClick={() => {
                    setPage("Qui");
                    resetTitleColor();
                    titleQui.current.id="current-title";
                }}
            >
                <div ref={titleQui}>Quick Sort</div>
            </Link>
        </div>
    );
};

export default LeftBar;
