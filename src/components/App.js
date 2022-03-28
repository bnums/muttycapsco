import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Header, Footer } from "./";
import "../style/App.css";
import AccountForm from "./AccountForm";
import { Products, Product } from ".";

const App = () => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      setUser(localStorage.getItem("user"));
    }
  }, []);

  return (
    <div className="app_container">
      <Header
        className="header"
        token={token}
        user={user}
        setToken={setToken}
        setUser={setUser}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/account/:method"
          element={
            <AccountForm user={user} setUser={setUser} setToken={setToken} />
          }
        />
        <Route path="/products" element={<Products />} />
        <Route
          path="/products/:productId"
          element={<Product token={token} />}
        />
      </Routes>
      <Footer className="footer" />
    </div>
  );
};

export default App;
