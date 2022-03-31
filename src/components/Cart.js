import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import "../style/Cart.css";
import CartItem from "./CartItem";
import useUser from "../hooks/useUser";

const Cart = () => {
  const { shoppingCart, userOrder } = useUser();
  // const createCart = async () => {
  //   if (!userOrder.id) {
  //     const createdOrder = await callApi({
  //       url: "/orders",
  //       method: "post",
  //       body: {
  //         orderTotal: 0,
  //         createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
  //       },
  //     });
  //     setShoppingCart(createdOrder);
  //     localStorage.setItem("shoppingCart", JSON.stringify(createdOrder));
  //     console.log("Order created", createdOrder);
  //   }
  // };
  return (
    <div className="content">
      <div className="row">
        <CartItem />
        {/* ===== RIGHT SIDE: SUMMARY DETAILS ===== */}
        <div className="col">
          <div className="summary">
            <h1>Summary</h1>
            <div className="pricing-breakdown">
              <div className="subtotal">
                <p>Subtotal: </p>
                <span className="">$20.99</span>
              </div>
              <div className="estimated-shipping">
                <p>
                  Estimated Shipping
                  <FontAwesomeIcon icon={faCircleQuestion} />:{" "}
                </p>{" "}
                <span className="">$1.50</span>
              </div>
              <div className="estimated-tax">
                <p>Estimated Tax: </p>
                <span className="">$1.45</span>
              </div>
            </div>
            <div className="orderTotal">
              <p>Total: </p>
              <span>$65.99</span>
            </div>
            <button className="">
              <Link to="">Checkout</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
