import React, { useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import { callApi } from "../axios-services";
import CheckoutItemDev from "./CheckoutItemDev";

const CheckoutDev = ({ orderTotal, setOrderTotal }) => {
  const {
    user,
    user: { token },
    shoppingCart,
    setShoppingCart,
    userOrder,
    setUserOrder,
  } = useUser();

  const createOrder = async () => {
    const createdOrder = await callApi({
      url: "/orders",
      method: "post",
      body: {
        orderTotal: orderTotal,
        createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        userId: user.id,
      },
    });
    localStorage.setItem("userOrder", JSON.stringify(createdOrder));
    setUserOrder(createdOrder);
    return createdOrder.id;
  };

  const addItemsToOrder = async (shoppingCart, orderId) => {
    console.log("ORDER ID", orderId);
    await shoppingCart.map((item) => {
      callApi({
        url: `/orders/${orderId}/products`,
        method: "post",
        body: {
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        token,
      });
    });
  };

  const updateItemsOrder = async () => {
    console.log("UPDATE");
  };

  const handleCheckout = async () => {
    // console.log("SHOPPING CART", shoppingCart);
  };

  const handleSave = async () => {
    if (!localStorage.getItem("userOrder")) {
      const orderId = await createOrder();
      addItemsToOrder(shoppingCart, orderId);
    } else {
      updateItemsOrder(shoppingCart, userOrder.id);
    }
  };

  const handleItemDelete = async (id) => {
    let updatedCart = shoppingCart.filter((item) => item.productId !== id);
    setShoppingCart(updatedCart);
    localStorage.setItem("shoppingCart", JSON.stringify(updatedCart));
  };

  const calcTotal = () => {
    let sum = 0;
    if (shoppingCart.length > 0) {
      shoppingCart.map((item) => {
        let itemTotal = item.unitPrice * item.quantity;
        sum += itemTotal;
      });
      userOrder.orderTotal = sum;
    }
    setOrderTotal(sum.toFixed(2));
  };

  useEffect(() => {
    calcTotal();
  }, [shoppingCart]);

  return (
    <div className="container">
      {shoppingCart && shoppingCart.length > 0 ? (
        shoppingCart.map((item, index) => {
          return (
            <div className="row" key={index}>
              <CheckoutItemDev
                item={item}
                handleItemDelete={handleItemDelete}
                calcTotal={calcTotal}
              />
            </div>
          );
        })
      ) : (
        <div className="row">Cart is Empty</div>
      )}
      {user.id && shoppingCart.length > 0 ? (
        <button onClick={handleSave}>Save For Later</button>
      ) : null}
      {shoppingCart.length > 0 ? (
        <button onClick={handleCheckout}>Checkout</button>
      ) : null}
      <div>ORDER TOTAL: {orderTotal}</div>
    </div>
  );
};

export default CheckoutDev;
