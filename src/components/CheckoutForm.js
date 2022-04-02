import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "../style/CheckoutForm.css";
import useUser from "../hooks/useUser";
import { callApi } from "../axios-services";
import { useMutation, useQueryClient } from "react-query";
import { PaymentSuccess } from ".";
const SITE_URL = "http://localhost:3000";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {
    userOrder,
    user: { token },
  } = useUser();

  const queryClient = useQueryClient();

  const { mutate } = useMutation(callApi, {
    onSuccess: () => {
      queryClient.invalidateQueries("getUserOrders");
      localStorage.removeItem("userOrder");
    },
  });
  const handleSuccess = async (token, orderId) => {
    if (token) {
      try {
        mutate({
          url: `/orders/${orderId}`,
          method: "patch",
          body: {
            isActive: false,
          },
          token,
        });
        console.log("ONLY IF YOU ARE LOGGED IN");
      } catch (error) {
        console.error(error);
      }
    }
    localStorage.removeItem("orderTotal");
    localStorage.removeItem("shoppingCart");
  };

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${SITE_URL}`,
      },
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message);
    }

    if (paymentIntent.status === "succeeded") {
      handleSuccess(token, userOrder.id);
      handleShow();
      setMessage("Payment succeeded!");
    }

    setIsLoading(false);
  };

  return (
    <>
      <h1>Payment</h1>
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" />
        <button disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
        {message && <div id="payment-message">{message}</div>}
      </form>
      <PaymentSuccess show={show} handleClose={handleClose} />
    </>
  );
}
