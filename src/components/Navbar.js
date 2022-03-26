import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import "../style/Navbar.css";

const Navbar = () => {
  const [token, setToken] = useState("");
  // const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

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
      {/* <Link to="/">
        <div className="navbar-logout">Logout</div>
      </Link> */}
      {!token && <Link to="/account/login">Login</Link>}
      {token && <button onClick={() => {
      setToken('');
      localStorage.removeItem('token');
      navigate('/');
    }}>Log Out</button>}
      {/* {token && (
              <NavDropdown
                title={`Hi ${user.username}`}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item id="sign-out" onClick={handleLogOut}>
                  SIGN OUT
                </NavDropdown.Item>
              </NavDropdown>
            )} */}
    </div>
  );
};

export default Navbar;
