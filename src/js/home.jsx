import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PropTypes from "prop-types";

const Home = (props) => {
    return (
        <div className="homepage">
            <div className="cover">
                <div className="title">Visual Algorithm React</div>
                <div className="enters">
                    <div className="enter">
                        Normal
                        <br />
                        Visualization
                    </div>
                    <Link to="/tutorial">
                        <div className="enter">
                            Sorting
                            <br />
                            Tutorial
                        </div>
                    </Link>
                </div>
            </div>
            <div className="intros">
                <a
                    onClick={() => {
                        document.documentElement.scrollTop = window.innerHeight;
                    }}
                >
                    <span></span>Scroll
                </a>
                {/* <section id="section05" className="demo">
                    <h1>Scroll Down Button #5</h1>
                    <a href="#section06">
                        <span></span>Scroll
                    </a>
                </section>
                <section id="section06" className="demo">
                    <h1>Scroll Down Button #6</h1>
                    <a href="#section07">
                        <span></span>Scroll
                    </a>
                </section> */}
                <div className="intro" id="bub-intro">
                    Bubble Sort
                </div>
                <div className="intro" id="sel-intro">
                    Selection Sort
                </div>
                <div className="intro" id="ins-intro">
                    Insertion Sort
                </div>
                <div className="intro" id="mer-intro">
                    Merge Sort
                </div>
                <div className="intro" id="qui-intro">
                    Quick Sort
                </div>
            </div>
        </div>
    );
};

export default Home;
