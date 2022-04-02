import React from "react";
import { Link } from "react-router-dom";
import useUser from "../hooks/useUser";
import "../style/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUser,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const { user, setUser, setShoppingCart, setUserOrder } = useUser();
  const handleLogOut = () => {
    setUser({});
    setShoppingCart([]);
    setUserOrder([]);
    localStorage.clear();
  };

  return (
    <div className="navbar__container ">
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
      {user.token && (
        <Link to="/account/login" onClick={handleLogOut}>
          <div className="navbar-logout">Logout</div>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
