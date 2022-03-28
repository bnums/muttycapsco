import React from "react";
import { Link } from "react-router-dom";
import useUser from "../hooks/useUser";
import "../style/Navbar.css";

const Navbar = () => {
  const { user, setUser } = useUser();
  const handleLogOut = () => {
    setUser({});
    localStorage.clear();
  };

  return (
    <div className="navbar__container">
      {user.token && user.username ? (
        <div className="welcome">{`Welcome ${user.username}`}</div>
      ) : null}
      <Link to="/">
        <div className="navbar-search">Search Icon</div>
      </Link>
      <Link to="/login-register">
        <div className="navbar-user">User Icon</div>
      </Link>
      <Link to="/shopping-cart">
        <div className="navbar-shopping-cart">Bag Icon</div>
      </Link>
      {!user.token && (
        <Link to="/account/login">
          <div className="navbar-login">Login</div>
        </Link>
      )}
      {user.token && (
        <Link to="/account/login" onClick={handleLogOut}>
          <div className="navbar-logout">Logout</div>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
