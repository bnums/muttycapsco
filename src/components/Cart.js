import React, { useState } from "react";
import "../style/Cart.css";
import CartItem from "./CartItem";
import useUser from "../hooks/useUser";
import { callApi } from "../axios-services";
import { useMutation, useQueryClient } from "react-query";
import CartSummary from "./CartSummary";

const Cart = () => {
  const {
    user,
    user: { token },
    userOrder,
    setUserOrder,
    shoppingCart,
    setShoppingCart,
  } = useUser();
  const queryClient = useQueryClient();
  const [subtotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(subtotal * 0.1);
  const [total, setTotal] = useState(subtotal + 1.5 + tax);

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

  const handleUpdate = async ({ productId, method, orderDetailId, fields }) => {
    if (user.username) {
      try {
        mutate({
          url:
            method === "post" ? "updating" : `/orderDetails/${orderDetailId}`,
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
                  />
                );
              })
            : null}
          {shoppingCart && shoppingCart.length > 0
            ? shoppingCart.map((item, index) => {
                return (
                  <CartItem
                    key={index}
                    handleUpdate={handleUpdate}
                    item={item}
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
