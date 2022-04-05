import React from "react";
import "../style/Cart.css";
import CartItem from "./CartItem";
import useUser from "../hooks/useUser";
import { callApi } from "../axios-services";
import { useMutation, useQueryClient } from "react-query";
import CartSummary from "./CartSummary";

const Cart = ({ tax, total, subTotal, setSubTotal, setTotal, setTax }) => {
  const {
    user,
    user: { token },
    userOrder,
    setUserOrder,
    shoppingCart,
    setShoppingCart,
  } = useUser();
  const queryClient = useQueryClient();
  const itemCosts = {};

  const { mutate } = useMutation(callApi, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("getUserOrders");
      if (data.success) {
        userOrder.items = userOrder.items.filter(
          (item) => item.productId !== data.productId
        );
        delete itemCosts[`${data.productId}`];
      }
      calcTotal();
      setUserOrder(userOrder);
      localStorage.setItem("userOrder", JSON.stringify(userOrder));
    },
  });

  const calcTotal = () => {
    if (Object.values(itemCosts).length > 0) {
      let sub = Object.values(itemCosts).reduce((a, b) => a + b);
      let tax = sub * 0.09;
      let total = sub + tax;
      setTax(tax);
      setSubTotal(sub);
      setTotal(total);
      localStorage.setItem(
        "orderTotal",
        JSON.stringify({ subTotal: sub, tax: tax, total: total })
      );
      return;
    }
    setTax(0);
    setSubTotal(0);
    setTotal(0);
    localStorage.setItem(
      "orderTotal",
      JSON.stringify({ subTotal: 0, tax: 0, total: 0 })
    );
  };

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
        delete itemCosts[`${productId}`];
        calcTotal();
        setShoppingCart(updatedCart);
        localStorage.setItem("shoppingCart", JSON.stringify(updatedCart));
        return;
      }
      shoppingCart[index].quantity = fields.quantity;
      localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    }
    calcTotal();
  };

  return (
    <div className="checkout-content container">
      <div className="row1">
        <div className="col-lg-8">
          <h1>Shopping Cart</h1>
          {user.username && userOrder.items && userOrder.items.length > 0
            ? userOrder.items.map((item, index) => {
                return (
                  <CartItem
                    key={index}
                    handleUpdate={handleUpdate}
                    item={item}
                    calcTotal={calcTotal}
                    itemCosts={itemCosts}
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
                    itemCosts={itemCosts}
                  />
                );
              })
            : null}
        </div>
        {/* ===== RIGHT SIDE: SUMMARY DETAILS ===== */}
        <div className="col-lg-3 container">
          <CartSummary tax={tax} total={total} subTotal={subTotal} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
