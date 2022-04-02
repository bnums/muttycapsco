import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import "../style/Header.css";

const Header = ({ setSubTotal, setTax, setTotal }) => {
  return (
    <div className="header container-fluid ">
      <Link to={"/"}>
        <div className="header__company__name ">MuttyCapsCo.</div>
      </Link>
      <Navbar setTotal={setTotal} setTax={setTax} setSubTotal={setSubTotal} />
    </div>
  );
};

export default Header;
