import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Link, useParams } from "react-router-dom";
import { callApi } from "../axios-services";
import useUser from "../hooks/useUser";
import "../style/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUser,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {

  const [token, setToken] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const navigate = useNavigate();
  const { user, setUser, setShoppingCart, setUserOrder } = useUser();

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

  useEffect(() => {
    if (token) {
      handleUser();
    }
  }, [token]);

  const handleLogOut = () => {
    setUser({});
    setShoppingCart([]);
    setUserOrder([]);
    localStorage.clear();
  };

  return (
    <>
    <div className="navbar__container ">
       {user.token && user.isAdmin ? <Link to="/admin-page">
         <div className="navbar-admin">Administrator</div>
       </Link>: null}
      {user.token && user.username ? (
        <div className="welcome">{`Welcome ${user.username}`}</div>
      ) : null}
      <Link to="/products">
        <div className="navbar-search">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
      </Link>
      <Link
        to={
          user.token ? `/${user.username}/profile/${user.id}` : "/account/login"
        }
      >
        <div className="navbar-user">
          <FontAwesomeIcon icon={faUser} />
        </div>
      </Link>
      <Link to="/shopping-cart">
        <div className="navbar-shopping-cart">
          <FontAwesomeIcon icon={faCartShopping} />
        </div>
      </Link>

      {token && <div className="welcome">{`Welcome ${user.username}`}</div>}
      {user.token && (
        <Link to="/account/login" onClick={handleLogOut}>
          <div className="navbar-logout">Logout</div>
        </Link>
      )}

    </div>
    </>
  );
};

export default Navbar;
