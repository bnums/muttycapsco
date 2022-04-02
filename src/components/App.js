import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
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
  Checkout,
  ReviewsForm,
} from "./";
import "../style/App.css";
import useUser from "../hooks/useUser";
import { callApi } from "../axios-services";

const getStripeKey = async () => {
  const pubKey = await callApi({
    url: "/stripe/pub-key",
  });
  const stripePromise = await loadStripe(pubKey);
  return stripePromise;
};

const stripePromise = getStripeKey();

const App = () => {
  const { setUser, setShoppingCart, setUserOrder } = useUser();
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [productSearchStr, setProductSearchStr] = useState();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
    if (localStorage.getItem("shoppingCart")) {
      setShoppingCart(JSON.parse(localStorage.getItem("shoppingCart")));
    } else {
      setShoppingCart([]);
    }
    if (localStorage.getItem("userOrder")) {
      setUserOrder(JSON.parse(localStorage.getItem("userOrder")));
    }
    if (localStorage.getItem("orderTotal")) {
      let orderTotal = JSON.parse(localStorage.getItem("orderTotal"));
      setSubTotal(orderTotal.subTotal);
      setTax(orderTotal.tax);
      setTotal(orderTotal.total);
    }
  }, []);

  return (
    <>
      <div className="app_container">
        <Header
          className="header"
          setSubTotal={setSubTotal}
          setTax={setTax}
          setTotal={setTotal}
          setProductSearchStr={setProductSearchStr}
          productSearchStr={productSearchStr}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account/:method" element={<AccountForm />} />
          <Route path="/:username/profile/:userId" element={<UserProfile />} />
          <Route
            path="/shopping-cart"
            element={
              <Cart
                total={total}
                subTotal={subTotal}
                tax={tax}
                setTotal={setTotal}
                setTax={setTax}
                setSubTotal={setSubTotal}
              />
            }
          />
          <Route
            path="/shopping-cart/:checkout"
            element={
              <Checkout
                tax={tax}
                total={total}
                subTotal={subTotal}
                stripePromise={stripePromise}
              />
            }
          />
          <Route
            path="/products"
            element={
              <Products
                productSearchStr={productSearchStr}
                setProductSearchStr={setProductSearchStr}
              />
            }
          />
          <Route path="/products/:productId" element={<Product />} />
          <Route path="/products/:productId/review" element={<ReviewsForm />} />
        </Routes>
      </div>
      <Footer className="footer" />
    </>
  );
};

export default App;
