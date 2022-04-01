import React from "react";
import CartSummary from "./CartSummary";

const Checkout = ({ tax, subTotal, total }) => {
  return (
    <div className="checkout-content container">
      <div className="row">
        <div className="col-lg-8"></div>
        {/* ===== RIGHT SIDE: SUMMARY DETAILS ===== */}
        <div className="col-lg-3 container">
          <CartSummary tax={tax} total={total} subTotal={subTotal} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
