import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router";

import "../style/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUser,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ setProductSearchStr, productSearchStr }) => {
  const { user, setUser, setShoppingCart, setUserOrder } = useUser();
  const [displaySearchBar, setDisplaySearchBar] = useState(false);
  const searchInput = useRef();
  const handleLogOut = () => {
    setUser({});
    setShoppingCart([]);
    setUserOrder([]);
    localStorage.clear();
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!productSearchStr && searchInput && searchInput.current) {
      searchInput.current.value = "";
    }
  }, [productSearchStr]);

  return (
    <div className="navbar__container ">
      {user.token && user.username ? (
        <div className="welcome">{`Welcome ${user.username}`}</div>
      ) : null}
      <div className="d-flex align-items-center">
        {displaySearchBar ? (
          <input
            className="search-input"
            ref={searchInput}
            type="text"
            placeholder="Search by name or category"
            onKeyUp={(e) => {
              const value = e.target.value;
              if (e.key === "Enter" || !value) {
                setProductSearchStr(value);
                navigate("/products");
                // setDisplaySearchBar(false);
              }
            }}
          />
        ) : (
          <div
            className="navbar-search"
            onClick={(e) => {
              e.preventDefault();
              setDisplaySearchBar((previousValue) => !previousValue);
            }}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
        )}
      </div>

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
