import React, { useState } from "react";
import "../style/Cart.css";
import CartItem from "./CartItem";
import useUser from "../hooks/useUser";
import { callApi } from "../axios-services";
import { useMutation, useQueryClient } from "react-query";
import CartSummary from "./CartSummary";

const Cart = ({ tax, total, subTotal, setSubtotal, setTotal, setTax }) => {
  const {
    user,
    user: { token },
    userOrder,
    setUserOrder,
    shoppingCart,
    setShoppingCart,
  } = useUser();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(callApi, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("getUserOrders");
      if (data.success) {
        userOrder.items = userOrder.items.filter(
          (item) => item.productId !== data.productId
        );
      }
      setUserOrder(userOrder);
      localStorage.setItem("userOrder", JSON.stringify(userOrder));
    },
  });

  const calcTotal = (itemTotal) => {};

  const handleUpdate = async ({
    productId,
    method,
    orderDetailId,
    index,
    fields,
  }) => {
    if (user.username) {
      try {
        mutate({
          url: `/orderDetails/${orderDetailId}`,
          method: method,
          body: fields,
          token,
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      if (method === "delete") {
        const updatedCart = shoppingCart.filter(
          (item) => item.productId !== productId
        );
        setShoppingCart(updatedCart);
        localStorage.setItem("shoppingCart", JSON.stringify(updatedCart));
      }
      shoppingCart[index].quantity = fields.quantity;
      localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    }
  };

  return (
    <div className="checkout-content container">
      <div className="row">
        <div className="col-lg-8">
          <h1>Shopping Cart</h1>
          {user.username && userOrder.items.length > 0
            ? userOrder.items.map((item, index) => {
                return (
                  <CartItem
                    key={index}
                    handleUpdate={handleUpdate}
                    item={item}
                    calcTotal={calcTotal}
                  />
                );
              })
            : null}
          {shoppingCart && shoppingCart.length > 0
            ? shoppingCart.map((item, index) => {
                return (
                  <CartItem
                    key={index}
                    index={index}
                    handleUpdate={handleUpdate}
                    item={item}
                    calcTotal={calcTotal}
                  />
                );
              })
            : null}
        </div>
        {/* ===== RIGHT SIDE: SUMMARY DETAILS ===== */}
        <div className="col-lg-3 container">
          <CartSummary tax={tax} total={total} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
