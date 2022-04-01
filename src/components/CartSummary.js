import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";

const CartSummary = ({ tax, total, subTotal }) => {
  return (
    <div className="summary">
      <h1>Summary</h1>
      <div className="pricing-breakdown">
        <div className="subtotal">
          <p>Subtotal: </p>
          <span className="">${subTotal.toFixed(2)}</span>
        </div>
        <div className="estimated-shipping">
          <p>
            Estimated Shipping
            <FontAwesomeIcon icon={faCircleQuestion} />
          </p>
          <span className="">$1.50</span>
        </div>
        <div className="estimated-tax">
          <p>Estimated Tax: </p>
          <span className="">${tax.toFixed(2)}</span>
        </div>
      </div>
      <div className="orderTotal">
        <p>Total: </p>
        <span>${total.toFixed(2)}</span>
      </div>
      <button className="">
        <Link to="">Checkout</Link>
      </button>
    </div>
  );
};

export default CartSummary;
