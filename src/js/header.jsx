import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "../index.css";

const Header = (props) => {
    return (
        <Link to="/">
            <div className="header">VAR v1.1.1t</div>
        </Link>
    );
};

export default Header;
