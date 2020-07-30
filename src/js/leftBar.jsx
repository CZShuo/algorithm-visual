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
    let setOverColor;
    let setLeaveColor;
    // const setOverColor = () => {
    //     ele.current.style.color = "#13a9c7";
    // }
    // const setLeaveColor = (ele) => {
    //     ele.current.style.color = "#34526c";
    // }
    const resetTitleColor = () => {
        let tags = [titleBub, titleIns, titleSel, titleMer, titleQui];
        // titleBub.current.style.color = "#34526c";
        // titleIns.current.style.color = "#34526c";
        // titleSel.current.style.color = "#34526c";
        // titleMer.current.style.color = "#34526c";
        // titleQui.current.style.color = "#34526c";
        tags.forEach((ele) => {
            ele.current.style.color = "#34526c";
            ele.current.addEventListener("mouseenter", setOverColor = () => {
                ele.current.style.color = "#13a9c7";
            });
            ele.current.addEventListener("mouseleave", setLeaveColor = () => {
                ele.current.style.color = "#34526c";
            });
        });
    };
    const setCurrentTitle = (ele) => {
        ele.current.style.color = "#fff";
        ele.current.removeEventListener("mouseenter", setOverColor);
        ele.current.removeEventListener("mouseleave", setLeaveColor);
    };
    return (
        <div className="left-bar">
            <Link
                to="/tutorial/bubblesort"
                onClick={() => {
                    setPage("Bub");
                    resetTitleColor();
                    setCurrentTitle(titleBub);
                }}
            >
                <div ref={titleBub}>Bubble Sort</div>
            </Link>
            <Link
                to="/tutorial/insertionsort"
                onClick={() => {
                    setPage("Ins");
                    resetTitleColor();
                    titleIns.current.style.color = "#fff";
                }}
            >
                <div ref={titleIns}>Insertion Sort</div>
            </Link>
            <Link
                to="/tutorial/selectionsort"
                onClick={() => {
                    setPage("Sel");
                    resetTitleColor();
                    titleSel.current.style.color = "#fff";
                }}
            >
                <div ref={titleSel}>Selection Sort</div>
            </Link>
            <Link
                to="/tutorial/mergesort"
                onClick={() => {
                    setPage("Mer");
                    resetTitleColor();
                    titleMer.current.style.color = "#fff";
                }}
            >
                <div ref={titleMer}>Merge Sort</div>
            </Link>
            <Link
                to="/tutorial/quicksort"
                onClick={() => {
                    setPage("Qui");
                    resetTitleColor();
                    titleQui.current.style.color = "#fff";
                }}
            >
                <div ref={titleQui}>Quick Sort</div>
            </Link>
        </div>
    );
};

export default LeftBar;
