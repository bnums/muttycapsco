import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  Header,
  Footer,
  Products,
  Product,
  AccountForm,
  UserProfile,
  Cart,
} from "./";
import "../style/App.css";
import { callApi } from "../axios-services";
import useUser from "../hooks/useUser";
import CheckoutDev from "./CheckoutDev";

const App = () => {
  const { setUser, setShoppingCart, setUserOrder } = useUser();
  const [orderTotal, setOrderTotal] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
    if (localStorage.getItem("shoppingCart")) {
      setShoppingCart(JSON.parse(localStorage.getItem("shoppingCart")));
    }
    if (localStorage.getItem("userOrder")) {
      setUserOrder(JSON.parse(localStorage.getItem("userOrder")));
    }
  }, []);

  return (
    <>
      <div className="app_container">
        <Header className="header" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account/:method" element={<AccountForm />} />
          <Route path="/:username/profile/:userId" element={<UserProfile />} />
          {/* <Route path="/shopping-cart" element={<Cart />} /> */}
          <Route
            path="/shopping-cart"
            element={
              <CheckoutDev
                orderTotal={orderTotal}
                setOrderTotal={setOrderTotal}
              />
            }
          />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<Product />} />
        </Routes>
      </div>
      <Footer className="footer" />
    </>
  );
};

export default App;
