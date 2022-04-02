const express = require("express");
const stripeRouter = express();
require("dotenv").config();
const { STRIPE_TEST_KEY } = process.env;
const stripe = require("stripe")(STRIPE_TEST_KEY);

const calculateOrderAmount = (total) => {
  return total * 100;
};

stripeRouter.post("/create-payment-intent", async (req, res) => {
  const { total } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(total),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

module.exports = stripeRouter;
