import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import "../style/Header.css";

const Header = ({ token, setToken, user, setUser }) => {
  return (
    <div className="header">
      <Link to={"/"}>
        <div className="header__company__name">MuttyCapsCo.</div>
      </Link>
      <Navbar token={token} setToken={setToken} user={user} setUser={setUser} />
    </div>
  );
};

export default Header;
