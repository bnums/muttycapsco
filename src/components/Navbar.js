import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import "../style/Navbar.css";
import { callApi } from "../axios-services";

const Navbar = () => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const handleUser = async () => {
    const user = await callApi({
      url: `/users/me`,
      method: "GET",
      token,
    });
    setUser(user);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const handleLogOut = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    if (token) {
      handleUser();
    }
  }, [token]);

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
      {/* {token && <div className="welcome">{`Welcome ${user.username}`}</div>} */}
      {!token && <Link to="/account/login"><div className="navbar-login">Login</div>
      </Link>}
      {token && <Link to="/account/login"onClick={handleLogOut}>
        <div className="navbar-logout">Logout</div>
      </Link>}
    </div>
  );
};

export default Navbar;
