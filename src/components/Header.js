import React from "react";
import Navbar from "./Navbar";
import logo from "../imgs/logo.png";
import { Link } from "react-router-dom";
import "../style/Header.css";

const Header = (props) => {
  return (
    <div className="header">
      <Link to={"/"}>
        <div className="header__company__name ">
          <img src={logo}></img>
        </div>
      </Link>
      <Navbar {...props} />
    </div>
  );
};

export default Header;
