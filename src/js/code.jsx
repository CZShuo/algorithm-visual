import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Code = (props) => {
    const { code,currentCode } = props;

    return (
        <div className="code-area">
            {code.map((ele,index) => {
                return <pre className="code" key={index} style={{color:currentCode[index]}}>{ele}</pre>;
            })}
        </div>
    );
};
export default Code;
