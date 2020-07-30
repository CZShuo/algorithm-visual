import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PropTypes from "prop-types";

import BubbleGIF from "../img/bubble.gif";
import InsertionGIF from "../img/insertion.gif";
import SelectionGIF from "../img/selection.gif";
import MergeGIF from "../img/merge.gif";
import QuickGIF from "../img/quick.gif";
import HomeGIF from "../img/home.gif";

const Home = (props) => {
    const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop - 50);
    const refTitle = useRef(null);
    const refBub = useRef(null);
    const refIns = useRef(null);
    const refSel = useRef(null);
    const refMer = useRef(null);
    const refQui = useRef(null);
    const refAbout = useRef(null);
    let current = 0;
    let scrolling = false;
    const moveTo = (ref) => {
        scrollToRef(ref);
        switch (ref) {
            case refTitle:
                current = 0;
                break;
            case refBub:
                current = 1;
                break;
            case refIns:
                current = 2;
                break;
            case refSel:
                current = 3;
                break;
            case refMer:
                current = 4;
                break;
            case refQui:
                current = 5;
                break;
            case refAbout:
                current = 6;
                break;
        }
        setTimeout(() => {
            scrolling = false;
        }, 800);
    };
    window.addEventListener("mousewheel", (e) => {
        if (scrolling == false && (e.deltaY > 6 || e.deltaY < -6)) {
            scrolling = true;
            if (e.deltaY > 6) {
                switch (current) {
                    case 0:
                        moveTo(refBub);
                        break;
                    case 1:
                        moveTo(refIns);
                        break;
                    case 2:
                        moveTo(refSel);
                        break;
                    case 3:
                        moveTo(refMer);
                        break;
                    case 4:
                        moveTo(refQui);
                        break;
                    case 5:
                        // moveTo(refAbout);
                        setTimeout(() => {
                            scrolling = false;
                        }, 800);
                        break;
                    // case 6:
                    //     setTimeout(() => {
                    //         scrolling = false;
                    //     }, 800);
                    //     break;
                }
            } else if (e.deltaY < -6) {
                switch (current) {
                    case 0:
                        setTimeout(() => {
                            scrolling = false;
                        }, 800);
                        break;
                    case 1:
                        moveTo(refTitle);
                        break;
                    case 2:
                        moveTo(refBub);
                        break;
                    case 3:
                        moveTo(refIns);
                        break;
                    case 4:
                        moveTo(refSel);
                        break;
                    case 5:
                        moveTo(refMer);
                        break;
                    // case 6:
                    //     moveTo(refQui);
                    //     break;
                }
            }
        }
    });
    return (
        <div className="homepage">
            <div className="cover" ref={refTitle}>
                <div className="title">VisuAlgoRithm</div>
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
                <img src={"/" + HomeGIF} />
            </div>
            <div className="intros">
                <a onClick={() => moveTo(refBub)} className="next-part" id='first-v'>
                    <span></span>Click to learn more
                </a>
                <div className="intro" id="bub-intro" ref={refBub}>
                    <div className="intro-texts">
                        <Link to="/tutorial/bubblesort">
                            <div className="intro-title">
                                <span className="intro-ch">冒泡排序</span>
                                <span className="intro-eng">Bubble</span>
                            </div>
                        </Link>
                        <div className="intro-text">
                            前後兩個數字依次比較，將較大的數字往後移動，再往之後兩個數字進行下一次比較。
                        </div>
                        <img src={"/" + BubbleGIF} />
                    </div>
                    <a onClick={() => moveTo(refIns)} className="next-part">
                        <span></span>Insertion
                    </a>
                </div>
                <div className="intro" id="ins-intro" ref={refIns}>
                    <div className="intro-texts">
                        <Link to="/tutorial/insertionsort">
                            <div className="intro-title">
                                <span className="intro-ch">插入排序</span>
                                <span className="intro-eng">Insertion</span>
                            </div>
                        </Link>
                        <div className="intro-text">
                            未排序的資料依次往前移動，在已排序區由後往前找到大小適當位置並放入。
                        </div>
                        <img src={"/" + InsertionGIF} />
                    </div>
                    <a onClick={() => moveTo(refSel)} className="next-part">
                        <span></span>Selection
                    </a>
                </div>
                <div className="intro" id="sel-intro" ref={refSel}>
                    <div className="intro-texts">
                        <Link to="/tutorial/selectionsort">
                            <div className="intro-title">
                                <span className="intro-ch">選擇排序</span>
                                <span className="intro-eng">Selection</span>
                            </div>
                        </Link>
                        <div className="intro-text">
                            找出最小的數字，移動到第一個位置成為已排序區，再從剩下未排序的找出最小的，加到已排序區最後一個位置，依此類推。
                        </div>
                        <img src={"/" + SelectionGIF} />
                    </div>
                    <a onClick={() => moveTo(refMer)} className="next-part">
                        <span></span>Merge
                    </a>
                </div>

                <div className="intro" id="mer-intro" ref={refMer}>
                    <div className="intro-texts">
                        <Link to="/tutorial/mergesort">
                            <div className="intro-title">
                                <span className="intro-ch">合併排序</span>
                                <span className="intro-eng">Merge</span>
                            </div>
                        </Link>
                        <div className="intro-text">
                            將陣列分成兩半，兩側各自再以合併排序處理，兩個處理完的下層再做大小比較的合併。
                        </div>
                        <img src={"/" + MergeGIF} />
                    </div>
                    <a onClick={() => moveTo(refQui)} className="next-part">
                        <span></span>Quick
                    </a>
                </div>

                <div className="intro" id="qui-intro" ref={refQui}>
                    <div className="intro-texts">
                        <Link to="/tutorial/quicksort">
                            <div className="intro-title">
                                <span className="intro-ch">快速排序</span>
                                <span className="intro-eng">Quick</span>
                            </div>
                        </Link>
                        <div className="intro-text">
                            先從陣列中選出一個數字當基準值，所有小於基準值的數字移至基準值左邊，大於者移至右邊，再將左右兩邊視為新陣列，分別再做快速排序。
                        </div>
                        <img src={"/" + QuickGIF} />
                    </div>
                    {/* <a onClick={() => moveTo(refAbout)} className="next-part">
                        <span></span>...About Me
                    </a> */}
                </div>
            </div>
            {/* <div className="about" ref={refAbout}>
                <div className="close-about" onClick={() => moveTo(refQui)}>
                    X
                </div>
            </div>
            */}
            <div className="top-button" onClick={() => moveTo(refTitle)}>
                ^
            </div>
        </div>
    );
};

export default Home;
