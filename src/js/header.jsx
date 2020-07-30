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
//Reset 時 code顏色沒變回去(V)
//換頁時 svg文字沒重置
//Quick sort 在自訂array animationarray沒清乾淨
//About page
//Introduce picture
//control panel
//RWD
//Big number sort?


//Merge step
//Merge reset position沒重置