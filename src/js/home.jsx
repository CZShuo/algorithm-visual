import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PropTypes from "prop-types";

const Home = (props) => {
    const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop - 50);
    const refTitle = useRef(null);
    const refBub = useRef(null);
    const refIns = useRef(null);
    const refSel = useRef(null);
    const refMer = useRef(null);
    const refQui = useRef(null);
    const refAbout = useRef(null);
    const moveTo = (ref) => scrollToRef(ref);
    return (
        <div className="homepage">
            <div className="cover" ref={refTitle}>
                <div className="title">Visual AlgoRithm</div>
                <div className="enters">
                    {/* <div className="enter">
                        Normal
                        <br />
                        Visualization
                    </div> */}
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
                <a onClick={() => moveTo(refBub)}>
                    <span></span>Click to learn more
                </a>
                <div className="intro" id="bub-intro" ref={refBub}>
                    <div className="intro-texts">
                        <div className="intro-title">
                            <span className="intro-ch">冒泡排序</span>
                            <span className="intro-eng">Bubble</span>
                        </div>
                        <div className="intro-text">
                            前後兩個數字依次比較，將較大的數字往後移動，再往之後兩個數字進行下一次比較。
                        </div>
                    </div>
                    <a onClick={() => moveTo(refSel)}>
                        <span></span>Selection
                    </a>
                </div>

                <div className="intro" id="sel-intro" ref={refSel}>
                    <div className="intro-texts">
                        <div className="intro-title">
                            <span className="intro-ch">選擇排序</span>
                            <span className="intro-eng">Selection</span>
                        </div>
                        <div className="intro-text">
                            找出最小的數字，移動到第一個位置成為已排序區，再從剩下未排序的找出最小的，放到已排序區之後第一個位置，依此類推。
                        </div>
                    </div>
                    <a onClick={() => moveTo(refIns)}>
                        <span></span>Insertion
                    </a>
                </div>

                <div className="intro" id="ins-intro" ref={refIns}>
                    <div className="intro-texts">
                        <div className="intro-title">
                            <span className="intro-ch">插入排序</span>
                            <span className="intro-eng">Insertion</span>
                        </div>
                        <div className="intro-text">
                            未排序的資料依次往前移動，在已排序區由後往前找到適當位置並放入。
                        </div>
                    </div>
                    <a onClick={() => moveTo(refMer)}>
                        <span></span>Merge
                    </a>
                </div>

                <div className="intro" id="mer-intro" ref={refMer}>
                    <div className="intro-texts">
                        <div className="intro-title">
                            <span className="intro-ch">合併排序</span>
                            <span className="intro-eng">Merge</span>
                        </div>
                        <div className="intro-text">
                            將陣列分成兩半，兩側各自再以合併排序處理，處理完的再做合併。
                        </div>
                    </div>
                    <a onClick={() => moveTo(refQui)}>
                        <span></span>Quick
                    </a>
                </div>

                <div className="intro" id="qui-intro" ref={refQui}>
                    <div className="intro-texts">
                        <div className="intro-title">
                            <span className="intro-ch">快速排序</span>
                            <span className="intro-eng">Quick</span>
                        </div>
                        <div className="intro-text">
                            先從陣列中選出一個數字當基準值，所有小於基準值的數字移至基準值左邊，大於者移至右邊，再到左右兩邊做快速排序。
                        </div>
                    </div>
                    <a onClick={() => moveTo(refAbout)}>
                        <span></span>...About Me
                    </a>
                </div>
            </div>
            <div className="about" ref={refAbout}>
                <div className="close-about" onClick={() => moveTo(refQui)}>
                    X
                </div>
            </div>
            <div className="top-button" onClick={() => moveTo(refTitle)}>
                ^
            </div>
        </div>
    );
};

export default Home;
