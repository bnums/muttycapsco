import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import "../style/Header.css";

const Header = () => {
  return (
    <div className="header container-fluid ">
      <Link to={"/"}>
        <div className="header__company__name ">MuttyCapsCo.</div>
      </Link>
      <Navbar />
    </div>
  );
};

export default Header;
