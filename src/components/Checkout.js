import React, { useState, useEffect } from "react";
import CartSummary from "./CartSummary";
import { Elements } from "@stripe/react-stripe-js";
import { callApi } from "../axios-services";
import CheckoutForm from "./CheckoutForm";

const Checkout = ({ tax, subTotal, total, stripePromise }) => {
  const [clientSecret, setClientSecret] = useState("");

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  const getClientSecret = async (total) => {
    const data = await callApi({
      url: "/stripe/create-payment-intent",
      method: "post",
      body: { total: total },
    });
    setClientSecret(data.clientSecret);
  };

  useEffect(() => {
    getClientSecret(Math.round(total * 100) / 100);
  }, []);

  return (
    <div className="checkout-content container">
      <div className="row">
        <div className="col-lg-8">
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          )}
        </div>
        {/* ===== RIGHT SIDE: SUMMARY DETAILS ===== */}
        <div className="col-lg-3 container">
          <CartSummary tax={tax} total={total} subTotal={subTotal} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
