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

const AniControl = (props) => {
    let {
        array,
        setArray,
        animationArray,
        setAnimationArray,
        initialArray,
        colorCode,
        status,
        doing,
        changeDoing,
        firstTime,
        changeFirstTime,
        stopInterval,
        setCurrentCode,
        setTime,
        dragElement,
        resetEverything,
        resetArray,
        displayOn,
        displayOff,
    } = props.control;
    let { sort, doAni, stepAni } = props;

    const {
        refDrag,
        refStart,
        refPause,
        refPreviousImg,
        refPreviousUnclick,
        refNextImg,
        refNextUnclick,
        refStartUnclick,
        refStartClick,
    }=props.refs;

    useEffect(() => {
        dragElement(refDrag.current);
        displayOff([refPause, refStartUnclick, refPreviousImg, refNextImg]);
        displayOn([refPreviousUnclick,refNextUnclick]);
    }, []);

    return (
        <div className="animation-control" id="drag" ref={refDrag}>
            <div id="dragheader">Drag Me!</div>
            <div id="dragbody">
                <div
                    id="reset"
                    title="Reset"
                    onClick={() => {
                        resetEverything();
                        let temp = [...colorCode];
                        for (let i = 0; i < colorCode.length; i++) {
                            temp[i] = "#000000";
                        }
                        setCurrentCode(temp);
                        window.index = 0;
                        stepAni(animationArray, array, window.index);
                        displayOff([
                            refPause,
                            refStartUnclick,
                            refPreviousImg,
                            refNextImg,
                        ]);
                        displayOn([
                            refStart,
                            refStartClick,
                            refPreviousUnclick,
                            refNextUnclick,
                        ]);
                    }}
                >
                    <img
                        src={"/" + Reset}
                        onMouseEnter={(e) => (e.target.src = "/" + ResetHover)}
                        onMouseLeave={(e) => (e.target.src = "/" + Reset)}
                    />
                </div>

                <div id="previous" title="Previous Step">
                    <img ref={refPreviousUnclick} src={"/" + PreviousUnclick} />
                    <img
                        ref={refPreviousImg}
                        src={"/" + Previous}
                        onMouseEnter={(e) =>
                            (e.target.src = "/" + PreviousHover)
                        }
                        onMouseLeave={(e) => (e.target.src = "/" + Previous)}
                        onClick={() => {
                            window.index--;
                            if (window.index < 0) {
                                window.index = 0;
                            }
                            stepAni(animationArray, initialArray, window.index);
                            displayOff([refStartUnclick, refNextUnclick]);
                            displayOn([refStartClick, refNextImg]);
                        }}
                    />
                </div>

                <div ref={refStart} id="start" title="Start">
                    <img ref={refStartUnclick} src={"/" + StartUnclick} />
                    <img
                        ref={refStartClick}
                        src={"/" + Start}
                        onMouseEnter={(e) => (e.target.src = "/" + StartHover)}
                        onMouseLeave={(e) => (e.target.src = "/" + Start)}
                        onClick={() => {
                            if (doing == false && firstTime) {
                                changeDoing(true);
                                changeFirstTime(false);
                                sort(array, 0, array.length - 1);
                                // setAnimationArray(ani);
                                for (let i = 0; i < array.length; i++) {
                                    status[i] = "null";
                                }
                                doAni(animationArray, array, 0);
                            } else if (doing == false) {
                                changeDoing(true);
                                if (window.index == animationArray.length) {
                                    window.index--;
                                }
                                doAni(animationArray, array, window.index--);
                            }
                            displayOff([refStart, refNextImg, refPreviousImg]);
                            displayOn([
                                refPause,
                                refNextUnclick,
                                refPreviousUnclick,
                            ]);
                            refNextUnclick.current.style.cursor = "not-allowed";
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
                        displayOff([
                            refPause,
                            refNextUnclick,
                            refPreviousUnclick,
                        ]);
                        displayOn([refStart, refNextImg, refPreviousImg]);
                    }}
                >
                    <img
                        src={"/" + Pause}
                        onMouseEnter={(e) => (e.target.src = "/" + PauseHover)}
                        onMouseLeave={(e) => (e.target.src = "/" + Pause)}
                    />
                </div>

                <div id="next" title="Next Step">
                    <img ref={refNextUnclick} src={"/" + NextUnclick} />
                    <img
                        ref={refNextImg}
                        src={"/" + Next}
                        onMouseEnter={(e) => (e.target.src = "/" + NextHover)}
                        onMouseLeave={(e) => (e.target.src = "/" + Next)}
                        onClick={() => {
                            window.index++;
                            if (window.index > animationArray.length) {
                                window.index = animationArray.length + 1;
                            }
                            if (animationArray.length == 0) {
                                sort(array, 0, array.length - 1);
                            }
                            stepAni(animationArray, initialArray, window.index);
                            displayOff([refPreviousUnclick]);
                            displayOn([refPreviousImg]);
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
                    onLoad={()=>{
                        setTime(1500/7);
                    }}
                    onChange={(e) => {
                        setTime(1500 / e.target.value);
                    }}
                />
            </div>
        </div>
    );
};

export default AniControl;
