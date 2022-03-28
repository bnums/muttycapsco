import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Header, Footer, Products, Product, AccountForm } from "./";
import "../style/App.css";
import useUser from "../hooks/useUser";
import { callApi } from "../axios-services";

const App = () => {
  const { user, setUser, setUserOrder } = useUser();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUser({
        username: localStorage.getItem("user"),
        userId: localStorage.getItem("userId"),
        token: localStorage.getItem("token"),
      });
    }
  }, []);

  return (
    <div className="app_container">
      <Header className="header" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account/:method" element={<AccountForm />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<Product />} />
      </Routes>
      <Footer className="footer" />
    </div>
  );
};

export default App;
