import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "../index.css";

const Header = (props) => {
    return (
        <Link to="/">
            <div className="header">VAR v1.1.4t</div>
        </Link>
    );
};

export default Header;

//Custom array keep 
//SORTING AFTER SHOULD SET BACK TO UNSORTED
//Animation control
//About page
//Introduce picture
//control panel
//RWD
//Big number sort?