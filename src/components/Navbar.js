import React from "react";
import { Link } from "react-router-dom";
import "../style/Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar__container">
      <Link to="/">
        <div className="navbar-search">Search Icon</div>
      </Link>
      <Link to="/login-register">
        <div className="navbar-user">User Icon</div>
      </Link>
      <Link to="/shopping-cart">
        <div className="navbar-shopping-cart">Bag Icon</div>
      </Link>
      <Link to="/">
        <div className="navbar-logout">Logout</div>
      </Link>
    </div>
  );
};

export default Navbar;
