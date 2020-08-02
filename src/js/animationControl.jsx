import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";

import Start from "../img/start.png";
import StartHover from "../img/startHover.png";
import StartUnclick from "../img/startUnclick.png";
import Pause from "../img/pause.png";
import PauseHover from "../img/pauseHover.png";
import Reset from "../img/reset.png";
import ResetHover from "../img/resetHover.png";
import Next from "../img/next.png";
import NextHover from "../img/nextHover.png";
import NextUnclick from "../img/nextUnclick.png";
import Previous from "../img/previous.png";
import PreviousHover from "../img/previousHover.png";
import PreviousUnclick from "../img/previousUnclick.png";

const AniControl = props => {
    const {
        changeDoing,changeFirstTime,stopInterval,setAnimationArray,setCurrentCode,colorCode,setTime,dragElement
    }=props.control;
    const {sort,doAni,stepAni}=props.animation;
    
    const refStart = useRef(null);
    const refPause = useRef(null);
    const refDrag = useRef(null);
    const refPreviousUnclick = useRef(null);
    const refPreviousImg = useRef(null);
    const refNextImg = useRef(null);
    const refNextUnclick = useRef(null);
    const refStartUnclick = useRef(null);
    const refStartClick = useRef(null);
    
    useEffect(() => {
        dragElement(refDrag.current);
        refPause.current.style.display = "none";
        refStartUnclick.current.style.display = "none";
        refNextUnclick.current.style.display = "none";
        refPreviousImg.current.style.display = "none";
        refPreviousUnclick.current.style.display = "block";
    }, []);

    return (
        <div className="animation-control" id="drag" ref={refDrag}>
                <div id="dragheader">Drag Me!</div>
                <div id="dragbody">
                    <div
                        id="reset"
                        title="Reset"
                        onClick={() => {
                            changeDoing(false);
                            changeFirstTime(true);
                            if (window.ani) {
                                stopInterval();
                            }
                            setAnimationArray([]);
                            let temp = [...colorCode];
                            for (let i = 0; i < code.length; i++) {
                                temp[i] = "#000000";
                            }
                            setCurrentCode(temp);
                            window.index = 0;
                            stepAni(animationArray, array, window.index);
                            refPause.current.style.display = "none";
                            refStart.current.style.display = "block";
                            refStartUnclick.current.style.display = "none";
                            refStartClick.current.style.display = "block";
                            refPause.current.style.display = "none";
                            refStart.current.style.display = "block";
                            refPreviousImg.current.style.display = "none";
                            refPreviousUnclick.current.style.display = "block";
                            refNextImg.current.style.display = "block";
                            refNextUnclick.current.style.display = "none";
                        }}
                    >
                        <img
                            src={"/" + Reset}
                            onMouseEnter={(e) =>
                                (e.target.src = "/" + ResetHover)
                            }
                            onMouseLeave={(e) => (e.target.src = "/" + Reset)}
                        />
                    </div>

                    <div id="previous" title="Previous Step">
                        <img
                            ref={refPreviousUnclick}
                            src={"/" + PreviousUnclick}
                        />
                        <img
                            ref={refPreviousImg}
                            src={"/" + Previous}
                            onMouseEnter={(e) =>
                                (e.target.src = "/" + PreviousHover)
                            }
                            onMouseLeave={(e) =>
                                (e.target.src = "/" + Previous)
                            }
                            onClick={() => {
                                window.index--;
                                if (window.index < 0) {
                                    window.index = 0;
                                }
                                stepAni(animationArray, array, window.index);
                                refStartUnclick.current.style.display = "none";
                                refStartClick.current.style.display = "block";
                                refNextUnclick.current.style.display = "none";
                                refNextImg.current.style.display = "block";
                            }}
                        />
                    </div>

                    <div ref={refStart} id="start" title="Start">
                        <img ref={refStartUnclick} src={"/" + StartUnclick} />
                        <img
                            ref={refStartClick}
                            src={"/" + Start}
                            onMouseEnter={(e) =>
                                (e.target.src = "/" + StartHover)
                            }
                            onMouseLeave={(e) => (e.target.src = "/" + Start)}
                            onClick={() => {
                                if (doing == false && firstTime) {
                                    changeDoing(true);
                                    changeFirstTime(false);
                                    let ani = sort(array);
                                    setAnimationArray(ani);
                                    for (let i = 0; i < array.length; i++) {
                                        status[i] = "null";
                                    }
                                    doAni(ani, array, 0);
                                } else if (doing == false) {
                                    changeDoing(true);
                                    if (window.index == animationArray.length) {
                                        window.index--;
                                    }
                                    doAni(
                                        animationArray,
                                        array,
                                        window.index--
                                    );
                                }
                                refStart.current.style.display = "none";
                                refPause.current.style.display = "block";
                                refNextImg.current.style.display = "none";
                                refPreviousImg.current.style.display = "none";
                                refNextUnclick.current.style.display = "block";
                                refNextUnclick.current.style.cursor =
                                    "not-allowed";
                                refPreviousUnclick.current.style.display =
                                    "block";
                                refPreviousUnclick.current.style.cursor =
                                    "not-allowed";
                            }}
                        />
                    </div>

                    <div
                        ref={refPause}
                        id="pause"
                        title="Pause"
                        onClick={() => {
                            if (doing == true) {
                                changeDoing(false);
                                stopInterval();
                            }
                            refPause.current.style.display = "none";
                            refStart.current.style.display = "block";
                            refNextImg.current.style.display = "block";
                            refPreviousImg.current.style.display = "block";
                            refNextUnclick.current.style.display = "none";
                            refPreviousUnclick.current.style.display = "none";
                        }}
                    >
                        <img
                            src={"/" + Pause}
                            onMouseEnter={(e) =>
                                (e.target.src = "/" + PauseHover)
                            }
                            onMouseLeave={(e) => (e.target.src = "/" + Pause)}
                        />
                    </div>

                    <div id="next" title="Next Step">
                        <img ref={refNextUnclick} src={"/" + NextUnclick} />
                        <img
                            ref={refNextImg}
                            src={"/" + Next}
                            onMouseEnter={(e) =>
                                (e.target.src = "/" + NextHover)
                            }
                            onMouseLeave={(e) => (e.target.src = "/" + Next)}
                            onClick={() => {
                                window.index++;
                                if (window.index > animationArray.length) {
                                    window.index = animationArray.length + 1;
                                }
                                if (animationArray.length == 0) {
                                    let ani = sort(array);
                                    setAnimationArray(ani);
                                }
                                stepAni(animationArray, array, window.index);
                            }}
                        />
                    </div>
                </div>
                <div id="speed-control">
                    <div>Speed : </div>
                    <input
                        type="range"
                        min="1"
                        max="15"
                        defaultValue="7"
                        step="1"
                        onChange={(e) => {
                            setTime(1500 / e.target.value);
                        }}
                    />
                </div>
            </div>
    )
}

export default AniControl;